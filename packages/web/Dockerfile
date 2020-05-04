# yarn install in full image
FROM node:10 as build-stage

WORKDIR /medium
COPY ./packages/common/dist ./packages/common/dist
COPY ./packages/common/package.json ./packages/common/
COPY ./packages/web/package.json ./packages/web/
COPY ["package.json", "yarn.lock", "./"] 

RUN yarn config set cache-folder /yarn && \
  yarn install --production

# and then copy over node_modules, etc from that stage into smaller base image
FROM mhart/alpine-node:base-10
WORKDIR /medium
COPY --from=build-stage /medium/node_modules ./node_modules

# common/node_modules is currently empty, since only dev-dependencies exist
# COPY --from=build-stage /medium/packages/common/node_modules/* ./node_modules

WORKDIR /medium/packages/common
COPY ./packages/common/dist ./dist

WORKDIR /medium/packages/web
COPY --from=build-stage /medium/packages/web/node_modules ./node_modules
COPY ./packages/web/.next ./.next
COPY ./packages/web/next.config.js .
COPY ./packages/web/.env.prod .env
COPY ./packages/web/.env.example .

EXPOSE 3000
CMD ["../../node_modules/.bin/next", "start"]