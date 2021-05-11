# SkillZ
A progressive web app to store your proficiency and desire to learn different skills.

## Quick start

### Run postgres and hasura localy with docker

Start by running

`docker compose up -d postgres`

Once the instance is up you can run `docker compose up -d` to launch the hasura graphql-engine

Check that engine is running by going to `http://localhost:8080`

### Run the hasura migrations

Go to the hasura folder `cd hasura`
Then:
 - You can use the npm package by doing `npx hasura-cli migrate apply` and `npx hasura-cli metadata apply`
 - You can also install it globaly `npm install --global hasura-cli`
 - Or install the binaries https://hasura.io/docs/latest/graphql/core/hasura-cli/index.html 

### Create an env file

Create an file named `.env.local`, then add these variables

```
# Your local (or distant) hasura endpoint url
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8080/v1/relay
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Launch the app

Then install dependencies using `npm install`, run the dev server using `npm run dev`
