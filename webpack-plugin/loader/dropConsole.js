// source：表示当前要处理的内容
const reg = /(console.log()(.*)())/g;
module.exports = function(source) {
    // 通过正则表达式将当前处理内容中的console替换为空字符串
    source = source.replace(reg, "")
    // 再把处理好的内容return出去，坚守输入输出都是字符串的原则，并可达到链式调用的目的供下一个loader处理
    return source
}
