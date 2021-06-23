#Grab the latest alpine image
FROM node:lts-alpine

# Add our code
ADD ./ /apps
WORKDIR /app

# Run the app.
CMD ["npm", "start"]
