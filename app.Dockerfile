FROM node:lts

COPY cypress cypress
COPY i18n i18n
COPY public public
COPY src src
COPY test test
COPY .env.local .env.local
COPY .prettierrc.json .prettierrc.json
COPY cypress.json cypress.json
COPY next-env.d.ts next-env.d.ts
COPY next.config.js next.config.js
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY postcss.config.js postcss.config.js
COPY tailwind.config.js tailwind.config.js
COPY tsconfig.json tsconfig.json

RUN npm install
ENTRYPOINT ["npm","run","dev"]