import {
  StockCardList,
  StockChartContainer,
  WatchlistOpenButton,
} from "@/modules/stocks/presentation/components";

export default function Home() {
  return (
    <div className='flex-1 min-h-screen items-center justify-center bg-background font-sans'>
      <main className='p-8 flex flex-col flex-1 gap-4 '>
        <StockCardList />
        <StockChartContainer />
      </main>
      <WatchlistOpenButton />
    </div>
  );
}
