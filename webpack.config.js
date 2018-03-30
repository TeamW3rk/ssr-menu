const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = {
  context: __dirname + '/client',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]" })
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ],
  node: {
    fs: 'empty'
  },
};


// const common = {
//   context: __dirname + '/src',
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         query: {
//           presets: ['react', 'es2015', 'env']
//         },
//       },
//       {
//         test: /\.css$/,
//         exclude: /node_modules/,
//         loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]" })
//       },
//     ],
//   },
//   plugins: [
//     new ExtractTextPlugin("styles.css"),
//   ],
//   node: {
//     fs: 'empty'
//   },
//   resolve: { extensions: ['.jsx', '.js'] },
// };

const client = {
  entry: './client.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  }
};

const server = {
  entry: './server.js',
  target: 'node',
  output: {
    path: __dirname + '/public',
    filename: 'bundle-server.js',
    libraryTarget: 'commonjs2'
  }
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];