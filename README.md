# ZProfile
not the definitive name


## Quick start

### Create an env file

Create an file named `.env.local`, then add these variables

```
# Your local (or distant) hasura endpoint url
GRAPHQL_API_ENDPOINT=http://localhost:8080/v1beta1/relay
# A long secret value used to encrypt the session cookie
AUTH0_SECRET=
# The base url of your application
AUTH0_BASE_URL=
# The url of your Auth0 tenant domain
AUTH0_ISSUER_BASE_URL=
# Your Auth0 application's Client ID
AUTH0_CLIENT_ID=
# Your Auth0 application's Client Secret
AUTH0_CLIENT_SECRET=
```

Then install dependencies using `npm install`, run the dev server using `npm run dev`