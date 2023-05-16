import { of } from "await-of";

const PROXYBEEZ_URL = process.env.PROXYBEEZ_URL;
if (!PROXYBEEZ_URL) {
  throw new Error(
    "ERROR: App couldn't start because PROXYBEEZ_URL isn't defined"
  );
}

const PROXYBEEZ_TOKEN = process.env.PROXYBEEZ_TOKEN;
if (!PROXYBEEZ_URL) {
  throw new Error(
    "ERROR: App couldn't start because PROXYBEEZ_TOKEN isn't defined"
  );
}

export const GetAllUsersFromAlibeez = async () => {
  const [response, err] = await of(
    fetch(PROXYBEEZ_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PROXYBEEZ_TOKEN}`,
      },
    })
  );

  if (err) {
    console.error(err);
    return null;
  }

  return await response.json();
};
