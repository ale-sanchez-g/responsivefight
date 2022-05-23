export APP_NAME=responsivefight
rm -rf node_modules
docker build -t registry.heroku.com/$APP_NAME/web .
docker push registry.heroku.com/$APP_NAME/web
heroku container:release -a $APP_NAME web