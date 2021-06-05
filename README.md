# Node.js Template

This is the sample node.js file structure template for myself.

## Sample code including but not limited to the following package

- Express
- Joi
- Jsonwebtoken
- Knex
- Multer
- Nodemailer
- Winstone
- Node Cron

## Installation

1. Clone this repo
2. Run **npm install**
3. Change your .env variable
4. Setup Database by running **npx knex migrate:latest** (Windows), **knex migrate:latest** (Mac)
5. Run **npx knex seed:run** (Windows), **knex seed:run** (Mac)
6. Run **nodemon index.js**

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

Node.js best practice can found here[`https://github.com/goldbergyoni/nodebestpractices#readme`](https://github.com/goldbergyoni/nodebestpractices#readme)

## Todo

- `encrypt and decrypt for id`
- `Refresh token and renew token`
- `s3`
- `unit testing`
- `passport`

Feel free to contact me at chern-97@hotmail.com
