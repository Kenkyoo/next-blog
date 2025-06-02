"use client";

import Footer from "../components/Footer";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <>
      <button onClick={() => signIn("google")}>Google</button>
      <button onClick={() => signIn("github")}>Github</button>
      <Footer />
    </>
  );
};

export default Login;
