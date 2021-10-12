module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: {
          version: 3,
        },
      },
    ],
  ],
  targets: {
    chrome: "79",
    ie: "11",
  },
};
