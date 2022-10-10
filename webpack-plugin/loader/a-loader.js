const reg = /(console.log()(.*)())/g;
function aLoader(source, map, meta) {
  const options = this.getOptions()
  source = source.replace(reg, "")
    // 再把处理好的内容return出去，坚守输入输出都是字符串的原则，并可达到链式调用的目的供下一个loader处理
    return source

}
aLoader.pitch = function (remainingRequest, precedingRequest, data) {
  console.log("开始执行aLoader Pitching Loader");
  console.log(remainingRequest, precedingRequest, data)
};

module.exports = aLoader;