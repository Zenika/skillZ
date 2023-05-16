import { of } from "await-of";
import { fetcher } from "../fetcher";

export const GetAllUsersQuery = `
query getAllUsers() {
  User() {
    name
    email
    active
  }
}`;

export const GetAllUsersFetcher = async () => {
  const [response, err] = await of(fetcher(GetAllUsersQuery, {}));

  if (err) {
    console.error(err);
    return null;
  }

  return await response.json();
};
