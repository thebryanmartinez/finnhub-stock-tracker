"use client";

import { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SidebarProvider } from "@/modules/shared/ui/sidebar";
import { Toaster } from "@/modules/shared/ui/sonner";

interface ProviderProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProviderProps) => {
  const queryClient = new QueryClient();

  return (
    <>
      <SidebarProvider>
        <Toaster />
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </SidebarProvider>
    </>
  );
};
