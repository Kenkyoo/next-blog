import { Container } from "@chakra-ui/react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container textStyle="body" px="2">
      {children}
    </Container>
  );
};

export default Wrapper;
