"use client";

import { QueryClient, QueryClientProvider } from "react-query";

import { SessionProvider } from "next-auth/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

import { useReducer, type ReactNode } from "react";
import { AppContext, initialState, reducer } from "@/store";

export function NextAuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export function ChakraCacheProvider({ children }: { children: ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </CacheProvider>
  );
}

export const AppProvider = ({
  children
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a client
const queryClient = new QueryClient();

export const TanstackQueryClientProvider = ({
  children
}: {
  children: ReactNode | ReactNode[];
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
