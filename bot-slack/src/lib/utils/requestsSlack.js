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

async function request(url, variables) {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
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
