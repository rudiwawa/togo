import { client } from "@/apollo/useClient";
import { useApollo } from "@/apollo/useClient2";
import { globalStyles } from "@/components/styles";
import { theme } from "@/styles/theme";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@emotion/react";
import { GetStaticProps } from "next";
import { AppProps } from "next/app";
export default function App({ Component, pageProps }: AppProps) {
  const { client, clientReady } = useApollo();
  if (!clientReady) {
    return <div>Loading...</div>;
  }

  return (
    <ApolloProvider client={client}>
      {globalStyles}
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
