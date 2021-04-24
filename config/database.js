/**
 * Database setting with different environtment
 */
const path = require('path');
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'admin',
      database: 'sales_app'
    },
    migrations: {
      directory: path.resolve(path.dirname(require.main.filename), 'database/migrations'),
    },
    seeds: {
      directory: path.resolve(path.dirname(require.main.filename), 'database/migrations'),
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'admin',
      database: 'sales_app'
    },
    migrations: {
      directory: path.resolve(path.dirname(require.main.filename), 'database/migrations'),
    },
    seeds: {
      directory: path.resolve(path.dirname(require.main.filename), 'database/migrations'),
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'admin',
      database: 'sales_app'
    },
    migrations: {
      directory: path.resolve(path.dirname(require.main.filename), 'database/migrations'),
    },
    seeds: {
      directory: path.resolve(path.dirname(require.main.filename), 'database/migrations'),
    }
  }

};
