
const esprima = require('esprima');
const estraverse = require('estraverse');
const sourceCode = `function ast(){}`;
const escodegen = require('escodegen');
 let ast = esprima.parseScript(sourceCode);

 estraverse.traverse(ast, {
    //深度优先遍历
    enter: function (node) {
        console.log('enter', node.type);
        if (node.type === 'Identifier') {
            //更改节点的name属性
           node.name='hello';}
    },
    leave: function (node) {
        console.log('leave', node.type);
    }
 });

 //生成代码
 let code = escodegen.generate(ast);
 console.log(code);
 
