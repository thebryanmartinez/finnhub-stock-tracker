import { SidebarTrigger } from "@/modules/shared/ui/sidebar";
import { StockCardList } from "@/modules/stocks/presentation/components";

export default function Home() {
  return (
    <div className='flex-1 min-h-screen items-center justify-center bg-background font-sans'>
      <SidebarTrigger />
      <main className='p-8'>
        <StockCardList />
      </main>
    </div>
  );
}
