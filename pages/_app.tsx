import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Provider } from "../components/ui/provider";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
