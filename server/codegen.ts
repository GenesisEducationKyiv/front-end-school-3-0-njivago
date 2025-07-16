import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: ["src/graphql/types/**/*.gql", "src/graphql/ws/types/**/*.gql"],
  documents: ["src/graphql/**/*.gql"],
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript"],
      config: {
        scalars: {
          Upload: "File",
          ID: "string",
          Genre: "string",
        },
        enumsAsTypes: true,
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
