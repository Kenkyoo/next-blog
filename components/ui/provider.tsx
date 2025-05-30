// provider.tsx
"use client";

import { ColorModeProvider } from "./color-mode";
import type { ThemeProviderProps } from "next-themes";
import { ChakraProvider } from "@chakra-ui/react"; // Solo importamos ChakraProvider, no createSystem, etc.
import system from "./theme"; // Importamos el sistema de tema que creamos en theme.ts

export function Provider(props: ThemeProviderProps) {
  return (
    <ChakraProvider value={system}>
      {" "}
      {/* Usamos el sistema importado */}
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
