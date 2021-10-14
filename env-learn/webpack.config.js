const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAseertsPlugin = require("optimize-css-assets-webpack-plugin");

const apiMocker = require("connect-api-mocker");

const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode,
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js", // output name을 동적으로 (entry의 이름으로 결정이 된다.) 생성할 때 사용
  },
  devServer: {
    client: {
      overlay: true,
    },
    onBeforeSetupMiddleware: (devServer) => {
      devServer.app.use(apiMocker("/api", "mocks/api"));
    },
    hot: true,
  },
  optimization: {
    minimizer: mode === "production" ? [new OptimizeCSSAseertsPlugin()] : [],
  },
  stats: "errors-only",

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [process.env.NODE_ENV === "production" ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          publicPath: "./dist", // 파일로더가 처리하는 파일을 모듈로 처리했을 때 경로 앞에 추가되는 문자열
          name: "[name].[ext]?[hash]",
          limit: 20000, // 20kb (2kb미만은 자바스크립트 문자열로 변환)
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `Build Date: ${new Date().toLocaleString()}
      Commit Version: ${childProcess.execSync("git rev-parse --short HEAD")}`,
    }),
    new webpack.DefinePlugin({
      TWO: JSON.stringify("1+1"),
      "api.domain": JSON.stringify("http://dev.~~~"),
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "(배포용)",
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === "production" ? [new MiniCssExtractPlugin({ filename: "[name].css" })] : []),
  ],
};
