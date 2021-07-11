
# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

---

## Downloading

```
# Clone current repository
$ git clone {repository URL}

# Switch branch to [task9/nestjs]
$ git checkout task9/nestjs
```

---

## Running application: Local

```bash
# Installing NPM modules
$ npm install

# development mode
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running application: Docker
Кun all services:

```bash
# development mode
$ docker-compose up

# production mode
$ docker-compose -f docker-compose.prod.yml up 
```
To run it in background, use `-d` flag

#### Services:

- postgresql 13.3-alpine on standard port
- pgadmin 4.5.3 on port 5050
- nest [express/fastify] on port 4000

To run cli commands, first make sure containers are running and use following command `docker exec -it <container_name> /bin/sh <command>`

## DB
DB settings are stored in POSTGRES_* env variables. see [.env](https://github.com/hardzeichyksiarhei/nest-nodejs-2021Q2/blob/task9/nestjs/.env) or [.env.docker](https://github.com/hardzeichyksiarhei/nest-nodejs-2021Q2/blob/task9/nestjs/.env.docker).

## Migrations
Running migrations:
```
$ npm run migration:run
```
Revert migration:
```
$ npm run migration:revert
```

## Seeding
Running seeds:
```
$ npm run seed:run
```

After starting the app on port (4000 as default) you can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/. For more information about OpenAPI/Swagger please visit https://swagger.io/.

---

## Test

```bash
# To run all test with authorization
$ npm run test:auth

# To run only specific test suite with authorization (users, boards or tasks)
npm run test:auth <suite name>
```
