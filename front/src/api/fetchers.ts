import { StoredUser } from "../types";
import { API_URL } from "../config";
import { fetchAPI } from "./api";
import { QUERIES } from "./queries";

export const fetchAgencies = async (token: string): Promise<string[]> =>
  (
    await fetchAPI(
      fetch,
      API_URL,
      {
        query: QUERIES.getAgencies,
      },
      {
        authorization: `Bearer ${token}`,
      }
    )
  ).data.Agency;

export const fetchUser = async (
  token: string,
  email: string
): Promise<[StoredUser]> =>
  (
    await fetchAPI(
      fetch,
      API_URL,
      {
        query: QUERIES.getUser,
        variables: { email },
      },
      {
        authorization: `Bearer ${token}`,
      }
    )
  ).data.User;
