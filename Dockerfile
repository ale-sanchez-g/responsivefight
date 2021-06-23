#Grab the latest alpine image
FROM node:16-alpine

# Add our code
ADD ./ /apps
COPY package-lock.json /apps
WORKDIR /app

# Run the app.
CMD ["npm", "start"]
