module.exports = {
	development: {
		username: process.env.DB_USER || 'postgres',
		password: process.env.DB_PASS || 'admin',
		database: 'sales_app',
		host: 'localhost',
		dialect: 'postgres',
		seederStorage: 'sequelize',
		logging: false,
	},
	staging: {
		username: process.env.DB_USER || 'postgres',
		password: process.env.DB_PASS || 'admin',
		database: 'sales_app',
		host: 'localhost',
		dialect: 'postgres',
		seederStorage: 'sequelize',
		logging: false,
	},
	production: {
		username: process.env.DB_USER || 'postgres',
		password: process.env.DB_PASS || 'admin',
		database: 'sales_app',
		host: 'localhost',
		dialect: 'postgres',
		seederStorage: 'sequelize',
		logging: false,
	},
};
