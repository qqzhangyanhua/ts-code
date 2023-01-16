const SparkMD5 = require("spark-md5");
const fs = require("fs");
const path = require("path");
const imgType = [".png", ".jpg", ".jpeg", ".gif"];
console.log(process.cwd());
var sparkMD52 = new SparkMD5.ArrayBuffer();
fs.readdirSync("images").forEach((file) => {
  let fullFilePath = path.join("images", file);
  let fileStat = fs.statSync(fullFilePath);
  if (fileStat.isDirectory()) {
    return;
  }
  const ext = path.extname(file);
  if (imgType.includes(ext)) {
    const buffer = fs.readFileSync(fullFilePath);
    // var hexHash = SparkMD5.hash(buffer);
    sparkMD52.append(buffer);
    var hexHash = sparkMD52.end();
    console.log("file=====", hexHash);
  }
});
