import { Stack } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container maxW="md" px="2">
      <Stack>{children}</Stack>
    </Container>
  );
};

export default Main;
