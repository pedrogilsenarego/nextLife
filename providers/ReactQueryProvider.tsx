"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (count, { message: status }) => {
        if (status !== "404" && status !== "401") return false;
        else return true;
      },
      staleTime: 6000000,
      //refetchInterval: 5 * 1000,
    },
  },
});

function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = useState(() => queryClient);

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
