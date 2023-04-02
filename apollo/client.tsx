import { useMemo } from "react";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import merge from "deepmerge";
import { NormalizedCacheObject } from "@apollo/client";

export const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  uri: "https://wpe-hiring.tokopedia.net/graphql",
  cache: new InMemoryCache(),
});
