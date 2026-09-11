import fetch from 'node-fetch'
import fs from 'fs'

/*
 * ENVIRONMENT CHECK
 */
if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error(
        "ERROR: App couldn't start because NEXT_PUBLIC_BASE_URL isn't defined"
    )
}

if (!process.env.NEXT_API_BEARER_TOKEN) {
    throw new Error(
        "ERROR: App couldn't start because NEXT_API_BEARER_TOKEN isn't defined"
    )
}

/*
 * GET ALL ROLES FROM API
 */
const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/roles`, {
    method: 'GET',
    headers: {
        Authorization: process.env.NEXT_API_BEARER_TOKEN,
    },
})

const { roles: rolesData } = await response.json()

/*
 * FORMAT DATA
 * One INSERT per role (matches the repository seed format), deterministic
 * (sorted by name), with single quotes escaped for SQL.
 */
const roles = rolesData
    .map((role) => role.name)
    .sort((a, b) => a.localeCompare(b))

const lines = roles.map(
    (name) =>
        `INSERT INTO "public"."Role" ("name") VALUES ('${name.replace(
            /'/g,
            "''"
        )}') ON CONFLICT ("name") DO NOTHING;`
)

/*
 * WRITE DATA TO FILE
 */
let writer = fs.createWriteStream('../hasura/seeds/10-role.sql', {
    flags: 'w',
})

writer.write(lines.join('\n') + '\n')

writer.close()

console.log(`Referential Roles successfully updated (${roles.length} roles).`)
