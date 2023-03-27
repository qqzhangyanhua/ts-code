// compile-sfc.js
const fs = require('fs');
const { parse, compileTemplate, compileScript, compileStyle } = require('@vue/compiler-sfc');

// 读取 .vue 文件内容
const source = fs.readFileSync('./demo.vue', 'utf-8');

// 解析 .vue 文件
const { descriptor } = parse(source);
// 处理 <template> 部分
if (descriptor.template) {
  const templateResult = compileTemplate({
    source: descriptor.template.content,
    filename: 'example.vue'
  });
  console.log('Compiled template:\n', templateResult.code);
}

// 处理 <script> 部分
if (descriptor.script || descriptor.scriptSetup) {
    const scriptResult = compileScript(descriptor, { id: 'example' });
    console.log('Compiled script:\n', scriptResult.content);
}

// 处理 <style> 部分
// if (descriptor.styles.length > 0) {
//   descriptor.styles.forEach((style, index) => {
//     const styleResult = compileStyle({
//       source: style.content,
//       filename: 'example.vue',
//       id: `data-v-${descriptor.id}`,
//       scoped: style.scoped
//     });
//     console.log(`Compiled style ${index + 1}:\n`, styleResult.code);
//   });
// }
