/*** 
 * @Author: ZYH
 * @Date: 2022-07-27 08:53:55
 * @LastEditTime: 2022-07-27 08:53:56
 * @Description: 
 */
class Solution
{
public:
    vector<int> buildArray(vector<int> &nums)
    {
        int n = nums.size();
        vector<int> ans;
        for (int i = 0; i < n; ++i)
        {
            ans.push_back(nums[nums[i]]);
        }
        return ans;
    }
};