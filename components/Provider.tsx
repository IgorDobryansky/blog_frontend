"use client";

import { SessionProvider } from "next-auth/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";


import type { ReactNode } from "react";

export default function NextAuthProvider({
  children
}: {
  children: ReactNode;
}) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <SessionProvider>
          {children}
        </SessionProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
