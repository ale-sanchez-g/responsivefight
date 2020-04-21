#!/bin/bash

str='
{
    "version": "$BUILD_NUMBER",
    "branch": "$BRANCH",
    "commitId": "$COMMIT"
}'

echo "${str/'$BUILD_NUMBER'/$BUILD_NUMBER}" > app/public/version.json
str=$(cat app/public/version.json)
echo "${str/'$BRANCH'/$BRANCH}" > app/public/version.json 
str=$(cat app/public/version.json)
echo "${str/'$COMMIT'/$COMMIT}" > app/public/version.json    