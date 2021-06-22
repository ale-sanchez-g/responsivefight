#Grab the latest alpine image
FROM node:10-alpine

RUN bash -c "/version.sh"

# Add our code
ADD ./ /app
WORKDIR /app

# Run the app.
CMD ["npm", "start"]
