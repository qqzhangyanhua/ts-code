const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const template = require('@babel/template').default
const types = require('@babel/types');
const generate = require('@babel/generator').default;
// const ast = parser.parse(code, {
//     sourceType:"unambiguous",

// })
// const sourceCode = traverse(ast, {
//     FunctionDeclaration: {
//         enter(path, state) {
//             console.log('进入结点调用',path.node);
//         }, // 进入节点时调用
//         exit(path, state) {
//             console.log('离开节点时调用',path.node);
//         } // 离开节点时调用
//     }
//   })

//   console.log(sourceCode);
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

  
  const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['jsx']
});
const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);
traverse(ast, {
    CallExpression (path, state) {
        // if ( types.isMemberExpression(path.node.callee) 
        //     && path.node.callee.object.name === 'console' 
        //     && ['log', 'info', 'error', 'debug'].includes(path.node.callee.property.name) 
        //    ) {
        //     const { line, column } = path.node.loc.start;
        //     path.node.arguments.unshift(types.stringLiteral(`filename: (${line}, ${column})`))
        // }

        const calleeName = generate(path.node.callee).code;
        
        if (targetCalleeName.includes(calleeName)) {
            const { line, column } = path.node.loc.start;
            path.node.arguments.unshift(types.stringLiteral(`filename: (${line}, ${column})`))
        }
    }
});
const { code, map } = generate(ast);
console.log(code);