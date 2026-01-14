"use client";

import { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SidebarProvider, SidebarTrigger } from "@/modules/shared/ui/sidebar";

interface ProviderProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProviderProps) => {
  const queryClient = new QueryClient();

  return (
    <>
      <SidebarProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </SidebarProvider>
    </>
  );
};
