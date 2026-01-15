"use client";

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/modules/shared/ui";
import { Stock } from "@/modules/stocks/domain/entitites";
import { WatchlistItem } from "@/modules/stocks/presentation/components";
import { strings } from "@/modules/stocks/presentation/localization";

export const Watchlist = ({
  stocks,
  onRemoveStock,
}: {
  stocks: Record<string, Stock>;
  onRemoveStock: (symbol: string) => void;
}) => {
  return (
    <section className='flex-1 flex flex-col gap-4 w-full'>
      <span className='font-bold'>{strings.watchlist.title}</span>
      <article className='flex flex-col gap-4'>
        {Object.keys(stocks).length === 0 ? (
          <Empty className='border border-dashed'>
            <EmptyHeader>
              <EmptyTitle className='text-base'>{strings.watchlist.empty.title}</EmptyTitle>
              <EmptyDescription className='text-sm'>
                {strings.watchlist.empty.description}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          Object.values(stocks).map((stock) => (
            <WatchlistItem key={stock.symbol} stock={stock} onRemove={onRemoveStock} />
          ))
        )}
      </article>
    </section>
  );
};
