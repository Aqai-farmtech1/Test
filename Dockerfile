FROM node:16.0 as build-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install yarn
COPY . .
RUN yarn install

FROM build-deps as dev
COPY . .
RUN yarn run build

FROM build-deps as staging
COPY . .
RUN yarn run staging

FROM nginx:1.12-alpine
ENV PORT 80
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

