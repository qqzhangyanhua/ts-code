/*** 
 * @Author: ZYH
 * @Date: 2022-07-26 08:29:56
 * @LastEditTime: 2022-07-26 08:29:57
 * @Description: 
 */
class Solution
{
public:
    string reverseLeftWords(string s, int k)
    {
        int n = s.size();
        string ret = s;
        for (int i = 0; i < n; ++i)
        {
            ret[i] = s[(i + k) % n];
        }
        return ret;
    }
};
