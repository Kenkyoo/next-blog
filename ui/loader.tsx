import { Spinner, Text, VStack, Flex } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex
      minH="100vh" // Ocupa el 100% del alto del viewport
      minW="100vw" // Ocupa el 100% del ancho del viewport
      align="center" // Centra verticalmente los elementos hijos
      justify="center" // Centra horizontalmente los elementos hijos
      // Puedes ajustar el color de fondo si lo deseas
      // bg="gray.100"
    >
      <VStack colorPalette="teal">
        <Spinner color="colorPalette.600" />
        <Text color="colorPalette.600">Loading...</Text>
      </VStack>
    </Flex>
  );
};

export default Loader;
