import React, { ReactNode } from "react";
import Header from "./Header";
import Wrapper from "../ui/container";
import Footer from "./Footer";
import { Container } from "@chakra-ui/react";
import Bar from "./Bar";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <>
    <Bar />
    <Container
      divideY="1px"
      divideColor={{ base: "gray.950", _dark: "gray.50" }}
    >
      <Header />
      <Wrapper>{props.children}</Wrapper>
      <Footer />
    </Container>
  </>
);

export default Layout;
