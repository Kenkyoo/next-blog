import { Stack } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container px="">
      <Stack>{children}</Stack>
    </Container>
  );
};

export default Main;
