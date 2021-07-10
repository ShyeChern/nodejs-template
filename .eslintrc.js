module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	globals: {
		UserError: 'readonly',
		ErrorMessage: 'readonly',
		BASE_URL: 'readonly',
		API_V1_VIEW: 'readonly',
		API_V1_DOWNLOAD: 'readonly',
		ROOT_PATH: 'readonly',
		EMAIL_SENDER: 'readonly',
		APP_COOKIE: 'readonly',
	},
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
	},
};
