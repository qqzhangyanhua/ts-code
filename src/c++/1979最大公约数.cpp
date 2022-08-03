/*** 
 * @Author: ZYH
 * @Date: 2022-08-03 08:37:03
 * @LastEditTime: 2022-08-03 08:37:04
 * @Description: 
 */
class Solution
{
    int gcd(int a, int b)
    {
        for (int i = a; i >= 1; --i)
        {
            if (a % i == 0 && b % i == 0)
            {
                return i;
            }
        }
        return 1;
    }

public:
    int findGCD(vector<int> &nums)
    {
        int maxv = 0, minv = 10000;
        for (int i = 0; i < nums.size(); ++i)
        {
            maxv = max(maxv, nums[i]);
            minv = min(minv, nums[i]);
        }
        return gcd(minv, maxv);
    }
};
