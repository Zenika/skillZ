const fetch = require("node-fetch");
class HTTPResponseError extends Error {
  constructor(response, ...args) {
    super(
      `HTTP Error Response: ${response.status} ${response.statusText}`,
      ...args
    );
    this.response = response;
  }
}

const checkStatus = (response) => {
  if (response.ok) return response;
  else throw new HTTPResponseError(response);
};

async function request(query, variables) {
  let hasura_admin_key = "";
  let url = "";

  if (process.env.ENV) {
    hasura_admin_key = process.env.HASURA_ADMIN_SECRET;
    url = process.env.HASURA_GRAPHQL_URL;
  } else {
    console.log("Need an ENV variable in .env");
  }
  const options = {
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": hasura_admin_key,
    },
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  };
  const response = await fetch(url, options);
  const myJson = await response.json();
  try {
    checkStatus(response);
  } catch (e) {
    console.error(e); //voir avec les queries nouvelles erreurs
    const errorBody = await error.response.text();
    console.error(`Error body: ${errorBody}`);
  }
  return myJson;
}

module.exports.request = request;
