import { ChartSpline } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/modules/shared/ui";
import { StockForm, Watchlist } from "@/modules/stocks/presentation/components";

import { strings } from "../localization";

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
  return (
    <Sidebar>
      <SidebarHeader className='p-4'>
        <Header />
      </SidebarHeader>
      <SidebarContent className='p-4'>
        <SidebarGroup>
          <StockForm />
        </SidebarGroup>
        <SidebarGroup>
          <Watchlist />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
