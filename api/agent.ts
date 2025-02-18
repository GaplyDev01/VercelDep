import { VercelRequest, VercelResponse } from '@vercel/node';
import { aiService } from '../src/services/ai';
import { redisService } from '../src/services/redis';
import { env } from '../src/utils/env';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    const { message, conversationId, userId } = request.body;

    // Get cached conversation history
    const history = await redisService.getMessages(conversationId);

    // Get user preferences
    const preferences = await redisService.getUserPreferences(userId);

    // Get cached market data if available
    const marketData = await redisService.getMarketData('SOL');

    // Process message with AI service
    const result = await aiService.analyzeTradingSignal(
      marketData,
      { rsi: 55, macd: 0.5 } // Example technical data
    );

    // Cache the new message and response
    const updatedHistory = [...(history || []), 
      { role: 'user', content: message },
      { role: 'assistant', content: result }
    ];
    await redisService.cacheMessages(conversationId, updatedHistory);

    response.status(200).json({ 
      response: result,
      marketData,
      history: updatedHistory
    });
  } catch (error) {
    console.error('Agent error:', error);
    response.status(500).json({ 
      error: 'Error processing request',
      details: error.message 
    });
  }
}
