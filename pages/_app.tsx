import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Provider } from "../components/ui/provider";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
