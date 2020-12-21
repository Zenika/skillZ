import {
  StoredAgency,
  StoredSkill,
  StoredTopic,
  StoredUser,
  User
} from "../types";
import { API_URL } from "../config";
import { fetchAPI } from "./api";
import { QUERIES } from "./queries";
import { MUTATIONS } from "./mutations";

export const fetchAgencies = async (token: string): Promise<StoredAgency[]> =>
  (
    await fetchAPI(
      fetch,
      API_URL,
      {
        query: QUERIES.getAgencies
      },
      {
        authorization: `Bearer ${token}`
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
        variables: { email }
      },
      {
        authorization: `Bearer ${token}`
      }
    )
  ).data.User;

export const fetchSearchTopics = async (
  token: string,
  searchInput: string
): Promise<StoredTopic[]> =>
  (
    await fetchAPI(
      fetch,
      API_URL,
      {
        query: QUERIES.searchTopics,
        variables: { input: `%${searchInput}%` }
      },

      {
        authorization: `Bearer ${token}`
      }
    )
  ).data.Topic;

export const fetchSearchSkills = async (
  token: string,
  searchInput: string
): Promise<StoredSkill[]> =>
  (
    await fetchAPI(
      fetch,
      API_URL,
      {
        query: QUERIES.searchSkills,
        variables: { input: `%${searchInput}%` }
      },

      {
        authorization: `Bearer ${token}`
      }
    )
  ).data.Skill;

export const fetchCreateUser = async (
  token: string,
  email: string,
  agency: string
): Promise<void> => {
  const result = (
    await fetchAPI(
      fetch,
      API_URL,
      {
        query: MUTATIONS.createUser,
        variables: { email, agency }
      },

      {
        authorization: `Bearer ${token}`
      }
    )
  ).data.insert_User;
  if (result.affected_rows <= 0) {
    return Promise.reject("No row inserted");
  }
  return Promise.resolve();
};
