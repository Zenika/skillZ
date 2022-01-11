require("dotenv").config({ path: ".env.local" });

module.exports = {
  schema: [
    {
      [process.env.NEXT_PUBLIC_GRAPHQL_URL]: {
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
        },
      },
    },
  ],
  documents: ["./src/**/*.tsx", "./src/**/*.ts"],
  overwrite: true,
  generates: {
    "./src/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};
