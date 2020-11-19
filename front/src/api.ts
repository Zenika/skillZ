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
    throw new Error(
      `Error from request => status: ${
        response.status
      }, error: ${await response.json()}`
    );
  }
  return await response.json();
};
