"use client";

import { ChartSpline } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/modules/shared/ui";
import { StockForm, Watchlist } from "@/modules/stocks/presentation/components";
import { strings } from "@/modules/stocks/presentation/localization";
import { useStockRepository } from "@/modules/stocks/presentation/state/StockRepositoryProvider";

const Header = () => {
  return (
    <div className='flex flex-row items-center gap-2'>
      <div className='bg-foreground rounded-lg p-2 w-fit'>
        <ChartSpline className='text-background' />
      </div>
      <div className='flex flex-col items-center'>
        <h1 className='text-lg font-bold '>{strings.header.title}</h1>
        <span className='text-xs font-bold tracking-tight text-muted-foreground'>
          {strings.header.subtitle}
        </span>
      </div>
    </div>
  );
};

export const StockWatchlistSidebar = () => {
  const repository = useStockRepository();
  const stocks = repository.getStocks();

  const handleAddStock = (symbol: string, priceAlert: number) => {
    repository.addStock(symbol, priceAlert);
  };

  const handleRemoveStock = (symbol: string) => {
    repository.removeStock(symbol);
  };

  return (
    <Sidebar>
      <SidebarHeader className='p-4'>
        <Header />
      </SidebarHeader>
      <SidebarContent className='p-4'>
        <SidebarGroup>
          <StockForm onAddStock={handleAddStock} />
        </SidebarGroup>
        <SidebarGroup>
          <Watchlist stocks={stocks} onRemoveStock={handleRemoveStock} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
