window.DSA = window.DSA || [];
window.DSA.push({
  unit: 4,
  title: "Non-Linear Data Structure: Graphs",
  topics: [
    {
      id: "u4-graph-def",
      title: "1. Graph: Definition and Terminology",
      cards: [
        {
          id: "u4-graph-def",
          kind: "def",
          q: "What is a graph?",
          a: `**Graph** is a non-linear data structure **G = (V, E)**, where **V** is a finite, non-empty set of **vertices (nodes)** and **E** is a set of **edges**, each edge joining a pair of vertices.

Each edge is a pair (v, w) of vertices. Graphs are more general and flexible than trees and can represent complex relationships such as social networks, transportation systems and web pages.`,
          keys: ["non-linear", "vertices", "edges", "g = (v, e)", "pair"],
          tip: "G = (V, E): Vertices + Edges."
        },
        {
          id: "u4-graph-use",
          kind: "concept",
          q: "When is a graph used? How does a graph differ from a tree in structure?",
          a: `A graph is used whenever things are connected in a network: cities joined by roads, computers joined by cables, people joined by friendship.

Unlike a tree, a graph has **no root**, can have **cycles**, and any vertex can be connected to any other vertex.`,
          keys: ["network", "no root", "cycles", "any vertex"],
        },
        {
          id: "u4-graph-types-fig",
          kind: "list",
          q: "Name the three example graphs G1, G2, G3 of the notes.",
          a: `- **G1**: undirected graph, V = {A, B, C, D, E}, E = {(A,B), (A,C), (B,C), (B,D), (C,E), (D,E)}
- **G2**: directed graph (same shape, edges have direction)
- **G3**: weighted graph (A-B 4, A-C 2, B-C 5, B-D 10, C-E 3, D-E 4)`,
          keys: ["undirected", "directed", "weighted", "g1", "g2", "g3"],
        }
      ]
    },
    {
      id: "u4-terminology",
      title: "1.1 Graph Terminology",
      cards: [
        {
          id: "u4-term-vertex-edge",
          kind: "def",
          q: "Define vertex (node) and edge (arc).",
          a: `- **Vertex (node)**: a point of the graph. In G1: V = {A, B, C, D, E}.
- **Edge (arc)**: a link between two vertices. In G1: E = {(A,B), (A,C), (B,C), (B,D), (C,E), (D,E)}.`,
          keys: ["point", "link", "two vertices"],
        },
        {
          id: "u4-term-undirected-directed",
          kind: "def",
          q: "Define undirected graph, directed graph (digraph) and weighted graph (network).",
          a: `- **Undirected graph**: edges have no direction; (A, B) is the same as (B, A). Example: G1.
- **Directed graph (digraph)**: every edge has a direction; <A, B> goes from A (**tail**) to B (**head**) and is different from <B, A>. Example: G2.
- **Weighted graph (network)**: every edge has a number (weight / cost), such as distance or time. Example: G3.`,
          keys: ["no direction", "tail", "head", "weight", "cost"],
        },
        {
          id: "u4-term-adjacent-incident",
          kind: "def",
          q: "Define outgoing/incoming edge, adjacent vertices and incident edge.",
          a: `- **Outgoing / incoming edge**: a directed edge is an outgoing edge of its origin vertex and an incoming edge of its destination vertex.
- **Adjacent vertices**: two vertices joined by an edge. In G1, A is adjacent to B and C.
- **Incident edge**: an edge is incident on the two vertices it joins.`,
          keys: ["origin", "destination", "joined by an edge", "incident"],
        },
        {
          id: "u4-term-degree",
          kind: "def",
          q: "Define degree, in-degree and out-degree. State the degree-sum rule.",
          a: `- **Degree**: number of edges incident on a vertex. In G1: degree(B) = 3.
- In an undirected graph, **sum of all degrees = 2 × number of edges**.
- **In-degree**: number of edges coming into the vertex. **Out-degree**: number of edges going out (directed graph). In G2: in-degree(B) = 2, out-degree(B) = 1.`,
          keys: ["incident", "2 × edges", "in-degree", "out-degree", "coming into"],
        },
        {
          id: "u4-term-path",
          kind: "def",
          q: "Define path, length of a path, simple path and simple cycle.",
          a: `- **Path**: a sequence of vertices in which each consecutive pair is joined by an edge. In G1: A – B – D – E. The **length** of a path is its number of edges.
- **Simple path**: a path in which all vertices are distinct (except that the first and the last may be the same).
- **Simple cycle**: a simple path of length at least one that begins and ends at the same vertex.`,
          keys: ["sequence", "number of edges", "distinct", "same vertex"],
        },
        {
          id: "u4-term-cycle",
          kind: "def",
          q: "Define cycle, cyclic graph, acyclic graph and DAG.",
          a: `- **Cycle**: a path that starts and ends at the same vertex. In G1: A – B – C – A.
- **Cyclic graph**: has a cycle. **Acyclic graph**: no cycle.
- **DAG**: a directed acyclic graph.`,
          keys: ["starts and ends", "cyclic", "acyclic", "dag", "directed acyclic"],
        },
        {
          id: "u4-term-connected",
          kind: "def",
          q: "Define connected graph, disconnected graph and connected component.",
          a: `- **Connected graph**: an undirected graph in which there is a path between every pair of vertices.
- Otherwise it is **disconnected**, and each connected piece is a **connected component**.`,
          keys: ["path between every pair", "disconnected", "component"],
        },
        {
          id: "u4-term-strong-weak",
          kind: "def",
          q: "Define strongly connected and weakly connected directed graph.",
          a: `- **Strongly connected**: a directed graph in which there is a path from every vertex to every other vertex.
- **Weakly connected**: otherwise, if it is connected only when directions are ignored.`,
          keys: ["every vertex to every other", "directions ignored", "strongly", "weakly"],
        },
        {
          id: "u4-term-complete",
          kind: "def",
          q: "Define complete graph. How many edges does it have?",
          a: `**Complete (full) graph**: every vertex is adjacent to all the other vertices, so the degree of each vertex is **n − 1**.

An undirected complete graph with n vertices has **n(n − 1)/2** edges (for n = 4: 4 × 3 / 2 = 6, the graph K4).`,
          keys: ["adjacent to all", "n − 1", "n(n − 1)/2", "k4"],
          tip: "Handshake: n people, each shakes n-1 hands, each shake counted twice, so /2."
        },
        {
          id: "u4-term-regular-trivial-null",
          kind: "def",
          q: "Define regular graph, trivial graph and null graph.",
          a: `- **Regular graph**: every vertex has the same degree. A complete graph is a regular graph.
- **Trivial graph**: just one vertex and no edges (singleton graph).
- **Null graph**: many vertices but no edges at all (edgeless graph). A null graph with n > 1 vertices is disconnected.`,
          keys: ["same degree", "one vertex", "no edges", "edgeless", "singleton"],
        },
        {
          id: "u4-term-sub-loop",
          kind: "def",
          q: "Define subgraph, self loop and parallel edges (multigraph).",
          a: `- **Subgraph**: a graph whose vertices and edges are subsets of another graph.
- **Self loop**: an edge (v, v) whose two end points are the same vertex.
- **Parallel edges / multigraph**: more than one edge between the same pair of vertices; a graph having them is a multigraph.`,
          keys: ["subsets", "(v, v)", "same vertex", "parallel", "multigraph"],
        },
        {
          id: "u4-term-iso-sparse-span",
          kind: "def",
          q: "Define isolated vertex, pendant vertex, sparse graph, dense graph and spanning tree (in brief).",
          a: `- **Isolated vertex**: degree 0. **Pendant vertex**: degree 1.
- **Sparse graph**: few edges compared with the maximum possible. **Dense graph**: close to the maximum.
- **Spanning tree**: a subgraph that contains all the vertices, is connected and has no cycle (see section 5).`,
          keys: ["degree 0", "degree 1", "sparse", "dense", "spanning tree"],
        },
        {
          id: "u4-compare-tree-graph",
          kind: "compare",
          q: "Compare a tree and a graph.",
          a: `| Point | Tree | Graph |
|---|---|---|
| Structure | Hierarchical; a special kind of graph | Network |
| Root | Exactly one root | No root |
| Cycles | Never | Allowed |
| Edges | Exactly n − 1 for n nodes | Any number, from 0 to n(n − 1)/2 |
| Path between two nodes | Exactly one | None, one or many |
| Traversal | Inorder, preorder, postorder | BFS, DFS |`,
          keys: ["root", "cycles", "n − 1", "hierarchical", "bfs", "dfs"],
        }
      ]
    },
    {
      id: "u4-representations",
      title: "2. Graph Representations",
      cards: [
        {
          id: "u4-rep-two-ways",
          kind: "list",
          q: "In how many ways can a graph be stored in memory? Name them.",
          a: `Two main ways:

1. **Adjacency matrix** (sequential representation)
2. **Adjacency list** (linked representation)`,
          keys: ["adjacency matrix", "adjacency list", "sequential", "linked"],
        },
        {
          id: "u4-adjmat-def",
          kind: "def",
          q: "What is an adjacency matrix?",
          a: `Adjacency matrix of a graph with n vertices is an **n × n matrix A** in which **A[i][j] = 1** if there is an edge from vertex i to vertex j, and **A[i][j] = 0** otherwise.

For a weighted graph, A[i][j] stores the **weight** of the edge (and 0 or ∞ when there is no edge).`,
          keys: ["n × n", "a[i][j] = 1", "0", "weight", "edge"],
        },
        {
          id: "u4-adjmat-g1",
          kind: "trace",
          q: "Write the adjacency matrix of G1 (undirected), G2 (directed) and the weighted matrix of G3.",
          a: `**G1 (symmetric)**

| | A | B | C | D | E |
|---|---|---|---|---|---|
| A | 0 | 1 | 1 | 0 | 0 |
| B | 1 | 0 | 1 | 1 | 0 |
| C | 1 | 1 | 0 | 0 | 1 |
| D | 0 | 1 | 0 | 0 | 1 |
| E | 0 | 0 | 1 | 1 | 0 |

**G2 (directed)**

| | A | B | C | D | E |
|---|---|---|---|---|---|
| A | 0 | 1 | 1 | 0 | 0 |
| B | 0 | 0 | 0 | 1 | 0 |
| C | 0 | 1 | 0 | 0 | 0 |
| D | 0 | 0 | 0 | 0 | 1 |
| E | 0 | 0 | 1 | 0 | 0 |

**G3 (weighted)**

| | A | B | C | D | E |
|---|---|---|---|---|---|
| A | 0 | 4 | 2 | 0 | 0 |
| B | 4 | 0 | 5 | 10 | 0 |
| C | 2 | 5 | 0 | 0 | 3 |
| D | 0 | 10 | 0 | 0 | 4 |
| E | 0 | 0 | 3 | 4 | 0 |`,
          keys: ["symmetric", "directed", "weighted", "1", "0"],
        },
        {
          id: "u4-adjmat-props",
          kind: "concept",
          q: "State the properties of an adjacency matrix: symmetry, degree, in-degree and out-degree.",
          a: `- Undirected graph: the matrix is **symmetric** (A[i][j] = A[j][i]). The **degree** of vertex i is the number of 1s in **row i**.
- Directed graph: the matrix need not be symmetric. The **row sum** gives the **out-degree** and the **column sum** gives the **in-degree**.`,
          keys: ["symmetric", "row", "column", "out-degree", "in-degree"],
        },
        {
          id: "u4-adjmat-adv",
          kind: "list",
          q: "Advantages and disadvantages of the adjacency matrix.",
          a: `**Advantages**
- Very simple.
- Checking whether an edge (i, j) exists takes **O(1)**.
- Adding or removing an edge takes **O(1)**.

**Disadvantages**
- Always needs **n²** cells, even if the graph has few edges (wasteful for sparse graphs).
- Finding all neighbours of a vertex takes **O(n)**.
- Adding a vertex means rebuilding the matrix.`,
          keys: ["simple", "o(1)", "n²", "sparse", "o(n)", "rebuild"],
        },
        {
          id: "u4-adjmat-code",
          kind: "code",
          q: "C++ code: adjacency matrix (addEdge and display).",
          a: `\`\`\`cpp
#define MAX 20
int adj[MAX][MAX];                              // global arrays start with all zeros
int n;                                          // number of vertices

void addEdge(int u, int v) {
    adj[u][v] = 1;
    adj[v][u] = 1;        // remove this line for a directed graph
}

void display() {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) cout << adj[i][j] << " ";
        cout << "\\n";
    }
}
\`\`\``,
          keys: ["adj[u][v] = 1", "adj[v][u] = 1", "addedge", "display", "max"],
        },
        {
          id: "u4-adjlist-def",
          kind: "def",
          q: "What is an adjacency list? How many list nodes does it use?",
          a: `Adjacency list representation keeps an **array of n linked lists**, one for each vertex. The list of vertex i contains all the vertices **adjacent** to i.

- Undirected graph with e edges: **2e** list nodes (each edge appears in two lists). Directed graph: **e** nodes.
- The degree of a vertex (out-degree in a digraph) is the number of nodes in its list.
- For a weighted graph each list node also stores the **weight** of the edge.

Example, G1 (6 edges, 12 list nodes):
- A: B, C
- B: A, C, D
- C: A, B, E
- D: B, E
- E: C, D`,
          keys: ["array", "linked lists", "adjacent", "2e", "weight"],
        },
        {
          id: "u4-adjlist-adv",
          kind: "list",
          q: "Advantages and disadvantages of the adjacency list.",
          a: `**Advantages**
- Needs only **O(V + E)** memory, so efficient for sparse graphs.
- All neighbours of a vertex are found quickly.
- Adding a vertex is easy.

**Disadvantages**
- Checking whether an edge (i, j) exists needs a **scan of the list of i**.
- Needs pointers, so the code is a little longer.
- Finding the in-degree in a digraph needs a scan of all lists (or a separate inverse adjacency list).`,
          keys: ["o(v + e)", "sparse", "neighbours", "scan", "pointers", "in-degree"],
        },
        {
          id: "u4-adjlist-code",
          kind: "code",
          q: "C++ code: adjacency list (addEdge and display).",
          a: `\`\`\`cpp
#define MAX 20
struct Node {
    int   vertex;
    Node* next;
};
Node* head[MAX];                              // head[i] = list of vertices adjacent to i (all NULL at start)
int n;

void addEdge(int u, int v) {
    Node* a = new Node;   // add v to the list of u
    a->vertex = v; a->next = head[u]; head[u] = a;
    Node* b = new Node;   // add u to the list of v (skip for a directed graph)
    b->vertex = u; b->next = head[v]; head[v] = b;
}

void display() {
    for (int i = 0; i < n; i++) {
        cout << i << " -> ";
        for (Node* t = head[i]; t != NULL; t = t->next) cout << t->vertex << " ";
        cout << "\\n";
    }
}
\`\`\``,
          keys: ["struct node", "vertex", "next", "head[u]", "new node", "head[i]"],
        },
        {
          id: "u4-compare-matrix-list",
          kind: "compare",
          q: "Compare adjacency matrix and adjacency list.",
          a: `| Point | Adjacency matrix | Adjacency list |
|---|---|---|
| Memory | O(V²) | O(V + E) |
| Is (u, v) an edge? | O(1) | O(degree of u) |
| Find all neighbours of u | O(V) | O(degree of u) |
| Add an edge | O(1) | O(1) |
| BFS / DFS time | O(V²) | O(V + E) |
| Best for | Dense graphs, small graphs | Sparse graphs, large graphs |`,
          keys: ["o(v²)", "o(v + e)", "o(1)", "dense", "sparse"],
        }
      ]
    },
    {
      id: "u4-bfs",
      title: "3.1 Graph Traversals and Breadth First Search (BFS)",
      cards: [
        {
          id: "u4-trav-def",
          kind: "def",
          q: "What is graph traversal? Why is a visited[] array needed? Name the two standard traversals.",
          a: `Graph traversal means visiting **every vertex of the graph exactly once** in a systematic way, starting from a given vertex.

A graph may have cycles, so we could come back to a vertex already seen. To avoid visiting a vertex twice we keep a **visited[ ]** array.

Two standard traversals: **Breadth First Search (BFS)** and **Depth First Search (DFS)**.`,
          keys: ["every vertex", "exactly once", "visited", "bfs", "dfs", "cycles"],
        },
        {
          id: "u4-bfs-idea",
          kind: "concept",
          q: "Explain the idea of BFS.",
          a: `Visit the start vertex, then all its neighbours, then all the neighbours of those neighbours, and so on. The graph is explored **level by level**, like ripples in water. BFS uses a **queue**.

The queue remembers the vertices whose neighbours are still to be visited. The edges through which new vertices are reached form the **breadth first spanning tree**.`,
          keys: ["level by level", "queue", "neighbours", "spanning tree", "ripples"],
          tip: "Ripples in water = level by level."
        },
        {
          id: "u4-bfs-algo",
          kind: "algo",
          q: "Write the algorithm for BFS (steps and pseudocode).",
          a: `1. Mark every vertex as unvisited. Create an empty queue Q.
2. Mark the start vertex s as visited and insert it in Q.
3. While Q is not empty, repeat steps 4 and 5.
4. Delete a vertex u from the front of Q and print (visit) it.
5. For every vertex v adjacent to u: if v is not visited, mark it visited and insert it in Q.

\`\`\`
Algorithm BFS(G, s)
{
    for each vertex v in G do visited[v] ← false
    create empty queue Q
    visited[s] ← true
    enqueue(Q, s)
    while (Q is not empty) do
    {
        u ← dequeue(Q)
        visit(u)
        for each vertex v adjacent to u do
            if (visited[v] = false) then
            {
                visited[v] ← true
                enqueue(Q, v)
            }
    }
}
\`\`\``,
          keys: ["unvisited", "queue", "enqueue", "dequeue", "visited", "adjacent"],
        },
        {
          id: "u4-bfs-flow",
          kind: "algo",
          q: "Describe the flowchart of BFS.",
          a: `1. Start; read graph and start vertex s.
2. Mark all vertices unvisited; create empty queue Q.
3. visited[s] = true; enqueue(Q, s).
4. Is Q empty? Yes: Stop. No: u = dequeue(Q), print u.
5. Any unchecked neighbour v of u? No: go back to step 4.
6. Yes: if visited[v] is true, check the next neighbour; if not, visited[v] = true and enqueue(Q, v). Repeat for the neighbours of u.`,
          keys: ["queue", "dequeue", "print", "neighbour", "visited[v]", "empty"],
        },
        {
          id: "u4-bfs-trace",
          kind: "trace",
          q: "Trace BFS from A on the example graph (edges A-B, A-D, A-E, B-C, B-E, C-E, C-F, C-G, D-E, E-F, F-G; neighbours in alphabetical order).",
          a: `| Step | Unvisited neighbours | Queue (front → rear) | Output so far |
|---|---|---|---|
| Start | visit and enqueue A | A | |
| dequeue A | enqueue B, D, E | B, D, E | A |
| dequeue B | enqueue C | D, E, C | AB |
| dequeue D | no unvisited neighbour | E, C | ABD |
| dequeue E | enqueue F | C, F | ABDE |
| dequeue C | enqueue G | F, G | ABDEC |
| dequeue F | no unvisited neighbour | G | ABDECF |
| dequeue G | no unvisited neighbour | empty | ABDECFG |

**BFS order: A B D E C F G**`,
          keys: ["abdecfg", "queue", "dequeue", "enqueue"],
        },
        {
          id: "u4-bfs-code",
          kind: "code",
          q: "C++ code: BFS (adjacency matrix).",
          a: `\`\`\`cpp
#define MAX 20
int adj[MAX][MAX], n;

void BFS(int s) {
    bool visited[MAX] = {false};
    queue<int> q;
    visited[s] = true;
    q.push(s);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        cout << u << " ";
        for (int v = 0; v < n; v++) {
            if (adj[u][v] == 1 && !visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}
\`\`\``,
          keys: ["queue<int>", "visited[s] = true", "q.push", "q.front", "q.pop", "adj[u][v] == 1"],
        },
        {
          id: "u4-bfs-complexity",
          kind: "formula",
          q: "Time and space complexity of BFS.",
          a: `Every vertex enters the queue once and every edge is examined once (twice if undirected).

- Time = **O(V + E)** with an adjacency list; **O(V²)** with an adjacency matrix.
- Space = **O(V)** for the queue and the visited array.`,
          keys: ["o(v + e)", "o(v²)", "o(v)", "adjacency list", "matrix"],
        },
        {
          id: "u4-bfs-apps",
          kind: "list",
          q: "List the applications of BFS.",
          a: `- Checking whether a graph is **connected**
- **Shortest path in an unweighted graph** (fewest edges)
- Finding all vertices at a given distance (friends of friends)
- Web crawlers
- Broadcasting in a network
- Checking whether a graph is **bipartite**`,
          keys: ["connected", "shortest path", "unweighted", "web crawler", "broadcasting", "bipartite"],
        }
      ]
    },
    {
      id: "u4-dfs",
      title: "3.2 Depth First Search (DFS)",
      cards: [
        {
          id: "u4-dfs-idea",
          kind: "concept",
          q: "Explain the idea of DFS.",
          a: `Start at a vertex and go **as deep as possible** along one path, visiting an unvisited neighbour each time. When a vertex has no unvisited neighbour, **backtrack** to the previous vertex and try its other neighbours.

DFS uses a **stack** (the recursion stack or an explicit one).`,
          keys: ["deep", "backtrack", "stack", "unvisited neighbour", "recursion"],
        },
        {
          id: "u4-dfs-algo-rec",
          kind: "algo",
          q: "Write the recursive DFS algorithm.",
          a: `1. Mark the current vertex u as visited and print it.
2. For every vertex v adjacent to u: if v is not visited, call DFS(v).

\`\`\`
Algorithm DFS(u)        // recursive
{
    visited[u] ← true
    visit(u)
    for each vertex v adjacent to u do
        if (visited[v] = false) then
             DFS(v)
}
\`\`\``,
          keys: ["visited[u]", "visit", "adjacent", "dfs(v)", "recursive"],
        },
        {
          id: "u4-dfs-algo-stack",
          kind: "algo",
          q: "Write the non-recursive DFS algorithm using a stack.",
          a: `1. Define a stack whose size is the total number of vertices in the graph.
2. Select any vertex as the starting point. Visit that vertex and push it on the stack.
3. Visit any one of the non-visited adjacent vertices of the vertex at the top of the stack and push it on the stack.
4. Repeat step 3 until there is no new vertex to be visited from the vertex at the top of the stack.
5. When there is no new vertex to visit, backtrack: pop one vertex from the stack.
6. Repeat steps 3, 4 and 5 until the stack becomes empty.
7. When the stack is empty, the edges that were used to reach new vertices form the **depth first spanning tree** (remove the unused edges).

\`\`\`
Algorithm DFS_NonRec(G, s)
{
    for each vertex v do visited[v] ← false
    create empty stack S
    visit(s);    visited[s] ← true;   push(S, s)
    while (S is not empty) do
    {
        u ← top(S)
        if (u has an unvisited adjacent vertex v) then
        {   visit(v);    visited[v] ← true;   push(S, v)   }
        else
             pop(S)                         // backtrack
    }
}
\`\`\``,
          keys: ["stack", "push", "top", "pop", "backtrack", "spanning tree"],
        },
        {
          id: "u4-dfs-flow",
          kind: "algo",
          q: "Describe the flowchart of DFS using a stack.",
          a: `1. Start; read graph and start vertex s.
2. Mark all vertices unvisited; create empty stack S.
3. Visit s, visited[s] = true, push(S, s).
4. Is S empty? Yes: Stop. No: u = top of S.
5. Does u have an unvisited adjacent vertex v? Yes: visit v, visited[v] = true, push(S, v). No: pop(S) (backtrack).
6. Go back to step 4.`,
          keys: ["stack", "top", "push", "pop", "backtrack", "empty"],
        },
        {
          id: "u4-dfs-trace",
          kind: "trace",
          q: "Trace DFS from A on the example graph with the stack contents.",
          a: `| Step | Action | Stack (bottom → top) | Output so far |
|---|---|---|---|
| 1 | visit A and push it | A | A |
| 2 | top = A: visit unvisited neighbour B, push | A, B | AB |
| 3 | top = B: visit C, push | A, B, C | ABC |
| 4 | top = C: visit E, push | A, B, C, E | ABCE |
| 5 | top = E: visit D, push | A, B, C, E, D | ABCED |
| 6 | top = D: no unvisited neighbour, pop D | A, B, C, E | ABCED |
| 7 | top = E: visit F, push | A, B, C, E, F | ABCEDF |
| 8 | top = F: visit G, push | A, B, C, E, F, G | ABCEDFG |
| 9 | top = G: no unvisited neighbour, pop G | A, B, C, E, F | ABCEDFG |
| 10 | top = F: pop F | A, B, C, E | ABCEDFG |
| 11 | top = E: pop E | A, B, C | ABCEDFG |
| 12 | top = C: pop C | A, B | ABCEDFG |
| 13 | top = B: pop B | A | ABCEDFG |
| 14 | top = A: pop A | empty | ABCEDFG |

**DFS order: A B C E D F G** (the recursive DFS gives the same order).`,
          keys: ["abcedfg", "stack", "push", "pop", "backtrack"],
        },
        {
          id: "u4-dfs-code",
          kind: "code",
          q: "C++ code: DFS (recursive and non-recursive with a stack).",
          a: `\`\`\`cpp
bool visitedDFS[MAX];

void DFS(int u) {                      // recursive
    visitedDFS[u] = true;
    cout << u << " ";
    for (int v = 0; v < n; v++)
        if (adj[u][v] == 1 && !visitedDFS[v])
            DFS(v);
}

void DFS_NonRec(int s) {               // using an explicit stack
    bool visited[MAX] = {false};
    stack<int> st;
    cout << s << " "; visited[s] = true; st.push(s);
    while (!st.empty()) {
        int u = st.top(), v;
        for (v = 0; v < n; v++)                    // first unvisited adjacent vertex
            if (adj[u][v] == 1 && !visited[v]) break;
        if (v < n) { cout << v << " "; visited[v] = true; st.push(v); }
        else st.pop();                             // no new vertex: backtrack
    }
}
\`\`\``,
          keys: ["visiteddfs[u] = true", "dfs(v)", "stack<int>", "st.top", "st.push", "st.pop"],
        },
        {
          id: "u4-dfs-complexity",
          kind: "formula",
          q: "Time and space complexity of DFS.",
          a: `- Time = **O(V + E)** with an adjacency list; **O(V²)** with an adjacency matrix.
- Space = **O(V)** for the stack and the visited array.`,
          keys: ["o(v + e)", "o(v²)", "o(v)", "stack"],
        },
        {
          id: "u4-dfs-apps",
          kind: "list",
          q: "List the applications of DFS.",
          a: `- Checking whether an undirected graph is **connected**
- Checking whether a connected graph is **biconnected** (finding articulation points)
- Checking whether a directed graph is **acyclic** (detecting cycles)
- **Topological sorting**
- Finding **connected components**
- Solving mazes and puzzles (**backtracking**)`,
          keys: ["connected", "biconnected", "cycle", "topological", "components", "maze"],
        },
        {
          id: "u4-trav-disconnected",
          kind: "concept",
          q: "How do you traverse a disconnected graph with BFS or DFS?",
          a: `One call of BFS or DFS visits only the vertices **reachable from the start vertex**. To visit the whole graph, **repeat the traversal from every vertex that is still unvisited**.

The number of times this is needed equals the **number of connected components**.`,
          keys: ["reachable", "repeat", "unvisited", "connected components"],
        },
        {
          id: "u4-compare-bfs-dfs",
          kind: "compare",
          q: "Compare BFS and DFS.",
          a: `| Point | BFS | DFS |
|---|---|---|
| Full form | Breadth First Search | Depth First Search |
| Data structure | Queue (FIFO) | Stack (LIFO) or recursion |
| Order of visiting | Level by level; all neighbours first | One path as deep as possible, then backtrack |
| Shortest path | Finds the shortest path (fewest edges) in an unweighted graph | Does not guarantee the shortest path |
| Memory | More (stores a whole level) | Less (stores one path) |
| Time | O(V + E) | O(V + E) |
| Similar tree traversal | Level order | Preorder |
| Used for | Shortest path, nearest neighbours | Cycle detection, topological sort, backtracking |`,
          keys: ["queue", "stack", "level", "backtrack", "shortest path", "o(v + e)"],
        }
      ]
    },
    {
      id: "u4-topo",
      title: "3.3 Topological Sort",
      cards: [
        {
          id: "u4-topo-def",
          kind: "def",
          q: "What is topological sort? When is it not possible?",
          a: `Topological sort is a **linear ordering of the vertices of a directed acyclic graph (DAG)** such that if there is a path (edge) from Vi to Vj, then **Vj appears after Vi** in the ordering.

A topological ordering is **not possible if the graph has a cycle**, because for two vertices v and w on the cycle, v would have to come before w and w before v. A graph can have **more than one** valid topological order.`,
          keys: ["linear ordering", "dag", "vj after vi", "cycle", "more than one"],
        },
        {
          id: "u4-topo-algo",
          kind: "algo",
          q: "Write the topological sort algorithm (using in-degrees and a queue).",
          a: `1. Find the in-degree of every vertex.
2. Place all the vertices whose in-degree is 0 in an empty queue.
3. Dequeue a vertex V, output it, and decrement the in-degree of all its adjacent vertices.
4. If the in-degree of an adjacent vertex becomes 0, enqueue it.
5. Repeat steps 3 and 4 until the queue becomes empty.
6. The topological order is the order in which the vertices were dequeued. If some vertices were never dequeued, the graph has a cycle.

\`\`\`
Algorithm TopologicalSort(G)
{
    for each vertex v do compute indegree[v]
    create empty queue Q;    count ← 0
    for each vertex v do
        if (indegree[v] = 0) then enqueue(Q, v)
    while (Q is not empty) do
    {
        v ← dequeue(Q)
        write v;   count ← count + 1
        for each vertex w adjacent to v do
        {
            indegree[w] ← indegree[w] - 1
            if (indegree[w] = 0) then enqueue(Q, w)
        }
    }
    if (count ≠ number of vertices) then write "Graph has a cycle"
}
\`\`\``,
          keys: ["in-degree", "queue", "0", "decrement", "count", "cycle"],
        },
        {
          id: "u4-topo-trace",
          kind: "trace",
          q: "Trace topological sort on the example DAG (in-degrees V1=0, V2=1, V3=2, V4=3, V5=1, V6=3, V7=2).",
          a: `| Step | In-degrees of remaining vertices | In-degree became 0 | Output so far |
|---|---|---|---|
| Start | V1:0, V2:1, V3:2, V4:3, V5:1, V6:3, V7:2 | enqueue V1 | |
| dequeue V1 | V2:0, V3:1, V4:2, V5:1, V6:3, V7:2 | enqueue V2 | V1 |
| dequeue V2 | V3:1, V4:1, V5:0, V6:3, V7:2 | enqueue V5 | V1 V2 |
| dequeue V5 | V3:1, V4:0, V6:3, V7:1 | enqueue V4 | V1 V2 V5 |
| dequeue V4 | V3:0, V6:2, V7:0 | enqueue V3, V7 | V1 V2 V5 V4 |
| dequeue V3 | V6:1, V7:0 | – | V1 V2 V5 V4 V3 |
| dequeue V7 | V6:0 | enqueue V6 | V1 V2 V5 V4 V3 V7 |
| dequeue V6 | – | – | V1 V2 V5 V4 V3 V7 V6 |

**Topological order: V1, V2, V5, V4, V3, V7, V6**`,
          keys: ["v1", "v2", "v5", "v4", "v3", "v7", "v6"],
        },
        {
          id: "u4-topo-code",
          kind: "code",
          q: "C++ code: topological sort (adjacency matrix).",
          a: `\`\`\`cpp
#define MAX 20
int adj[MAX][MAX], n;

void topologicalSort() {
    int indegree[MAX] = {0};
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            if (adj[i][j] == 1) indegree[j]++;         // number of 1s in column j
    queue<int> q;
    for (int i = 0; i < n; i++)
        if (indegree[i] == 0) q.push(i);
    int count = 0;
    while (!q.empty()) {
        int v = q.front(); q.pop();
        cout << v << " ";
        count++;
        for (int w = 0; w < n; w++)
            if (adj[v][w] == 1 && --indegree[w] == 0) q.push(w);
    }
    if (count != n) cout << "\\nGraph has a cycle";
}
\`\`\``,
          keys: ["indegree[j]++", "indegree[i] == 0", "q.push", "--indegree[w] == 0", "count != n", "cycle"],
        },
        {
          id: "u4-topo-apps",
          kind: "list",
          q: "Complexity and applications of topological sort.",
          a: `Complexity: **O(V + E)** with an adjacency list.

Applications:
- Deciding the order of subjects when some are **prerequisites** of others
- Scheduling tasks or jobs that depend on each other (**project planning**)
- Deciding the order of compilation of files in a build system (**makefile**)
- Instruction scheduling`,
          keys: ["o(v + e)", "prerequisite", "scheduling", "makefile", "compilation", "instruction"],
        }
      ]
    },
    {
      id: "u4-biconn",
      title: "3.4 Biconnectivity, Articulation Points and Euler Circuits",
      cards: [
        {
          id: "u4-bicon-def",
          kind: "def",
          q: "Define biconnected graph and articulation point (cut vertex).",
          a: `- **Biconnected graph**: a connected undirected graph is biconnected if there is **no vertex whose removal disconnects** the rest of the graph. In a biconnected graph there are two disjoint paths between any two vertices, and a simple cycle through any two vertices.
- **Articulation point (cut vertex)**: a vertex whose removal (with its edges) disconnects the graph. A graph that has an articulation point is **not** biconnected.`,
          keys: ["removal", "disconnects", "two disjoint paths", "articulation point", "cut vertex"],
        },
        {
          id: "u4-artic-algo",
          kind: "algo",
          q: "How are articulation points found? State the rule using Num and Low.",
          a: `Articulation points are found in **O(V + E)** time using **depth first search**:

1. Number the vertices in the order of the DFS visit (**Num**).
2. Compute for each vertex the lowest-numbered vertex reachable from it (**Low**).
3. A **non-root** vertex v is an articulation point if it has a child w with **Low(w) ≥ Num(v)**.
4. The **root** is an articulation point if it has **more than one child** in the DFS tree.`,
          keys: ["dfs", "num", "low", "low(w) ≥ num(v)", "root", "more than one child"],
        },
        {
          id: "u4-euler",
          kind: "concept",
          q: "Define Euler path and Euler circuit. State the rules for their existence.",
          a: `- **Euler path**: a path that passes through every edge **exactly once** (vertices may repeat); it can be drawn without lifting the pencil.
- **Euler circuit**: an Euler path that starts and ends at the same vertex.

**Rules**
- A connected graph in which **all vertices have even degree** has an Euler circuit.
- A graph with **exactly two odd-degree vertices** has an Euler path (starts at one odd vertex and ends at the other) but no Euler circuit.
- A graph with **more than two odd vertices** has neither.

Example: in the seven bridges of Königsberg problem every vertex has odd degree, so no such walk is possible.`,
          keys: ["every edge", "exactly once", "even degree", "two odd", "königsberg", "circuit"],
          tip: "0 odd = circuit, 2 odd = path only, >2 odd = none."
        }
      ]
    },
    {
      id: "u4-applications",
      title: "4. Applications of Graphs",
      cards: [
        {
          id: "u4-apps-list",
          kind: "list",
          q: "List the applications of graphs.",
          a: `- **Social network graphs**: who knows whom, who follows whom; study how information spreads and suggest friends.
- **Transportation networks**: vertices are intersections, edges are road segments; map programs such as Google Maps find the best routes (Dijkstra's algorithm).
- **Utility graphs**: power grid, Internet, water network; vertices are connection points, edges are wires or pipes. Minimum spanning trees give the cheapest way to connect all points.
- **Document link graphs**: the web, each page a vertex and each hyperlink a directed edge; used by search engines to rank pages.
- **Network packet traffic graphs**: vertices are IP addresses, edges are the packets that flow between them; used in network security.
- **Project scheduling**: tasks are vertices and "must be done before" relations are directed edges; topological sort gives a valid order.
- **Scene graphs** in graphics and games, **finite element meshes** in engineering simulations.
- **Robot planning**: vertices are the states of the robot, edges the possible moves.
- **Protein interaction graphs** in biology and **neural networks**.
- **Operating systems and compilers**: resource allocation graphs for deadlock detection, control-flow and dependency graphs.`,
          keys: ["social network", "transportation", "utility", "web", "project scheduling", "robot", "deadlock"],
        }
      ]
    },
    {
      id: "u4-mst",
      title: "5. Minimum Spanning Trees",
      cards: [
        {
          id: "u4-st-def",
          kind: "def",
          q: "What is a spanning tree?",
          a: `Spanning tree of a connected, undirected graph G is a subgraph that (1) contains **all the vertices** of G, (2) is **connected**, and (3) has **no cycle**. So it is a tree that "spans" every vertex.

In simple words, a spanning tree is a way to connect all the vertices of a graph using the fewest possible edges.`,
          keys: ["subgraph", "all the vertices", "connected", "no cycle", "tree"],
        },
        {
          id: "u4-st-props",
          kind: "list",
          q: "List the properties of a spanning tree.",
          a: `- **Connectivity**: it connects all the nodes; there is a path between every pair of nodes.
- **Acyclic**: it contains no cycle.
- **Number of edges**: for a graph with n nodes it has exactly **n − 1** edges.
- **Subgraph**: it includes all the vertices of the original graph.
- **Minimal**: a minimal set of edges that keeps the graph connected; removing any edge disconnects it and adding any edge creates a cycle.
- **Multiple spanning trees**: a graph can have more than one spanning tree. (A connected graph that is itself a tree has only one spanning tree: itself.)`,
          keys: ["connectivity", "acyclic", "n − 1", "subgraph", "minimal", "multiple"],
        },
        {
          id: "u4-mst-def",
          kind: "def",
          q: "What is a minimum spanning tree (MST)? Give an example and the uses.",
          a: `Minimum spanning tree (MST) of a weighted graph is a spanning tree whose **total edge weight is the smallest** among all spanning trees of the graph.

Example: for the weighted graph on A to F used below, one spanning tree has cost 28, while the minimum spanning tree has cost **15**.

**Use**: network design, i.e. connecting all points at minimum total cost, for example designing electrical circuits and telecommunication networks, laying cables, pipelines or roads between cities.

Two **greedy** algorithms are used to find the MST: **Prim's** and **Kruskal's**. A greedy algorithm makes the choice that looks best at each step.`,
          keys: ["spanning tree", "smallest", "total weight", "greedy", "prim", "kruskal", "network design"],
        }
      ]
    },
    {
      id: "u4-prim",
      title: "5.1 Prim's Algorithm",
      cards: [
        {
          id: "u4-prim-idea",
          kind: "concept",
          q: "Explain the idea of Prim's algorithm.",
          a: `**Grow one tree**, starting from any vertex. At every step add the **cheapest edge** that joins a vertex already in the tree to a vertex not yet in the tree. Repeat until all vertices are in the tree.

Such an edge can never form a cycle, because one of its ends is new.`,
          keys: ["one tree", "any vertex", "cheapest edge", "not yet in the tree", "no cycle"],
        },
        {
          id: "u4-prim-algo",
          kind: "algo",
          q: "Write Prim's algorithm (steps and pseudocode).",
          a: `1. Choose any start vertex s and mark it visited (it is in the tree). Set mincost = 0.
2. Repeat V − 1 times:
3. a. Among all edges (u, v) with u visited and v not visited, find the edge with the minimum cost.
4. b. Add edge (u, v) to the MST and add its cost to mincost.
5. c. Mark v as visited.
6. Print the MST edges and mincost.

\`\`\`
Algorithm Prim(cost, n, s)
// cost[i][j] = weight of edge (i, j), or INFINITY if there is no edge
{
    for i ← 0 to n-1 do visited[i] ← false
    visited[s] ← true;   mincost ← 0
    for k ← 1 to n-1 do                       // n-1 edges are needed
    {
        min ← INFINITY
        for i ← 0 to n-1 do
            if (visited[i]) then
                for j ← 0 to n-1 do
                    if (not visited[j] and cost[i][j] < min) then
                    {   min ← cost[i][j];   u ← i;   v ← j   }
        write "edge (u, v) cost min"
        visited[v] ← true
        mincost ← mincost + min
    }
    write mincost
}
\`\`\``,
          keys: ["visited", "minimum cost", "v − 1", "mincost", "cost[i][j] < min", "infinity"],
        },
        {
          id: "u4-prim-flow",
          kind: "algo",
          q: "Describe the flowchart of Prim's algorithm.",
          a: `1. Start; read cost matrix, n and start vertex s.
2. visited[s] = true; edges = 0, mincost = 0.
3. Is edges < n − 1? No: print MST edges and mincost, Stop.
4. Yes: find the minimum cost edge (u, v) with u visited and v not visited.
5. Add edge (u, v) to the MST; mincost = mincost + cost[u][v].
6. visited[v] = true; edges = edges + 1. Go back to step 3.`,
          keys: ["edges < n - 1", "minimum cost edge", "mincost", "visited[v] = true"],
        },
        {
          id: "u4-prim-trace",
          kind: "trace",
          q: "Trace Prim's algorithm from A on the example graph (edges A-B 6, A-C 1, A-D 5, B-C 5, B-E 3, C-D 5, C-E 6, C-F 4, D-F 2, E-F 6).",
          a: `| Step | Vertices in tree | Edges from tree to outside (cost) | Cheapest edge chosen | Cost so far |
|---|---|---|---|---|
| 1 | {A} | A-B(6), A-C(1), A-D(5) | A-C (1) | 1 |
| 2 | {A, C} | A-B(6), A-D(5), C-B(5), C-D(5), C-E(6), C-F(4) | C-F (4) | 5 |
| 3 | {A, C, F} | A-B(6), A-D(5), C-B(5), C-D(5), C-E(6), F-D(2), F-E(6) | F-D (2) | 7 |
| 4 | {A, C, F, D} | A-B(6), C-B(5), C-E(6), F-E(6) | C-B (5) | 12 |
| 5 | {A, C, F, D, B} | B-E(3), C-E(6), F-E(6) | B-E (3) | 15 |

**MST edges: A-C, C-F, F-D, C-B, B-E. Minimum cost = 1 + 4 + 2 + 5 + 3 = 15**`,
          keys: ["a-c", "c-f", "f-d", "c-b", "b-e", "15"],
        },
        {
          id: "u4-prim-code",
          kind: "code",
          q: "C++ code: Prim's algorithm (cost matrix).",
          a: `\`\`\`cpp
#define MAX 20
#define INF 9999
int cost[MAX][MAX], n;                        // cost[i][j] = INF when there is no edge

int prim(int s) {
    bool visited[MAX] = {false};
    visited[s] = true;
    int mincost = 0;
    for (int k = 1; k < n; k++) {
        int mn = INF, u = -1, v = -1;
        for (int i = 0; i < n; i++)
            if (visited[i])
                for (int j = 0; j < n; j++)
                    if (!visited[j] && cost[i][j] < mn) {
                        mn = cost[i][j]; u = i; v = j;
                    }
        cout << "Edge (" << u << ", " << v << ") cost " << mn << "\\n";
        visited[v] = true;
        mincost += mn;
    }
    return mincost;
}
\`\`\``,
          keys: ["visited[s] = true", "mincost", "inf", "cost[i][j] < mn", "visited[v] = true", "mn"],
        },
        {
          id: "u4-prim-complexity",
          kind: "formula",
          q: "Time complexity of Prim's algorithm (three versions).",
          a: `- Simple cost-matrix version: **O(V³)**.
- Keeping, for every unvisited vertex, its cheapest connection to the tree (a **near[ ]** or **key[ ]** array): **O(V²)**.
- Adjacency list and a **min-heap** (priority queue): **O(E log V)**.`,
          keys: ["o(v³)", "o(v²)", "o(e log v)", "key", "min-heap"],
        }
      ]
    },
    {
      id: "u4-kruskal",
      title: "5.2 Kruskal's Algorithm",
      cards: [
        {
          id: "u4-kruskal-idea",
          kind: "concept",
          q: "Explain the idea of Kruskal's algorithm and how the cycle check is done.",
          a: `Look at the edges in **increasing order of weight**. Take an edge if it does not form a cycle with the edges already chosen; otherwise reject it. Stop when **V − 1** edges have been chosen. The chosen edges form a **forest** (several small trees) that slowly joins into one tree.

**Cycle check (union-find)**: keep the vertices in **disjoint sets**, one set per tree of the forest.
- find(x) returns the set (root) containing x.
- If find(u) = find(v), both ends are already in the same tree, so the edge would form a cycle.
- Otherwise accept the edge and merge the two sets with union(u, v).`,
          keys: ["increasing order", "cycle", "forest", "disjoint sets", "find", "union", "v − 1"],
        },
        {
          id: "u4-kruskal-algo",
          kind: "algo",
          q: "Write Kruskal's algorithm (steps and pseudocode).",
          a: `1. Sort all the edges in increasing order of weight.
2. Put every vertex in its own set. Set count = 0 and mincost = 0.
3. Take the next smallest edge (u, v).
4. If find(u) ≠ find(v): add the edge to the MST, do union(u, v), add its weight to mincost and increase count. Otherwise reject the edge.
5. Repeat steps 3 and 4 until count = V − 1.

\`\`\`
Algorithm Kruskal(E, n)
// E = list of edges (u, v, w); n = number of vertices
{
    sort E in increasing order of weight w
    for i ← 0 to n-1 do parent[i] ← i        // each vertex is its own set
    count ← 0;   mincost ← 0
    for each edge (u, v, w) in E do
    {
        a ← Find(u);    b ← Find(v)
        if (a ≠ b) then                      // no cycle
        {
            write "edge (u, v) cost w"
            parent[a] ← b                    // union of the two sets
            mincost ← mincost + w
            count ← count + 1
            if (count = n-1) then break
        }
    }
    write mincost
}

Algorithm Find(x)
{
    while (parent[x] ≠ x) do x ← parent[x]
    return x
}
\`\`\``,
          keys: ["sort", "parent", "find", "a ≠ b", "union", "mincost", "count"],
        },
        {
          id: "u4-kruskal-flow",
          kind: "algo",
          q: "Describe the flowchart of Kruskal's algorithm.",
          a: `1. Start; read the edges and n.
2. Sort the edges in increasing order of weight.
3. Put each vertex in its own set; count = 0, mincost = 0.
4. Is count < n − 1? No: print MST edges and mincost, Stop.
5. Yes: take the next smallest edge (u, v).
6. Is find(u) != find(v)? No: reject the edge (it forms a cycle). Yes: accept, add (u, v) to the MST, union(u, v), count = count + 1, mincost = mincost + w.
7. Go back to step 4.`,
          keys: ["sort", "count < n - 1", "find(u) != find(v)", "reject", "union", "cycle"],
        },
        {
          id: "u4-kruskal-trace",
          kind: "trace",
          q: "Trace Kruskal's algorithm on the same example graph as Prim's.",
          a: `Edges in increasing order of weight: A-C(1), D-F(2), B-E(3), C-F(4), A-D(5), B-C(5), C-D(5), A-B(6), C-E(6), E-F(6)

| Edge | Weight | Decision | Sets after the step |
|---|---|---|---|
| A-C | 1 | Accept | {A, C} {B} {D} {E} {F} |
| D-F | 2 | Accept | {A, C} {B} {D, F} {E} |
| B-E | 3 | Accept | {A, C} {B, E} {D, F} |
| C-F | 4 | Accept | {A, C, D, F} {B, E} |
| A-D | 5 | Reject: A and D already in the same set (cycle) | {A, C, D, F} {B, E} |
| B-C | 5 | Accept | {A, B, C, D, E, F} |
| C-D, A-B, C-E, E-F | 5, 6, 6, 6 | not examined: MST already has 5 edges | |

**MST edges: A-C, D-F, B-E, C-F, B-C. Minimum cost = 1 + 2 + 3 + 4 + 5 = 15** (the same cost as Prim's algorithm).`,
          keys: ["a-c", "d-f", "b-e", "c-f", "b-c", "15", "reject a-d"],
        },
        {
          id: "u4-kruskal-code",
          kind: "code",
          q: "C++ code: Kruskal's algorithm.",
          a: `\`\`\`cpp
#define MAX 20
struct Edge { int u, v, w; };
int parent[MAX];

int find(int x) {
    while (parent[x] != x) x = parent[x];
    return x;
}

bool cmp(Edge a, Edge b) { return a.w < b.w; }

int kruskal(Edge e[], int m, int n) {        // m edges, n vertices
    sort(e, e + m, cmp);                     // increasing order of weight
    for (int i = 0; i < n; i++) parent[i] = i;
    int mincost = 0, count = 0;
    for (int i = 0; i < m && count < n - 1; i++) {
        int a = find(e[i].u), b = find(e[i].v);
        if (a != b) {                        // different sets: no cycle
            cout << "Edge (" << e[i].u << ", " << e[i].v << ") cost " << e[i].w << "\\n";
            parent[a] = b;                   // union
            mincost += e[i].w;
            count++;
        }
    }
    return mincost;
}
\`\`\``,
          keys: ["struct edge", "parent[x] != x", "sort(e, e + m, cmp)", "a != b", "parent[a] = b", "count < n - 1"],
        },
        {
          id: "u4-kruskal-complexity",
          kind: "formula",
          q: "Time complexity of Kruskal's algorithm.",
          a: `Sorting the edges takes **O(E log E)**; the find and union operations are fast. Total = **O(E log E)**, which is the same as **O(E log V)**.`,
          keys: ["o(e log e)", "o(e log v)", "sorting", "find", "union"],
        },
        {
          id: "u4-compare-prim-kruskal",
          kind: "compare",
          q: "Compare Prim's algorithm and Kruskal's algorithm.",
          a: `| Point | Prim's algorithm | Kruskal's algorithm |
|---|---|---|
| Works on | Vertices: adds one vertex at a time | Edges: adds one edge at a time |
| Starts from | Any chosen vertex | The cheapest edge of the graph |
| Intermediate result | Always one connected tree | A forest; may be disconnected until the end |
| Cycle check | Not needed (new vertex is always outside the tree) | Needed (union-find) |
| Sorting of edges | Not required | Required |
| Time | O(V²) with matrix; O(E log V) with heap | O(E log E) |
| Better for | Dense graphs | Sparse graphs |`,
          keys: ["vertex", "edge", "forest", "union-find", "sorting", "dense", "sparse"],
        }
      ]
    },
    {
      id: "u4-dijkstra",
      title: "6. Shortest Path: Dijkstra's Algorithm",
      cards: [
        {
          id: "u4-dij-def",
          kind: "def",
          q: "What is the shortest path problem? What does Dijkstra's algorithm solve?",
          a: `**Shortest path problem**: in a weighted graph, find the path between two vertices for which the **sum of the edge weights is minimum**.

**Dijkstra's algorithm** solves the **single-source** version: it finds the shortest distance from **one source vertex to every other vertex**. All edge weights must be **non-negative**.`,
          keys: ["sum of weights", "minimum", "single-source", "source", "non-negative"],
        },
        {
          id: "u4-dij-idea",
          kind: "concept",
          q: "Explain the idea of Dijkstra's algorithm and relaxation.",
          a: `Keep an array **dist[ ]**, where dist[v] is the shortest distance from the source to v found so far. Initially dist[source] = 0 and all others are ∞.

Repeatedly pick the **unvisited vertex with the smallest dist** (its distance is now final), mark it visited, and try to improve the distances of its neighbours through it. This improvement step is called **relaxation**:

**if dist[u] + cost[u][v] < dist[v] then dist[v] = dist[u] + cost[u][v]**

It is a **greedy** algorithm because at each step it fixes the nearest unvisited vertex.`,
          keys: ["dist", "source", "smallest", "relaxation", "dist[u] + cost[u][v] < dist[v]", "greedy"],
        },
        {
          id: "u4-dij-algo",
          kind: "algo",
          q: "Write Dijkstra's algorithm (steps and pseudocode).",
          a: `1. For every vertex v set dist[v] = ∞ and visited[v] = false. Set dist[s] = 0.
2. Repeat V times:
3. a. Choose the unvisited vertex u with the minimum dist[u].
4. b. Mark u as visited.
5. c. For every unvisited vertex v adjacent to u: if dist[u] + cost[u][v] < dist[v], set dist[v] = dist[u] + cost[u][v] and prev[v] = u.
6. dist[ ] now holds the shortest distances. The actual path to a vertex is found by following prev[ ] backwards to the source.

\`\`\`
Algorithm Dijkstra(cost, n, s)
{
    for i ← 0 to n-1 do
    {   dist[i] ← INFINITY;    visited[i] ← false;  prev[i] ← -1   }
    dist[s] ← 0
    for k ← 1 to n do
    {
        u ← the unvisited vertex with minimum dist[u]
        visited[u] ← true
        for v ← 0 to n-1 do
            if (not visited[v] and cost[u][v] ≠ INFINITY
                and dist[u] + cost[u][v] < dist[v]) then
            {
                dist[v] ← dist[u] + cost[u][v]        // relaxation
                prev[v] ← u
            }
    }
}
\`\`\``,
          keys: ["dist", "infinity", "visited", "minimum dist", "relaxation", "prev"],
        },
        {
          id: "u4-dij-flow",
          kind: "algo",
          q: "Describe the flowchart of Dijkstra's algorithm.",
          a: `1. Start; read cost matrix, n and source s.
2. For every vertex v: dist[v] = INFINITY, visited[v] = false; dist[s] = 0.
3. Any unvisited vertex left? No: print dist[ ], Stop.
4. Yes: u = unvisited vertex with minimum dist; visited[u] = true.
5. For each unvisited neighbour v of u: if dist[u] + cost[u][v] < dist[v] then dist[v] = dist[u] + cost[u][v].
6. Go back to step 3.`,
          keys: ["dist", "infinity", "minimum dist", "visited[u] = true", "neighbour", "print dist"],
        },
        {
          id: "u4-dij-trace",
          kind: "trace",
          q: "Trace Dijkstra from A on the example graph (A-B 4, A-C 2, C-B 1, B-D 5, C-D 8, C-E 10, D-E 2, D-F 6, E-F 3).",
          a: `| Step | Selected u | dist[A] | dist[B] | dist[C] | dist[D] | dist[E] | dist[F] | Relaxation through u |
|---|---|---|---|---|---|---|---|---|
| Init | – | 0 | ∞ | ∞ | ∞ | ∞ | ∞ | dist[A] = 0, others ∞ |
| 1 | A | 0 | 4 | 2 | ∞ | ∞ | ∞ | B: 0 + 4 = 4; C: 0 + 2 = 2 |
| 2 | C | 0 | 3 | 2 | 10 | 12 | ∞ | B: 2 + 1 = 3; D: 2 + 8 = 10; E: 2 + 10 = 12 |
| 3 | B | 0 | 3 | 2 | 8 | 12 | ∞ | D: 3 + 5 = 8 |
| 4 | D | 0 | 3 | 2 | 8 | 10 | 14 | E: 8 + 2 = 10; F: 8 + 6 = 14 |
| 5 | E | 0 | 3 | 2 | 8 | 10 | 13 | F: 10 + 3 = 13 |
| 6 | F | 0 | 3 | 2 | 8 | 10 | 13 | no change |

**Result**

| Vertex | Shortest distance from A | Shortest path |
|---|---|---|
| B | 3 | A→C→B |
| C | 2 | A→C |
| D | 8 | A→C→B→D |
| E | 10 | A→C→B→D→E |
| F | 13 | A→C→B→D→E→F |`,
          keys: ["a→c→b", "3", "2", "8", "10", "13", "relaxation"],
        },
        {
          id: "u4-dij-code",
          kind: "code",
          q: "C++ code: Dijkstra's algorithm and printPath (cost matrix).",
          a: `\`\`\`cpp
#define MAX 20
#define INF 9999
int cost[MAX][MAX], n;                              // cost[i][j] = INF when there is no edge
int dist[MAX], prevV[MAX];

void dijkstra(int s) {
    bool visited[MAX] = {false};
    for (int i = 0; i < n; i++) { dist[i] = INF; prevV[i] = -1; }
    dist[s] = 0;
    for (int k = 0; k < n; k++) {
        int u = -1;
        for (int i = 0; i < n; i++)                    // nearest unvisited vertex
            if (!visited[i] && (u == -1 || dist[i] < dist[u])) u = i;
        if (dist[u] == INF) break;                     // the rest are unreachable
        visited[u] = true;
        for (int v = 0; v < n; v++)
            if (!visited[v] && cost[u][v] != INF && dist[u] + cost[u][v] < dist[v]) {
                dist[v] = dist[u] + cost[u][v];        // relaxation
                prevV[v] = u;
            }
    }
}

void printPath(int v) {                                // prints source ... v
    if (prevV[v] != -1) { printPath(prevV[v]); cout << " -> "; }
    cout << v;
}
\`\`\``,
          keys: ["dist[i] = inf", "dist[s] = 0", "visited[u] = true", "dist[u] + cost[u][v] < dist[v]", "prevv", "printpath"],
        },
        {
          id: "u4-dij-complexity",
          kind: "formula",
          q: "Complexity, limitation and applications of Dijkstra's algorithm.",
          a: `**Complexity**
- Cost matrix: choosing the minimum takes O(V) and is done V times, so time is **O(V²)**.
- Adjacency list and min-heap: **O((V + E) log V)**.
- Space = **O(V)**.

**Limitation**: it does **not** work correctly when some edge has a **negative weight**, because a vertex once marked visited is never updated again. For such graphs the **Bellman-Ford** algorithm is used.

**Applications**: route finding in maps and GPS, network routing protocols (OSPF), flight and railway planning, robot path planning.`,
          keys: ["o(v²)", "o((v + e) log v)", "negative weight", "bellman-ford", "gps", "ospf"],
        },
        {
          id: "u4-compare-prim-dijkstra",
          kind: "compare",
          q: "Compare Prim's algorithm and Dijkstra's algorithm.",
          a: `| Point | Prim's algorithm | Dijkstra's algorithm |
|---|---|---|
| Problem solved | Minimum spanning tree | Single-source shortest paths |
| Value kept for each vertex | Cost of the cheapest single edge joining it to the tree | Total distance from the source |
| Update rule | if cost[u][v] < key[v] | if dist[u] + cost[u][v] < dist[v] |
| Result | A tree of minimum total weight | A shortest-path tree rooted at the source |
| Graph type | Undirected | Directed or undirected, no negative weights |`,
          keys: ["mst", "shortest path", "key", "dist", "undirected", "negative"],
        }
      ]
    },
    {
      id: "u4-revision",
      title: "7. Quick Revision",
      cards: [
        {
          id: "u4-rev-summary",
          kind: "list",
          q: "Quick revision: one-line summary of every Unit IV topic.",
          a: `- **Graph**: G = (V, E). Undirected: sum of degrees = 2E. Complete graph: n(n − 1)/2 edges.
- **Adjacency matrix**: n × n, O(V²) space, edge test O(1), symmetric for undirected graphs.
- **Adjacency list**: array of linked lists, O(V + E) space, 2E nodes for an undirected graph.
- **BFS**: queue, level by level, O(V + E), shortest path in unweighted graphs.
- **DFS**: stack or recursion, deep first then backtrack, O(V + E), cycle detection and articulation points.
- **Topological sort**: ordering of a DAG; repeatedly remove a vertex of in-degree 0 (queue); O(V + E).
- **Spanning tree**: all V vertices, V − 1 edges, connected, no cycle. **MST**: spanning tree of least total weight.
- **Prim**: grow one tree; always add the cheapest edge from a tree vertex to a non-tree vertex. O(V²).
- **Kruskal**: sort edges; add the next cheapest edge that does not form a cycle (union-find). O(E log E).
- **Dijkstra**: pick the nearest unvisited vertex and relax its neighbours: dist[v] = min(dist[v], dist[u] + cost[u][v]). O(V²); no negative weights.`,
          keys: ["2e", "n(n − 1)/2", "queue", "stack", "in-degree 0", "v − 1", "relax"],
        },
        {
          id: "u4-rev-table",
          kind: "compare",
          q: "Summary table: purpose, strategy, data structure and time of BFS, DFS, Prim, Kruskal and Dijkstra.",
          a: `| Algorithm | Purpose | Strategy | Data structure | Time |
|---|---|---|---|---|
| BFS | Traversal | Level by level | Queue | O(V + E) |
| DFS | Traversal | Depth first, backtrack | Stack | O(V + E) |
| Prim | MST | Greedy on vertices | Cost matrix / min-heap | O(V²) / O(E log V) |
| Kruskal | MST | Greedy on edges | Sorted edges + union-find | O(E log E) |
| Dijkstra | Shortest paths | Greedy + relaxation | Cost matrix / min-heap | O(V²) / O((V+E) log V) |`,
          keys: ["queue", "stack", "greedy", "union-find", "min-heap", "relaxation"],
        }
      ]
    },
    {
      id: "u4-pyq",
      title: "Question bank (PYQs)",
      cards: [
        {
          id: "u4-pyq-1",
          kind: "pyq",
          q: "Q1. Define a graph. Explain the terms: degree, in-degree and out-degree, path, cycle, complete graph and connected graph, with examples. [5]",
          a: `**Definition**
A graph is a non-linear data structure G = (V, E), where V is a finite, non-empty set of vertices (nodes) and E is a set of edges, each edge joining a pair of vertices.

**Terms** (using G1: V = {A, B, C, D, E}, E = {(A,B), (A,C), (B,C), (B,D), (C,E), (D,E)})
- **Degree**: number of edges incident on a vertex. degree(B) = 3. In an undirected graph, sum of degrees = 2 × number of edges.
- **In-degree / out-degree**: in a directed graph, edges coming into / going out of a vertex. In G2: in-degree(B) = 2, out-degree(B) = 1.
- **Path**: sequence of vertices with each consecutive pair joined by an edge, e.g. A – B – D – E; length = number of edges.
- **Cycle**: a path that starts and ends at the same vertex, e.g. A – B – C – A.
- **Complete graph**: every vertex is adjacent to all others, degree n − 1, n(n − 1)/2 edges (K4 has 6).
- **Connected graph**: an undirected graph with a path between every pair of vertices; otherwise disconnected, and each piece is a connected component.`,
          keys: ["g = (v, e)", "degree", "in-degree", "out-degree", "path", "cycle", "complete", "connected"],
        },
        {
          id: "u4-pyq-2",
          kind: "pyq",
          q: "Q2. For graph G1 (edges A-B, A-C, B-C, B-D, C-E, D-E), construct the adjacency matrix and the adjacency list. Discuss the limitations of the adjacency matrix. [5] (End-sem Oct 2022)",
          a: `**Adjacency matrix** (symmetric, n × n)

| | A | B | C | D | E |
|---|---|---|---|---|---|
| A | 0 | 1 | 1 | 0 | 0 |
| B | 1 | 0 | 1 | 1 | 0 |
| C | 1 | 1 | 0 | 0 | 1 |
| D | 0 | 1 | 0 | 0 | 1 |
| E | 0 | 0 | 1 | 1 | 0 |

**Adjacency list** (array of linked lists; 6 edges, 12 list nodes)
- A: B, C
- B: A, C, D
- C: A, B, E
- D: B, E
- E: C, D

**Limitations of the adjacency matrix**
- Always needs n² cells, even if the graph has few edges (wasteful for sparse graphs).
- Finding all neighbours of a vertex takes O(n).
- Adding a vertex means rebuilding the matrix.`,
          keys: ["symmetric", "adjacency list", "n²", "sparse", "o(n)", "rebuild"],
        },
        {
          id: "u4-pyq-3",
          kind: "pyq",
          q: "Q3. A weighted graph on vertices A to F has edges A-B 3, A-C 7, A-D 2, A-E 4, B-C 9, B-F 10, C-D 1, D-E 5, D-F 8, E-F 6. Construct the graph and traverse it in breadth first order starting at vertex F. [5] (End-sem Oct 2021)",
          a: `**Graph (adjacency matrix, symmetric; 0 = no edge)**

| | A | B | C | D | E | F |
|---|---|---|---|---|---|---|
| A | 0 | 3 | 7 | 2 | 4 | 0 |
| B | 3 | 0 | 9 | 0 | 0 | 10 |
| C | 7 | 9 | 0 | 1 | 0 | 0 |
| D | 2 | 0 | 1 | 0 | 5 | 8 |
| E | 4 | 0 | 0 | 5 | 0 | 6 |
| F | 0 | 10 | 0 | 8 | 6 | 0 |

**BFS from F** (queue, neighbours in alphabetical order; weights are ignored)

| Step | Queue (front → rear) | Output |
|---|---|---|
| start: enqueue F | F | |
| dequeue F: enqueue B, D, E | B, D, E | F |
| dequeue B: enqueue A, C | D, E, A, C | F B |
| dequeue D: A, C, E already visited | E, A, C | F B D |
| dequeue E | A, C | F B D E |
| dequeue A | C | F B D E A |
| dequeue C | empty | F B D E A C |

**BFS order: F B D E A C**. Time O(V + E) with an adjacency list.`,
          keys: ["queue", "f b d e a c", "alphabetical", "visited", "o(v + e)"],
        },
        {
          id: "u4-pyq-4",
          kind: "pyq",
          q: "Q4. Write the algorithm for depth first search using a stack and find the DFS traversal of the graph in section 3.2 starting from A, showing the stack contents. [5]",
          a: `**Algorithm (DFS using a stack)**
1. Define a stack whose size is the total number of vertices.
2. Select any vertex as the starting point. Visit it and push it on the stack.
3. Visit any one of the non-visited adjacent vertices of the vertex at the top of the stack and push it.
4. Repeat step 3 until there is no new vertex to visit from the top vertex.
5. Then backtrack: pop one vertex from the stack.
6. Repeat steps 3, 4 and 5 until the stack becomes empty.
7. The edges used to reach new vertices form the depth first spanning tree.

**Trace from A** (stack bottom → top)

| Step | Action | Stack | Output |
|---|---|---|---|
| 1 | visit A, push | A | A |
| 2 | visit B, push | A, B | AB |
| 3 | visit C, push | A, B, C | ABC |
| 4 | visit E, push | A, B, C, E | ABCE |
| 5 | visit D, push | A, B, C, E, D | ABCED |
| 6 | D: no new vertex, pop | A, B, C, E | ABCED |
| 7 | visit F, push | A, B, C, E, F | ABCEDF |
| 8 | visit G, push | A, B, C, E, F, G | ABCEDFG |
| 9-14 | pop G, F, E, C, B, A | empty | ABCEDFG |

**DFS order: A B C E D F G**. Time O(V + E) (adjacency list), space O(V).`,
          keys: ["stack", "push", "pop", "backtrack", "a b c e d f g", "o(v + e)"],
        },
        {
          id: "u4-pyq-5",
          kind: "pyq",
          q: "Q5. Define a minimum spanning tree. Compare Prim's algorithm and Kruskal's algorithm and state their time complexities. [5] (End-sem Oct 2021; End-sem May 2022)",
          a: `**Minimum spanning tree**
A spanning tree of a connected undirected graph is a subgraph that contains all the vertices, is connected and has no cycle (n − 1 edges for n vertices). The **MST** of a weighted graph is the spanning tree whose total edge weight is the smallest. Both Prim's and Kruskal's are greedy algorithms.

**Comparison**

| Point | Prim's | Kruskal's |
|---|---|---|
| Works on | Vertices: adds one vertex at a time | Edges: adds one edge at a time |
| Starts from | Any chosen vertex | The cheapest edge |
| Intermediate result | Always one connected tree | A forest |
| Cycle check | Not needed | Needed (union-find) |
| Sorting of edges | Not required | Required |
| Time | O(V²) with matrix; O(E log V) with heap | O(E log E) |
| Better for | Dense graphs | Sparse graphs |`,
          keys: ["spanning tree", "smallest weight", "greedy", "vertices", "edges", "o(v²)", "o(e log e)", "union-find"],
        },
        {
          id: "u4-pyq-6",
          kind: "pyq",
          q: "Q6. Write the pseudocode of Kruskal's algorithm and construct the MST, step by step, for the graph with edges A-B 3, A-C 7, A-D 2, A-E 4, B-C 9, B-F 10, C-D 1, D-E 5, D-F 8, E-F 6. What is the cost of the MST? [5] (End-sem May 2022; Oct 2021)",
          a: `**Pseudocode**

\`\`\`
Algorithm Kruskal(E, n)
{
    sort E in increasing order of weight w
    for i ← 0 to n-1 do parent[i] ← i        // each vertex is its own set
    count ← 0;   mincost ← 0
    for each edge (u, v, w) in E do
    {
        a ← Find(u);    b ← Find(v)
        if (a ≠ b) then                      // no cycle
        {
            write "edge (u, v) cost w"
            parent[a] ← b                    // union
            mincost ← mincost + w
            count ← count + 1
            if (count = n-1) then break
        }
    }
    write mincost
}
\`\`\`

**Sorted edges**: C-D(1), A-D(2), A-B(3), A-E(4), D-E(5), E-F(6), A-C(7), D-F(8), B-C(9), B-F(10)

| Edge | Weight | Decision | Sets after the step |
|---|---|---|---|
| C-D | 1 | Accept | {C, D} {A} {B} {E} {F} |
| A-D | 2 | Accept | {A, C, D} {B} {E} {F} |
| A-B | 3 | Accept | {A, B, C, D} {E} {F} |
| A-E | 4 | Accept | {A, B, C, D, E} {F} |
| D-E | 5 | Reject (D and E in the same set: cycle) | same |
| E-F | 6 | Accept | {A, B, C, D, E, F} |

5 edges = V − 1, so stop.

**MST edges: C-D(1), A-D(2), A-B(3), A-E(4), E-F(6). Cost = 1 + 2 + 3 + 4 + 6 = 16.** Time O(E log E).`,
          keys: ["sort", "find", "union", "c-d", "a-d", "a-b", "a-e", "e-f", "16"],
        },
        {
          id: "u4-pyq-7",
          kind: "pyq",
          q: "Q7. Construct a minimum spanning tree for the graph in section 5.1 using Prim's algorithm starting from A. What is the cost of the MST? List the applications where an MST is required. [5] (End-sem Oct 2022; May 2024)",
          a: `**Prim's algorithm**: grow one tree from A; at each step add the cheapest edge joining a tree vertex to a non-tree vertex, V − 1 times.

| Step | Vertices in tree | Edges from tree to outside (cost) | Cheapest edge | Cost so far |
|---|---|---|---|---|
| 1 | {A} | A-B(6), A-C(1), A-D(5) | A-C (1) | 1 |
| 2 | {A, C} | A-B(6), A-D(5), C-B(5), C-D(5), C-E(6), C-F(4) | C-F (4) | 5 |
| 3 | {A, C, F} | A-B(6), A-D(5), C-B(5), C-D(5), C-E(6), F-D(2), F-E(6) | F-D (2) | 7 |
| 4 | {A, C, F, D} | A-B(6), C-B(5), C-E(6), F-E(6) | C-B (5) | 12 |
| 5 | {A, C, F, D, B} | B-E(3), C-E(6), F-E(6) | B-E (3) | 15 |

**MST edges: A-C, C-F, F-D, C-B, B-E. Cost = 1 + 4 + 2 + 5 + 3 = 15.**

**Applications of MST**: network design (connecting all points at minimum total cost), designing electrical circuits and telecommunication networks, laying cables, pipelines or roads between cities.`,
          keys: ["a-c", "c-f", "f-d", "c-b", "b-e", "15", "network design", "cables"],
        },
        {
          id: "u4-pyq-8",
          kind: "pyq",
          q: "Q8. Explain Dijkstra's algorithm and find the shortest path from A to all other vertices of the graph with edges A-B 3, A-C 7, A-D 2, A-E 4, B-C 9, B-F 10, C-D 1, D-E 5, D-F 8, E-F 6. [5]",
          a: `**Dijkstra's algorithm**: single-source shortest paths in a graph with non-negative weights; greedy. Keep dist[ ] (dist[s] = 0, others ∞). Repeat V times: pick the unvisited vertex u with the smallest dist (final), mark it visited, and relax its neighbours: if dist[u] + cost[u][v] < dist[v] then dist[v] = dist[u] + cost[u][v], prev[v] = u.

**Steps from A** (order of dist: A, B, C, D, E, F)

| Step | Selected u | dist[A] | dist[B] | dist[C] | dist[D] | dist[E] | dist[F] | Relaxation |
|---|---|---|---|---|---|---|---|---|
| Init | – | 0 | ∞ | ∞ | ∞ | ∞ | ∞ | |
| 1 | A | 0 | 3 | 7 | 2 | 4 | ∞ | B=3, C=7, D=2, E=4 |
| 2 | D | 0 | 3 | 3 | 2 | 4 | 10 | C: 2+1=3; E: 2+5=7 no; F: 2+8=10 |
| 3 | B | 0 | 3 | 3 | 2 | 4 | 10 | C: 3+9 no; F: 3+10 no |
| 4 | C | 0 | 3 | 3 | 2 | 4 | 10 | no change |
| 5 | E | 0 | 3 | 3 | 2 | 4 | 10 | F: 4+6=10, not less |
| 6 | F | 0 | 3 | 3 | 2 | 4 | 10 | no change |

**Result**: B = 3 (A→B), C = 3 (A→D→C), D = 2 (A→D), E = 4 (A→E), F = 10 (A→D→F; A→E→F also costs 10).

Time O(V²) with a cost matrix, O((V + E) log V) with a min-heap.`,
          keys: ["dist", "relaxation", "greedy", "non-negative", "b = 3", "c = 3", "d = 2", "e = 4", "f = 10"],
        },
        {
          id: "u4-pyq-9",
          kind: "pyq",
          q: "Q9. What is topological sorting? Illustrate with an example how topological sorting is performed. List any two applications where it can be used. [5] (End-sem Oct 2022; May 2024)",
          a: `**Definition**
Topological sort is a linear ordering of the vertices of a directed acyclic graph (DAG) such that if there is an edge from Vi to Vj, then Vj appears after Vi. Not possible if the graph has a cycle.

**Method (in-degrees and a queue)**
1. Find the in-degree of every vertex.
2. Enqueue all vertices of in-degree 0.
3. Dequeue a vertex, output it, decrement the in-degree of its adjacent vertices.
4. Enqueue any vertex whose in-degree becomes 0.
5. Repeat until the queue is empty. If some vertices were never dequeued, there is a cycle.

**Example** (DAG with in-degrees V1=0, V2=1, V3=2, V4=3, V5=1, V6=3, V7=2)

| Step | In-degrees of the remaining vertices | Enqueue | Output |
|---|---|---|---|
| Start | V1:0, V2:1, V3:2, V4:3, V5:1, V6:3, V7:2 | V1 | |
| dequeue V1 | V2:0, V3:1, V4:2, V5:1, V6:3, V7:2 | V2 | V1 |
| dequeue V2 | V3:1, V4:1, V5:0, V6:3, V7:2 | V5 | V1 V2 |
| dequeue V5 | V3:1, V4:0, V6:3, V7:1 | V4 | V1 V2 V5 |
| dequeue V4 | V3:0, V6:2, V7:0 | V3, V7 | V1 V2 V5 V4 |
| dequeue V3 | V6:1, V7:0 | – | V1 V2 V5 V4 V3 |
| dequeue V7 | V6:0 | V6 | V1 V2 V5 V4 V3 V7 |
| dequeue V6 | – | – | V1 V2 V5 V4 V3 V7 V6 |

**Topological order: V1, V2, V5, V4, V3, V7, V6.** Time O(V + E).

**Applications**: (1) deciding the order of subjects when some are prerequisites of others; (2) scheduling dependent tasks/jobs (project planning), also compilation order in a build system (makefile).`,
          keys: ["linear ordering", "dag", "in-degree", "queue", "v1, v2, v5, v4, v3, v7, v6", "prerequisite", "scheduling"],
        },
        {
          id: "u4-pyq-10",
          kind: "pyq",
          q: "Q10. Differentiate between BFS and DFS (any five points) and list two applications of each. [5]",
          a: `**Differences**

| Point | BFS | DFS |
|---|---|---|
| Full form | Breadth First Search | Depth First Search |
| Data structure | Queue (FIFO) | Stack (LIFO) or recursion |
| Order of visiting | Level by level; all neighbours first | One path as deep as possible, then backtrack |
| Shortest path | Finds the shortest path (fewest edges) in an unweighted graph | Does not guarantee the shortest path |
| Memory | More (stores a whole level) | Less (stores one path) |
| Time | O(V + E) | O(V + E) |
| Similar tree traversal | Level order | Preorder |

**Applications of BFS**: shortest path in an unweighted graph; checking whether a graph is connected or bipartite (also web crawlers, broadcasting in a network).

**Applications of DFS**: cycle detection / topological sorting; finding connected components and articulation points (also solving mazes by backtracking).`,
          keys: ["queue", "stack", "level", "backtrack", "shortest path", "cycle detection", "topological", "o(v + e)"],
        }
      ]
    }
  ]
});
