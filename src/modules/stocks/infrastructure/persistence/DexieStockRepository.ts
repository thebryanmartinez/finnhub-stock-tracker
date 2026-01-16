import { toast } from "sonner";

import { Stock } from "@/modules/stocks/domain/entitites";
import { strings } from "@/modules/stocks/presentation/localization";

import { db } from "./db";

export class DexieStockRepository {
  async getStocks(): Promise<Record<string, Stock>> {
    try {
      const stocks = await db.stocks.toArray();
      return stocks.reduce(
        (acc, stock) => {
          acc[stock.symbol] = stock;
          return acc;
        },
        {} as Record<string, Stock>
      );
    } catch (error) {
      toast.error(strings.dexieRepository.errors.loadingStocks);
      return {};
    }
  }

  async addStock(symbol: string, priceAlert: number): Promise<void> {
    try {
      await db.stocks.add({
        symbol,
        price: 0,
        priceAlert,
        previousPrice: 0,
        isBelowAlert: false,
        isNotificationSent: false,
        history: [],
      });
    } catch (error) {
      toast.error(strings.dexieRepository.errors.addingStock);
    }
  }

  async removeStock(symbol: string): Promise<void> {
    try {
      await db.stocks.delete(symbol);
    } catch (error) {
      toast.error(strings.dexieRepository.errors.removingStock);
    }
  }

  async updatePrice(symbol: string, price: number, isBelowAlert: boolean): Promise<void> {
    try {
      const stock = await db.stocks.get(symbol);
      if (!stock) return;

      await db.stocks.update(symbol, {
        price,
        isBelowAlert,
        previousPrice: stock.price,
        history: [...stock.history, price].slice(-40),
      });
    } catch (error) {
      toast.error(strings.dexieRepository.errors.updatingStock);
    }
  }

  async markNotificationSent(symbol: string): Promise<void> {
    try {
      await db.stocks.update(symbol, { isNotificationSent: true });
    } catch (error) {
      toast.error(strings.dexieRepository.errors.markingNotificationSent);
    }
  }
}
