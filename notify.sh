#! /usr/bin/env sh

curl https://api.github.com/repos/${GITHUB_USER}/github-run \
  -u ${GITHUB_USER}:${GITHUB_DEV_TOKEN} \
  -X PATCH \
  -H 'Content-Type: application/json;charset=UTF-8' \
  -d '{"name":"github-run","default_branch":"master"}'
  
curl https://api.github.com/repos/${GITHUB_USER}/github-run \
  -u ${GITHUB_USER}:${GITHUB_DEV_TOKEN} \
  -X PATCH \
  -H 'Content-Type: application/json;charset=UTF-8' \
  -d '{"name":"github-run","default_branch":"graph"}'