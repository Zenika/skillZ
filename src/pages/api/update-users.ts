import { NextApiRequest, NextApiResponse } from "next";
import { GetAllUsersFromAlibeez } from "../../utils/fetchers/alibeez/getAllUserFromAlibeez";
import { GetAllUsersFetcher } from "../../utils/fetchers/getAllUsers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method != "POST") {
    return res.status(404).json({ message: "Method not allowed." });
  }

  if (
    !process.env.NEXT_PUBLIC_GRAPHQL_URL ||
    !process.env.HASURA_ADMIN_SECRET ||
    !process.env.NEXT_API_BEARER_TOKEN
  ) {
    return res.status(500).json({ message: "Missing environment variables" });
  }

  if (req.headers.authorization !== process.env.NEXT_API_BEARER_TOKEN) {
    return res.status(401).json({ message: "Wrong bearer token." });
  }

  const result = await GetAllUsersFromAlibeez();

  if (!result) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  const usersFromAlibeez = result.map((u) => u.username);

  const usersFromHasura = await GetAllUsersFetcher();

  res.status(200).json(usersFromHasura);
}
