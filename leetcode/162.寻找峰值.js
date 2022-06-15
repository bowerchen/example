/*
 * @lc app=leetcode.cn id=162 lang=javascript
 *
 * [162] 寻找峰值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
  let start = 0, end = nums.length - 1
  if (nums.length === 1) return 0
  while (start < end) {
    let mid = (start + end) >> 1
    if (nums[mid] > nums[mid + 1]) {
      end = mid
    } else {
      start = mid + 1
    }
  }
  return start
};
// @lc code=end

