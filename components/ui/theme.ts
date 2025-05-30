// theme.ts
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { textStyles } from "./textStyles"; // Asegúrate de que esta ruta sea correcta

const config = defineConfig({
  theme: {
    // Integra textStyles aquí, si no lo has hecho ya
    textStyles, // <-- Añadir esto si textStyles es parte de tu tema base
    breakpoints: {
      sm: "320px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    tokens: {
      colors: {
        red: { value: "#EE0F0F" },
        // Puedes definir más colores aquí si los necesitas
        // Por ejemplo, para un "colorPalette" personalizado
        // myCustomPalette: {
        //   '50': '#E6FFFA',
        //   '100': '#B2F5EA',
        //   '200': '#81E6D9',
        //   '300': '#5DE6D9',
        //   '400': '#38B2AC',
        //   '500': '#319795',
        //   '600': '#2C7A7B',
        //   '700': '#285E61',
        //   '800': '#234E52',
        //   '900': '#1D4044',
        // },
      },
    },
    semanticTokens: {
      colors: {
        // Estos son tokens que se resuelven a otros tokens
        danger: { value: "{colors.red}" },
        // Puedes definir el color del spinner aquí si quieres que cambie con el modo
        // spinnerColor: {
        //   default: 'blue.500', // Light mode
        //   _dark: 'blue.200',   // Dark mode
        // },
      },
    },
    keyframes: {
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);

export default system; // Exporta directamente el sistema
