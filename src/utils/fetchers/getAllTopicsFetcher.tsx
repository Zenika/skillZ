import { of } from "await-of";
import { fetcher } from "../fetcher";

export const GetAllTopicsQuery = `
query getAllTopics {
  Topic(order_by: {name: asc}) {
    id
    name
    type
  }
}`;

export const GetAllTopicsFetcher = async () => {
  const [response, err] = await of(fetcher(GetAllTopicsQuery, {}));

  if (err) {
    console.error(err);
    return null;
  }

  return await response.json();
};
