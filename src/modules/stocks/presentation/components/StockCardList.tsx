"use client";

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/modules/shared/ui";
import { StockCard } from "@/modules/stocks/presentation/components";
import { strings } from "@/modules/stocks/presentation/localization";
import { useStockRepository } from "@/modules/stocks/presentation/state/StockRepositoryProvider";

export const StockCardList = () => {
  const repository = useStockRepository();
  const stocks = repository.getStocks();
  const stockList = Object.values(stocks);

  if (stockList.length === 0) {
    return (
      <Empty className='border border-dashed'>
        <EmptyHeader>
          <EmptyTitle className='text-base'>{strings.card.empty.title}</EmptyTitle>
          <EmptyDescription className='text-sm'>{strings.card.empty.description}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
      {stockList.map((stock) => (
        <StockCard key={stock.symbol} stock={stock} />
      ))}
    </div>
  );
};
