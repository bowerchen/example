/**
 * 树：存储快速查找的数据
 *  - insert(key):向树中插入一个新的键
 *  - search(key):在树中查找一个键，如果节点存在，则返回true；如果不存在，则返回false
 *  - inOrderTraverse: 通过中序遍历方式遍历所有节点
 *  - preOrderTraverse: 通过先序遍历方式遍历所有节点
 *  - postOrderTraverse: 通过后序遍历方式遍历所有节点
 *  - min: 返回树中最小的值/键
 *  - max: 放回树中最大的值/键
 *  - remove(key): 从树中移除某个键
 */

function BinarySearchTree() {
  
  var Node = function(key) {
    this.key = key
    this.left = null
    this.right = null
  }

  var root = null

  this.insert = function(key) {
    var newNode = new Node(key)
    if (root === null) {
      root = newNode
    } else {
      insertNode(root, newNode)
    }
  }

  this.inOrderTraverse = function(callback) {
    inOrderTraverseNode(root, callback)
  }

  this.preOrderTraverse = function(callback) {
    preOrderTraverseNode(root, callback)
  }

  this.postOrderTraverse = function(callback) {
    postOrderTraverseNode(root, callback)
  }

  this.min = function() {
    return minNode(root)
  }

  this.max = function() {
    return maxNode(root)
  }

  this.search = function(key) {
    return searchNode(root, key)
  }

  this.remove = function(key) {
    root = removeNode(root, key)
  }
}

var insertNode = function(node, newNode) {
  if (newNode.key < node.key) {
    if (node.left === null) {
      node.left = newNode
    } else {
      insertNode(node.left, newNode)
    }
  } else {
    if (node.right === null) {
      node.right = newNode
    } else {
      insertNode(node.right, newNode)
    }
  }
}

// 自平衡二叉树
var insertNode = function(node, element) {
  if (node === null) {
    node = new Node(element)
  } else  if(element < node.key) {
    node.left = insertNode(node.left, element)

    if (node.left !== null) {
      if ((heightNode(node.left) - heightNode(node.right)) > 1) {
        if (element < node.left.key) {
          node = rotationLL(node)
        } else {
          node = rotationLR(node)
        }
      }
    }
  } else if(element > node.key) {
    node.right = insertNode(node.right, element)

    if(node.right !== null) {
      if((heightNode(node.right) - heightNode(node.right)) > 1) {
        if (element > node.right.key) {
          node = rotationRR(node)
        } else {
          node = rotationRL(node)
        }
      }
    }
  }
  return node
}

var inOrderTraverseNode = function(node, callback) {
  if (node !== null) {
    inOrderTraverseNode(node.left, callback)
    callback(node.key)
    inOrderTraverseNode(node.right, callback)
  }
}

var preOrderTraverseNode = function(node, callback) {
  if (node !== null) {
    callback(node.key)
    preOrderTraverseNode(node.left, callback)
    preOrderTraverseNode(node.right, callback)
  }
}

var postOrderTraverseNode = function(node, callback) {
  if (node !== null) {
    postOrderTraverseNode(node.left, callback)
    postOrderTraverseNode(node.right, callback)
    callback(node.key)
  }
}

var minNode = function(node) {
  if (node) {
    while (node && node.left !== null) {
      node = node.left
    }
    return node.key
  }
  return null
}

var maxNode = function(node) {
  if (node) {
    while (node && node.right !== null) {
      node = node.right
    }
    return node.key
  }
  return null
}

var searchNode = function(node, key) {
  if (node === null) {
    return false
  }
  if (key < node.key) {
    return searchNode(node.left, key)
  } else if (key > node.key) {
    return searchNode(node.right, key)
  } else {
    return true
  }
}

var removeNode = function(node, key) {
  if (node === null) {
    return null
  }
  if (key < node.key) {
    node.left = removeNode(node.left, key)
    return node
  } else if (key > node.key) {
    node.right = removeNode(node.right, key)
    return node
  } else {

    // 第一种情况：一个叶节点
    if (node.left === null && node.right === null) {
      node = node.right
      return node
    }

    // 第二种情况: 一个只有一个子节点的节点
    if (node.left === null) {
      node = node.right
      return node
    } else if (node.right === null) {
      node = node.left
      return node
    }

    // 第三种情况：一个有两个子节点的节点
    var aux = findMinNode(node.right)
    node.key = aux.key
    node.right = removeNode(node.right, aux.key)
    return node
  }
}

var findMinNode = function(node) {
  while(node && node.left !== null) {
    node = node.left
  }
  return node
}

var heightNode = function(node) {
  if (node === null) {
    return -1
  } else {
    return Math.max(heightNode(node.left), heightNode(node.right)) + 1
  }
}

// 右-右(RR)：向左的单旋转
var rotationRR = function(node) {
  var tmp = node.right
  node.right = tmp.left
  tmp.left = node
  return tmp
} 

// 左-左(LL): 向右的单旋转
var rotationLL = function(node) {
  var tmp = node.left
  node.left = tmp.right
  tmp.right = node
  return tmp
}

// 左-右(LR): 向右的双旋转
var rotationLR = function(node) {
  node.left = rotationRR(node.left)
  return rotationLL(node)
}

// 右-左(RL): 向左的双旋转
var rotationRL = function(node) {
  node.right = rotationLL(node.right)
  return rotationRR(node)
}

var tree = new BinarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(6)

function printNode(value) {
  console.log(value)
}

// tree.inOrderTraverse(printNode)
// tree.preOrderTraverse(printNode)
tree.postOrderTraverse(printNode)

