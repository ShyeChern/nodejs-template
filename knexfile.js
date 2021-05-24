/**
 * Database setting with different environtment
 */
module.exports = {
	development: {
		client: 'pg',
		connection: {
			host: 'localhost',
			user: process.env.DB_USER || 'postgres',
			password: process.env.DB_PASS || 'admin',
			database: 'sales_app',
		},
		migrations: {
			directory: './database/migrations',
		},
		seeds: {
			directory: './database/seeds',
		},
	},

	staging: {
		client: 'pg',
		connection: {
			host: 'localhost',
			user: process.env.DB_USER || 'postgres',
			password: process.env.DB_PASS || 'admin',
			database: 'sales_app',
		},
		migrations: {
			directory: './database/migrations',
		},
		seeds: {
			directory: './database/seeds',
		},
	},

	production: {
		client: 'pg',
		connection: {
			host: 'localhost',
			user: process.env.DB_USER || 'postgres',
			password: process.env.DB_PASS || 'admin',
			database: 'sales_app',
		},
		migrations: {
			directory: './database/migrations',
		},
		seeds: {
			directory: './database/seeds',
		},
	},
};
