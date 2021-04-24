const environment = process.env.ENVIRONMENT || 'development'
const config = require('../config/database')[environment];
module.exports = require('knex')(config);