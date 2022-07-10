/**
 * 链表(LinkNode)
 *  - 缺点： 数组起点或中间插入或移除元素成本高
 *  - 优点： 添加或移除元素不需要移动其他元素
 */

function LinkedList() {
  let Node = function (element) {
    this.element = element;
    this.next = null;
  };

  let length = 0;
  let head = null;

  /**
   * 向列表尾部添加一个新的项
   * @param {*} element
   */
  this.append = function (element) {
    let node = new Node(element),
      current;

    if (head === null) {
      // 列表中第一个节点
      head = node;
    } else {
      current = head;
      // 循环列表，直到找到最后一项
      while (current.next) {
        current = current.next;
      }
      // 找到最后一项，将其next赋为node, 建立连接
      current.next = node;
    }
    // 更新列表的长度
    length++;
  };

  /**
   * 向列表的特定位置插入一个新的项
   * @param {number} position
   * @param {object} element
   */
  this.insert = function (position, element) {
    if (position >= 0 && position <= length) {
      let node = new Node(element),
        current = head,
        previous,
        index = 0;

      if (position === 0) {
        node.next = current;
        head = node;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
      }
      length++;
      return true;
    } else {
      return false;
    }
  };

  /**
   * 从列表的特定位置移除一项
   * @param {*} position
   */
  this.removeAt = function (position) {
    if (position > -1 && position < length) {
      let current = head,
        previous,
        index = 0;

      if (position === 0) {
        head = current.next;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        // 将previous与current的下一项链接起来，跳过current，移除它
        previous.next = current.next;
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };

  /**
   * 从列表中移除一项
   * @param {*} element
   */
  this.remove = function (element) {
    let index = this.indexOf(element);
    return this.removeAt(index);
  };

  /**
   * 返回元素在列表中的索引
   * @param {*} element
   */
  this.indexOf = function (element) {
    let current = head,
      index = 0;

    while (current) {
      if (element === current.element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  };

  /**
   * 链表中不包含任何元素返回true，否则返回false
   */
  this.isEmpty = function () {
    return length === 0;
  };

  /**
   * 返回链表包含的元素个数
   */
  this.size = function () {
    return length;
  };
  this.getHead = function () {
    return head;
  };
  this.toString = function () {
    let current = head,
      string = "";

    while (current) {
      string += current.element + (current.next ? "\n" : "");
      current = current.next;
    }

    return string;
  };
  this.print = function () {};
}

let list = new LinkedList();
list.append(15);
list.append(10);
// list.removeAt(1);
console.log(list.toString());

function DoublyLinkedList() {
  let Node = function (element) {
    this.element = element;
    this.next = null;
    this.prev = null;
  };

  let length = 0;
  let head = null;
  let tail = null;

  this.insert = function (position, element) {
    if (position >= 0 && position <= length) {
      let node = new Node(element),
        current = head,
        previous = head,
        index = 0;

      if (position === 0) {
        if (!head) {
          head = node;
          tail = node;
        } else {
          node.next = current;
          current.prev = node;
          head = node;
        }
      } else if (position === length) {
        current = tail;
        current.next = node;
        node.prev = current;
        tail = node;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;

        current.prev = node;
        node.prev = previous;
      }
      length++;
      return true;
    } else {
      return false;
    }
  };

  this.removeAt = function (position) {
    if (position > -1 && position < length) {
      let current = head,
        previous,
        index = 0;

      if (position === 0) {
        head = current.next;
        if (length === 1) {
          tail = null;
        } else {
          head.prev = null;
        }
      } else if (position === length - 1) {
        current = tail;
        tail = current.prev;
        tail.next = null;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
        current.next.prev = previous;
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };
}

module.exports =LinkedList