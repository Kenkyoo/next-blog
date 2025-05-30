import React, { ReactNode } from "react";
import Header from "./Header";
import Wrapper from "../ui/container";
import Footer from "./Footer";
import { Separator } from "@chakra-ui/react";
type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <Separator
      size="md"
      orientation="horizontal"
      colorPalette={{ base: "gray.950", _dark: "gray.50" }}
      variant="solid"
    />
    <Wrapper>{props.children}</Wrapper>
    <Separator
      size="md"
      orientation="horizontal"
      colorPalette="gray"
      variant="solid"
    />
    <Footer />
  </div>
);

export default Layout;
