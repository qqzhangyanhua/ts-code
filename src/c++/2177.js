/*
 * @Author: ZYH
 * @Date: 2022-08-03 08:41:24
 * @LastEditTime: 2022-08-03 08:41:26
 * @Description: 
 */
class Solution {
public:
    vector<long long> sumOfThree(long long num) {
        // i + (i + 1) + (i + 2) = num
        if(num % 3){
            return {};
        }
        long long i = (num - 3)/3;
        return {i,i+1,i+2};
        
    }
};
