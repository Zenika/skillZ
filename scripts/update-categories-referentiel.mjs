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
 * GET ALL CATEGORIES FROM API
 */
const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    {
        method: 'GET',
        headers: {
            Authorization: process.env.NEXT_API_BEARER_TOKEN,
        },
    }
);

const { categories: categoriesData } = await response.json();

/*
 * FORMAT DATA
 */
const categories = categoriesData.map(
    (cat) =>
        `('${cat.id}', '${cat.label}', '${cat.x}', '${cat.y}', '${cat.color}', ${cat.index})`
);

/*
 * WRITE DATA TO FILE
 */
let writer = fs.createWriteStream('../hasura/seeds/02-categories.sql', {
    flags: 'w',
});

writer.write('INSERT INTO "public"."Category" VALUES\n');

writer.write(categories.join(',\n'));

writer.write(
    '\n ON CONFLICT ("id") DO UPDATE SET "label" = EXCLUDED."label", "color" = EXCLUDED."color";'
);

writer.close();

console.log(
    `Referential Categories successfully updated (${categories.length} categories).`
);
