import { of } from "await-of";
import { fetcher } from "../fetcher";

export const GetAllUsersQuery = `
query getAllUsers($whereConditions: User_bool_exp!) {
  User(where: $whereConditions) {
    role
    name
    email
    active
  }
}`;

export const GetAllUsersFetcher = async (roles: string[]) => {
  const whereConditions = roles.length ? { role: { _in: roles } } : {};

  const [response, err] = await of(
    fetcher(GetAllUsersQuery, { whereConditions })
  );

  if (err) {
    console.error(err);
    return null;
  }

  return await response.json();
};
