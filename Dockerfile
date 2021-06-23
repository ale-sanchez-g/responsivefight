#Grab the latest alpine image
FROM node:lts-alpine

# Add our code
ADD . /

# Run the app.
CMD ["npm", "start"]
