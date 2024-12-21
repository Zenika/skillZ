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
 * GET ALL CERTIFICATIONS FROM API
 */
const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/certifications`,
    {
        method: 'GET',
        headers: {
            Authorization: process.env.NEXT_API_BEARER_TOKEN,
        },
    }
)

const { certifications: certificationsData } = await response.json()

/*
 * FORMAT DATA
 */
const certifications = certificationsData.map(
    (cert) =>
        `('${cert.name.replaceAll("'", "''")}', '${cert.certBody.replaceAll(
            "'",
            "''"
        )}', ${cert.verified})`
)

/*
 * WRITE DATA TO FILE
 */
let writer = fs.createWriteStream('../hasura/seeds/08-certifications.sql', {
    flags: 'w',
})

writer.write(
    'INSERT INTO "Certification" ("name", "certBody", "verified") VALUES\n'
)

writer.write(certifications.join(',\n'))

writer.write('\n ON CONFLICT DO NOTHING;')

writer.close()

console.log(
    `Referential Certifications successfully updated (${certifications.length} certifications).`
)
