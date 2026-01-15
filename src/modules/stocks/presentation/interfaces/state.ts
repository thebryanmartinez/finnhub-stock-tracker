import { Stock } from "@/modules/stocks/domain/entitites";
import { IStockRepository } from "@/modules/stocks/domain/repositories";

export interface StocksState extends IStockRepository {
  stocks: Record<string, Stock>;
}
