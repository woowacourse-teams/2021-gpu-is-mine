const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const createStyledComponentsTransformer = require("typescript-plugin-styled-components").default;
const styledComponentsTransformer = createStyledComponentsTransformer();
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = () => {
  const isDevelopment = process.env.NODE_ENV !== "production";

  return {
    entry: "./src/index.tsx",
    output: {
      filename: "[name].bundle.js",
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
      new HtmlWebpackPlugin({
        base: "/",
        template: "public/index.html",
      }),
      !isDevelopment && new CompressionPlugin(),
      isDevelopment && new webpack.HotModuleReplacementPlugin(),
      isDevelopment && new ReactRefreshWebpackPlugin(),
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
        chunks: "all",
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/].yarn[\\/]cache[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
  };
};
