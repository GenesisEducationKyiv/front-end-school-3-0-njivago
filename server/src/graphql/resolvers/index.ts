import { GraphQLUpload } from "graphql-upload-ts";
import { genresQueryResolvers } from "./genres";
import { trackQueryResolvers, trackMutationResolvers } from "./track";

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...genresQueryResolvers,
    ...trackQueryResolvers,
  },
  Mutation: {
    ...trackMutationResolvers,
  },
};
