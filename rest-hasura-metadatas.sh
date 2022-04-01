#!/bin/bash

REST_ENDPOINTS_METADATA="$(python3 -c 'import sys, yaml, json; y=yaml.safe_load(sys.stdin.read()); print(json.dumps(y))' < "$REST_ENDPOINTS_METADATA_FILE")"
psql -d $HASURA_GRAPHQL_DATABASE_URL -P pager -c "UPDATE hdb_catalog.hdb_metadata SET metadata = jsonb_insert(metadata::jsonb, '{rest_endpoints}', '$REST_ENDPOINTS_METADATA'::jsonb, false)"