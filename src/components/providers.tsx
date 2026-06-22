"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 30 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="bottom-right"
        richColors
        closeButton
        theme="dark"
        toastOptions={{
          style: {
            background: "hsl(240 10% 3.9%)",
            border: "1px solid hsl(240 3.7% 15.9%)",
            color: "hsl(0 0% 98%)",
          },
        }}
      />
    </QueryClientProvider>
  );
}
