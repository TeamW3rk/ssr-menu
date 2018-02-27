module.exports = {
  entry: ["./client/src/index.jsx"],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: __dirname + "/client/dist",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./client/dist",
  }
};