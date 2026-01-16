import { Stock } from "@/modules/stocks/domain/entitites";

export interface IStockRepository {
  getStocks(): Record<string, Stock> | Record<string, Stock>;
  addStock(symbol: string, priceAlert: number): void | Promise<void>;
  removeStock(symbol: string): void | Promise<void>;
  updatePrice(symbol: string, price: number, isBelowAlert: boolean): void | Promise<void>;
  markNotificationSent(symbol: string): void | Promise<void>;
}
