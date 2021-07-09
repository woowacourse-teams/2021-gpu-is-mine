const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = () => {
  const isDevelopment = process.env.NODE_ENV !== "production";

  return {
    entry: "./src/index.tsx",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "build"),
      clean: true,
    },
    devServer: {
      port: 3000,
      hot: true,
    },
    devtool: isDevelopment ? "eval-source-map" : "source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  [
                    "@babel/preset-react",
                    {
                      runtime: "automatic",
                    },
                  ],
                  "@babel/preset-typescript",
                ],
                plugins: ["babel-plugin-styled-components"],
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "public/index.html" }),
      new ForkTsCheckerWebpackPlugin(),
      isDevelopment && new webpack.HotModuleReplacementPlugin(),
      isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    resolve: {
      extensions: [".tsx", ".ts", ".js", "jsx"],
    },
    performance: {
      hints: isDevelopment ? "warning" : "error",
    },
    target: "web",
  };
};
