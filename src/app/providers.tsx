"use client";

import { ReactNode } from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SidebarProvider } from "@/modules/shared/ui/sidebar";
import { Toaster } from "@/modules/shared/ui/sonner";
import { StockRepositoryProvider } from "@/modules/stocks/presentation/state/StockRepositoryProvider";

interface ProviderProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProviderProps) => {
  const queryClient = new QueryClient();

  return (
    <>
      <StockRepositoryProvider>
        <SidebarProvider>
          <NextThemesProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
          </NextThemesProvider>
        </SidebarProvider>
      </StockRepositoryProvider>
    </>
  );
};
