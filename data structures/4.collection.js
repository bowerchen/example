/**
 * Set: 不允许重复且没有顺序概念的集合
 *  - add(value): 向集合添加一个新的项
 *  - remove(value): 从集合移除一个值
 *  - has(value): 如果值在集合中，返回true, 否则返回false
 *  - clear(): 移除集合中的所有项
 *  - size(): 返回集合所包含元素的数量。与数组的length属性类似
 *  - values(): 返回一个包含集合中所有值的数组
 */

function Set() {
  let items = {};

  this.has = function (value) {
    // return value in items
    return items.hasOwnProperty(value);
  };

  this.add = function (value) {
    if (!this.has(value)) {
      items[value] = value;
      return true;
    }
    return false;
  };

  this.remove = function (value) {
    if (this.has(value)) {
      delete items[value];
      return true;
    }
    return false;
  };

  this.clear = function () {
    this.items = {};
  };

  this.size = function () {
    return Object.keys(items).length;
  };

  this.sizeLegacy = function () {
    let count = 0;
    for (let key in items) {
      if (items.hasOwnProperty(key)) {
        ++count;
      }
    }
    return count;
  };

  this.values = function () {
    let values = [];
    for (let i = 0, keys = Object.keys(items); i < keys.length; i++) {
      values.push(items[keys[i]]);
    }
    return values;
  };

  this.valuesLegacy = function () {
    let values = [];
    for (let key in items) {
      if (items.hasOwnProperty(key)) values.push(items[key]);
    }
    return values;
  };

  /**
   * 集合操作 - 并集
   */
  this.union = function (otherSet) {
    let unionSet = new Set();

    let values = this.values();
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i]);
    }

    values = otherSet.values();
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i]);
    }

    return unionSet;
  };

  /**
   * 集合操作 - 交集
   */
  this.intersection = function (otherSet) {
    let intersectionSet = new Set();

    let values = this.values();
    for (let i = 0; i < values.length; i++) {
      if (otherSet.has(values[i])) {
        intersectionSet.add(values[i]);
      }
    }
    return intersectionSet;
  };

  /**
   * 集合操作 - 差集
   */
  this.difference = function (otherSet) {
    let differenceSet = new Set();

    let values = this.values();
    for (let i = 0; i < values.length; i++) {
      if (!otherSet.has(values[i])) differenceSet.add(values[i]);
    }
    return differenceSet;
  };

  /**
   * 集合操作 - 子集
   */
  this.subset = function (otherSet) {
    if (this.size() > otherSet.size()) {
      return false;
    } else {
      let values = this.values();
      for (let i = 0; i < values.length; i++) {
        if (!otherSet.has(values[i])) return false;
      }
    }
    return true;
  };
}

let set = new Set();
set.add(1);
set.add(2);
// console.log(set.values());
// console.log(set.has(2));
// console.log(set.has(3));
// console.log(set.remove(1));
// console.log(set.size());

let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

let setB = new Set();
setB.add(3);
setB.add(5);
setB.add(7);
setB.add(1);
setB.add(2);

console.log(setA.union(setB).values());
console.log(setA.intersection(setB).values());
console.log(setA.difference(setB).values());
console.log(setA.subset(setB));
