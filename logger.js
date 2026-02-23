const path = require('path');
const log = (message, filename) => {
  console.log(filename + " : " + message);
}

module.exports = { log };
