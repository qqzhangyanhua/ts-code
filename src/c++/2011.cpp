/*** 
 * @Author: ZYH
 * @Date: 2022-07-30 22:12:47
 * @LastEditTime: 2022-07-30 22:12:48
 * @Description: 
 */

class Solution
{
public:
    int finalValueAfterOperations(vector<string> &operations)
    {
        int x = 0;
        for (int i = 0; i < operations.size(); ++i)
        {
            if (operations[i][1] == '+')
            {
                x++;
            }
            else
            {
                x--;
            }
        }
        return x;
    }
};