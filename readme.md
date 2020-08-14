# Microservice Base Project
Simple and scaleable microservice template with Node.js MongoDb and Redis. Feel free to fork and send pull requests. Any comments will be accepted.

## Requirements
- NodeJs LTS (^10)
- MongoDb ^4.0
- Redis
- Vs Code (theme: Noctis Obscuro)

## Features
- Web Server with `Express & Native Http Server` (a socket server can be implemented easily)
- Database with `MongoDb`
- Cache Service with `Redis`
- Logging with `Winston`
- Eslint with `Airbnb`
- Custom Errors
- Custom Configs and ENVs
- Graceful shutdown
- MVC

## ENV Example
```
PORT=1338
DATABASE_HOST=mongodb://localhost
DATABASE_PORT=1330
REDIS_CACHE_HOST=localhost
REDIS_CACHE_PORT=1331
```
