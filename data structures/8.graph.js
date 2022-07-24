const Dictionary = require("./5.dict");
const Queue = require("./2. queue");

/**
 * 图: 有向图和无向图
 * 遍历：
 *  - 广度优先搜索(BFS):
 *    (1)创建一个队列Q
 *    (2)将v标注为被发现的(灰色),并将v入队列Q
 *    (3)如果Q非空,则运行以下步骤：
 *      (a)将a从Q中出队列
 *      (b)将标注u为被发现的(灰色)
 *      (c)将u所有未被访问过的邻点(白色)入队列
 *      (d)将u标注为已被探索的(黑色)
 *  - 深度优先搜索(DFS):
 */
function Graph() {
  var vertices = [];
  var adjList = new Dictionary();

  this.addVertex = function (v) {
    vertices.push(v);
    adjList.set(v, []);
  };

  this.addEdge = function (v, w) {
    adjList.get(v).push(w);
    adjList.get(w).push(v);
  };

  this.toString = function () {
    var s = "";
    for (var i = 0; i < vertices.length; i++) {
      s += vertices[i] + " ->";
      var neighbors = adjList.get(vertices[i]);
      for (var j = 0; j < neighbors.length; j++) {
        s += neighbors[j] + " ";
      }
      s += "\n";
    }
    return s;
  };

  /**
   * 广度优先搜索算法
   */
  var initializeColor = function (vertices) {
    var color = [];
    for (var i = 0; i < vertices.length; i++) {
      color[vertices[i]] = "white";
    }
    return color;
  };

  this.bfs = function (v, callback) {
    var color = initializeColor(),
      queue = new Queue();

    queue.enqueue(v);

    while (!queue.isEmpty()) {
      var u = queue.dequeue(),
        neighbors = adjList.get(u);
      color[u] = "grey";

      for (var i = 0; i < neighbors.length; i++) {
        var w = neighbors[i];
        if (color[w] === "white") {
          color[w] = "grey";
          queue.enqueue(w);
        }
      }

      color[u] = "black";
      if (callback) callback(u);
    }
  };
}

var graph = new Graph();
var myVertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
for (var i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i]);
}
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");

console.log(graph.toString());

function printNode(value) {
  console.log("Visited vertex: " + value);
}
graph.bfs(myVertices[0], printNode);
