import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./types";
import { subscriptionResolvers as resolvers } from "./resolvers";

export const WSSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
