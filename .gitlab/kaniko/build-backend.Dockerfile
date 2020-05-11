FROM mhart/alpine-node:base-10

WORKDIR /medium
COPY ./node_modules ./node_modules

WORKDIR /medium/packages/common
COPY ./packages/common/package.json .
COPY ./packages/common/dist ./dist

WORKDIR /medium/packages/server
COPY ./packages/server/node_modules ./node_modules
COPY ./packages/server/dist ./dist
COPY ./packages/server/.env.prod .env
COPY ./packages/server/.env.example .
COPY ./packages/server/ormconfig.json .

EXPOSE 4000
CMD ["node", "dist/index.js"]