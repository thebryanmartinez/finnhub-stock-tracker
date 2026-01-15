import { SidebarTrigger } from "@/modules/shared/ui/sidebar";

export default function Home() {
  return (
    <div className='flex-1 min-h-screen items-center justify-center bg-background font-sans'>
      <SidebarTrigger />
      <main></main>
    </div>
  );
}
