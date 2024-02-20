/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config: () => Promise<typeof webpack.Configuration> = async () => {
  return {
    devtool: "inline-source-map",
    entry: "./src/index.tsx",
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.graphql$/,
          loader: "@graphql-tools/webpack-loader",
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [new HtmlWebpackPlugin()],
    optimization: {
      // minimize: false,
      splitChunks: {
        chunks: "initial",
      },
    },
  };
};

module.exports = config;
