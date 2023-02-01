import { of } from "await-of";
import { fetcher } from "../fetcher";

export const GetAllCertificationsQuery = `
query getAllCertifications {
  Certification(order_by: {name: asc}) {
    certBody
    id
    name
    verified
  }
}`;

export const GetAllCertificationsFetcher = async () => {
  const [response, err] = await of(fetcher(GetAllCertificationsQuery, {}));

  if (err) {
    console.error(err);
    return null;
  }

  return await response.json();
};
