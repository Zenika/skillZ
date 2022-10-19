#! /bin/bash -l

curl "${NEXT_PUBLIC_BASE_URL}/api/accounts" -X POST -H "Authorization: ${NEXT_API_BEARER_TOKEN}" -H "Content-Type: application/json"
