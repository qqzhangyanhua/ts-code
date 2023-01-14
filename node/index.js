//遍历找到所有的图片
const fs = require("fs");
const path = require("path");
const SparkMD5 = require("spark-md5");
const sparkMD52 = new SparkMD5.ArrayBuffer();
const imgArr = [];
const allImgArr = [];
const imgType = [".png", ".jpg", ".jpeg", ".gif"];
const obj = {
  js: 0,
  jsMap: new Map(),
  jsArr: [],
  vue: 0,
  vueMap: new Map(),
  vueArr: [],
  json: 0,
  css: 0,
  scss: 0,
  scssMap: new Map(),
  scssArr: [],
};
function getMd5(fullFilePath) {
  const buffer = fs.readFileSync(fullFilePath);
  sparkMD52.append(buffer);
  const hexHash = sparkMD52.end();
  return hexHash;
}
function getNums(type, file, fullFilePath, size) {
  if (!type) return;
  const val = type.replace(".", "");
  if (!obj.hasOwnProperty(val)) return;
  //todo 带优化
  if (val === "js") {
    const hexHash = getMd5(fullFilePath);
    if (obj.jsMap.has(hexHash)) {
      const similar = obj.jsMap.get(hexHash).fullFilePath;
      obj.jsArr.push({ similar, fullFilePath, size });
    } else {
      obj.jsMap.set(hexHash, { file, fullFilePath });
    }
  } else if (val === "vue") {
    const hexHash = getMd5(fullFilePath);
    if (obj.vueMap.has(hexHash)) {
      const similar = obj.vueMap.get(hexHash).fullFilePath;
      obj.vueArr.push({ similar, fullFilePath, size });
    } else {
      obj.vueMap.set(hexHash, { file, fullFilePath });
    }
  } else if (val === "scss") {
    const hexHash = getMd5(fullFilePath);
    if (obj.scssMap.has(hexHash)) {
      const similar = obj.scssMap.get(hexHash).fullFilePath;
      obj.scssArr.push({ similar, fullFilePath, size });
    } else {
      obj.scssMap.set(hexHash, { file, fullFilePath });
    }
  }
  obj[val]++;
}
const repeatImgArr = [];
const findSync = (pkg) => {
  sync = fs.readdirSync(pkg);
  sync.forEach((file) => {
    if (file === "node_modules") return;
    let fullFilePath = path.join(pkg, file);
    let fileStat = fs.statSync(fullFilePath);

    //是否还是文件夹,如果还是文件夹就递归处理
    if (fileStat.isDirectory()) {
      findSync(fullFilePath);
    } else {
      // console.log("=======fileStat", fileStat);
      const ext = path.extname(file);
      const buffer = fs.readFileSync(fullFilePath);
      sparkMD52.append(buffer);
      const hexHash = sparkMD52.end();
      getNums(ext, file, fullFilePath, fileStat.size);

      if (
        isInclude(allImgArr, { name: file, size: fileStat.size, md5: hexHash })
      ) {
        const similar = getSimilarImg(hexHash);
        repeatImgArr.push({
          fullFilePath,
          size: fileStat.size,
          similar,
        });
      }
      if (imgType.includes(ext)) {
        imgArr.push(fullFilePath); //全路径
        allImgArr.push({
          name: file,
          size: fileStat.size,
          md5: hexHash,
          fullFilePath,
        });
      }
    }
  });
};
//判断是否有重复的图片 名字,和大小一致即判定为重复图片
function isInclude(arr, obj) {
  const val = arr.find((item) => item.md5 === obj.md5);
  if (val) {
    return true;
  }
  return false;
}
function getSimilarImg(md5) {
  const val = allImgArr.find((item) => item.md5 === md5);
  return val.fullFilePath;
}
function getEntryFolder() {
  return process.argv[2];
}
function init() {
  const folder = getEntryFolder() || "images";
  findSync(folder);
}
init();
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
  return size;
}
// console.log("总共有多少图片", imgArr);
// console.log("obj", allImgArr);
// console.log("共有重复图片", repeatImgArr.sort());
console.log("共有js文件", obj.js);
console.log("共有json文件", obj.json);
console.log("共有vue文件", obj.vue);
console.log("共有css文件", obj.css);
console.log("共有scss文件", obj.scss);
console.log("共有图片", imgArr.length);
console.log("共有重复图片", repeatImgArr.length);
console.log("共有重复js", obj.jsArr.length);
console.log("共有重复vue", obj.vueArr.length);
console.log("共有重复scss", obj.scssArr.length);
console.log("重复文件占用大小", getAllSize(obj));

function writeJson(data, name) {
  fs.writeFile(name, data, (err, data) => {
    if (err) {
    } else {
      console.log("生成扫描文件成功");
    }
  });
}

const repeatImg = `
共有重复图片: ${repeatImgArr.length}
  ${JSON.stringify(repeatImgArr, null, 2)}
`;
const repeatJs = `
共有重复js: ${obj.jsArr.length}
  ${JSON.stringify(obj.jsArr, null, 2)}
`;
const repeatVue = `
共有重复vue: ${obj.vueArr.length}
  ${JSON.stringify(obj.vueArr, null, 2)}`;
const repeatScss = `
共有重复scss: ${obj.scssArr.length}
  ${JSON.stringify(obj.scssArr, null, 2)}`;
writeJson(repeatImg, "./repeatImg.text");
writeJson(repeatJs, "./repeatJs.text");
writeJson(repeatVue, "./repeatVue.text");
writeJson(repeatScss, "./repeatScss.text");
