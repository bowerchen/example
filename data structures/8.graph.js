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
 *    (1)标注v为被发现的(灰色)
 *    (2)对于v的所有未访问的邻点w，访问顶点w, 标注v为已被探索的(黑色)
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
   * 广度优先搜索算法: 从指定的第一个顶点开始遍历图，先访问其所有的相邻点，就像一次访问图的一层
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

  this.BFS = function(v) {
    var color = initializeColor(),
        queue = new Queue(),
        d = [],
        pred = [];
    queue.enqueue()

    for (var i=0; i<vertices.length; i++) {
      d[vertices[i]] = 0
      pred[vertices[i]] = null
    }

    while(!queue.isEmpty()) {
      var u = queue.dequeue(),
          neighbors = adjList.get(u)
      color[u] = 'grey'
      for (i=0; i<neighbors.length; i++) {
        var w = neighbors[i]
        if (color[w] == 'white') {
          color[w] = 'grey'
          d[w] = d[u] + 1
          pred[w] = u
          queue.enqueue(w)
        }
      }
      color[u] = 'black'
    }
    return {
      distances: d,
      predecessors: pred
    }
  };

  /**
   * 深度优先搜索：从第一个指定的顶点开始遍历图，沿着路径直到这条路径最后一个顶点被访问了，接着原路回退并探索下一条路径
   * @param {*} callback 
   */
  this.dfs = function(callback) {
    var color = initializeColor()

    for (var i=0; i<vertices.length; i++) {
      if (color[vertices[i]] === 'white') {
        dfsVisit(vertices[i], color, callback)
      }
    }
  }

  var dfsVisit = function(u, color, callback) {
    color[u] = 'grey'
    if (callback) {
      callback(u)
    }
    var neighbors = adjList.get(u)
    for (var i=0; i<neighbors.length; i++) {
      var w = neighbors[i]
      if (color[w] === 'white') {
        dfsVisit(w, color, callback)
      }
    }
    color[u] = 'black'
  }

  var time = 0
  this.DFS = function() {
    var color = initializeColor()
    d = [],
    f = [],
    p = [],
    time = 0
    
    for (var i=0; i<vertices.length; i++) {
      f[vertices[i]] = 0;
      d[vertices[i]] = 0;
      p[vertices[i]] = null
    }

    for (i=0; i<vertices.length; i++) {
      if (color[vertices[i]] === 'white') {
        DFSVisit(vertices[i], color, d, f, p)
      }
    }
    return {
      discovery: d,
      finished: f,
      predecessors: p
    }
  }

  var DFSVisit = function(u, color, d, f, p) {
    console.log('discovered ' + u)
    color[u] = 'grey'
    d[u] = ++time
    var neighbors = adjList.get(u)
    for (var i=0; i<neighbors.length; i++) {
      var w = neighbors[i]
      if (color[w] === 'white') {
        p[w] = u
        DFSVisit(w, color, d, f, p)
      }
    }
    color[u] = 'black'
    f[u] = ++time
    console.log('explored ' + u)
  }

  /**
   * 最短路径算法
   */
  // Dijkstra 算法: 计算从单个源到所有其他源的最短路径的贪心算法
  this.dijkstra = function(src) {
    var dist = [], visited = [],
    length = this.graph.length

    for (var i=0; i<length; i++) {
      dist[i] = INF;
      visited[i] = false
    }
    dist[src] = 0

    for(var i=0; i<length - 1; i++) {
      var u = minDistance(dist, visited)
      visited[u] = true

      for(var v=0; v<length; v++) {
        if (!visited[u] && this.graph[u][v] != 0 && dist[u] != INF && dist[u] + this.graph[u][v] < dist[v]) {
          dist[v] = dist[u] + this.graph[u][v]
        }
      }
    }
    return dist
  }

  var minDistance = function(dist, visited) {
    var min = INF, minIndex = -1
    
    for (var v=0; v<dist.length; v++) {
      if (visited[v] == false && dist[v] <= min) {
        min = dist[v]
        minIndex = v
      }
    }
    return minIndex
  }

  // Floyd-Warshall 算法：计算图中所有最短路径的动态规划算法
  this.floydWarshall = function() {
    var dist = [],
      length = this.graph.length,
      i, j, k
    
    for (i=0; i<length; i++) {
      dist[i] = []
      for (j=0; j<length; j++) {
        dist[i][j] = this.graph[i][j]
      }
    }

    for (k=0; k<length; k++) {
      for (i=0; i<length; i++) {
        for (j=0; j<length; j++) {
          if (dist[j][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j]
          }
        }
      }
    }
    return dist
  }

  // Prim算法: 求解加权无向连通图的MST问题的贪心算法 (MST: 最小生成树)
  this.prim = function() {
    var parent = [],
        key = [],
        visited = [],
        length = this.graph.length,
        i;

    for (i=0; i<length; i++) {
      key[i] = INF
      visited[i] = false
    }

    key[0] = 0
    parent[0] = 1
    
    for (i=0; i<length - 1; i++) {
      var u = minKey(key, visited)
      visited[u] = true

      for (var v=0; v<length; v++) {
        if (this.graph[u][v] && visited[u] == false && this.graph[u][v] < key[v]) {
          parent[v] = u
          key[v] = this.graph[u][v]
        }
      }
    }
    return parent
  }

  // Kruskal 算法: 求加权无向连通图的MST的贪心算法
  this.kruskal = function() {
    var length = this.graph.length,
        parent = [],
        ne = 0, a, b, u, v, i, j, min,
        cost = initializeColor()
    
    while(ne < length - 1) {
      for (i = 0, min = INF; i<length; i++) {
        for (j=0; j<length; j++) {
          if (cost[i][j] < min) {
            min = cost[i][j]
            u = j
            v = j
          }
        }
      }

      u = find(u, parent)
      v = find(v, parent)

      if (union(u, v, parent)) {
        ne++
      }

      cost[u][v] = cost[v][u] = INF
    }
    return parent
  }

  var find = function(i, parent) {
    while(parent[i]) {
      i = parent[i]
    }
    return i
  }

  var union = function(i, j, parent) {
    if (i != j) {
      parent[j] = i
      return true
    }
    return false
  }

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
