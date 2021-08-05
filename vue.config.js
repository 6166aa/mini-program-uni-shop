const path = require('path');
const resolve = (...args) => path.resolve(...args);
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve(__dirname)
      }
    }
  }
}
