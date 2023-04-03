import { client } from "@/apollo/useClient";
import { globalStyles } from "@/components/styles";
import { theme } from "@/styles/theme";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@emotion/react";
import { AppProps } from "next/app";
export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <ApolloProvider client={client}>
      {globalStyles}
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
//export const client = await initializeApollo(); get static props
