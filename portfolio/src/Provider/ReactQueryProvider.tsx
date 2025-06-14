import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import React from 'react';

interface Props {
  children?: React.ReactNode;
}

function ReactQueryProvider({ children }: Props) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({
      onError: (err) => {
        console.log('QueryCache', err);
      },
    }),
    mutationCache: new MutationCache({
      onError: (err) => {
        console.log('mutationCache', err);
      },
    }),
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default ReactQueryProvider;
