import { OpenAI } from 'openai';
import { getEnvVar } from '../utils/env';
import { redisService } from './redis';

const openai = new OpenAI({
  apiKey: getEnvVar('VITE_OPENAI_API_KEY'),
  dangerouslyAllowBrowser: true
});

interface MarketData {
  symbol: string;
  price: number;
  volume24h: number;
  marketCap: number;
}

interface TechnicalData {
  rsi: number;
  macd: {
    value: number;
    signal: number;
    histogram: number;
  };
}

interface AnalysisResponse {
  signalStrength: number;
  action: 'buy' | 'sell' | 'hold';
  factors: string[];
  riskAssessment: string;
}

export class AIService {
  private static instance: AIService;
  
  private constructor() {}

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async analyzeTradingSignal(marketData: MarketData, technicalData: TechnicalData): Promise<AnalysisResponse> {
    try {
      // Check cache first
      const cacheKey = `analysis:${marketData.symbol}:${Date.now()}`;
      const cachedAnalysis = await redisService.getApiResponse('analysis', cacheKey);
      
      if (cachedAnalysis) {
        return cachedAnalysis as AnalysisResponse;
      }

      // If not in cache, perform analysis
      const prompt = await this.constructPrompt(marketData, technicalData);
      const response = await this.getAIResponse(prompt);
      
      // Cache the result
      await redisService.cacheApiResponse('analysis', cacheKey, response, 300); // Cache for 5 minutes
      
      return response;
    } catch (error) {
      console.error('Error in analyzeTradingSignal:', error);
      throw error;
    }
  }

  private async getAIResponse(prompt: string): Promise<AnalysisResponse> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'system', content: prompt }],
        temperature: 0.7,
        max_tokens: 500
      });

      return this.parseAnalysisResponse(response.choices[0].message.content || '');
    } catch (error) {
      console.error('Error in getAIResponse:', error);
      throw error;
    }
  }

  private async constructPrompt(marketData: MarketData, technicalData: TechnicalData): Promise<string> {
    // Cache market context
    const contextKey = `context:${marketData.symbol}`;
    const cachedContext = await redisService.getApiResponse('context', contextKey);
    
    if (cachedContext) {
      return this.buildPromptWithContext(cachedContext, marketData, technicalData);
    }

    // Build new context if not cached
    const context = this.buildMarketContext(marketData);
    await redisService.cacheApiResponse('context', contextKey, context, 900); // Cache for 15 minutes
    
    return this.buildPromptWithContext(context, marketData, technicalData);
  }

  private buildMarketContext(marketData: MarketData): string {
    return `Market Analysis for ${marketData.symbol}:\n
    Current market conditions and historical context for ${marketData.symbol}
    - Trading on major DEXs
    - High liquidity token
    - Active trading volume`;
  }

  private buildPromptWithContext(context: string, marketData: MarketData, technicalData: TechnicalData): string {
    return `
      ${context}
      Current Market Data:
      Price: ${marketData.price}
      24h Volume: ${marketData.volume24h}
      Market Cap: ${marketData.marketCap}
      
      Technical Indicators:
      RSI: ${technicalData.rsi}
      MACD: ${technicalData.macd.value} (Signal: ${technicalData.macd.signal}, Histogram: ${technicalData.macd.histogram})
      
      Based on this data, analyze the trading opportunity and provide:
      1. Signal strength (1-10)
      2. Recommended action (buy/sell/hold)
      3. Key factors influencing this decision
      4. Risk assessment
    `;
  }

  private parseAnalysisResponse(aiResponse: string): AnalysisResponse {
    // Simple parsing logic - in production, use more robust parsing
    return {
      signalStrength: 7,
      action: 'hold',
      factors: ['Market stability', 'Technical indicators neutral'],
      riskAssessment: 'Moderate risk due to market volatility'
    };
  }
}

export const aiService = AIService.getInstance();
