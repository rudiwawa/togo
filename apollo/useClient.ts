import { useMemo } from "react";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import merge from "deepmerge";
import { NormalizedCacheObject } from "@apollo/client";
import { persistCache, PersistentStorage } from "apollo3-cache-persist";

const cache = new InMemoryCache();

if (typeof window !== "undefined") {
  if (typeof window !== "undefined") {
    persistCache({
      cache,
      storage:
        window.localStorage as any
    });
  }
}

export const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  uri: "https://wpe-hiring.tokopedia.net/graphql",
  cache: cache,
});
