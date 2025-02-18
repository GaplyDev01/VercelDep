import { getEnvVar } from '../utils/env';
import axios from 'axios';

interface TokenMetrics {
  symbol: string;
  name: string;
  price: number;
  volume24h: number;
  marketCap: number;
  priceChange24h: number;
  volumeChange24h: number;
}

class MarketService {
  private birdeyeApiKey: string;

  constructor() {
    this.birdeyeApiKey = getEnvVar('VITE_BIRDEYE_API_KEY');
  }

  async fetchBirdeyeData(tokenAddress: string): Promise<TokenMetrics> {
    try {
      const tokenData = await axios.get(
        `https://public-api.birdeye.so/public/token/${tokenAddress}`,
        {
          headers: { 'X-API-KEY': this.birdeyeApiKey }
        }
      );

      const marketData = await axios.get(
        `https://public-api.birdeye.so/public/market_data/${tokenAddress}`,
        {
          headers: { 'X-API-KEY': this.birdeyeApiKey }
        }
      );

      return {
        symbol: tokenData.data.data?.symbol || '',
        name: tokenData.data.data?.name || '',
        price: marketData.data.data?.price || 0,
        volume24h: marketData.data.data?.volume24h || 0,
        marketCap: marketData.data.data?.marketCap || 0,
        priceChange24h: marketData.data.data?.priceChange24h || 0,
        volumeChange24h: marketData.data.data?.volumeChange24h || 0
      };
    } catch (error) {
      console.error('Error fetching Birdeye data:', error);
      throw error;
    }
  }
}

export const marketService = new MarketService();
