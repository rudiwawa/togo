import { ApolloClient, InMemoryCache } from "@apollo/client";
import { persistCache } from "apollo3-cache-persist";

const cache = new InMemoryCache();

if (typeof window !== "undefined") {
  persistCache({
    cache,
    storage: window.localStorage as any,
  });
}

export const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  uri: "https://wpe-hiring.tokopedia.net/graphql",
  cache: cache,
});
