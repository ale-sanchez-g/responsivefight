#Grab the latest alpine image
FROM node:10-alpine

RUN "./version.sh"

# Add our code
ADD ./ /apps
WORKDIR /app

# Run the app.
CMD ["npm", "start"]
