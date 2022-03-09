FROM node:16.0 as build-deps
FROM build-deps as dev
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install yarn
COPY . ./
RUN yarn install 
RUN yarn build

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

FROM build-deps as staging
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install yarn
COPY . ./
RUN yarn install 
RUN yarn build

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

