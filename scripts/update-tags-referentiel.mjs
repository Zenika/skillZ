import fetch from 'node-fetch';
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
 * GET ALL TAGS FROM API
 */
const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tags`,
    {
        method: "GET",
        headers: {
            Authorization: process.env.NEXT_API_BEARER_TOKEN,
        },
    }
);

const {tags: tagsData} = await response.json()

/*
 * FORMAT DATA
 */
const tags = tagsData.map((tag) => `('${tag.name}')`)

/*
 * WRITE DATA TO FILE
 */
let writer = fs.createWriteStream('../hasura/seeds/03-tags.sql', {
    flags: 'w'
});

writer.write("INSERT INTO \"public\".\"Tag\" (\"name\") VALUES\n")

writer.write(tags.join(",\n"))

writer.write("\n ON CONFLICT (\"name\") DO NOTHING;")

writer.close()

console.log(`Referential Tags successfully updated (${tags.length} tags).`)
