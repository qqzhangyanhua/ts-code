const fs = require("fs");
const path = require("path");
const SparkMD5 = require("spark-md5");
const sparkMD52 = new SparkMD5.ArrayBuffer();
const { getMd5, getAllSize, getTypeof } = require("./utils/utils");
const imgArr = [];
const allImgArr = [];
const imgType = [".png", ".jpg", ".jpeg", ".gif"];
const obj = {
  img: 0,
  imgMap: new Map(),
  imgArr: [],
  js: 0,
  jsMap: new Map(),
  jsArr: [],
  vue: 0,
  vueMap: new Map(),
  vueArr: [],
  json: 0,
  jsonMap: new Map(),
  jsonArr: [],
  css: 0,
  cssMap: new Map(),
  cssArr: [],
  scss: 0,
  scssMap: new Map(),
  scssArr: [],
  html: 0,
  htmlMap: new Map(),
  htmlArr: [],
  less: 0,
  lessMap: new Map(),
  lessArr: [],
};
function handelProcess(fullFilePath, map, arr, file, size) {
  const hexHash = getMd5(fullFilePath);
  if (map.has(hexHash)) {
    const similar = map.get(hexHash).fullFilePath;
    arr.push({ similar, fullFilePath, size });
  } else {
    map.set(hexHash, { file, fullFilePath });
  }
}
function getNums(type, file, fullFilePath, size) {
  if (!type) return;
  const val = type.replace(".", "");
  if (!obj.hasOwnProperty(val)) return;
  const countArr = ["js", "vue", "scss", "html", "less", "css", "json"];
  if (countArr.includes(val)) {
    handelProcess(fullFilePath, obj[`${val}Map`], obj[`${val}Arr`], file, size);
    obj[val]++;
  }
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
      const ext = path.extname(file);
      getNums(ext, file, fullFilePath, fileStat.size);
      const hexHash = getMd5(fullFilePath);
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
        handelProcess(
          fullFilePath,
          obj.imgMap,
          obj.imgArr,
          file,
          fileStat.size
        );
        obj.img++;
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
function printAll(obj) {
  // console.log("共有图片", imgArr.length);
  // console.log("共有重复图片", repeatImgArr.length);
  for (let key in obj) {
    const type = getTypeof(obj[key]);
    if (type === "Number") {
      console.log(`共有${key}文件`, obj[key]);
    } else if (type === "Array") {
      console.log(`共有重复${key.replace("Arr", "")}`, obj[key].length);
    }
  }
  console.log("重复文件占用大小", getAllSize(obj));
}
printAll(obj);
function writeJson(data, name) {
  fs.writeFile(name, data, (err, data) => {
    if (err) {
      console.log("something wrong", err);
    }
  });
}

function writeResult(obj) {
  fs.mkdir("./file-num", (err) => {
    if (err) {
      console.log("文件夹已存在");
    }
  });
  for (const key in obj) {
    const type = getTypeof(obj[key]);
    if (type === "Array" && obj[key].length > 0) {
      writeJson(JSON.stringify(obj[key], null, 2), `./file-num/${key}.json`);
    }
  }
  console.log("生成扫描文件成功");
}
writeResult(obj);

// const repeatImg = `
// 共有重复图片: ${repeatImgArr.length}
//   ${JSON.stringify(repeatImgArr, null, 2)}
// `;
// const repeatJs = `
// 共有重复js: ${obj.jsArr.length}
//   ${JSON.stringify(obj.jsArr, null, 2)}
// `;
// const repeatVue = `
// 共有重复vue: ${obj.vueArr.length}
//   ${JSON.stringify(obj.vueArr, null, 2)}`;
// const repeatScss = `
//   ${JSON.stringify(obj.scssArr, null, 2)}`;
// writeJson(repeatImg, "./file-num/repeatImg.md");
// writeJson(repeatJs, "./file-num/repeatJs.json");
// writeJson(repeatVue, "./file-num/repeatVue.text");
// writeJson(repeatScss, "./file-num/repeatScss.json");
