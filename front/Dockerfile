FROM node:14 as builder

WORKDIR /app
COPY . .
RUN npm ci \
    && npm run build

FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html