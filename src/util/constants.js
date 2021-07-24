const path = require('path');
const baseUrl = 'http://localhost:5000/';
const rootPath = path.join(__dirname, '../');

module.exports = {
	BASE_URL: baseUrl,
	API_V1_VIEW: `${baseUrl}api/v1/view/`,
	API_V1_DOWNLOAD: `${baseUrl}api/v1/download/`,
	ROOT_PATH: rootPath,
	EMAIL_SENDER: 'Shye Chern',
	APP_COOKIE: '_nac_4wKql9zvylAmpTQv',
};
