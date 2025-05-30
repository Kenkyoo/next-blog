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
    <Separator />
    <Wrapper>{props.children}</Wrapper>
    <Separator />
    <Footer />
  </div>
);

export default Layout;
