const path = require('path');

module.exports = {
  //entry: ['babel-polyfill', './lib/index.js'],
  entry: {
    vendor: ['babel-polyfill', 'react', 'react-dom', 'prop-types'],
    app: ['./lib/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['react', 'env', 'stage-2'] } } }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        }
      }
    }
  }
};
