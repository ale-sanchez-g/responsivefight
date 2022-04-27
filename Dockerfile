#Grab the latest alpine image
FROM node:17-alpine

# Add our code
ADD . /
RUN npm install --production

# Run the app.
CMD ["npm", "start"]
