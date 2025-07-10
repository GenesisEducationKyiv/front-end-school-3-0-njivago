import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import path from "path";

const types = loadFilesSync(path.join(__dirname, "**/*.gql"));

export const typeDefs = mergeTypeDefs(types);
