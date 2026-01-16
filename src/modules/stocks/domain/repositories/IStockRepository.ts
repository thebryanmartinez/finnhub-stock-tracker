import { Stock } from "@/modules/stocks/domain/entitites";

export interface IStockRepository {
  getStocks(): Record<string, Stock>;
  addStock(symbol: string, priceAlert: number): void;
  removeStock(symbol: string): void;
  updatePrice(symbol: string, price: number, isBelowAlert: boolean): void;
  markNotificationSent(symbol: string): void;
  reset(): void;
}
