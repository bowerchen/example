/*
 * @lc app=leetcode.cn id=74 lang=javascript
 *
 * [74] 搜索二维矩阵
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  let len = matrix.length;
  let value = -1
  for (let i = 0; i < len; i++) {
    matrix[i].forEach((num) => {
      if (num === target) {
        value = 1
      }
    })
  }
  if (value === 1) {
    return true
  } else {
    return false
  }
};
// @lc code=end
