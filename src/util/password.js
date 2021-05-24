const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.encrypt = async (password) => {
	return await bcrypt.hash(password, saltRounds);
};

module.exports.decrypt = async (password, hash) => {
	return await bcrypt.compare(password, hash);
};
