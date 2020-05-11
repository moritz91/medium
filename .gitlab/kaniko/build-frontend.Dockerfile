FROM mhart/alpine-node:base-10

WORKDIR /medium/packages/common
COPY ./packages/common/dist ./dist

WORKDIR /medium/packages/web
COPY ./packages/web/node_modules ./node_modules
COPY ./packages/web/.next ./.next
COPY ./packages/web/next.config.js .
COPY ./packages/web/public ./public
COPY ./packages/web/.env.production .env.production

EXPOSE 3000
CMD ["../../node_modules/.bin/next", "start"]