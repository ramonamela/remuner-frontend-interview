FROM node:lts-alpine3.19 AS remuner-frontend-base

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# install vue dependencies
RUN npm install -g @vue/cli
RUN npm install -g vuetify
RUN npm install vuetify

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

FROM remuner-frontend-base AS remuner-frontend-dev

EXPOSE 3000
CMD [ "http-server", "dist" ]

FROM remuner-frontend-base AS remuner-frontend-prod

EXPOSE 3000
CMD [ "http-server", "dist" ]