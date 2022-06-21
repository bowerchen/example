/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  let l = 0, r = height.length - 1, result = 0
  while(l < r) {
    let tmp = (r - l) * Math.min(height[l], height[r])
    if (tmp > result) {
      result = tmp
    }
    if (height[l] <= height[r]) {
      l++
    } else {
      r--
    }
  }
  return result
};
// @lc code=end

