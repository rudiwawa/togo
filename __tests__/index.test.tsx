import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";
import { client, useApollo } from "@/apollo/useClient2";
import { globalStyles } from "@/components/styles";
import { theme } from "@/styles/theme";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@emotion/react";
import { GetStaticProps } from "next";
import { AppProps } from "next/app";

describe("Home", () => {
  it("renders a heading", () => {
    render(
      <ApolloProvider client={client}>
        {globalStyles}
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>
      </ApolloProvider>
    );

    const heading = screen.getByRole("heading", {
      name: /Contacts\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
