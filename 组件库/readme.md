
##  尽量不要用cli
 
 # 使用lerna
  - npm i lerna -g
  - lerna init 初始化
  -  "npmClient":"yarn",  使用yarn管理 在lerna.json中配置
  - 安装typescript
    - lerna create @lerna-test/xxx 创建包
  - npx tsc --init 初始化tsconfig.json