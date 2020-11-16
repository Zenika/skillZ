FROM node:14 as builder

WORKDIR /app
COPY . .
RUN npm ci \
    && npm run build

FROM nginx:1.19.4

COPY --from=builder /app/dist /usr/share/nginx/html