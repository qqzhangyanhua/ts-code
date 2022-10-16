const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          edge: "17",
          firefox: "60",
          chrome: "67",
          safari: "11.1",
        },
        useBuiltIns: "usage",
        corejs: "3.6.4",
      },
    ],
  ];
  
  module.exports = { presets:[
   [ "@babel/preset-env",
   {
    //  usage 用到哪些就引用哪些
    // false 不使用任何polyfill
    targets: {
      edge: "17",
      firefox: "60",
      chrome: "67",
      safari: "11.1",
    },
    useBuiltIns:'usage',
    corejs: "3.25.5" //如果不写这个默认是corejs2
   }
  ]
  ],
  // 避免全局污染的打包方式可以用这种
// plugins:[
//   ['@babel/plugin-transform-runtime',{
//     corejs:3
//   }]
// ]
};