import fetch from "node-fetch";
import fs from "fs";

/*
 * ENVIRONMENT CHECK
 */
if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error(
    "ERROR: App couldn't start because NEXT_PUBLIC_BASE_URL isn't defined"
  );
}

if (!process.env.NEXT_API_BEARER_TOKEN) {
  throw new Error(
    "ERROR: App couldn't start because NEXT_API_BEARER_TOKEN isn't defined"
  );
}

/*
 * GET ALL AGENCIES FROM API
 */
const response = await fetch(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/agencies`,
  {
    method: "GET",
    headers: {
      Authorization: process.env.NEXT_API_BEARER_TOKEN,
    },
  }
);

const { agencies: agenciesData } = await response.json();

/*
 * FORMAT DATA
 */
const agencies = agenciesData.map((agency) => `('${agency.name}')`);

/*
 * WRITE DATA TO FILE
 */
let writer = fs.createWriteStream("../hasura/seeds/01-agencies.sql", {
  flags: "w",
});

writer.write('INSERT INTO "public"."Agency" ("name") VALUES\n');

writer.write(agencies.join(",\n"));

writer.write('\n ON CONFLICT ("name") DO NOTHING;');

writer.close();

console.log(
  `Referential Agencies successfully updated (${agencies.length} agencies).`
);
