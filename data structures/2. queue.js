/**
 * 队列: 先进先出 (FIFO)
 */

function Queue() {
  let items = []

  this.enqueue = function(element) {
    items.push(element)
  }

  this.dequeue = function() {
    return items.shift()
  }

  this.front = function() {
    return items[0]
  }

  this.isEmpty = function() {
    return items.length == 0
  }

  this.size = function() {
    return items.length
  }

  this.print = function() {
    console.log(items.toString()) 
  }
}

/**
 * ES6 class + weakMap
 */

// let Queue = (function() {
//   let items = new WeakMap();

//   class Queue {
//     constructor() {
//       items.set(this, [])
//     }
//     enqueue(element) {
//       let q = items.get(this)
//       q.push(element)
//     }
//     dequeue() {
//       let q = items.get(this)
//       let r = q.shift()
//       return r1
//     }
//   }
//   return Queue
// })()


/**
 * 案例1 - 优先队列
 */
function PriorityQueue() {
  let items = []
  function QueueElement(element, priority) {
    this.element = element
    this.priority = priority 
  }

  this.enqueue = function(element, priority) {
    let queueElement = new QueueElement(element, priority)

    let added = false
    for(let i=0; i<items.length; i++) {
      if (queueElement.priority < items[i].priority) {
        items.splice(i, 0, queueElement)
        added = true
        break;
      }
    }

    if (!added) {
      items.push(queueElement)
    }
  }

  this.print = function() {
    for(let i=0; i<items.length; i++) {
      console.log(`${items[i].element} - ${items[i].priority}`)
    }
  }
}

let priorityQueue = new PriorityQueue()
priorityQueue.enqueue("chen", 2)
priorityQueue.enqueue("xie", 1)
priorityQueue.enqueue("zhuo", 1)
priorityQueue.print()


/**
 * 案例2 - 循环队列（击鼓传花）
 */

function hotPotato(nameList, num) {
  let queue = new Queue()

  for (let i=0; i<nameList.length; i++) {
    queue.enqueue(nameList[i])
  }

  let eliminated = ''
  while(queue.size() > 1) {
    for (let i=0; i<num; i++) {
      queue.enqueue(queue.dequeue())
    }
    eliminated = queue.dequeue()
    console.log(eliminated + '在击鼓传花游戏中淘汰')
  }

  return queue.dequeue()
}

let names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl']
let winner = hotPotato(names, 19)
console.log("The winner is: " + winner)

