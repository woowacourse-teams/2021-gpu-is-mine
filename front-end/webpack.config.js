const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenvWebpack = require("dotenv-webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const createStyledComponentsTransformer = require("typescript-plugin-styled-components").default;
const styledComponentsTransformer = createStyledComponentsTransformer();
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = (env) => {
  const isDevelopment = !env.production;

  return {
    entry: "./src/index.tsx",
    output: {
      filename: "[name].[fullhash].js",
      chunkFilename: "[name].[chunkhash].js",
      path: path.resolve(__dirname, "build"),
      clean: true,
    },
    devServer: {
      port: 3000,
      hot: true,
      historyApiFallback: true,
    },
    devtool: isDevelopment ? "eval-source-map" : "source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          options: {
            getCustomTransformers: () => ({
              before: [styledComponentsTransformer],
            }),
            transpileOnly: true,
          },
          exclude: [/__fixtures__/, /__mocks__/, /__test__/, /stories.tsx?/],
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
      new FaviconsWebpackPlugin({ prefix: "/" }),
      new HtmlWebpackPlugin({
        base: "/",
        template: "public/index.html",
      }),
      new dotenvWebpack(),
      isDevelopment && new webpack.HotModuleReplacementPlugin(),
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
    ].filter(Boolean),
    resolve: {
      extensions: [".tsx", ".ts", ".js", "jsx"],
    },
    performance: {
      maxEntrypointSize: 500 * 1_024,
      maxAssetSize: 300 * 1_024,
      hints: "warning",
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            chunks: "all",
            test: /[\\/]\.yarn[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
            filename: "vendors.[contenthash].js",
          },
        },
      },
    },
  };
};
