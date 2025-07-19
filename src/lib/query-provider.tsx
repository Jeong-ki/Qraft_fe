'use client';
import { Spinner } from '@/components/ui';
import useCommonStore from '@/store/common';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const { isLoading } = useCommonStore();

  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
      {isLoading && <Spinner isGlobal />}
      {children}
    </QueryClientProvider>
  );
}
