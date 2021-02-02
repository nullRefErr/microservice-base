# Microservice Base Project
Simple and scaleable microservice template with Node.js MongoDb and Redis. Feel free to fork and send pull requests. Any comments will be accepted.

## Requirements
- NodeJs LTS (^10)
- MongoDb ^4.0
- Redis
- Vs Code (theme: Noctis Obscuro)
- Amazon Web Services Account
- Mail Provider (Google, Yandex etc.)

## Features
- Web Server with `Express & Native Http Server` (a socket server can be implemented easily)
- Database with `MongoDb`
- Cache Service with `Redis`
- E-mail Integration with `Nodemail & AWS SeS`
- Logging with `Winston`
- Eslint with `Airbnb`
- Custom Errors
- Custom Configs and ENVs
- Graceful shutdown
- MVC

## ENV Example
```
SECRETS_JWT=123456
PORT=1338
DATABASE_HOST=mongodb+srv://{user}:{pass}@{host}/{dbName}?retryWrites=true&w=majority
REDIS_CACHE_HOST=redis://{user}:{pass}@{host}:{port}
SES_REGION=eu-central-1
SES_API_VERSION=2010-12-01
SES_USER_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID
SES_USER_SCREET_ACCESS_KEY=AWS_ACCESS_KEY
EMAIL_SEND_LOCALLY=true
EMAIL_HOST=smtp.tandex.ru
EMAIL_PORT=465
EMAIL_USER=user@example.com
EMAIL_PASS=********
```
