module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	globals: {
		UserError: 'readonly',
		ErrorMessage: 'readonly',
		baseUrl: 'readonly',
		apiV1View: 'readonly',
		apiV1Download: 'readonly',
		rootPath: 'readonly',
		emailSender: 'readonly',
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
