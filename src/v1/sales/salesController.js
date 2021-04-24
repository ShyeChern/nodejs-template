const salesModel = require('./salesModel');
const { fileStorage, imageFilter } = require('../../util/uploads');
var multer = require('multer')


module.exports.uploads = async (req, res) => {
  var storage = fileStorage('image');
  var fileFilter = imageFilter;
  var upload = multer({ storage: storage, fileFilter, limits: { fileSize: 2000000 } })
  var cpUpload = upload.fields([{ name: 'image', maxCount: 2 }, { name: 'file', maxCount: 8 }])
  cpUpload(req, res, (err) => {
    if (err) {
      return res.send({ result: false, message: err.message });
    }
    res.end();
  })
}

module.exports.getSales = async (req, res, next) => {
  try {
    let { page } = req.params;
    let { salesperson, package } = req.query;
    let limit = 10,
      offset = (page - 1) * 10;
    let condition = {};

    if (salesperson !== '' && salesperson !== undefined) {
      condition.salesperson = salesperson;
    }
    if (package !== '' && salesperson !== undefined) {
      condition.package = package;
    }

    let row = await salesModel.selectLimitOffset(condition, limit, offset);
    let totalRow = (await salesModel.count(condition)).total;

    let returnData = { row, totalRow, totalPage: Math.ceil(totalRow / 10) }
    res.send({ message: 'Get sales data successfully', data: returnData });
  } catch (err) {
    if (err instanceof AppError) {
      return next(err);
    } else {
      return next(new AppError(AppError.INTERNAL_SERVER_ERROR, 500, true));
    }
  }
}