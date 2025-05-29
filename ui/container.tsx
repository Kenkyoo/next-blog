import { Container } from "@chakra-ui/react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <Container fluid>{children}</Container>;
};

export default Wrapper;
