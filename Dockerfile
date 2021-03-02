FROM node:12.21-alpine3.10

WORKDIR /opt/app

RUN npm install -g serverless serverless-api-gateway-throttling serverless-offline serverless-domain-manager

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

# Don't need to copy, I am using docker-compose to mount volume
# COPY . .
