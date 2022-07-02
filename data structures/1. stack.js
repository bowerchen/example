/**
 * 栈： 后进先出（LIFO）
 * 
 * 常用方法：
 *  push(element) 添加新元素到栈顶
 *  pop()         移除栈顶元素
 *  peek()        返回栈顶元素
 *  isEmpty()     栈没有元素返回true, 否则返回false
 *  clear()       移除栈里的所有元素
 *  size()        返回栈里的元素个数
 */
function Stack() {
  let items = []

  this.push = function(element) {
    return items.push(element)
  }  

  this.pop = function() {
    return items.pop()
  }
  
  this.peek = function() {
    return items[items.length - 1]
  }

  this.isEmpty = function() {
    return items.length === 0
  }

  this.size = function() {
    return items.length;
  }

  this.clear = function() {
    items = []
  }

  this.print = function() {
    console.log(items.toString())
  }
}


// let stack= new Stack()
// stack.push(1)
// stack.push(3)
// stack.push(6)
// stack.print()
// stack.pop()
// stack.print()
// console.log(stack.peek())
// console.log(stack.size())
// console.log(stack.isEmpty())


/**
 * ES6 class
 */

// let _items = Symbol()
// class Stack {
//   constructor() {
//     this[_items] = []
//   }
//   push(element) {}
//   pop() {}
//   // ...
// }


/**
 * ES6 weakMap
 */

// let Stack = (function() {
//   const items = new WeakMap()
//   class Stack {
//     constructor() {
//       items.set(this, [])
//     }
//   }
//   return Stack
// })()


/**
 * 案例1   十进制到二进制
 */

function baseConverter(decNumber, base) {
  let remStack = new Stack(),
      rem,
      baseString = '',
      digits = '0123456789ABCEF'
  
  while(decNumber > 0) {
    rem = Math.floor(decNumber % base)
    remStack.push(rem)
    decNumber = Math.floor(decNumber % base)
  }

  while(!remStack.isEmpty()) {
    baseString += digits[remStack.pop()]
  }

  return baseString
}

console.log(baseConverter(45, 2))
// console.log(baseConverter(10345, 8))
// console.log(baseConverter(10345, 16))