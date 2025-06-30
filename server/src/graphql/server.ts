import { ApolloServer } from "@apollo/server";
import { fastifyApolloDrainPlugin } from "@as-integrations/fastify";
import type { FastifyInstance } from "fastify";
import { typeDefs } from "./types";
import { resolvers } from "./resolvers";

export async function createGraphQLServer(fastify: FastifyInstance) {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [fastifyApolloDrainPlugin(fastify)],
  });

  return apollo;
}
