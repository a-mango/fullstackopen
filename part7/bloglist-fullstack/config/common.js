/**
 * Insert application wide common items here, they're all exported by frontend and backend common.js respectively
 */

const inProduction = process.env.NODE_ENV === 'production'
const apiUrl = 'http://localhost:3003/api'

module.exports = {
  inProduction,
  apiUrl,
}
