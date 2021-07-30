const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;
if (!GRAPHQL_URL) {
  throw new Error(
    "ERROR: App couldn't start because NEXT_PUBLIC_GRAPHQL_URL isn't defined"
  );
}
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;
if (!HASURA_ADMIN_SECRET) {
  throw new Error(
    "ERROR: App couldn't start because HASURA_ADMIN_SECRET isn't defined"
  );
}

export const fetcher = (query: string, variables: { [key: string]: any }) =>
  fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
