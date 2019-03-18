#! /usr/bin/env sh

# GitHub didn't update the contributions graph immediately, but
# only the commits from default branch can be display on the
# contributions graph. So we can change the default branch to
# force it refresh

# Wait a moment
sleep 60

curl https://api.github.com/repos/${GITHUB_USER}/github-run \
  -u ${GITHUB_USER}:${GITHUB_DEV_TOKEN} \
  -X PATCH \
  -H 'Content-Type: application/json;charset=UTF-8' \
  -d '{"name":"github-run","default_branch":"master"}' \
  > /dev/null -s
  
echo 'Change default branch to master'
# curl https://github.com/${GITHUB_USER} > /dev/null -s
  
curl https://api.github.com/repos/${GITHUB_USER}/github-run \
  -u ${GITHUB_USER}:${GITHUB_DEV_TOKEN} \
  -X PATCH \
  -H 'Content-Type: application/json;charset=UTF-8' \
  -d '{"name":"github-run","default_branch":"graph"}' \
  > /dev/null -s

echo 'Default branch change back to graph'
echo 'Notified the GitHub'