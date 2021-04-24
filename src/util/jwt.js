const jwt = require('jsonwebtoken');

module.exports.signToken = (data) => {
  // add desired data here
  let extraData = {}
  return jwt.sign({ ...extraData, ...data }, process.env.JWT_SECRET, { expiresIn: '2h' })
}