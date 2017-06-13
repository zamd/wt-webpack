const path = require('path');

module.exports = {
  entry: ['./index.js'],
  output: {
    filename:'bundle.js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  externals: [
    {"request-promise": "request-promise"}
    ,{"express": "express"}
    ,{"body-parser": "body-parser"}
    ,{"webtask-tools": "webtask-tools"}
    ,{"auth0-extension-tools": "auth0-extension-tools"}
    ,{"url": "url"}
    ,{"fs": "fs"}
    ,{"babel-runtime": "babel-runtime"}
  ]
}