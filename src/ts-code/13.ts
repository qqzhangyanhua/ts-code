// 无线重复的最长字符

function getStringNum(str: string): number {
    const len = str.length;
    if (len === 0) return 0;
    let i = 0;
    let j = 0;
    let maxLength = 0;
    let set=new Set();
    for (; i < len; i++) {
        if (!set.has(str[i])) {
            // 如果set里没有
            set.add(str[i]);
            maxLength=Math.max(maxLength,set.size);
        } else {
            while (set.has(str[i])) {
                set.delete(str[j])
                j++
            }
            set.add(str[i]);
        }
    }
    return maxLength;
}
const str = 'abcabcd'
console.log(getStringNum(str))
export {}