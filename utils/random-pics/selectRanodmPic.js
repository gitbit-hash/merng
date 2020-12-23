const picsArr = require('./picsArr')

module.exports = () => {
  return picsArr[Math.floor(Math.random(1) * 35)]
}
