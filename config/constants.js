const path = require('path');
const baseUrl = 'http://localhost:5000/';
const rootPath = path.join(__dirname, '../');
global.BASE_URL = module.exports = baseUrl;
global.API_V1_VIEW = module.exports = `${baseUrl}api/v1/view/`;
global.API_V1_DOWNLOAD = module.exports = `${baseUrl}api/v1/download/`;
global.ROOT_PATH = module.exports = rootPath;
global.EMAIL_SENDER = module.exports = 'Shye Chern';
global.APP_COOKIE = module.exports = '_nac_4wKql9zvylAmpTQv';
