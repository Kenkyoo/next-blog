import { Container } from "@chakra-ui/react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container textStyle="body" fluid>
      {children}
    </Container>
  );
};

export default Wrapper;
