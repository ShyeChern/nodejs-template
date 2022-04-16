const { Sequelize } = require('sequelize');
const environment = process.env.NODE_ENV || 'development';
const config = require('../../sequelizefile')[environment];

const conn = new Sequelize(
	'sales_app',
	process.env.DB_USER || 'postgres',
	process.env.DB_PASS || 'admin',
	config
);

module.exports.init = async () => {
	try {
		await conn.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

module.exports.conn = conn;
