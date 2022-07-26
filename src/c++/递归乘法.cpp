/*** 
 * @Author: ZYH
 * @Date: 2022-07-26 08:22:19
 * @LastEditTime: 2022-07-26 08:22:19
 * @Description: 
 */
class Solution
{
public:
    int multiply(int A, int B)
    {
        int Max = max(A, B);
        int Min = min(A, B);
        if (Min == 0)
        {
            return 0;
        }
        return multiply(Min - 1, Max) + Max;
    }
};