# Node.js Template
![npm version](https://img.shields.io/badge/npm-v8.7-brightgreen)
![node version](https://img.shields.io/badge/node-v16.14.2-brightgreen)

This is the sample node.js file structure template for myself. It contains some code for me to refer when needed.

[Changelog](CHANGELOG.md)

## Sample code including but not limited to the following package

- Express
- Joi
- Jsonwebtoken
- Knex
- Sequelize
- Multer
- Nodemailer
- Winstone
- Node Cron
- Xlsx
- Jest

## Installation

1. Clone this repo
2. Run **npm install**
3. Change your .env variable
4. Setup Database by running **npx knex migrate:latest** 
5. Run **npx knex seed:run**
6. Setup Database by running **npx sequelize-cli db:migrate** 
7. Run **npx sequelize-cli db:seed:all**
8. Run **nodemon index.js**

**_Note_** \
Auto increment/Sequences no update if seeding, need to manually update it (tested in postgres)
[Stackoverflow Reference](https://stackoverflow.com/questions/8745051/postgres-manually-alter-sequence)

## Postman Testing

All the testing is done via Postman \
Postman collection link: [`https://www.getpostman.com/collections/7d7462236b04b6ad9b45`](https://www.getpostman.com/collections/7d7462236b04b6ad9b45) \
Postman environment variable:

- localhost: `http://localhost:5000/api/`
- api_version: `v1/`
- token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYxOTI1MjU0M30.uqqRy06zb2DYimhsqpf8UsJneoyRhhSmPZzthvU2P2I`

## Generate Self Signed SSL Certificate

1. Open your git bash and follow this link [`https://flaviocopes.com/express-https-self-signed-certificate/`](https://flaviocopes.com/express-https-self-signed-certificate/)

## Node.js Best Practice

Node.js best practice can found here [`https://github.com/goldbergyoni/nodebestpractices#readme`](https://github.com/goldbergyoni/nodebestpractices#readme)

## Windows Background Service

To run node.js as background service can follow steps here [`https://www.helpmegeek.com/run-nodejs-application-as-windows-service/`] (https://www.helpmegeek.com/run-nodejs-application-as-windows-service/). 
If you are using nssm GUI:
1. Path = _your node.exe path_
2. Startup Directory = _your working directory path_
2. Arguments = _your file to execute_

## Npm Flag

Sample to add arguments in command line at runtime
> npm run show-args --username=weq --password=23 --

## Running in Docker
1. Create a file named docker-compose.yml and by following the format in docker-compose.yml.example
2. Run **docker-compose --env-file .env.production up** (Specify your .env file)


Feel free to contact me at chern-97@hotmail.com
