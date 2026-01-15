"use client"

import { PanelLeftIcon } from "lucide-react";

import { Button, useSidebar } from "@/modules/shared/ui";
import { strings } from "@/modules/stocks/presentation/localization";

export const WatchlistOpenButton = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className='fixed bottom-12 left-0 right-0 z-50 w-full px-4 py-2 bg-background border-t md:hidden'>
      <Button onClick={toggleSidebar} className='w-full' variant='outline'>
        <PanelLeftIcon />
        {strings.openWatchlist.open}
      </Button>
    </div>
  );
};
