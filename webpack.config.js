const { resolve } = require('path');

module.exports = {

  entry: {
    'just-maybe': './dist/index.js'
  },

  output: {
    filename: '[name].js',
    path: resolve('dist/bundles'),
    library: 'just-maybe',
    libraryTarget: 'commonjs2'
  },

  resolve: {
    extensions: [ '.js' ]
  }
};
