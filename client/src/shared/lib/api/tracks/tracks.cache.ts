import type { Cache, CacheExchangeOpts } from "@urql/exchange-graphcache";

const invalidateTracks = (cache: Cache) => {
  cache
    .inspectFields("Query")
    .filter((field) => field.fieldName === "tracks")
    .forEach((field) => {
      cache.invalidate("Query", field.fieldName, field.arguments);
    });
};

export const tracksCacheExchange: CacheExchangeOpts["updates"] = {
  Mutation: {
    deleteTrack: (_result, _args, cache, _info) => {
      invalidateTracks(cache);
    },
    deleteTracks: (_result, _args, cache, _info) => {
      invalidateTracks(cache);
    },
  },
};
