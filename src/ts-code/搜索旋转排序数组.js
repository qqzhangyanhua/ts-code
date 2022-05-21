var nums = [4, 5, 6, 7, 0, 1, 2]

function search(nums, target) {

    let l = 0;
    let r = nums.length - 1;
    while (l <= r) {
        let mid = l + ((r - l) >> 1)
        if (nums[mid] === target) {
            // 找到了就立即返回
            return mid
        } else if (nums[mid] < target) {
            if (nums[mid] >= nums[0]) {
                l = mid + 1
            } else {
                if (target < nums[0]) {
                    l = mid + 1
                } else {
                    r = mid - 1
                }
            }
        } else if (nums[mid] > target) {
            if (nums[mid] >= nums[0]) {
                if (target < nums[0]) {
                    l = mid + 1
                } else {
                    r = mid - 1
                }

            } else {
                r = mid - 1
            }
        }
    }
    return -1

}
console.log(search(nums, 0))