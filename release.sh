#!/bin/bash
set -e
function version_lt() { test "$(echo "$@" | tr " " "\n" | sort -rV | head -n 1)" != "$1"; }

 nodeVersion=$(node --version | sed 's/^v//')

 if version_lt $nodeVersion '10.0.0'; then
     echo '当前node版本'$nodeVersion'过低，最低版本为10.0.0'
     exit 1
 fi

 defaultRegistry="https://registry.npmjs.org/"
 currentRegistry=$(npm config get registry)
 if [ $currentRegistry != $defaultRegistry ]; then
     npm config set registry $defaultRegistry
 fi

#echo "v" $(node --version | sed 's/^v//')
echo "Current version:" $(grep version package.json | sed -E 's/^.*"(4[^"]+)".*$/\1/')
echo "Enter release version e.g. 3.3.0: "
read VERSION

read -p "Releasing v$VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing v$VERSION ..."

  # commit
  VERSION=$VERSION npm run build
  git add .
  git commit -m "build: bundle $VERSION"
  npm version $VERSION

  # publish
  git push
  npm publish

  # reset registry
  npm config set registry $currentRegistry
fi
