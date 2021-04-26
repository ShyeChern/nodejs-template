const userModel = require('./userModel');
const userValidator = require('./userValidator');
const { signToken } = require('../../util/jwt');
const { encrypt, decrypt } = require('../../util/password');
const { fileStorage, imageFilter } = require('../../util/uploads');
const multer = require('multer')

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let user = await userModel.selectOne({ username });

    if (!user) {
      throw new AppError(AppError.INVALID_CREDENTIALS, 401);
    }

    let passwordMatch = await decrypt(password, user.password);

    if (!passwordMatch) {
      throw new AppError(AppError.INVALID_CREDENTIALS, 401);
    }

    delete user.password;

    user.token = signToken({ userId: user.id });
    res.send({ message: 'Login successfully', data: user });

  } catch (err) {
    if (err instanceof AppError) {
      return next(err);
    } else {
      return next(new AppError(AppError.INTERNAL_SERVER_ERROR, 500, true));
    }
  }
}

module.exports.add = async (req, res, next) => {
  /**
   * Store file in uploads/profile with image filter and 2mb file size inside uploads/profile
   * Can adjust the upload.fields array to add image field or image count
   */
  var storage = fileStorage('profile/');
  var upload = multer({ storage: storage, fileFilter: imageFilter, limits: { fileSize: 2000000 } });
  var uploads = upload.fields([{ name: 'profileImage', maxCount: 1 }]);

  uploads(req, res, async (err) => {
    try {
      userValidator.validateAddUser(req.body);
      if (err) {
        throw new AppError(AppError.INVALID_IMAGE);
      }
      let { username, password } = req.body;

      // not put/extend in validator to ensure validator resusability (for update etc...)
      let user = await userModel.selectOne({ username });
      if (user) {
        throw new AppError(AppError.USERNAME_EXIST);
      }

      let profileImage = null;
      if (req.files.profileImage) {
        profileImage = `profile/${req.files.profileImage[0].filename}`;
      }

      password = await encrypt(password);
      let insertId = await userModel.insert({
        username,
        password,
        profile_image: profileImage
      });

      // do something with the insert id

      res.send({ message: 'Add user successfully' });

    } catch (err) {
      if (err instanceof AppError) {
        return next(err);
      } else {
        return next(new AppError(AppError.INTERNAL_SERVER_ERROR, 500, true));
      }
    }
  })
}

module.exports.getUserSale = async (req, res, next) => {
  try {
    let condition = { user_id: req.params.userId };

    if (req.query.packageName) {
      condition.package_name = req.query.packageName;
    }

    let row = await userModel.joinSales(condition);
    row.forEach(value => {
      if (value.attachment !== null) {
        value.attachment = `${apiV1View}${value.attachment}`
      }
    })
    
    res.send({ message: 'Get user sales successfully', data: row });
  } catch (err) {
    if (err instanceof AppError) {
      return next(err);
    } else {
      return next(new AppError(AppError.INTERNAL_SERVER_ERROR, 500, true));
    }
  }
}