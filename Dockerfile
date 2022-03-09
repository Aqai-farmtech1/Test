FROM node:16.0 as build-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install yarn
COPY . ./
RUN yarn install 

FROM build-deps AS dev
ARG mode
RUN if [ "x$mode" = "xdev" ]
RUN yarn build
fi

FROM build-deps AS staging
RUN if [ "$mode" = "dev" ]
RUN yarn staging
fi

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


