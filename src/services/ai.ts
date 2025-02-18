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

  async generateResponse(prompt: string): Promise<string> {
    try {
      // Check cache first
      const cachedResponse = await redisService.get(`prompt:${prompt}`);
      if (cachedResponse) {
        return cachedResponse;
      }

      // Generate new response
      const completion = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          { 
            role: "system", 
            content: "You are a helpful AI trading assistant. You provide concise, accurate responses about trading, market analysis, and technical indicators."
          },
          { 
            role: "user", 
            content: prompt 
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const response = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";
      
      // Cache the response
      await redisService.set(`prompt:${prompt}`, response, 3600); // Cache for 1 hour
      
      return response;
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  async analyzeMarketData(marketData: MarketData, technicalData: TechnicalData): Promise<AnalysisResponse> {
    try {
      const cacheKey = `analysis:${marketData.symbol}`;
      const cachedAnalysis = await redisService.get(cacheKey);
      
      if (cachedAnalysis) {
        return JSON.parse(cachedAnalysis);
      }

      const prompt = `Analyze the following market data for ${marketData.symbol}:
        Price: $${marketData.price}
        24h Volume: $${marketData.volume24h}
        Market Cap: $${marketData.marketCap}
        RSI: ${technicalData.rsi}
        MACD Value: ${technicalData.macd.value}
        MACD Signal: ${technicalData.macd.signal}
        MACD Histogram: ${technicalData.macd.histogram}
        
        Provide a trading signal analysis.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: "You are an expert trading analyst. Analyze the given market data and provide actionable insights."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 500
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) throw new Error('No analysis generated');

      const analysis: AnalysisResponse = {
        signalStrength: this.calculateSignalStrength(technicalData),
        action: this.determineAction(technicalData),
        factors: this.extractFactors(response),
        riskAssessment: this.assessRisk(marketData, technicalData)
      };

      await redisService.set(cacheKey, JSON.stringify(analysis), 300); // Cache for 5 minutes
      
      return analysis;
    } catch (error) {
      console.error('Error analyzing market data:', error);
      throw new Error('Failed to analyze market data');
    }
  }

  private calculateSignalStrength(technicalData: TechnicalData): number {
    const rsiWeight = 0.4;
    const macdWeight = 0.6;
    
    const rsiSignal = (technicalData.rsi - 50) / 50; // Normalize RSI
    const macdSignal = technicalData.macd.histogram / Math.abs(technicalData.macd.value); // Normalize MACD
    
    return (rsiSignal * rsiWeight + macdSignal * macdWeight);
  }

  private determineAction(technicalData: TechnicalData): 'buy' | 'sell' | 'hold' {
    if (technicalData.rsi < 30 && technicalData.macd.histogram > 0) return 'buy';
    if (technicalData.rsi > 70 && technicalData.macd.histogram < 0) return 'sell';
    return 'hold';
  }

  private extractFactors(response: string): string[] {
    return response
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.trim().substring(2));
  }

  private assessRisk(marketData: MarketData, technicalData: TechnicalData): string {
    const volatility = Math.abs(technicalData.macd.histogram / marketData.price);
    const volume = marketData.volume24h / marketData.marketCap;
    
    if (volatility > 0.1 && volume < 0.1) return 'High Risk';
    if (volatility > 0.05 || volume < 0.2) return 'Medium Risk';
    return 'Low Risk';
  }
}

export const aiService = AIService.getInstance();
