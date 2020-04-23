rm -rf node_modules
npm install --production
which heroku || wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh
docker build -t registry.heroku.com/$APP_NAME/web .
docker push registry.heroku.com/$APP_NAME/web
heroku container:release -a responsivefight web