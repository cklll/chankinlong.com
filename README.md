# About
This repo is the website of https://chankinlong.com

## Stack
* [serverless framework](https://www.serverless.com)
* AWS, API Gateway, Lambda, SES
* Docker for development (every command is run inside Docker)

## Development

```
serverless offline start
```

## Ops & Deployment
```
cp .env.example .env.deploy
# fill in your AWS credentials

serverless deploy
```

## Next
1. Handle form for inquiry
