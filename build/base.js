const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config.json')

const project = {
  category: process.env.PROJECT.split('/')[0].trim(),
  name: process.env.PROJECT.split('/')[1].trim()
}
const entry = {}
const templates = []
const htmlGenerator = (entrance, category) => {
  let app = category === 'spa' ? 'app' : entrance
  entry[app] = path.join(__dirname, `../src/${category}/${entrance}/main.js`)
  return new HtmlWebpackPlugin({
    filename: `${app}.html`,
    favicon: path.join(__dirname, '../favicon.png'),
    template: path.join(__dirname, `../src/${category}/${entrance}/index.html`),
    inject: 'body',
    chunks: ['vendor', app],
    hash: true
  })
}
let outPath = ''
if (project.category === 'pages') {
  config.pages.forEach((entrance) => {
    templates.push(htmlGenerator(entrance, project.category))
  })
  outPath = path.join(__dirname, `../dist/${project.category}`)
} else if (project.category === 'spa') {
  templates.push(htmlGenerator(project.name, project.category))
  outPath = path.join(__dirname, `../dist/${project.category}/${project.name}`)
}

let webpackConfig = {
  target: 'web',
  profile: true,
  entry: entry,
  output: {
    path: outPath,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.vue', '.js', '.scss', '.css', '.html'],
    alias: {
      vue$: 'vue/dist/vue.common.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              css: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                fallback: 'vue-style-loader',
                use: 'css-loader!postcss-loader?sourceMap'
                // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
              })),
              scss: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!postcss-loader!sass-loader?sourceMap'
              })),
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!postcss-loader?sourceMap'
        })),
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!postcss-loader!sass-loader?sourceMap'
        })),
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: 'json-loader'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'html-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 2048,
            name: './images/[name].[ext]'
          }
        }
      },
      {
        test: /\.woff|\.woff2|\.svg|\.eot|\.ttf/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 2048,
            name: './fonts/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    }),
    new ExtractTextPlugin('[name].css')
  ]
}
webpackConfig.plugins.push(...templates)
module.exports = webpackConfig
