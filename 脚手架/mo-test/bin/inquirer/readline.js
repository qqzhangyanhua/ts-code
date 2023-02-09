const readLine = require("readline");
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("请输入内容", (answer) => {
  console.log("输入的内容是", answer);
  rl.close();
});
