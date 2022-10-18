import axios from "axios";
import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

async function deleteSkillzUser(emails: string[]) {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL;
  const headers = {
    "content-type": "application/json",
    "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
  };

  const graphqlMutation = {
    operationName: "softDeleteUser",
    query: `mutation softDeleteUser($deleted_at: timestamptz = "", $emails: [String!] = []) {
              update_User(where: {email: {_in: $emails}}, _set: {active: false, deleted_at: $deleted_at}) {
                affected_rows
              }
            }
            `,
    variables: {
      emails,
      deleted_at: new Date().toISOString(),
    },
  };

  const response = await axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: graphqlMutation,
  });

  return response.data.data.update_User.affected_rows;
}

async function getSkillzUsers() {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL;
  const headers = {
    "content-type": "application/json",
    "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
  };

  const graphqlQuery = {
    operationName: "getAllUsers",
    query: `query getAllUsers {
                User (where: {active: {_eq: true}}) {
                  email
                  name
                  active
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

  const { User } = response.data.data;

  return User.map((user) => user.email);
}

async function getCurrentZenikaUsers() {
  // AUTHENTICATION
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_AUTH_EMAIL,
      client_id: process.env.GOOGLE_AUTH_CLIENT_ID,
      private_key: process.env.GOOGLE_AUTH_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

  const sheets = google.sheets({
    auth: auth,
    version: "v4",
  });

  // RETRIEVE VALUES
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: "102nANbLZfKs3wLWb_llCcd99JrkYYkA_zQCWLI-H8J8",
    range: "detail!B5:G",
  });

  if (!response.data.values) {
    return null;
  }

  return response.data.values.map((consultant) => consultant[5]);
}

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
    !process.env.NEXT_API_BEARER_TOKEN ||
    !process.env.GOOGLE_AUTH_EMAIL ||
    !process.env.GOOGLE_AUTH_CLIENT_ID ||
    !process.env.GOOGLE_AUTH_PRIVATE_KEY
  ) {
    return res.status(500).json({ message: "Missing environment variables" });
  }

  if (req.headers.authorization !== process.env.NEXT_API_BEARER_TOKEN) {
    return res.status(401).json({ message: "Missing bearer token." });
  }

  try {
    const zenikaUsers = await getCurrentZenikaUsers();

    if (!zenikaUsers)
      return res.status(404).json({ message: "No current Zenika Users" });

    const skillzUsers = await getSkillzUsers();

    if (!skillzUsers)
      return res.status(404).json({ message: "No current Skillz Users" });

    const expiredUsers = skillzUsers.filter((user) => {
      return !zenikaUsers.includes(user);
    });

    const affectedRows = await deleteSkillzUser(expiredUsers);

    res.status(200).json({ affectedRows });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
