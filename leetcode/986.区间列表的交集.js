/*
 * @lc app=leetcode.cn id=986 lang=javascript
 *
 * [986] 区间列表的交集
 */

// @lc code=start
/**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */
var intervalIntersection = function(firstList, secondList) {
  let firstIndex = 0, secondIndex = 0, result = []
  if (firstList.length === 0 || secondList.length === 0) return result
  
  while (firstList.length > firstIndex && secondList.length > secondIndex) {
    let maxStart = Math.max(firstList[firstIndex][0], secondList[secondIndex][0])
    let minEnd = Math.min(firstList[firstIndex][1], secondList[secondIndex][1])

    if (maxStart <= minEnd) result.push([maxStart, minEnd])

    if (firstList[firstIndex][1] < secondList[secondIndex][1]) {
      firstIndex++
    } else {
      secondIndex++
    }
  }
  return result;
};
// @lc code=end

