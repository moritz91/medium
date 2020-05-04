# yarn install in full image
FROM node:10 as build-stage
ENV NODE_ENV production

WORKDIR /medium/packages/common
COPY ./packages/common/package.json .
COPY ./packages/common/dist ./dist

WORKDIR /medium/packages/server
COPY ./packages/server/package.json .
COPY ./packages/server/ormconfig.json .
COPY ./packages/server/.env.prod .env

WORKDIR /medium
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
COPY ./packages/common/package.json .
COPY ./packages/common/dist ./dist

WORKDIR /medium/packages/server
COPY --from=build-stage /medium/packages/server/node_modules ./node_modules
COPY ./packages/server/dist ./dist
COPY ./packages/server/.env.prod .env
COPY ./packages/server/.env.example .
COPY ./packages/server/ormconfig.json .

EXPOSE 4000
CMD ["node", "dist/index.js"]