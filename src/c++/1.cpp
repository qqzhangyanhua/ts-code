/*** 
 * @Author: ZYH
 * @Date: 2022-07-24 22:12:07
 * @LastEditTime: 2022-07-28 09:15:38
 * @Description: 
 */
#include<iostream>
 

 
using namespace std;
 
int main()
{
    cout << "Hello World!12341111111" << endl;
    system("pause");
    return 0;
}

class Solution
{
public:
    bool findNumberIn2DArray(vector<vector<int>> &matrix, int target)
    {
        for (int i = 0; i < matrix.size(); ++i)
        {
            for (int j = 0; j < matrix[0].size(); ++j)
            {
                if (matrix[i][j] == target)
                {
                    return true;
                }
            }
        }
        return false;
    }
};