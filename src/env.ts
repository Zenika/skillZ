if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error(
    "ERROR: App couldn't start because NEXT_PUBLIC_BASE_URL isn't defined"
  );
}

if (!process.env.NEXT_PUBLIC_GRAPHQL_URL) {
  throw new Error(
    "ERROR: App couldn't start because NEXT_PUBLIC_GRAPHQL_URL isn't defined"
  );
}

export const config = {
  nextPublicBaseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  nextPublicGraphqlUrl: process.env.NEXT_PUBLIC_GRAPHQL_URL,
};
