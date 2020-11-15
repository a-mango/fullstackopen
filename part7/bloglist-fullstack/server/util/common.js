require('dotenv').config()
const common = require('@root/config/common')

const PORT = process.env.PORT || 8000
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  ...common,
  PORT,
  MONGODB_URI,
}
