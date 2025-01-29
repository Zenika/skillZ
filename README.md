<p align="center">
    <img src="public/logo/skillz-light.png">
</p>

# Skillz

SkillZ is an application for managing the skills and competences of Zenika's different collaborators. It aims at gathering the feedbacks in order to match the different profiles with missions or trainings that correspond the best.

Actually there is 3 diferents applications all functional, and linked to each other :

- Skillz web app
- Skillz Slack bot
- Skillz analytics this version is available for DT to analyze Skillz datas

In this repository, you can access to Skillz web app and Skillz Slack bot.

If you have any questions about the diferents projects, don't hesitate to open issues on this repository, or ask your questions on the channel **#project-skillz** in the Zenika's Slack.

# Web application

## Requirements

- Node 22
- NPM
- Docker

## Quick start

### Install dependencies

Install dependencies

```bash
npm install
```

### Create an .env file <a name=".env"></a>

Create an file named `.env`, then add these variables :

```bash
# If you're using Linux, your local (or distant) hasura endpoint url should looks like this :
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8080/v1/graphql
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_API_BEARER_TOKEN=Bearer key

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
```

### Run postgres and hasura locally with docker <a name="postgres"></a>

Start by running `docker compose up -d` to launch the postgres database and the hasura graphql-engine.

Check that engine is running by going to `http://localhost:8080` (do not modify schemas through this URL).

### Run the hasura migrations <a name="hasuramigrations"></a>

In order to initialize / update the database run :

```bash
# Sets up the schema
npm run hasura migrate apply

# Sets up GraphQL
npm run hasura metadata apply

# Optional : seeds/cleans up the database with referential data
npm run hasura seed apply
```

### Develop with hasura

For hasura to to keep track of schema changes in the hasura/migrations folder and generate the migration files properly the hasura console must be run apart from the "in-app" hasura engine
and console.

```bash
# Runs in another console
npm run hasura console
```

### Run the app

```bash
# Runs in another console
npm run dev
```

The application should be available at the URL specified in your .env file under `NEXT_PUBLIC_BASE_URL`.

## Tests

### Unit tests

Run the following command :

```bash
npm run test:unit
```

### 2E2 Tests

Before running cypress tests, all data from the test user should be deleted.

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

```bash
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

# Documentation

## Management rules

See all rules in `doc/rg.md`. You can find the part of the code corresponding to each rule in the comments of the code.

# Github

## Actions

### Update referentials

This Github Actions is located in `.github/workflows/update-referentials.yml`

- Run every monday à 6:00am UTC
- Get all approved data from skills.zenika.com
- Update files located in hasura/seeds with new approved data
- Create a merge request

## Dependabot

Dependabot helps us keep our dependencies up to date. It checks our dependency files for outdated requirements and opens
individual PRs.

The configuration file is located in `.github/dependabot.yml`

- Run every first day of the month
- Create PR for skills-app and skills-bot