# SkillZ
A progressive web app to store your proficiency and desire to learn different skills.

## Quick start

### Run postgres and hasura localy with docker

Start by running

`docker compose up -d postgres`

Once the instance is up you can run `docker compose up -d` to launch the hasura graphql-engine

Check that engine is running by going to `http://localhost:8080`

### Run the hasura migrations

Run `npm run hasura migrate apply` and `npm run hasura metadata apply` to apply migrations and metadatas

### Create an env file

Create an file named `.env.local`, then add these variables

```
# Your local (or distant) hasura endpoint url
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8080/v1/graphql
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Launch the app

Then install dependencies using `npm install`, run the dev server using `npm run dev`

### Generate seeds

If you want to generate random seed data, you can use the hasura console to export the Skill table to JSON
Then move it to `hasura/seeds/Skill.json` 
You can now run `npm run seeds:generate`
And `npm run seeds:apply` to apply the random data to the database
