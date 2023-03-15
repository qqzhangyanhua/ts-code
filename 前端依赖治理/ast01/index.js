// TS编译器
const tsCompiler = require("typescript");
const fs = require("fs-extra");
// 待分析代码片段字符串
const tsCode = `import { app } from 'framework'; // 引入框架

const dataLen = 3;
let name = 'iceman';

if(app){
    console.log(name);
}

function getInfos (info: string) {
    const result = app.get(info);
    return result;
}`;

// 第一个参数为命名，可以随意填，
// 第二个参数是需要生成AST的源代码字符串
// 第三个参数表示TS编译器版本
// 第四个参数表示是否添加parent节点信息
const ast = tsCompiler.createSourceFile(
  "xxx",
  tsCode,
  tsCompiler.ScriptTarget.Latest,
  true
);
// console.log(ast);
function walk(node) {
  // AST遍历函数
  tsCompiler.forEachChild(node, walk); // 遍历AST节点
  //   console.log(node); // 输出节点信息
  if (tsCompiler.isVariableDeclaration(node)) {
    if (tsCompiler.isVariableDeclaration(node)) {
      console.log("声明变量", node.name.escapedText);
      // 获取当前node节点所在代码行
     const line =  ast.getLineAndCharacterOfPosition(node.getStart()).line + 1;
     console.log('line', line);
     
    }
  }
}

walk(ast);
