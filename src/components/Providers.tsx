"use client";

import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
 return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
