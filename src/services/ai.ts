import OpenAI from 'openai';
import { getEnvVar } from '../utils/env';
import { technicalAnalysis } from './technical';
import characterConfig from '../characters/tradesxbt.json';
import { marketService } from './market';
import { redisService } from './redis';

// Define interfaces for market data
interface TokenMetrics {
  price: number;
  volume24h: number;
  marketCap: number;
  priceChange24h: number;
  liquidityUSD: number;
  technicalIndicators: {
    rsi: number;
    macd: {
      macd: number;
      signal: number;
      histogram: number;
    };
  };
}

interface TradingSignal {
  action: 'buy' | 'sell' | 'hold';
  confidence: number;
  reason: string;
  suggestedEntry?: number;
  suggestedExit?: number;
  stopLoss?: number;
}

const openai = new OpenAI({
  apiKey: getEnvVar('VITE_OPENAI_API_KEY'),
  dangerouslyAllowBrowser: true
});

export class AIService {
  private static instance: AIService;
  
  private constructor() {}

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async analyzeTradingSignal(marketData: any, technicalData: any): Promise<any> {
    try {
      // Check cache first
      const cacheKey = `analysis:${marketData.symbol}:${Date.now()}`;
      const cachedAnalysis = await redisService.getApiResponse('analysis', cacheKey);
      
      if (cachedAnalysis) {
        return cachedAnalysis;
      }

      // If not in cache, perform analysis
      const prompt = this.constructPrompt(marketData, technicalData);
      const response = await this.getAIResponse(prompt);
      
      // Cache the result
      await redisService.cacheApiResponse('analysis', cacheKey, response, 300); // Cache for 5 minutes
      
      return response;
    } catch (error) {
      console.error('Error in analyzeTradingSignal:', error);
      throw error;
    }
  }

  private async getAIResponse(prompt: string): Promise<any> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'system', content: prompt }],
        temperature: 0.7,
        max_tokens: 500
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error in getAIResponse:', error);
      throw error;
    }
  }

  private constructPrompt(marketData: any, technicalData: any): string {
    // Cache market context
    const contextKey = `context:${marketData.symbol}`;
    const cachedContext = await redisService.getApiResponse('context', contextKey);
    
    if (cachedContext) {
      return this.buildPromptWithContext(cachedContext, marketData, technicalData);
    }

    // Build new context if not cached
    const context = this.buildMarketContext(marketData, technicalData);
    await redisService.cacheApiResponse('context', contextKey, context, 900); // Cache for 15 minutes
    
    return this.buildPromptWithContext(context, marketData, technicalData);
  }

  private buildMarketContext(marketData: any, technicalData: any): string {
    // Implementation of market context building
    return `Market Analysis for ${marketData.symbol}:\n...`;
  }

  private buildPromptWithContext(context: string, marketData: any, technicalData: any): string {
    return `
      ${context}
      Current Market Data:
      Price: ${marketData.price}
      24h Volume: ${marketData.volume24h}
      Market Cap: ${marketData.marketCap}
      
      Technical Indicators:
      RSI: ${technicalData.rsi}
      MACD: ${technicalData.macd}
      
      Based on this data, analyze the trading opportunity and provide:
      1. Signal strength (1-10)
      2. Recommended action (buy/sell/hold)
      3. Key factors influencing this decision
      4. Risk assessment
    `;
  }
}

export const aiService = AIService.getInstance();
