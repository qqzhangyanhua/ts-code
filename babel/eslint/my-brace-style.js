module.exports = {
    //meta  描述各种元信息,比如文档描述,是否可修复,错误信息
    meta: {
        docs: {
            description: "enforce consistent brace style for blocks"
        },

        fixable: true,

        messages: {
            braceError: '大括号格式不对',
            spaceError: '大括号前缺少空格'
        }
    },
    //rule 规则的具体实现
    create(context) {
     const sourceCode = context.getSourceCode();
        return {
           BlockStatement(node) {
               const firstToken = sourceCode.getFirstToken(node);
               const beforFirstToken = sourceCode.getTokenBefore(node);
                console.log(firstToken.value);
                console.log('ssss',beforFirstToken.value);
                
               if (firstToken.loc.start.line !== beforFirstToken.loc.start.line) {
                   context.report({
                       node,
                       loc: firstToken.loc,
                       messageId: 'braceError',
                       fix: fixer => {
                           return fixer.replaceTextRange([beforFirstToken.range[1], firstToken.range[0]], ' ');
                       }
                   });
               } else if (firstToken.loc.start.column === beforFirstToken.loc.start.column + 1){
                   context.report({
                       node,
                       loc: firstToken.loc,
                       messageId: 'spaceError',
                       fix: fixer => {
                           return fixer.replaceTextRange([beforFirstToken.range[1], firstToken.range[0]], ' ');
                       }
                   });
               }
           }
       }
   }
};