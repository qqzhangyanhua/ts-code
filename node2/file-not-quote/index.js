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
//获取传入的参数
function getEntryFolder() {
  return process.argv[2];
}
//开始执行
function init() {
  const pkg = getEntryFolder() || process.cwd();
  sync = fs.readdirSync(pkg);
  console.log(sync);
  sync.forEach((file) => {
    let fullFilePath = path.join(pkg, file);
    let fileStat = fs.statSync(fullFilePath);
    const ext = path.extname(file);
    //如果还是文件架就递归处理
    if (fileStat.isDirectory()) {
      init(fullFilePath);
    } else {
      console.log(file);
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
init();

function readAllFiles() {
  fs.readFile(fullFilePath, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log("222222222", data);
  });
}
readAllFiles();
console.log(semiObj);
