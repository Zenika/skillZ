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
 * GET ALL SKILLS FROM API
 */
const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/skills`, {
    method: 'GET',
    headers: {
        Authorization: process.env.NEXT_API_BEARER_TOKEN,
    },
})

const { skills: skillsData } = await response.json()

/*
 * FORMAT DATA
 */
const skills = skillsData.map(
    (skill) =>
        `('${skill.name}', '${skill.categoryId}', ${skill.verified}, '${
            skill.description ? skill.description.replaceAll("'", "''") : ''
        }')`
)

/*
 * WRITE DATA TO FILE
 */
let writer = fs.createWriteStream('../hasura/seeds/05-skills.sql', {
    flags: 'w',
})

writer.write(
    'INSERT INTO "public"."Skill" ("name", "categoryId", "verified", "description") VALUES \n'
)

writer.write(skills.join(',\n'))

writer.write(
    '\n ON CONFLICT ("name") DO UPDATE SET "categoryId" = EXCLUDED."categoryId", "verified" = true, "description" = EXCLUDED."description";'
)

writer.close()

console.log(
    `Referential Skills successfully updated (${skillsData.length} skills).`
)
