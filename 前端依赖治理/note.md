### 关于小册,依赖治理

- AST 抽象语法树

- parse -traverse -transform -generate

// 1.解析代码生成AST对象
SourceCode（源码）~~ 扫描器 ~~> Token 流 ~~ 解析器 ~~> AST

// 2.为AST节点绑定符号
AST ~~ 绑定器 ~~> Symbols

// 3.语义检查，类型检查
AST + Symbols ~~ 检查器 ~~> 类型验证，语义上下文判断

// 4.代码生成阶段（代码分析不需要关注这个阶段）
AST + 检查器 ~~ 发射器 ~~> JavaScript 代码 （无需关注）