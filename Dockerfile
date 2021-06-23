#Grab the latest alpine image
FROM node:16-alpine

RUN npm install --production
# Add our code
ADD ./ /apps
WORKDIR /app

# Run the app.
CMD ["npm", "start"]
