module.exports = {
	development: {
		username: process.env.DB_USER || 'postgres',
		password: process.env.DB_PASS || 'admin',
		database: process.env.DB_NAME || 'sales_app',
		host: process.env.DB_HOST || 'localhost',
		dialect: 'postgres',
		seederStorage: 'sequelize',
		logging: false,
	},
	staging: {
		username: process.env.DB_USER || 'postgres',
		password: process.env.DB_PASS || 'admin',
		database: process.env.DB_NAME || 'sales_app',
		host: process.env.DB_HOST || 'localhost',
		dialect: 'postgres',
		seederStorage: 'sequelize',
		logging: false,
	},
	production: {
		username: process.env.DB_USER || 'postgres',
		password: process.env.DB_PASS || 'admin',
		database: process.env.DB_NAME || 'sales_app',
		host: process.env.DB_HOST || 'localhost',
		dialect: 'postgres',
		seederStorage: 'sequelize',
		logging: false,
	},
};
