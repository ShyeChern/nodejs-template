const { Sequelize } = require('sequelize');
const environment = process.env.NODE_ENV || 'development';
const { database, user, password, ...config } = require('../../sequelizefile')[environment];

const conn = new Sequelize(database, user, password, config);

module.exports.init = async () => {
	try {
		await conn.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

module.exports.conn = conn;
