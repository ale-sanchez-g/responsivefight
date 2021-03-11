#Grab the latest alpine image
FROM node:10-alpine

#Set Environment variable in the container
ENV hasurasec=$hasurasec

# Add our code
ADD ./ /app
WORKDIR /app

# Run the app.
CMD ["npm", "start"]
