/*
 * @lc app=leetcode.cn id=82 lang=javascript
 *
 * [82] 删除排序链表中的重复元素 II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
  const listNode = new ListNode()
  listNode.next = head
  let node = listNode
  while(node.next) {
    if (node.next.next && node.next.val === node.next.next.val) {
      let nonValNode = node.next.next.next
      while(nonValNode && nonValNode.val === node.next.val) {
        nonValNode = nonValNode.next
      }
      node.next = nonValNode
    } else {
      node = node.next
    }
  }
  return listNode.next
};
// @lc code=end

