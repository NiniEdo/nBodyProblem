FROM node:16-alpine AS build
WORKDIR /app

COPY package*.json tsconfig.json vite.config.ts ./
COPY src/ ./src/
COPY css/ ./css/
COPY index.html ./

RUN npm install

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/target /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]