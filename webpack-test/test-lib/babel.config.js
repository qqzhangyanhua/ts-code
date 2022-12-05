module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          // "ie": "10"
          browsers: ["> 1%", "last 2 versions", "not ie <= 8"],
        },
        corejs: 3, //新版本需要指定核⼼库版本
        useBuiltIns: "usage", //按需注⼊
      },
    ],
  ];
  return {
    presets,
  };
};
