import fetch from 'node-fetch';
import fs from 'fs';

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
 * GET ALL TOPICS FROM API
 */
const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topics`, {
    method: 'GET',
    headers: {
        Authorization: process.env.NEXT_API_BEARER_TOKEN,
    },
});

const { topics: topicsData } = await response.json();

/*
 * FORMAT DATA
 */
const topics = topicsData.map(
    (topic) =>
        `('${topic.type.replaceAll("'", "''")}', '${topic.name.replaceAll(
            "'",
            "''"
        )}')`
);

/*
 * WRITE DATA TO FILE
 */
let writer = fs.createWriteStream('../hasura/seeds/04-topics.sql', {
    flags: 'w',
});

writer.write('INSERT INTO "public"."Topic" ("type", "name") VALUES\n');

writer.write(topics.join(',\n'));

writer.write('\n ON CONFLICT ("name") DO UPDATE SET "type" = EXCLUDED."type";');

writer.write('\n\n');

writer.write(
    'DELETE FROM "public"."UserTopic" WHERE "topicId" IN (SELECT "id" FROM "public"."Topic" WHERE "type" IS NULL);\n'
);
writer.write('DELETE FROM "public"."Topic" WHERE "type" IS NULL;\n');

writer.close();

console.log(
    `Referential Topics successfully updated (${topics.length} topics).`
);
