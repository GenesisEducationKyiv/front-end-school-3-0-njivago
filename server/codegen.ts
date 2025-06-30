import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/graphql/schema/types/**/*.gql",
  documents: ["src/graphql/**/*.gql"],
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript"],
      config: {
        scalars: {
          Upload: "File",
          ID: "string",
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
