const path = require("path");
const fs = require("fs");
const { toUpperFirst } = require("./utils");
const semiObj = {
  vue: [],
  js: [],
  html: [],
  css: [],
  scss: [],
  less: [],
  json: [],
  img: [],
  fullVue: [],
  fullJs: [],
  fullHtml: [],
  fullCss: [],
  fullScss: [],
  fullLess: [],
  fullJson: [],
  fullImg: [],
};
const map = new Map();
//获取传入的参数
function getEntryFolder() {
  return process.argv[2];
}
//开始执行
function init(pkg) {
  sync = fs.readdirSync(pkg);
  sync.forEach((file) => {
    if (file === "node_modules") return;
    let fullFilePath = path.join(pkg, file);
    let fileStat = fs.statSync(fullFilePath);
    const ext = path.extname(file);
    //如果还是文件架就递归处理
    if (fileStat.isDirectory()) {
      init(fullFilePath);
    } else {
      // console.log(file);
      saveFileName(file, fullFilePath);
    }
  });
}
function saveFileName(file, fullFilePath) {
  const ext = path.extname(file).replace(".", "");
  if (semiObj.hasOwnProperty(ext)) {
    semiObj[ext].push(file);
    semiObj[`full${toUpperFirst(ext)}`].push(fullFilePath);
  }
}
const pkg = getEntryFolder() || process.cwd();
init(pkg);

function readAllFiles() {
  if (semiObj.fullVue.length > 0) {
    const arr = semiObj.fullVue;
    arr.forEach((fullFilePath) => {
      fs.readFile(fullFilePath, "utf-8", (err, data) => {
        if (err) {
          console.log(err);
        }
        //先判断是否有引入,如果没有引入的文件就不做处理
        if (data.includes("import")) {
          // console.log("有引入文件==", data);
          //这个正则会匹配所有的import语句 不包含 'import {} from' ,''import * as' , 'import()'
          const reg = /import\s+\w+\s+from\s+['"](.*)['"]/g;
          const importArr = data.match(reg);
          if (importArr && importArr.length > 0) {
            const arr = importArr.map((item) => {
              const val = item.replace(
                /import\s+\w+\s+from\s+['"](.*)['"]/g,
                "$1"
              );
              return val; //path.resolve(fullFilePath, val);
            });
            map.set(fullFilePath, arr);
          }

          // console.log("arr1==", importArr);
        }
      });
    });
    console.log("==========", map);
  }
}
//计划用链表存储
function ListNode(val) {
  this.val = val;
  this.next = null;
}
readAllFiles();
setTimeout(() => {
  console.log("==========", map);
}, 1000);
// console.log(semiObj);
//生成map  父===>子
