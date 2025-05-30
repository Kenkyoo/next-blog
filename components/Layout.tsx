import React, { ReactNode } from "react";
import Header from "./Header";
import Wrapper from "../ui/container";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <Wrapper>{props.children}</Wrapper>
    <Footer />
  </div>
);

export default Layout;
