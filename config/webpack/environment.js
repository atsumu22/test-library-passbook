const { environment } = require('@rails/webpacker')

// 追記
environment.loaders.delete('nodeModules');

module.exports = environment
