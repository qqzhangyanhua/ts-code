/*** 
 * @Author: ZYH
 * @Date: 2022-07-26 08:25:03
 * @LastEditTime: 2022-07-26 08:25:03
 * @Description: 
 */
class Solution
{
public:
    bool isSameAfterReversals(int num)
    {
        if (num == 0)
        {
            return true;
        }
        if (num % 10 == 0)
        {
            return false;
        }
        return true;
    }
};
