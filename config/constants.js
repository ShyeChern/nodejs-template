const path = require('path');
const baseUrl = 'http://localhost:5000/';
const rootPath = path.dirname(require.main.filename);
global.baseUrl = module.exports = baseUrl
global.apiV1View = module.exports = apiV1Url = `${baseUrl}api/v1/view/`;
global.apiV1Download = module.exports = apiV1Url = `${baseUrl}api/v1/download/`;
global.rootPath = module.exports = rootPath;