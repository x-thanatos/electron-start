const path = require('path')
const webpack = require('webpack')
const config = require('../config.json')
const baseConfig = require('./base.js')

let devConfig = baseConfig
devConfig.plugins = baseConfig.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  })
])
devConfig.devServer = {
  contentBase: path.join(__dirname, '../dist'),
  proxy: {
    '/api/': {
      target: config.server,
      changeOrigin: true,
      // secure: true
    }
  },
  disableHostCheck: true,
  compress: false,
  port: 1500
}

module.exports = devConfig
