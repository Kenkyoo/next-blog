// Loader.tsx
import { Spinner, Text, VStack, Flex } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex
      minH="100vh"
      minW="100vw"
      align="center"
      justify="center"
      // Si quieres un fondo que contraste con el spinner
      // bg="gray.50" // Color de fondo para light mode
      // _dark={{ bg: "gray.900" }} // Color de fondo para dark mode
    >
      <VStack>
        {" "}
        {/* Añadido spacing para separar el spinner y el texto */}
        <Spinner
          size="xl" // Hazlo más grande para asegurarte de que se vea
          // Usa un color que contraste bien con ambos modos (light/dark)
          // Puedes usar un color de tu tema o uno por defecto de Chakra UI
          color="blue.500" // Un color estándar de Chakra UI
          // O si quieres que cambie con el modo:
          // color={useColorModeValue("blue.500", "blue.200")}
        />
        <Text
          fontSize="lg" // Ajusta el tamaño del texto si quieres
          // Usa un color que contraste bien
          color="gray.700" // Un color estándar de Chakra UI
          // O si quieres que cambie con el modo:
          // color={useColorModeValue("gray.700", "gray.200")}
        >
          Loading...
        </Text>
      </VStack>
    </Flex>
  );
};

export default Loader;
