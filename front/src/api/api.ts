type JSONObject = { [key: string]: string | number | boolean | JSONObject };
type Fetcher = (
  input: RequestInfo,
  init?: RequestInit | undefined
) => Promise<Response>;

export const fetchAPI = async (
  fetcher: Fetcher,
  url: string,
  body: JSONObject,
  headers?: JSONObject
) => {
  const response = await fetcher(url, {
    body: JSON.stringify(body),
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
  });
  if (!response.ok) {
    throw response;
  }
  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors);
  }
  return result;
};
