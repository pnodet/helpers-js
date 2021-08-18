const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const ESLintPlugin = require("eslint-webpack-plugin");

const serverSide = (env, argv) => {
  // console.log('webpack production config: ', env, argv);
  return {
    entry: ["./src/index.js"],
    target: "node", // in order to ignore built-in modules like path, fs, etc.
    output: {
      filename: "pnx-helpers.js",
      path: path.resolve(__dirname, "../lib"),
      library: "pnx-helpers-js",
      libraryTarget: "umd",
      umdNamedDefine: true,
    },
    externals: [nodeExternals()], // ignore all modules in node_modules folder
    module: {
      rules: [
        {
          test: /\.js?$/,
          enforce: "pre",
          loader: "prettier-loader",
          options: {
            parser: "babel",
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    plugins: [
      new ESLintPlugin(),
      new webpack.EnvironmentPlugin({
        NODE_ENV: "production",
      }),
      new CleanWebpackPlugin(),
      // new CleanWebpackPlugin(['dist'], {
      //   root: path.resolve(__dirname, '..'),
      // })
    ],
  };
};

module.exports = [serverSide];
