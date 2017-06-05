var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')


var webpack = require('webpack');
var path = require('path');
var BundleTracker = require('webpack-bundle-tracker')

var BUILD_DIR = path.resolve(__dirname, 'assets/bundles');
var APP_DIR = path.resolve(__dirname, 'assets/js');

var config = {
  context: __dirname,

  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    APP_DIR + '/index.js'
  ],

  output: {
    path: BUILD_DIR,
    filename: 'app.js',
    publicPath: 'http://localhost:3001/assets/bundles/', // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
    new BundleTracker({filename: './webpack-stats.json'}),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          // compiles Sass to CSS
          loader: "sass-loader",
          options: {
            includePaths: [
              path.resolve("./assets/sass")
            ]
          }
        }]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  }
};

module.exports = config;
