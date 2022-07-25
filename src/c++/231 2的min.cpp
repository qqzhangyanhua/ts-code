/*** 
 * @Author: ZYH
 * @Date: 2022-07-25 08:45:52
 * @LastEditTime: 2022-07-25 08:45:52
 * @Description: 
 */
class Solution
{
public:
    bool isPowerOfTwo(int n)
    {
        if (n <= 0)
        {
            return false;
        }
        if (n == 1)
        {
            return true;
        }
        long long ans = 1;
        while (1)
        {
            ans *= 2;
            if (ans == n)
            {
                return true;
            }
            else if (ans > n)
            {
                return false;
            }
        }
        return false;
    }
};