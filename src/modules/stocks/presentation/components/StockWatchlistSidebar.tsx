"use client";

import { ChartSpline, X } from "lucide-react";

import { ThemeToggle } from "@/modules/shared/components";
import {
  Button,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/modules/shared/ui";
import {
  PushNotificationsEnabler,
  StockForm,
  Watchlist,
} from "@/modules/stocks/presentation/components";
import { strings } from "@/modules/stocks/presentation/localization";
import { useStockRepository } from "@/modules/stocks/presentation/state/StockRepositoryProvider";

const Header = () => {
  return (
    <div className='flex flex-col gap-4'>
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
      <div className='flex flex-col gap-2'>
        <span className='text-base font-bold'>{strings.header.priceAlerts}</span>
        <PushNotificationsEnabler />
      </div>
    </div>
  );
};

export const Footer = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div>
      <ThemeToggle />
      <Button onClick={toggleSidebar} className='w-full md:hidden mb-10' variant='outline'>
        <X />
        {strings.watchlist.footer.close}
      </Button>
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
      <SidebarFooter className='p-4'>
        <Footer />
      </SidebarFooter>
    </Sidebar>
  );
};
