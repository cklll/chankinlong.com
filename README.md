# About
This repo is the website of https://chankinlong.com

## Stack
* [serverless framework](https://www.serverless.com)
* AWS, API Gateway, Lambda, Mailgun (or any SMTP server)
* Docker for development (every command is run inside Docker)

## Development
```
docker-compose exec app /bin/sh
serverless offline start
```

## Ops & Deployment
```sh
cp .env.example.deploy .env.deploy
cp .env.example.app .env.production
# fill the information

docker-compose exec deploy /bin/sh
serverless deploy --env production
```

## Next
1. [Keep Lambda Warm](https://www.serverless.com/blog/keep-your-lambdas-warm)
