import type { GraphQLError } from "graphql";

export type ApiError = GraphQLError | Error | { graphQLErrors: GraphQLError[] };
