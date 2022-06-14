/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  // 自己解题
  // let arr = [];
  // let result = [];
  // nums.forEach(function (num, index) {
  //   if (num === target) {
  //     arr.push(index);
  //   }
  // });
  // if (arr.length === 0) {
  //   result = [-1, -1];
  // } else if (arr.length === 1) {
  //   result = [arr[0], arr[0]];
  // } else {
  //   result.push(arr[0]);
  //   result.push(arr[arr.length - 1]);
  // }
  // return result;

  // 别人解题： 二分查找
  // let left = 0, right = nums.length - 1, mid;
  // while (left <= right) {//二分查找target
  //     mid = (left + right) >> 1;
  //     if (nums[mid] === target) break;
  //     if (nums[mid] > target) right = mid - 1;
  //     else left = mid + 1;
  // }
  // if(left > right) return [-1, -1];
  // let i = mid, j = mid;
  // while(nums[i] === nums[i - 1]) i--;//向左尝试找相同的元素
  // while(nums[j] === nums[j + 1]) j++;//向右尝试找相同的元素
  // return [i, j];

  if (nums !== [] && nums.indexOf(target) !== -1) {
    let left = nums.indexOf(target);
    let right = nums.lastIndexOf(target);
    return [left, right];
  } else {
    return [-1, -1];
  }
};
// @lc code=end
