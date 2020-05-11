#!/bin/bash
set -eo pipefail

tag=$1

fetch() {
  repo_url=https://gitlab.com/api/v4/projects/$CI_PROJECT_ID/registry/repositories
  curl -s -H "PRIVATE-TOKEN: $TRIGGER_TOKEN" "$repo_url/$1" ;
}

echo "grabbing deps-repo-id from project (id: $CI_PROJECT_ID)..."
repo_id=$(fetch | jq -c '.[] | select(.path | test("deps$"))'.id)

echo "trying to fetch '$1'-tag for repository (id: $repo_id)..."

# TODO: verify changes based on yarn.lock checksum

if [ $(fetch "$repo_id/tags/$tag" | jq -r '.name') == $tag ]; then
  echo "success: repository container image with tag '${tag^^}' already exists. skipping image build."
  echo "export CI_JOB_SKIP_${tag^^}=true" >> variables
else
  echo "failed: no container image for given tag exists yet. proceeding to build image."
fi