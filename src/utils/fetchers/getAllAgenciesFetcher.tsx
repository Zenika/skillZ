import { of } from "await-of";
import { fetcher } from "../fetcher";

export const GetAllAgenciesQuery = `
query getAllAgencies {
  Agency(order_by: {name: asc}) {
    name
  }
}`;

export const GetAllAgenciesFetcher = async () => {
  const [response, err] = await of(fetcher(GetAllAgenciesQuery, {}));

  if (err) {
    console.error(err);
    return null;
  }

  return await response.json();
};
