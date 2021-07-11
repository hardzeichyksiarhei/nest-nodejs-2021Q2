
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

## Running application

```bash
# Installing NPM modules
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running application: Docker
To run all services use `docker-compose up`, to run it in background, use `-d` flag

### Services:

- postgresql 13.3-alpine on standard port
- pgadmin 4.5.3 on port 5050
- nest [express/fastify] on port 4000

To run cli commands, first make sure containers are running and use following command `docker exec -it <container_name> /bin/sh <command>`

## DB
DB settings are stored in POSTGRES_* env variables. see [.env](https://github.com/hardzeichyksiarhei/basic-nodejs-2021Q2/blob/task7/postgresql-typeorm/.env).

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
$ npm run test:auth
```
