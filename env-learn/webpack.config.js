const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js", // output name을 동적으로 (entry의 이름으로 결정이 된다.) 생성할 때 사용
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
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
  ],
};
