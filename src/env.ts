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

if (!process.env.NEXT_PUBLIC_AUTH0_CONNECTION) {
  throw new Error(
    "ERROR: App couldn't start because NEXT_PUBLIC_AUTH0_CONNECTION isn't defined"
  );
}

if (!process.env.NEXT_PUBLIC_ADMINS) {
  throw new Error(
    "ERROR: App couldn't start because NEXT_PUBLIC_ADMINS isn't defined"
  );
}
if (!process.env.NEXT_PUBLIC_AUTH0_DOMAIN) {
  throw new Error(
    "ERROR: App couldn't start because NEXT_PUBLIC_AUTH0_DOMAIN isn't defined"
  );
}

if (!process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID) {
  throw new Error(
    "ERROR: App couldn't start because NEXT_PUBLIC_AUTH0_CLIENT_ID isn't defined"
  );
}

if (!process.env.NEXT_PUBLIC_AUTH0_AUDIENCE) {
  throw new Error(
    "ERROR: App couldn't start because NEXT_PUBLIC_AUTH0_AUDIENCE isn't defined"
  );
}

if (!process.env.NEXT_PUBLIC_AUTH0_CALLBACK) {
  throw new Error(
    "ERROR: App couldn't start because NEXT_PUBLIC_AUTH0_CALLBACK isn't defined"
  );
}

export const config = {
  nextPublicBaseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  nextPublicGraphqlUrl: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  nextPublicAuth0Connection: process.env.NEXT_PUBLIC_AUTH0_CONNECTION,
  nextPublicAdmins: process.env.NEXT_PUBLIC_ADMINS,
  nextPublicAuth0Domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
  nextPublicAuth0ClientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  nextPublicAuth0Audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
  nextPublicAuth0Callback: process.env.NEXT_PUBLIC_AUTH0_CALLBACK,
};
