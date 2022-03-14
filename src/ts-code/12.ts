
// 大小写转换

function toLowerCase(str: string): string {
    let res = ''
    for (let i = 0; i < str.length; i++){
        let code = str[i].charCodeAt(0)
        if (code >= 65 && code <= 90) {
            res=res+str[i].toLowerCase()
        } else {
            res+=str[i]
        }

    }
    return res
}
console.log(toLowerCase('HellFFFOP'))