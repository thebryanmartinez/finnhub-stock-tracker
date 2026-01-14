import { ChartSpline } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/modules/shared/ui/sidebar";

const Header = () => {
  return (
    <div className='flex flex-row items-center gap-2'>
      <div className='bg-foreground rounded-lg p-2 w-fit'>
        <ChartSpline className='text-background' />
      </div>
      <div className='flex flex-col items-center'>
        <h1 className='text-lg font-bold '>Finnhub Stocks</h1>
        <span className='text-xs font-bold tracking-tight text-muted-foreground'>
          Real time stock tracker
        </span>
      </div>
    </div>
  );
};

export const StockForm = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
