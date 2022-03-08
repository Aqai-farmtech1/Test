FROM node:16.0 as build-deps
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json package-lock.json ./
RUN npm install yarn
COPY . ./
RUN yarn install 
RUN yarn run dev

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
RUN try_files $uri $uri/ /index.html
CMD ["nginx", "-g", "daemon off;"]

