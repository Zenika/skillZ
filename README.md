# SkillZ

A progressive web app to store your proficiency and desire to learn different skills.

## Requirements

- Node 16.x
- Npm 9.x
- Docker

## Quick start

### Docker

You will need Docker installed on your machine.

### Install dependencies

Install dependencies using `npm install` at the root of the project.

### Create an env file

Create an file named `.env`, then add these variables :

```
# If you're using Linux, your local (or distant) hasura endpoint url should looks like this :
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8080/v1/graphql
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_API_BEARER_TOKEN=Bearer key
NEXT_PUBLIC_ADMINS=john.doe@zenika.com;

## HASURA
SKILLZ_GRAPHQL_JWT_SECRET={"type": "RS512", "key": "{your-certificate}"}
HASURA_ACHIEVEMENTS_ENDPOINT=http://172.17.0.1:3000/api/achievement
HASURA_ADMIN_SECRET=key

## AUTH0
NEXT_PUBLIC_AUTH0_CONNECTION=google-oauth2
NEXT_PUBLIC_AUTH0_DOMAIN=
NEXT_PUBLIC_AUTH0_CLIENT_ID=
NEXT_PUBLIC_AUTH0_AUDIENCE=
NEXT_PUBLIC_AUTH0_CALLBACK=/auth

## GOOGLE
GOOGLE_AUTH_EMAIL=
GOOGLE_AUTH_CLIENT_ID=
GOOGLE_AUTH_PRIVATE_KEY=

```

If you want to be an admin, think to replace or add your email address at `NEXT_PUBLIC_ADMINS=john.doe@zenika.com;`

### Run postgres and hasura locally with docker

Start by running `docker compose up -d` to launch the postgres database and the hasura graphql-engine.

Check that engine is running by going to `http://localhost:8080` (do not modify schemas through this URL).

### Run the hasura migrations

In order to initialize / update the database run :

```
# npm run hasura migrate apply # Sets up the schema
# npm run hasura metadata apply # Sets up GraphQL
# npm run hasura seed apply # Optional : seeds/cleans up the database with referential data
```

Connect to the Hasura console by running `npm run hasura console` (it should open the console in your browser with the
correct port (to keep track of schema changes in the hasura/migrations folder)).

### Develop with hasura

For hasura to generate the migration files properly the hasura console must be run apart from the "in-app" hasura engine
and console.

```
# npm install --global hasura-cli # Installs the hasura console globally
# cd ./hasura # Go into the hasura folder to reuse the config.yaml
# hasura console # Runs the "other" hasura console on a different port
```

### Launch the app

Run the dev server using `npm run dev`.
The application should be available at the URL specified in your .env file under `NEXT_PUBLIC_BASE_URL`.

### Generate local seeds

If you want to generate random seed data, you can use the hasura console to export the Skill table to JSON
Then move it to `hasura/local_seeds/Skill.json`
You can now run `npm run seeds:generate`
And `npm run seeds:apply` to apply the random data to the database

## Tests

### E2E with Cypress

Create a file named `.env.test`, with the same content as the .env.
Replace the value of the variable `NEXT_PUBLIC_AUTH0_CONNECTION` with `Username-Password-Authentication`

Create a file named `cypress.env.json` at the root of the project with the following content :

```json
{
  "test_username": "",
  "test_password": ""
}
```

In order to run all tests :

```
# start the webapp
npm run build:e2e
npm run start:e2e
## or
NODE_ENV=test npm run dev

# start cypress tests
npm run cypress:run
## or with ui
npm run cypress:open
```

Before running cypress tests, all data from the test user should be deleted.

### Management rules

See all rules in `doc/rg.md`. You can find the part of the code corresponding to each rule in the comments of the code.

# Slackbot

Slack bot for Skillz App - Keep updated about the new releases of the app, and your activity

## 📖 Documentation

All the informations about this bot (configuration, etc) are
in [this file](https://docs.google.com/document/d/1VNHepiCHvmf6mLz2AZmaUNJzSKHFuQS4N2nUNNzKepY).

Architecture schéma is in [this file](https://docs.google.com/drawings/d/19-DK9jNgzQbMpmeW5tOe-XJ6Q1VFPw1HawUwxJXSqzA).

## 🏗 Development

### Configuration

1/ Start by running : `npm i`
2/ Create an file named `.env`, then find variables thanks to the
documentation : https://docs.google.com/document/d/1VNHepiCHvmf6mLz2AZmaUNJzSKHFuQS4N2nUNNzKepY/edit#
3/ Launch the app : `npm run dev`

### Testing

🚧 Tests are in progress. 🚧

The test library used is [Jest](https://jestjs.io/fr/). You can use tests with this command : `npm run test`.

The [`coverage`](https://www.npmjs.com/package/coverage) library is installed on this project. You can check the
coverage of this project with this command : `npm run coverage`.

### Versioning

_Check the actual version of the bots thanks to /skillz-version-{ENV}_. If you want to update it, change the "version"
field from the package.json
