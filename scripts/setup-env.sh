echo BACKEND_URI_DOCKER=$BACKEND_URI_DOCKER | tee -a packages/server/.env.prod packages/web/.env.production >/dev/null
echo NODE_ENV=$NODE_ENV | tee -a packages/server/.env.prod packages/web/.env.production >/dev/null

echo REDIS_URL=$REDIS_URL | tee -a packages/server/.env.prod >/dev/null
echo GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID | tee -a packages/server/.env.prod >/dev/null
echo GITHUB_CLIENT_SECRET=$GITHUB_CLIENT_SECRET | tee -a packages/server/.env.prod >/dev/null
echo APOLLO_KEY=$APOLLO_KEY | tee -a packages/server/.env.prod >/dev/null
echo FRONTEND_URI_DOCKER=$FRONTEND_URI_DOCKER | tee -a packages/server/.env.prod >/dev/null

echo NEXT_PUBLIC_BACKEND_URI=$NEXT_PUBLIC_BACKEND_URI | tee -a packages/web/.env.production >/dev/null
echo NODE_PATH=. | tee -a packages/web/.env.production >/dev/null