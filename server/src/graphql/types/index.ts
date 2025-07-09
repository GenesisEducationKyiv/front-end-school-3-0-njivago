import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const types = loadFilesSync("src/graphql/types/**/*.gql");

export const typeDefs = mergeTypeDefs(types);
