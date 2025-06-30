import { GraphQLUpload } from "graphql-upload-ts";
import { genresQueryResolvers } from "./genres";
import { trackQueryResolvers, trackMutationResolvers } from "./track";
import { activeTrackQueryResolvers } from "./activeTrack";

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...genresQueryResolvers,
    ...trackQueryResolvers,
    ...activeTrackQueryResolvers,
  },
  Mutation: {
    ...trackMutationResolvers,
  },
};
