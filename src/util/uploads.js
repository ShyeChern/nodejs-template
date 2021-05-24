const multer = require('multer');
const path = require('path');

module.exports.fileStorage = (filepath) => {
	return multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'uploads/' + filepath);
		},
		filename: (req, file, cb) => {
			cb(null, Date.now() + path.extname(file.originalname));
		},
	});
};

/**
 * List of mime type -- https://www.freeformatter.com/mime-types-list.html
 */
module.exports.imageFilter = (req, file, cb) => {
	const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];
	if (!allowedMimes.includes(file.mimetype)) {
		cb(new Error());
	} else {
		cb(null, true);
	}
};

/**
 * List of mime type -- https://www.freeformatter.com/mime-types-list.html
 */
module.exports.attachmentFilter = (req, file, cb) => {
	const allowedMimes = ['application/pdf'];
	if (!allowedMimes.includes(file.mimetype)) {
		cb(new Error());
	} else {
		cb(null, true);
	}
};
