#Grab the latest alpine image
FROM node:16-alpine

# Add our code
ADD ./ /apps
WORKDIR /app
RUN npm install --production

# Run the app.
CMD ["npm", "start"]
