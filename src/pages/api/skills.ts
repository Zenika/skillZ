import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

async function getAllSkills() {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL;
  const headers = {
    "content-type": "application/json",
    "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
  };

  const graphqlQuery = {
    operationName: "getAllSkills",
    query: `query getAllSkills {
                Skill(where: {verified: {_eq: true}}) {
                  id
                  categoryId
                  description
                  name
                }
              }
            `,
    variables: {},
  };

  const response = await axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: graphqlQuery,
  });

  if (!response.data) {
    return null;
  }

  const { Skill } = response.data.data;

  return Skill;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method != "GET") {
    return res.status(404).json({ message: "Method not allowed." });
  }

  if (
    !process.env.NEXT_PUBLIC_GRAPHQL_URL ||
    !process.env.HASURA_ADMIN_SECRET ||
    !process.env.NEXT_API_BEARER_TOKEN
  ) {
    return res.status(500).json({ message: "Missing environment variables" });
  }

  console.log(req.headers);

  if (req.headers.authorization !== process.env.NEXT_API_BEARER_TOKEN) {
    return res.status(401).json({ message: "Wrong bearer token." });
  }

  try {
    const skills = await getAllSkills();

    res.status(200).json({ skills });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
