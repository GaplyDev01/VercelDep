import OpenAI from 'openai';
import { getEnvVar } from '../utils/env';
import { technicalAnalysis } from './technical';
import characterConfig from '../characters/tradesxbt.json';
import { marketService } from './market';

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
  private birdeyeApiKey: string;
  private characterSystemPrompt: string;
  private characterContext: {
    bio: string[];
    lore: string[];
    knowledge: string[];
  };

  constructor() {
    this.birdeyeApiKey = getEnvVar('VITE_BIRDEYE_API_KEY');
    this.characterContext = {
      bio: characterConfig.bio || [],
      lore: characterConfig.lore || [],
      knowledge: characterConfig.knowledge || []
    };
    this.characterSystemPrompt = characterConfig.system?.join('\n') || '';
  }

  async analyzeTradingSignal(tokenAddress: string): Promise<TradingSignal> {
    try {
      const metrics = await this.getTokenMetrics(tokenAddress);
      const { rsi, macd } = metrics.technicalIndicators;

      const prompt = [
        this.characterSystemPrompt,
        'Analyze the following market data and provide a trading signal:',
        `RSI: ${rsi}`,
        `MACD: ${macd.macd} (Signal: ${macd.signal}, Histogram: ${macd.histogram})`,
        `Price: $${metrics.price}`,
        `24h Volume: $${metrics.volume24h}`,
        `Market Cap: $${metrics.marketCap}`,
        `24h Price Change: ${metrics.priceChange24h}%`
      ].join('\n');

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'system', content: prompt }],
        temperature: 0.7,
        max_tokens: 500
      });

      const analysis = response.choices[0].message.content || '';
      return this.parseTradingSignal(analysis);
    } catch (error) {
      console.error('Error analyzing trading signal:', error);
      throw error;
    }
  }

  private async getTokenMetrics(tokenAddress: string): Promise<TokenMetrics> {
    const marketData = await marketService.fetchBirdeyeData(tokenAddress);
    const prices = [marketData.price]; // In a real app, you'd fetch historical prices

    return {
      price: marketData.price,
      volume24h: marketData.volume24h,
      marketCap: marketData.marketCap,
      priceChange24h: marketData.priceChange24h,
      liquidityUSD: 0, // Would need to fetch from DEX
      technicalIndicators: {
        rsi: technicalAnalysis.calculateRSI(prices),
        macd: technicalAnalysis.calculateMACD(prices)
      }
    };
  }

  private parseTradingSignal(analysis: string): TradingSignal {
    // In a real app, you'd implement proper parsing logic
    return {
      action: 'hold',
      confidence: 0.5,
      reason: analysis
    };
  }
}

export const aiService = new AIService();
