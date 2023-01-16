const SparkMD5 = require("spark-md5");
const sparkMD52 = new SparkMD5.ArrayBuffer();
const fs = require("fs");
function getMd5(fullFilePath) {
  const buffer = fs.readFileSync(fullFilePath);
  sparkMD52.append(buffer);
  const hexHash = sparkMD52.end();
  return hexHash;
}
function getAllSize(obj) {
  let size = 0;
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      const item = obj[key];
      for (let i = 0; i < item.length; i++) {
        size += item[i].size;
      }
    }
  }
  return size > 1024 ? parseInt(size / 1024) + "kb" : `${size}byte`;
}
function getTypeof(a) {
  const str = Object.prototype.toString.call(a);
  return /^\[object (.*)\]$/.exec(str)[1];
}
module.exports = {
  getMd5,
  getAllSize,
  getTypeof,
};
