"use client";

import theme from "@/app/theme/theme";
import { ChakraProvider as ChakraUIProvider } from "@chakra-ui/react";

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return <ChakraUIProvider theme={theme}>{children}</ChakraUIProvider>;
}
