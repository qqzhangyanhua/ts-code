const babel = require("@babel/core");
// const sourceCode = `const ast = (a,b) =>{a+b}`;
const sourceCode = `
    console.log(1);

    function func() {
        console.info(2);
    }

    export default class Clazz {
        say() {
            console.debug(3);
        }
        render() {
            return <div>{console.error(4)}</div>
        }
    }
`;
const t = require("@babel/types"); //babel的types模块,生成对应的表达式
const arrowFnPlugin = {
  visitor: {
    //当访问某个路径进行匹配时，会调用该方法
    ArrowFunctionExpression(path) {
      //获取箭头函数的参数
      const params = path.node.params;
      //获取箭头函数的函数体
      let body = path.node.body;
      if (!t.isBlockStatement(body)) {
        //如果是当前有代码块了,就不去处理了
        //否则就返回一个代码块,返回之前的表达式
        body = t.blockStatement([t.returnStatement(body)]);
      }

      let func = t.functionExpression(null, params, body, false, false);

      //将箭头函数替换成函数表达式
      path.replaceWith(func);
    },
  },
};
//调用babel的transform方法，将源码转换成AST
const code = babel.transform(sourceCode, {
  // presets: ['@babel/preset-env'],
  plugins: [
    arrowFnPlugin,
    //  '@babel/plugin-transform-arrow-functions',  //只转换箭头函数
  ],
});
console.log(code.code);
