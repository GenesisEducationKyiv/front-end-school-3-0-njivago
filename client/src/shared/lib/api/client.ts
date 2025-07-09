import {
  createClient,
  debugExchange,
  fetchExchange,
  subscriptionExchange,
} from "@urql/core";
import { createClient as createWSClient } from "graphql-ws";
import { cacheExchange } from "@urql/exchange-graphcache";
import { getErrorMessage } from "shared/lib/utils";
import { tracksCacheExchange } from "./tracks/tracks.cache";
import type { ApiError } from "./types/error";

const wsClient = createWSClient({
  url: import.meta.env.VITE_WS_URL,
});

export const graphqlClient = createClient({
  url: import.meta.env.VITE_API_URL,
  exchanges: [
    debugExchange,
    cacheExchange({
      updates: tracksCacheExchange,
    }),
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(request) {
        const input = { ...request, query: request.query || "" };
        return {
          subscribe(sink) {
            const unsubscribe = wsClient.subscribe(input, sink);
            return { unsubscribe };
          },
        };
      },
    }),
  ],
});

export const handleGraphQLError = (error: ApiError) => {
  if ("graphQLErrors" in error && error.graphQLErrors?.length > 0) {
    return error.graphQLErrors[0].message;
  }

  if ("networkError" in error && error.networkError) {
    return getErrorMessage(error.networkError);
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unknown error occurred";
};
