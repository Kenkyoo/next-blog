"use client";

import { ColorModeProvider } from "./color-mode";
import type { ThemeProviderProps } from "next-themes";
import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import { textStyles } from "./textStyles";

const config = defineConfig({
  theme: {
    textStyles,
    tokens: {
      colors: {},
    },
  },
});

const system = createSystem(defaultConfig, config);

export function Provider(props: ThemeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
