# yarn install in full image
FROM node:12-alpine as build-stage

WORKDIR /medium

COPY ./packages/server/package.json ./packages/server/
COPY ./packages/common/package.json ./packages/common/
COPY ./packages/web/package.json ./packages/web/
COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --frozen-lockfile --cache-folder .yarn-cache