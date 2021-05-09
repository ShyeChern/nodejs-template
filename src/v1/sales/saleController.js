const salesModel = require('./saleModel');
const saleValidator = require('./saleValidator');
const { fileStorage, attachmentFilter } = require('../../util/uploads');
var multer = require('multer')

module.exports.getSale = async (req, res, next) => {
  try {
    let { page, packageName } = req.query;

    if (!page) {
      page = 0;
    }
    const limit = 100;
    const offset = Math.max(0, (page - 1) * 10);
    let condition = {};

    if (packageName) {
      condition.package_name = packageName;
    }

    let row = await salesModel.selectLimitOffset(condition, limit, offset);
    let totalRow = (await salesModel.count(condition)).total;

    for (let value of row) {
      if (value.attachment !== null) {
        value.attachment = `${apiV1View}${value.attachment}`
      }
    }

    let returnData = { row, totalRow, totalPage: Math.ceil(totalRow / 10) }
    res.send({ message: 'Get sales data successfully', data: returnData });
  } catch (err) {
    return next(err)
  }
}

module.exports.addSale = async (req, res, next) => {
  var storage = fileStorage('attachment/');
  var upload = multer({ storage: storage, fileFilter: attachmentFilter, limits: { fileSize: 5000000 } });
  var uploads = upload.fields([{ name: 'attachment', maxCount: 1 }]);

  uploads(req, res, async (err) => {
    try {
      await saleValidator.validateAddSale(req.body);
      if (err) {
        throw new UserError(UserError.INVALID_ATTACHMENT);
      }

      let attachment = null;
      if (req.files.attachment) {
        attachment = `attachment/${req.files.attachment[0].filename}`;
      }

      let insertId = await salesModel.insert({
        user_id: req.body.userId,
        package_name: req.body.packageName,
        quantity: req.body.quantity,
        sales_date: req.body.saleDate,
        attachment
      });

      // do something with the insert id

      res.send({ message: 'Add sale successfully' });

    } catch (err) {
      return next(err)
    }
  })
}

module.exports.updateSale = async (req, res, next) => {
  var storage = fileStorage('attachment/');
  var upload = multer({ storage: storage, fileFilter: attachmentFilter, limits: { fileSize: 5000000 } });
  var uploads = upload.fields([{ name: 'attachment', maxCount: 1 }]);

  uploads(req, res, async (err) => {
    try {
      let userInput = {
        id: req.params.id,
        userId: req.body.userId,
        packageName: req.body.packageName,
        quantity: req.body.quantity,
        saleDate: req.body.saleDate
      }
      await saleValidator.validateUpdateSale(userInput);
      if (err) {
        throw new UserError(UserError.INVALID_ATTACHMENT);
      }

      let updateData = {
        user_id: userInput.userId,
        package_name: userInput.packageName,
        quantity: userInput.quantity,
        sales_date: userInput.saleDate
      }
      if (req.files.attachment) {
        updateData.attachment = `attachment/${req.files.attachment[0].filename}`;
      }

      await salesModel.update(updateData, { id: userInput.id });

      res.send({ message: 'Update sale successfully' });

    } catch (err) {
      return next(err)
    }
  })
}

module.exports.deleteSale = async (req, res, next) => {
  try {
    let userInput = {
      id: req.params.id
    }

    await saleValidator.validateDeleteSale(userInput);

    await salesModel.delete({ id: userInput.id });

    res.send({ message: 'Delete sale successfully' });
  } catch (err) {
    return next(err)
  }
}