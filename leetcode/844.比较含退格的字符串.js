/*
 * @lc app=leetcode.cn id=844 lang=javascript
 *
 * [844] 比较含退格的字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  return edit(s) === edit(t)

  function edit(str) {
    let result = "";
    let backspace = 0;
    for (let i = str.length - 1; i >= 0; i--) {
      if (str[i] === "#") {
        backspace += 1;
      } else if (backspace > 0) {
        backspace -= 1;
      } else {
        result = str[i] + result;
      }
    }
    return result;
  }
};

// @lc code=end
