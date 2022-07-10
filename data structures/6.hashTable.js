// import LinkedList from "./3. link";
let LinkedList = require('./3. link')

/**
 * 散列值： 详情参考字典
 *  - put(key, value): 向散列值增加一个新的项
 *  - remove(key): 根据键值从散列值中移除值
 *  - get(key): 返回根据键值检索到的特定的值
 *
 * 解决Hash冲突方法:
 *  - 分离链接
 *  - 线性探查
 *  - 双散列法
 */

function HashTable() {
  let table = [];

  this.put = function (key, value) {
    let position = loseHashCode(key);
    table[position] = value;
  };

  this.get = function (key) {
    return table[loseHashCode(key)];
  };

  this.remove = function (key) {
    table[loseHashCode(key)] = undefined;
  };

  this.print = function () {
    for (let i = 0; i < table.length; i++) {
      if (table[i] !== undefined) {
        console.log(`${i}: ${table[i]}`);
      }
    }
  };

  /**
   * 分离链接: 为散列表的每一个位置创建一个链表并将元素存储在里面
   * @param {*} key
   * @param {*} value
   */
  let ValuePair = function (key, value) {
    this.key = key;
    this.value = value;

    this.toString = function () {
      return `[${this.key} - ${this.value}]`;
    };

    this.put = function (key, value) {
      let position = loseHashCode(key);
      if (table[position] == undefined) {
        table[position] = new LinkedList();
      }
      table[position].append(new ValuePair(key, value));
    };
  
    this.get = function (key) {
      let position = loseHashCode(key);
      if (table[position] !== undefined) {
        let current = table[position].getHead();
        while (current.next) {
          if (current.element.key === key) {
            return current.element.value;
          }
          current = current.next;
        }
        // 检查元素在链表第一个或最后一个节点的情况
        if (current.element.key === key) {
          return current.element.value;
        }
      }
      return undefined;
    };
  
    this.remove = function(key) {
      let position = loseHashCode(key);
      if (table[position] !== undefined) {
        let current = table[position].getHead();
        while(current.next) {
          if (current.element.key === key) {
            table[position].remove(current.element)
            if (table[position].isEmpty()) {
              table[position] = undefined;
            }
            return true
          }
          current = current.next
        }
  
        // 检查是否为第一个或最后一个元素
        if (current.element.key === key) {
          table[position].remove(current.element)
          if (table[position].isEmpty()) {
            table[position] = undefined
          }
          return true
        }
      }
      return false
    }
  };

  /**
   * 线性探查：想向表中某个位置加入一个新元素，如果已存在，就尝试存储index+1位置;如果index+1也存在，则index+2。以此类推
   */
  this.put = function(key, value) {
    let position = djb2HashCode(key)
    if (table[position] == undefined) {
      table[position] = new ValuePair(key, value)
    } else {
      let index = ++position
      while (table[index] != undefined) {
        index++
      }
      table[index] = new ValuePair(key, value)
    }
  }

  this.get = function(key) {
    let position = djb2HashCode(key)
    if (table[position] == undefined) {
      if (table[position].key === key) {
        return table[position].value
      } else {
        let index = ++position
        while(table[index] === undefined || table[index].key !== key) {
          index++
        }
        if (table[index].key === key) {
          return table[index].value
        }
      }
    }
    return undefined
  }

  this.remove = function(key) {
    let position = djb2HashCode(key)
    if (table[position] == undefined) {
      if (table[position].key === key) {
        table[index] = undefined
        return true
      } else {
        let index = ++position
        while(table[index] === undefined || table[index].key !== key) {
          index++
        }
        if (table[index].key === key) {
          table[index] = undefined
          return true
        }
      }
    }
    return false
  }
}

const loseHashCode = function (key) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }
  return hash % 37;
};

const djb2HashCode = function(key) {
  let hash = 5381
  for (let i = 0; i<key.length; i++) {
    hash = hash*33 + key.charCodeAt(i)
  }
  return hash % 1013
}

let hash = new HashTable();
hash.put("bowerchen", "bowerchen@gmail.com");
hash.put("Jash", "Jash@gmail.com");
hash.put("John", "John@gmail.com");
hash.put("Chert", "Chert@gmail.com");
hash.put("Carry", "Carry@gmail.com");
hash.put("Canada", "Canada@gmail.com");
hash.print();

// console.log(hash.get('bowerchen'))
