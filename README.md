# Node.js Template
This is the sample node.js file structure template for myself. 

## Sample code included following package
- Express
- Joi
- Jsonwebtoken
- Knex
- Multer
- Nodemailer

some brief
api best practice include multiple table thingy with join
api documented in version
put api link in online?

## Database 
1. Install knex using **__npm install knex__** in your computer
2. Run npx knex migrate:latest (Windows), knex migrate:latest (Mac)
3. Run npx knex seed:run (Windows), knex seed:run (Mac)

**Note** 
Auto increment/Sequences no update if seeding, need to manually update it(tested in postgres)
[Stackoverflow Reference](https://stackoverflow.com/questions/8745051/postgres-manually-alter-sequence)

## Todo
- `encrypt and decrypt for id`
- `renew token`
- `reuse for general model (insert, update, delete, select...)`

Feel free to contact me at chern-97@hotmail.com