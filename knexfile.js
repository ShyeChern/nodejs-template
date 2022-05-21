/**
 * Database setting with different environtment
 */
module.exports = {
	development: {
		client: 'pg',
		connection: {
			host: process.env.DB_HOST || 'localhost',
			user: process.env.DB_USER || 'postgres',
			password: process.env.DB_PASS || 'admin',
			database: process.env.DB_NAME || 'sales_app',
		},
		migrations: {
			directory: './database/knex/migrations',
		},
		seeds: {
			directory: './database/knex/seeds',
		},
	},

	staging: {
		client: 'pg',
		connection: {
			host: process.env.DB_HOST || 'localhost',
			user: process.env.DB_USER || 'postgres',
			password: process.env.DB_PASS || 'admin',
			database: process.env.DB_NAME || 'sales_app',
		},
		migrations: {
			directory: './database/knex/migrations',
		},
		seeds: {
			directory: './database/knex/seeds',
		},
	},

	production: {
		client: 'pg',
		connection: {
			host: process.env.DB_HOST || 'localhost',
			user: process.env.DB_USER || 'postgres',
			password: process.env.DB_PASS || 'admin',
			database: process.env.DB_NAME || 'sales_app',
		},
		migrations: {
			directory: './database/knex/migrations',
		},
		seeds: {
			directory: './database/knex/seeds',
		},
	},
};
