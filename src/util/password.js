const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.encrypt = async (password) => {
	return bcrypt.hash(password, saltRounds);
};

module.exports.decrypt = async (password, hash) => {
	return bcrypt.compare(password, hash);
};
