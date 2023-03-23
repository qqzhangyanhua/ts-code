const babel = require("@babel/core");
const sourceCode = `
  const sum =(a,b)=>{
    console.log(this)
    return a+b
  }
`;
const t = require("@babel/types"); //babel的types模块,生成对应的表达式
// const arrowFnPlugin =require('@babel/plugin-transform-arrow-functions');
const hoistFunctionEnvironment = (path) => {
  //首先要明确箭头函数的this是在定义时决定的
  // 向上查找的不是箭头函数的函数或者根节点
  const thisEnv = path.findParent((p) => {
    return (p.isFunction() && !p.isArrowFunctionExpression()) || p.isProgram();
  });
  let thisBinding = "_this";
  let thisPaths = getScopeInfo(path);
  //如果当前的作用域中没有_this,就将this替换成_this
  //  如果没有this就不要替换了
  if (thisPaths.length > 0) {
    if (!thisEnv.scope.hasBinding(thisBinding)) {
      thisEnv.scope.push({
        id: t.identifier(thisBinding),
        init: t.thisExpression(),
      });
    }
  }
  thisPaths.forEach((p) => {
    p.replaceWith(t.identifier(thisBinding));
  });
};
const getScopeInfo = (path) => {
  let thisPaths = [];
  path.traverse({
    //遍历当前路径下的所有节点
    ThisExpression(path) {
      thisPaths.push(path);
    },
  });
  return thisPaths;
};
const arrowFnPlugin = {
  visitor: {
    ArrowFunctionExpression(path) {
      hoistFunctionEnvironment(path);
      //   node.type = "FunctionExpression";
      const params = path.node.params;
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
const targetCode = babel.transform(sourceCode, {
  plugins: [arrowFnPlugin],
});
console.log(targetCode.code);
