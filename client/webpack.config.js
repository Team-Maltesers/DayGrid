const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  entry: "./src/index.tsx",
  mode: "development",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "./dist"),
    filename: "index_bundle.js",
  },
  target: "web",
  devServer: {
    port: "5001",
    static: {
      directory: path.join(__dirname, "public"),
    },
    open: true,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
    devMiddleware: {
      publicPath: "/",
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        options: {
          target: "es2015",
        },
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new Dotenv(),
  ],
  devtool: "eval-cheap-source-map",
});
