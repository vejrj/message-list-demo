
const GENERATED_FILE_NOTES = [
  {
    add: {
      placement: "prepend",
      content: "// @ts-nocheck",
    },
  },
  {
    add: {
      placement: "prepend",
      content: "/* eslint-disable */",
    },
  },
  {
    add: {
      placement: "prepend",
      content:
        "// This file was automatically generated (by tools/build/cli/generate-graphql-interfaces.js) and should not be edited or checked in to Git.",
    },
  },
];
const BASE_TYPES_PACKAGE_NAME = "@msteams/data-types-common";

const config = {
  overwrite: true,
  schema: "./src/schema/typeDefs.graphql",
  documents: "src/components/**/*.graphql",
  generates: {
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: ".graphql.interface.ts",
        baseTypesPath: `~${BASE_TYPES_PACKAGE_NAME}`,
      },
      plugins: [
        ...GENERATED_FILE_NOTES,
        "@graphitation/graphql-codegen-typescript-operations",
        "@graphitation/graphql-codegen-supermassive-typed-document-node-plugin",
      ],
      config: {
        baseTypesPath: BASE_TYPES_PACKAGE_NAME,
        immutableTypes: true,
        preResolveTypes: true,
        namingConvention: "keep",
        useTypeImports: true,
        dedupeOperationSuffix: true,
        inlineCommonTypes: true,
        avoidOptionals: {
          field: true,
        },
        nonOptionalTypename: true,
        skipTypeNameForRoot: true,
        isTypeOnly: true,
      },
    },
  },
};

export default config;
