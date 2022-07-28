/*** 
 * @Author: ZYH
 * @Date: 2022-07-28 09:15:29
 * @LastEditTime: 2022-07-28 09:15:29
 * @Description: 
 */
class Solution
{
public:
    bool searchMatrix(vector<vector<int>> &matrix, int target)
    {
        int m = matrix.size();
        int n = matrix[0].size();
        for (int i = 0; i < m; ++i)
        {
            int l = 0, r = n - 1;
            while (l <= r)
            {
                int mid = (l + r) >> 1;
                if (target > matrix[i][mid])
                {
                    l = mid + 1;
                }
                else if (target < matrix[i][mid])
                {
                    r = mid - 1;
                }
                else
                {
                    return true;
                }
            }
        }
        return false;
    }
};