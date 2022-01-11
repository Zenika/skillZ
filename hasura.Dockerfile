FROM hasura/graphql-engine:v2.1.1

ARG PORT
ARG POSTGRESQL_ADDON_DB
ARG POSTGRESQL_ADDON_HOST
ARG POSTGRESQL_ADDON_PASSWORD
ARG POSTGRESQL_ADDON_PORT
ARG POSTGRESQL_ADDON_USER

ENV HASURA_GRAPHQL_DATABASE_URL postgres://${POSTGRESQL_ADDON_USER}:${POSTGRESQL_ADDON_PASSWORD}@${POSTGRESQL_ADDON_HOST}:${POSTGRESQL_ADDON_PORT}/${POSTGRESQL_ADDON_DB}