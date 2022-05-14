#!/bin/bash

str='
{
    "version": "63",
    "branch": "master",
    "commitId": "7e8e315563dd4f7c289f255338fe59b2bc5fa102"
}'

echo "${str/'$BUILD_NUMBER'/$BUILD_NUMBER}" > app/public/version.json
str=$(cat app/public/version.json)
echo "${str/'$BRANCH'/$BRANCH}" > app/public/version.json 
str=$(cat app/public/version.json)
echo "${str/'$COMMIT'/$COMMIT}" > app/public/version.json    
