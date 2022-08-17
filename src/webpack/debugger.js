
// const webpack = require('webpack');
// const webpackOptions = require("./webpack.config");

// const compiler = webpack(webpackOptions);
// debugger;
// compiler.run((err,stats)=>{
//     console.log('error:',err)
//     console.log(
//         stats.toJson({
//             entries:true,
//             chunks:true,
//             modules:true,
//             _modules:true,
//             assets:true
//         })
//     )
// });




const webpack = require("。/webpack");
const webpackOptions = require("./webpack.config");

const compiler = webpack(webpackOptions);
debugger;
compiler.run((err, stats) => {
  console.log("error:", err);
  console.log(
    stats.toJson({
      entries: true,
      chunks: true,
      modules: true,
      _modules: true,
      assets: true,
    })
  );
});