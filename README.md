# SkillZ

SkillZ is an application for managing the skills and competences of Zenika's different collaborators. It aims at
gathering the feedbacks in order to match the different profiles with missions or trainings that correspond the best.
Actually there is 3 diferents applications all functional, and linked to each other :

- [Skillz web app](https://skillz.zenika.com/) <br/>
- [Skillz Slack bot](#installbot) <br/>
- Skillz analytics _this version is available for DT to analyze Skillz datas_ <br/>

In this repository, you can access to **Skillz web app** and **Skillz Slack bot** scripts.

If you have any questions about the diferents projects, don't hesitate to open issues on this repository, or ask your
questions on the channel #project-skillz in the Zenika's Slack.

# Table of contents

1. [Skillz web app](#skillzwebapp)
   1. [Requirements](#requirements)
   2. [Quick Start](#quickstart)
      1. [Docker](#docker)
      2. [Install dependencies](#dependencies)
      3. [Create an .env file](#.env)
      4. [Run postgres and hasura locally with docker](#postgres)
      5. [Run the hasura migrations](#hasuramigrations)
      6. [Develop with hasura](#devhasura)
      7. [Launch the app](#launch)
      8. [Generate local seeds](#localseeds)
   3. [Tests](#tests)
      1. [E2E with Cypress](#e2e)
      2. [Management rules](#managementrules)
2. [Skillz Slack bot](#slackbot)
   1. [Documentation](#documentation)
   2. [Development](#development)
      1. [Configuration](#configuration)
      2. [Versionning](#versionning)
3. [Github](#github)
   1. [Actions](#actions)
      1. [Update referentials](#update-referentials)
   2. [Dependabot](#dependabot)

# Skillz web app <a name="skillzwebapp"></a>

A progressive web app to store your proficiency and desire to learn different skills.

## Requirements <a name="requirements"></a>

- Node 16.13.1
- Npm 8.1.2
- Docker

## Quick start <a name="quickstart"></a>

### Docker <a name="docker"></a>

You will need Docker installed on your machine.

### Install dependencies <a name="dependencies"></a>

Install dependencies using `npm install` at the root of the project.

### Create an .env file <a name=".env"></a>

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

### Run postgres and hasura locally with docker <a name="postgres"></a>

Start by running `docker compose up -d` to launch the postgres database and the hasura graphql-engine.

Check that engine is running by going to `http://localhost:8080` (do not modify schemas through this URL).

### Run the hasura migrations <a name="hasuramigrations"></a>

In order to initialize / update the database run :

```
# npm run hasura migrate apply # Sets up the schema
# npm run hasura metadata apply # Sets up GraphQL
# npm run hasura seed apply # Optional : seeds/cleans up the database with referential data
```

Connect to the Hasura console by running `npm run hasura console` (it should open the console in your browser with the
correct port (to keep track of schema changes in the hasura/migrations folder)).

### Develop with hasura <a name="devhasura"></a>

For hasura to generate the migration files properly the hasura console must be run apart from the "in-app" hasura engine
and console.

```
# npm install --global hasura-cli # Installs the hasura console globally
# cd ./hasura # Go into the hasura folder to reuse the config.yaml
# hasura console # Runs the "other" hasura console on a different port
```

### Launch the app <a name="launch"></a>

Run the dev server using `npm run dev`.
The application should be available at the URL specified in your .env file under `NEXT_PUBLIC_BASE_URL`.

### Generate local seeds <a name="localseeds"></a>

If you want to generate random seed data, you can use the hasura console to export the Skill table to JSON
Then move it to `hasura/local_seeds/Skill.json`
You can now run `npm run seeds:generate`
And `npm run seeds:apply` to apply the random data to the database

## Tests <a name="tests"></a>

### E2E with Cypress <a name="e2e"></a>

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

### Management rules <a name="managementrules"></a>

See all rules in `doc/rg.md`. You can find the part of the code corresponding to each rule in the comments of the code.

# Skillz Slack bot <a name="slackbot"></a>

Slack bot for Skillz App - Keep updated about the new releases of the app, and your activity. The bot's scripts are
placed in the folder `./bot-slack/`.

This bot in only available in the Slack Zenika workspace.

## Install bot <a name="installbot"></a>

The usage of the bot is only available on the Zenika's Slack. So, click on your channels settings in side bar, the on "
Apps" such as the screenshot below :

![1](https://zupimages.net/up/23/03/lsdk.png)

Then, search "Skillz-bot" on the search bar. It will purpose you the bot. Just click on it to install it to your
workspace.

![2](https://zupimages.net/up/23/03/81bk.png)

It's done ! You can now use the bot. Go on the bot's section "About" to know how use the commands.

## Documentation <a name="documentation"></a>

All the informations about this bot (configuration, etc) are
in [this file](https://docs.google.com/document/d/1VNHepiCHvmf6mLz2AZmaUNJzSKHFuQS4N2nUNNzKepY).

Architecture schéma is in [this file](https://docs.google.com/drawings/d/19-DK9jNgzQbMpmeW5tOe-XJ6Q1VFPw1HawUwxJXSqzA).

## Development <a name="development"></a>

### Configuration <a name="configuration"></a>

1/ Start by running : `npm i`
2/ Create an file named `.env`, then find variables thanks to the
documentation : https://docs.google.com/document/d/1VNHepiCHvmf6mLz2AZmaUNJzSKHFuQS4N2nUNNzKepY/edit#
3/ Launch the app : `npm run dev`

### Testing <a name="testing"></a>

🚧 Tests are in progress. 🚧

The test library used is [Jest](https://jestjs.io/fr/). You can use tests with this command : `npm run test`.

The [`coverage`](https://www.npmjs.com/package/coverage) library is installed on this project. You can check the
coverage of this project with this command : `npm run coverage`.

### Versioning <a name="versioning"></a>

_Check the actual version of the bots thanks to /skillz-version-{ENV}_. If you want to update it, change the "version"
field from the package.json

# Github <a name="github"></a>

## Actions <a name="actions"></a>

### Update referentials <a name="update-referentials"></a>

This Github Actions is located in .github/workflows/update-referentials.yml

- Run every monday à 6:00am UTC
- Get all approved data from skills.zenika.com
- Update files located in hasura/seeds with new approved data
- Create a merge request

## Dependabot <a name="dependabot"></a>

Dependabot helps us keep our dependencies up to date. It checks our dependency files for outdated requirements and opens
individual PRs.

The configuration file is located in .github/dependabot.yml

- Run every monday at 7:00 am UTC
- Create PR for skills-app and skills-bot
