#!/bin/sh

if [[ -n "$CI_SKIP_JOB_PROD" && "$ENV" = "prod" ]] || [[ -n "$CI_SKIP_JOB_DEV" && "$ENV" = "dev" ]];
then
    /kaniko/executor
    --context $CI_PROJECT_DIR
    --dockerfile $CI_PROJECT_DIR/$KANIKO_PATH/$ENV.Dockerfile
    --target build-stage
    --destination $CI_REGISTRY_IMAGE/deps:$ENV
    --cache=true
    --cache-ttl=9h;

  echo "'$ENV'-dependency image built successfully." || \
  echo "failed to build '$ENV'-dependency image."
else
  echo "skipped building '$ENV'-dependency image, because it already exists."
fi