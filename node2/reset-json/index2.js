const fs = require("fs");
const path = require("path");
// const json = require("./data/4.js");

function write() {
  const sync = fs.readdirSync("./data2");
  console.log(sync);

  sync.forEach((file) => {
    const fullFilePath = path.join("./data2", file);
    const json1 = require(`./data2/${file}`);
    console.log(json1);
    // fs.readFile(fullFilePath, "utf-8", (err, data) => {
    //   if (err) {
    //     console.log("something wrong", err);
    //   }

    //   const val = data.replace("module.exports =", "");
    fs.writeFile(
      `./json/${file.split(".")[0]}.json`,
      JSON.stringify(json1, null, 2),
      (err, data) => {
        if (err) {
          console.log("something wrong", err);
        }
      }
    );
    // });
  });
  //   console.log(json);

  //   fs.writeFile("4.json", JSON.stringify(json, null, 2), (err, data) => {
  //     if (err) {
  //       console.log("something wrong", err);
  //     }
  //   });
}
write();
