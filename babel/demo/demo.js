const { transformFromAstSync } = require("@babel/core");
const parser = require("@babel/parser");
const typeCheckerPlugin = require("./utils");

const sourceCode = `
function add(a: number, b: number): number{
    return a + b;
}
add(1, '2');
    let name: string = '111';
    const age: string = 18;
   
`;

const ast = parser.parse(sourceCode, {
  sourceType: "unambiguous",
  plugins: ["typescript"],
});

const { code } = transformFromAstSync(ast, sourceCode, {
  plugins: [
    [
      typeCheckerPlugin,
      {
        fix: true,
      },
    ],
  ],
  comments: true,
});

console.log(code);
