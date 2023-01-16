### 关于 file-nums

- 用来统计项目的文件数量以及统计项目的重复文件
- 对于大型项目可以扫描出重复文件，从而减少项目的体积
- 会生成一个 file-num 文件夹，用来记录项目的文件数量

### 使用方法

```shell
npm install file-nums
 # 在package.json中添加
 "scripts": {
    "file-nums": "file-nums"
  }
# 在项目根目录下执行
npm run file-nums
or
npx file-nums 全路径

```
