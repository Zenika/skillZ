import { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

const GRAPHQL_API_ENDPOINT = process.env.GRAPHQL_API_ENDPOINT;
if (!GRAPHQL_API_ENDPOINT) {
  throw new Error("env variable GRAPHQL_API_ENDPOINT is not set");
}
export default withApiAuthRequired(async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(403).json({
      error: {
        type: "Bad request",
        message: `Expected POST request got ${req.method}`,
      },
    });
  }
  const { accessToken } = await getAccessToken(req, res, {
    scopes: ["read:current_user", "update:current_user_metadata"],
  });
  const response = await fetch(GRAPHQL_API_ENDPOINT, {
    method: "POST",
    headers: {
      ...(req.headers as any),
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(req.body),
  });
  // TODO: it's probably worth it to unpack and handle errors to return proper http codes
  res.status(200).json(response.body);
});
