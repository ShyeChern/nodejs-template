// May set reverse proxy
const PORTs = JSON.parse(process.env.PORTs ?? '[5000, 5001, 5002]');
const baseUrl = `${process.env.URL}:${PORTs[0]}/`;
module.exports = {
	BASE_URL: baseUrl,
	API_V1_VIEW: `${baseUrl}api/v1/view/`,
	API_V1_DOWNLOAD: `${baseUrl}api/v1/download/`,
	EMAIL_SENDER: 'Shye Chern',
	APP_COOKIE: '_nac_4wKql9zvylAmpTQv',
};
