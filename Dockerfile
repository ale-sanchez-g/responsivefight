#Grab the latest alpine image
FROM node:lts-alpine

# Add our code
ADD . /
RUN npm install --production

# Run the app.
CMD ["npm", "start"]
