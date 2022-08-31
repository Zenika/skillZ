# SkillZ

A progressive web app to store your proficiency and desire to learn different skills.

## Quick start

### Docker

You will need Docker installed on your machine.

### Install dependencies

Install dependencies using `npm install` at the root of the project.

### Create an env file

Create an file named `.env.local`, then add these variables

```
# If you're using Linux, your local (or distant) hasura endpoint url should looks like this :
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8080/v1/graphql
NEXT_PUBLIC_BASE_URL=http://localhost:3000
HASURA_ADMIN_SECRET=key
NEXT_API_BEARER_TOKEN=Bearer key
HASURA_ACHIEVEMENTS_ENDPOINT=http://172.17.0.1:3000/api/achievement
```

```
# If you're using Windows, your local (or distant) hasura endpoint url should looks like this :
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8080/v1/graphql
NEXT_PUBLIC_BASE_URL=http://localhost:3000
HASURA_ADMIN_SECRET=key
NEXT_API_BEARER_TOKEN=Bearer key
HASURA_ACHIEVEMENTS_ENDPOINT=http://host.docker.internal:3000/api/achievement
```

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

Connect to the Hasura console by running `npm run hasura console` (it should open the console in your browser with the correct port (to keep track of schema changes in the hasura/migrations folder)).

Browse to the `Data` tab in the console and select the `User` table.
Create your own Zenika user (its email should match your login email).

### Develop with hasura

For hasura to generate the migration files properly the hasura console must be run apart from the "in-app" hasura engine and console.

```
# npm install --global hasura-cli # Installs the hasura console globally
# cd ./hasura # Go into the hasura folder to reuse the config.yaml
# hasura console # Runs the "other" hasura console on a different port
```

### Launch the app

Run the dev server using `npm run dev`.
The application should be available at the URL specified in your .env.local file under `NEXT_PUBLIC_BASE_URL`.

### Generate local seeds

If you want to generate random seed data, you can use the hasura console to export the Skill table to JSON
Then move it to `hasura/local_seeds/Skill.json`
You can now run `npm run seeds:generate`
And `npm run seeds:apply` to apply the random data to the database
