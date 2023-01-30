const fs = require("fs");
const path = require("path");
// const json = require("./data/4.js");

function write() {
  const sync = fs.readdirSync("./data");
  console.log(sync);
  sync.forEach((file) => {
    const fullFilePath = path.join("./data", file);
    fs.readFile(fullFilePath, "utf-8", (err, data) => {
      if (err) {
        console.log("something wrong", err);
      }
      const val = data.replace("export default", "module.exports =");
      fs.writeFile(`./data2/${file}`, val, (err, data) => {
        if (err) {
          console.log("something wrong", err);
        }
      });
    });
  });
  //   console.log(json);
  //   const json1 = require("./data/4.js");
  //   console.log(json1);

  //   fs.writeFile("4.json", JSON.stringify(json, null, 2), (err, data) => {
  //     if (err) {
  //       console.log("something wrong", err);
  //     }
  //   });
}
write();
