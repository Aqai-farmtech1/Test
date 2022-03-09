FROM node:16.0 AS build-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install yarn
COPY . ./
RUN yarn install

FROM build-deps AS dev-env
RUN yarn build 

FROM build-deps AS staging-env
RUN yarn staging 

FROM nginx:1.12-alpine
COPY --from=staging /usr/src/app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
