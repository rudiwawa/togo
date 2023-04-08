import { useEffect, useMemo, useState } from "react";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import merge from "deepmerge";
import { persistCache, PersistentStorage } from "apollo3-cache-persist";
import fetch from 'cross-fetch';

const cache = new InMemoryCache();

if (typeof window !== "undefined") {
  persistCache({
    cache,
    storage: window.localStorage as any,
  });
}

export const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: new HttpLink({
    uri: "https://wpe-hiring.tokopedia.net/graphql",
    fetch,
  }),
  cache: cache,
});

export function useApollo() {
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  return {
    client,
    clientReady,
  };
}
