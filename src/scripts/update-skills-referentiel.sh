#!/bin/sh

response=$(curl -H "Authorization: Bearer key" "${NEXT_PUBLIC_GRAPHQL_URL}/api/skills")

skills=$response | jq '.skills'

for row in $(echo "${response}" | jq -r '.skills[] | @base64'); do
    _jq() {
     echo "${row}" | base64 --decode | jq -r "${1}"
    }
   echo $(_jq '.name')
done
