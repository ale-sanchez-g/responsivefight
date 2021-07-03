# responsivefight

Responsive is an application that renders plain HTML and also some PUG.

Currenlty the Application runs on an express server, and calls some rest APIs to gather some information.

## Badges
[![Run Status](https://api.shippable.com/projects/5e83cded63e1b90007e8ad3e/badge?branch=master)](https://app.shippable.com/github/ale-sanchez-g/responsivefight/dashboard/insights) [![Cypress Run](https://img.shields.io/badge/cypress-dashboard-brightgreen.svg)]()

## Requirements

- node 10.x or above
- Docker
- Heroku account
- Shippable account

## Start

Download this repo and run the below scripts:

- `npm install`
- `npm run`

This will have the application running on port 8080 <http://localhost/8080> connecting to the production APIs

## Test

- run script `npm test` after installing and running the APP

## Deployment

The deployment happens in shippable, but building the docker image, pushing it to the heroku registry and then using the Herku CLI to deploy.

You can refer to the shippable.yml file for the details

## Docker

Run application with docker

```
docker build --build-arg H_KEY=<Hasure_secret> -t testresponsivefight:latest .
docker run -p 8080:8080 testresponsivefight
```