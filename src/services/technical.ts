interface PriceData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

class TechnicalAnalysis {
  calculateRSI(prices: number[], period = 14): number {
    if (prices.length < period + 1) {
      return 50; // Default value if not enough data
    }

    let gains = 0;
    let losses = 0;

    for (let i = 1; i <= period; i++) {
      const difference = prices[i] - prices[i - 1];
      if (difference >= 0) {
        gains += difference;
      } else {
        losses -= difference;
      }
    }

    const avgGain = gains / period;
    const avgLoss = losses / period;
    
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }

  calculateMACD(prices: number[]): { macd: number; signal: number; histogram: number } {
    const ema12 = this.calculateEMA(prices, 12);
    const ema26 = this.calculateEMA(prices, 26);
    const macd = ema12 - ema26;
    const signal = this.calculateEMA([macd], 9);
    const histogram = macd - signal;

    return { macd, signal, histogram };
  }

  private calculateEMA(prices: number[], period: number): number {
    const k = 2 / (period + 1);
    let ema = prices[0];

    for (let i = 1; i < prices.length; i++) {
      ema = prices[i] * k + ema * (1 - k);
    }

    return ema;
  }
}

export const technicalAnalysis = new TechnicalAnalysis();
