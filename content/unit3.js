window.DSA = window.DSA || [];
window.DSA.push({
  unit: 3,
  title: "Non-Linear Data Structure: Tree & Heap",
  topics: [
    {
      id: "u3-nonlinear",
      title: "1. Concept of Non-Linear Data Structures",
      cards: [
        {
          id: "u3-nl-def",
          kind: "def",
          q: "What is a non-linear data structure?",
          a: `Non-linear data structure is a data structure in which the elements are **not arranged in a single sequence**. One element can be connected to **several other elements**, so the data forms a **hierarchy (tree)** or a **network (graph)**.

- In a linear structure (array, linked list, stack, queue) every element has one predecessor and one successor, and all elements can be visited in one straight pass.
- In a non-linear structure an element can have many successors, the data is on several levels, and special traversal methods are needed.
- Non-linear structures model real relationships well: a family tree, folders inside folders, an organisation chart, a road map.`,
          keys: ["single sequence", "several elements", "hierarchy", "tree", "graph", "many successors"],
          tip: "Folders inside folders: one parent, many children."
        },
        {
          id: "u3-nl-compare",
          kind: "compare",
          q: "Compare linear and non-linear data structures.",
          a: `| Point | Linear | Non-linear |
|---|---|---|
| Arrangement | Sequential | Hierarchical or network |
| Levels | Single level | Multiple levels |
| Relationship | One-to-one | One-to-many (tree), many-to-many (graph) |
| Traversal | One simple pass | Inorder, preorder, postorder, BFS, DFS |
| Examples | Array, linked list, stack, queue | Tree, heap, graph |`,
          keys: ["sequential", "hierarchical", "one-to-one", "one-to-many", "many-to-many", "multiple levels"]
        }
      ]
    },
    {
      id: "u3-tree",
      title: "2. Tree",
      cards: [
        {
          id: "u3-tree-def",
          kind: "def",
          q: "What is a tree? How many edges does a tree with n nodes have?",
          a: `Tree is a **non-linear abstract data type** with a **hierarchy-based structure**. It consists of **nodes** (where the data is stored) connected by **links (edges)**. The tree stems from a single node called the **root**, and the remaining nodes form **subtrees** connected to the root.

A tree with n nodes has exactly **n − 1 edges** and has **no cycle**.`,
          keys: ["non-linear", "hierarchy", "nodes", "edges", "root", "n − 1", "no cycle"]
        },
        {
          id: "u3-tree-terms-1",
          kind: "list",
          q: "Define the basic tree terms: node, root, edge, parent, child, siblings.",
          a: `Using the tree of Fig. 1 (A is root; B, C children of A; D, E, F children of B; G, H children of C; I, J children of E; K child of G).

| Term | Meaning | In Fig. 1 |
|---|---|---|
| Node | Each element of the tree; it stores data and links to its children | A, B, C, ... K (11 nodes) |
| Root | The node at the top of the tree. Only one root, and one path from the root to any node | A |
| Edge | The connection between two nodes; shows the parent-child relationship | 10 edges |
| Parent | A node that has one or more children | B is the parent of D, E and F |
| Child | A node that is a descendant of (directly below) some node. All nodes except the root are child nodes | D, E, F are children of B |
| Siblings | Nodes that belong to the same parent | B and C; D, E and F; G and H; I and J |`,
          keys: ["node", "root", "edge", "parent", "child", "siblings", "same parent"]
        },
        {
          id: "u3-tree-terms-2",
          kind: "list",
          q: "Define leaf node, internal node, degree of a node and degree of a tree.",
          a: `| Term | Meaning | In Fig. 1 |
|---|---|---|
| Leaf (external / terminal) node | A node that does not have any child | D, I, J, F, K, H |
| Internal (non-terminal) node | A node that has at least one child. Every non-leaf node is an internal node | A, B, C, E, G |
| Degree of a node | The total number of children of that node | degree(A) = 2, degree(B) = 3, degree(G) = 1, degree(D) = 0 |
| Degree of a tree | The highest degree among all the nodes | 3 |`,
          keys: ["leaf", "no child", "internal", "at least one child", "degree", "number of children", "highest degree"]
        },
        {
          id: "u3-tree-terms-3",
          kind: "list",
          q: "Define path, depth (level) of a node, height of a node and height of a tree.",
          a: `| Term | Meaning | In Fig. 1 |
|---|---|---|
| Path | The sequence of nodes along the edges from one node to another | A–B–E–I |
| Depth (level) of a node | The number of edges from the root to that node. Depth of the root = 0. "Level" and "depth" are used interchangeably | A: 0; B, C: 1; D, E, F, G, H: 2; I, J, K: 3 |
| Height of a node | The number of edges on the longest path from that node down to a leaf. Height of every leaf = 0 | A: 3; B: 2; C: 2; E: 1; G: 1; leaves: 0 |
| Height (depth) of a tree | The height of the root = the number of edges on the longest path from the root to a leaf | 3 |`,
          keys: ["path", "depth", "root = 0", "height", "longest path", "leaf = 0", "edges"]
        },
        {
          id: "u3-tree-terms-4",
          kind: "list",
          q: "Define ancestors, descendants, subtree and forest.",
          a: `| Term | Meaning | In Fig. 1 |
|---|---|---|
| Ancestors | All nodes on the path from the root to the node | Ancestors of I: E, B, A |
| Descendants | All nodes in the subtrees of the node | Descendants of B: D, E, F, I, J |
| Subtree | Each child of a node forms a subtree (the child together with all its descendants) | Subtree rooted at C: C, G, H, K |
| Forest | A set of disjoint trees. Removing the root of a tree gives a forest | Removing A gives 2 trees |`,
          keys: ["ancestors", "path from root", "descendants", "subtree", "forest", "disjoint trees"]
        },
        {
          id: "u3-tree-convention",
          kind: "concept",
          q: "Level and height convention: what do these notes follow, and what do some books do?",
          a: `These notes follow the class PPT: the **root is at level (depth) 0** and **height is counted in edges**.

Some books (Horowitz and Sahni) put the **root at level 1** and count height in levels; then every level and height is **one more**. **State the convention you use** in the answer.`,
          keys: ["root level 0", "edges", "horowitz", "level 1", "one more", "state convention"]
        },
        {
          id: "u3-tree-types",
          kind: "list",
          q: "List the types of trees.",
          a: `Types of trees:

- General tree
- Binary tree (strict / full, complete, perfect, skewed, balanced)
- Binary search tree
- AVL tree
- B-tree
- Heap`,
          keys: ["general tree", "binary tree", "binary search tree", "avl", "b-tree", "heap"]
        },
        {
          id: "u3-tree-repr",
          kind: "list",
          q: "A general tree node can have any number of children. What are the two common representations of a general tree?",
          a: `Storing "one pointer per child" in every node wastes space, so two common representations are used:

1. **List (generalised list) representation**: write the root first, followed by the list of its subtrees in brackets.
2. **Left-child right-sibling representation**: every node has exactly two links; any general tree becomes a binary tree.`,
          keys: ["list representation", "generalised list", "left-child", "right-sibling", "two links", "binary tree"]
        },
        {
          id: "u3-tree-listrepr",
          kind: "trace",
          q: "Write the tree of Fig. 1 in list (generalised list) representation.",
          a: `Write the **root first**, followed by the list of its **subtrees in brackets**. The tree of Fig. 1 is written as:

\`\`\`
( A ( B ( D, E ( I, J ), F ), C ( G ( K ), H ) ) )
\`\`\``,
          keys: ["root first", "subtrees", "brackets", "(a (b", "d, e (i, j), f", "c (g (k), h)"]
        },
        {
          id: "u3-tree-lcrs",
          kind: "concept",
          q: "Explain the left-child right-sibling representation of a tree.",
          a: `Every node has **exactly two links**, whatever its degree:

- the **left link** points to its **first (leftmost) child**
- the **right link** points to its **next sibling**

In this way any general tree becomes a **binary tree**, which is easy to store and process.

For Fig. 1 the binary form is: A is the root, A.left = B; B.left = D, B.right = C; D.right = E; E.left = I, E.right = F; I.right = J; C.left = G; G.left = K, G.right = H.`,
          keys: ["two links", "left link", "first child", "right link", "next sibling", "binary tree"]
        },
        {
          id: "u3-tree-convert",
          kind: "algo",
          q: "State the rule to convert a general tree into a binary tree.",
          a: `1. Keep the link from each node to its **leftmost child**.
2. Join all **siblings with horizontal links**.
3. **Remove the other parent-child links**.
4. Turn the picture **45° clockwise**.

The **root never has a right child** because it has no sibling.`,
          keys: ["leftmost child", "siblings", "horizontal links", "remove other links", "45° clockwise", "root no right child"],
          tip: "Keep, Join, Remove, Rotate."
        }
      ]
    },
    {
      id: "u3-binary-tree",
      title: "3. Binary Tree",
      cards: [
        {
          id: "u3-bt-def",
          kind: "def",
          q: "What is a binary tree? How does it differ from a general tree?",
          a: `Binary tree is a finite set of nodes that is either **empty**, or consists of a **root** and two disjoint binary trees called the **left subtree** and the **right subtree**. So every node has **at most two children**, and left and right are distinguished.

**Difference from a general tree:**

- A tree cannot be empty but a binary tree can.
- In a binary tree the order of children matters (a node with only a left child is different from a node with only a right child).`,
          keys: ["finite set", "empty", "root", "left subtree", "right subtree", "at most two children", "order matters"]
        },
        {
          id: "u3-bt-adt",
          kind: "concept",
          q: "Write the Binary Tree ADT (data and operations).",
          a: `**ADT BinaryTree**

**Data:** a finite set of nodes that is either empty or has a root, a left binary tree and a right binary tree.

**Operations:**

- create() – create an empty binary tree
- isEmpty(bt) – true if the tree is empty
- makeBT(bt1, item, bt2) – make a tree with root item, left subtree bt1 and right subtree bt2
- lchild(bt), rchild(bt) – return the left / right subtree
- data(bt) – return the data in the root
- insert, delete, search, traverse (inorder, preorder, postorder)`,
          keys: ["create", "isempty", "makebt", "lchild", "rchild", "data", "traverse"]
        },
        {
          id: "u3-bt-types",
          kind: "list",
          q: "Explain the types of binary trees: full, complete, perfect, skewed, balanced.",
          a: `| Type | Meaning |
|---|---|
| Full / strictly binary tree | Every node has either **0 or 2 children**; no node has exactly one child |
| Complete binary tree | All levels are completely filled except possibly the last, and the last level is filled **from left to right without gaps** |
| Perfect binary tree | All internal nodes have 2 children and **all leaves are at the same level**. A perfect tree of height h has 2^(h+1) − 1 nodes |
| Skewed binary tree | New nodes are added only on one side: every node has only a left child (left skewed) or only a right child (right skewed). It behaves like a linked list |
| Balanced binary tree | The heights of the left and right subtrees of every node differ by at most 1, so the height stays close to log₂ n |`,
          keys: ["full", "0 or 2 children", "complete", "left to right", "perfect", "same level", "skewed", "balanced"]
        },
        {
          id: "u3-bt-props",
          kind: "formula",
          q: "State the properties of a binary tree (root at level 0, h = height in edges).",
          a: `1. There is one and only one **path** between every pair of nodes in a tree.
2. A tree with n nodes has exactly **n − 1 edges**. Trees are acyclic; any connected graph with n vertices and n − 1 edges is a tree.
3. The **maximum number of nodes at level l is 2^l**. (Level 0: 1 node, level 1: 2 nodes, level 2: 4 nodes ...)
4. The **maximum number of nodes** in a binary tree of height h is **2^(h+1) − 1**. (1 + 2 + 4 + ... + 2^h)
5. The **minimum number of nodes** in a binary tree of height h is **h + 1** (when each node has only one child, i.e. a skewed tree).
6. For any non-empty binary tree, if n0 is the number of leaf nodes and n2 is the number of nodes of degree 2, then **n0 = n2 + 1**.
7. The height of a complete binary tree with n nodes is **⌊log₂ n⌋**; this is the minimum possible height for n nodes. The maximum possible height is n − 1.
8. In the linked representation of a tree with n nodes there are **2n link fields, of which n + 1 are NULL**.`,
          keys: ["n − 1 edges", "2^l", "2^(h+1) − 1", "h + 1", "n0 = n2 + 1", "⌊log₂ n⌋", "n + 1 null"],
          tip: "Max nodes = 1+2+4+...+2^h; min = a chain of h+1."
        },
        {
          id: "u3-bt-minmax",
          kind: "compare",
          q: "Give the minimum and maximum nodes for height h in a binary tree, full binary tree and complete binary tree.",
          a: `| Tree | Minimum nodes for height h | Maximum nodes for height h |
|---|---|---|
| Binary tree | h + 1 | 2^(h+1) − 1 |
| Full (strict) binary tree | 2h + 1 | 2^(h+1) − 1 |
| Complete binary tree | 2^h | 2^(h+1) − 1 |`,
          keys: ["h + 1", "2h + 1", "2^h", "2^(h+1) − 1", "full", "complete"]
        },
        {
          id: "u3-bt-proof6",
          kind: "concept",
          q: "Prove that n0 = n2 + 1 (leaf nodes = nodes of degree 2 + 1).",
          a: `Let n1 be the number of nodes of degree 1.

1. Total nodes **n = n0 + n1 + n2**.
2. Every node except the root has one edge coming into it, so **edges = n − 1**.
3. Counting edges from the parent side, **edges = n1 + 2n2**.
4. So n0 + n1 + n2 − 1 = n1 + 2n2, which gives **n0 = n2 + 1**.`,
          keys: ["n1", "n0 + n1 + n2", "n − 1", "n1 + 2n2", "n0 = n2 + 1"]
        },
        {
          id: "u3-bt-array",
          kind: "concept",
          q: "Explain the array (sequential) representation of a binary tree with the index formulas.",
          a: `The tree elements are stored in an array, and the parent-child relationship is kept through the **indices**. Number the nodes **level by level, left to right**, as if the tree were complete.

**Root at index 0**, for a node at index i:

- Left child is at **2i + 1**
- Right child is at **2i + 2**
- Parent is at **⌊(i − 1) / 2⌋**

**Root at index 1:** left child = 2i, right child = 2i + 1, parent = i / 2.

This is also called the **static or sequential representation**.`,
          keys: ["level by level", "2i + 1", "2i + 2", "(i − 1) / 2", "root at 1", "static"]
        },
        {
          id: "u3-bt-array-ex",
          kind: "trace",
          q: "Example: store the tree A(B(D,E), C(–,F)) in an array. Where are C and its right child?",
          a: `Tree: A is root; B and C are its children; D, E are children of B; C has only a right child F.

| Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| Node | A | B | C | D | E | – | F |

C is at index 2; its right child F is at 2 × 2 + 2 = **6**; index 5 (left child of C) is **empty**.`,
          keys: ["index 2", "2 × 2 + 2", "6", "index 5 empty", "level by level"]
        },
        {
          id: "u3-bt-array-char",
          kind: "list",
          q: "State the characteristics of array representation of a binary tree.",
          a: `- **Space-efficient** for complete or nearly complete binary trees, but **wasteful for sparse trees** because of the empty slots (a right-skewed tree with n nodes needs 2n − 1 cells).
- **Fast access** to children and parent by simple arithmetic on indices.
- **Limitation:** the size is fixed and must be known in advance, and resizing the array is costly.`,
          keys: ["complete trees", "wasteful sparse", "empty slots", "index arithmetic", "fixed size", "resizing costly"]
        },
        {
          id: "u3-bt-linked",
          kind: "concept",
          q: "Explain the linked representation of a binary tree.",
          a: `Each node has **three fields**: a pointer to the **left child**, the **data**, and a pointer to the **right child**. A pointer **root** points to the root node; a missing child is **NULL**.

**Characteristics:**

- **Space-efficient for sparse trees**, because memory is allocated only for existing nodes.
- **Dynamic size:** the tree can grow or shrink, so insertion and deletion are easy.
- **Performance:** reaching a child means following a pointer, slightly slower than index arithmetic, and the **parent cannot be reached directly**.
- **Overhead:** each node needs extra memory for two pointers.`,
          keys: ["three fields", "left pointer", "data", "right pointer", "null", "dynamic", "parent not reachable"]
        },
        {
          id: "u3-bt-linked-code",
          kind: "code",
          q: "Write the C++ node structure and createNode function for a binary tree.",
          a: `\`\`\`cpp
struct Node {
    int   data;
    Node* left;     // address of left child
    Node* right;    // address of right child
};

Node* createNode(int x) {
    Node* n = new Node;
    n->data = x;
    n->left = n->right = NULL;
    return n;
}
\`\`\``,
          keys: ["struct node", "data", "left", "right", "new node", "null", "return n"]
        },
        {
          id: "u3-bt-array-vs-linked",
          kind: "compare",
          q: "Compare array representation and linked representation of a binary tree.",
          a: `| Point | Array representation | Linked representation |
|---|---|---|
| Memory | Static, may waste many cells | Dynamic, 2 pointers per node |
| Finding parent / child | By index arithmetic, O(1) | Child by pointer; parent not directly |
| Insertion / deletion | Costly | Easy (change pointers) |
| Best suited for | Complete binary trees, heaps | Any shape of tree, BST |`,
          keys: ["static", "dynamic", "index arithmetic", "o(1)", "pointers", "heaps", "bst"]
        }
      ]
    },
    {
      id: "u3-traversals",
      title: "3.5 Binary Tree Traversals",
      cards: [
        {
          id: "u3-tr-def",
          kind: "def",
          q: "What is tree traversal? Name the three standard orders and the rule of each.",
          a: `Traversal means **visiting every node of the tree exactly once** in a systematic order. With L = traverse left subtree, D = visit the node (root), R = traverse right subtree, there are three standard orders.

| Traversal | Order | Rule |
|---|---|---|
| Inorder | LDR | Traverse the left subtree, visit the root, traverse the right subtree |
| Preorder | DLR | Visit the root, traverse the left subtree, traverse the right subtree |
| Postorder | LRD | Traverse the left subtree, traverse the right subtree, visit the root |

The name tells where the root is visited: **pre = root first, in = root in the middle, post = root last**. These three are **depth-first** traversals. There is also a **breadth-first** traversal called **level order**, which visits the nodes level by level from left to right using a **queue**.`,
          keys: ["inorder", "ldr", "preorder", "dlr", "postorder", "lrd", "level order", "queue"],
          tip: "Pre = root first, In = root in the middle, Post = root last."
        },
        {
          id: "u3-tr-example",
          kind: "trace",
          q: "Write inorder, preorder, postorder and level order for the tree 1(2(4(8,–),5), 3(6(9,10),7)).",
          a: `Tree: root 1; 1 has children 2 and 3; 2 has children 4 and 5; 4 has left child 8; 3 has children 6 and 7; 6 has children 9 and 10.

- **Inorder:** 8 4 2 5 1 9 6 10 3 7
- **Preorder:** 1 2 4 8 5 3 6 9 10 7
- **Postorder:** 8 4 5 2 9 10 6 7 3 1
- **Level order:** 1 2 3 4 5 6 7 8 9 10`,
          keys: ["8 4 2 5 1 9 6 10 3 7", "1 2 4 8 5 3 6 9 10 7", "8 4 5 2 9 10 6 7 3 1", "1 2 3 4 5 6 7 8 9 10"]
        },
        {
          id: "u3-tr-rec-algo",
          kind: "algo",
          q: "Write the recursive algorithms (pseudocode) for inorder, preorder and postorder traversal.",
          a: `**Algorithm Inorder(T)**

\`\`\`
if (T ≠ NULL) then
{
    Inorder(T->left)
    visit(T)
    Inorder(T->right)
}
\`\`\`

**Algorithm Preorder(T)**

\`\`\`
if (T ≠ NULL) then
{
    visit(T)
    Preorder(T->left)
    Preorder(T->right)
}
\`\`\`

**Algorithm Postorder(T)**

\`\`\`
if (T ≠ NULL) then
{
    Postorder(T->left)
    Postorder(T->right)
    visit(T)
}
\`\`\``,
          keys: ["t ≠ null", "t->left", "t->right", "visit", "inorder", "preorder", "postorder"]
        },
        {
          id: "u3-tr-rec-code",
          kind: "code",
          q: "Write the C++ code for recursive inorder, preorder and postorder traversal.",
          a: `\`\`\`cpp
void inorder(Node* t) {
    if (t != NULL) {
        inorder(t->left);
        cout << t->data << " ";
        inorder(t->right);
    }
}

void preorder(Node* t) {
    if (t != NULL) {
        cout << t->data << " ";
        preorder(t->left);
        preorder(t->right);
    }
}

void postorder(Node* t) {
    if (t != NULL) {
        postorder(t->left);
        postorder(t->right);
        cout << t->data << " ";
    }
}
\`\`\``,
          keys: ["t != null", "t->left", "t->right", "cout << t->data", "inorder", "preorder", "postorder"]
        },
        {
          id: "u3-tr-complexity",
          kind: "formula",
          q: "What are the time and space complexities of recursive tree traversals?",
          a: `Each node is visited once, so every traversal takes **O(n)** time. The recursion stack needs **O(h)** space, where h is the height of the tree.`,
          keys: ["o(n)", "visited once", "o(h)", "recursion stack", "height"]
        },
        {
          id: "u3-tr-nonrec-intro",
          kind: "concept",
          q: "Why and how are non-recursive traversals done?",
          a: `Recursion uses the **system stack**. We can do the same work ourselves with **our own stack of node pointers**. This gives non-recursive (iterative) inorder, preorder and postorder traversals.`,
          keys: ["system stack", "own stack", "node pointers", "iterative"]
        },
        {
          id: "u3-tr-inorder-nr",
          kind: "algo",
          q: "Write the algorithm for non-recursive inorder traversal.",
          a: `1. Create an empty stack S and set cur = root.
2. While cur ≠ NULL or S is not empty, repeat steps 3 to 5.
3. While cur ≠ NULL: **push cur** on S and move to the left child (cur = cur->left).
4. **Pop** a node from S into cur and **visit** it.
5. Move to its **right child** (cur = cur->right).

**Algorithm InorderNonRec(root)**

\`\`\`
create empty stack S;   cur ← root
while (cur ≠ NULL or S is not empty) do
{
    while (cur ≠ NULL) do          // go as far left as possible
    {   push(S, cur);   cur ← cur->left   }
    cur ← pop(S)
    visit(cur)
    cur ← cur->right               // now handle the right subtree
}
\`\`\``,
          keys: ["empty stack", "cur = root", "push cur", "cur->left", "pop", "visit", "cur->right"]
        },
        {
          id: "u3-tr-inorder-nr-trace",
          kind: "trace",
          q: "Trace non-recursive inorder on the tree A(B(D,E), C).",
          a: `Tree: A is root; B and C are children of A; D and E are children of B.

| Action | Stack (bottom → top) | Output |
|---|---|---|
| push A, go to its left child | A | |
| push B, go to its left child | A, B | |
| push D, go to its left child | A, B, D | |
| left is NULL: pop D, visit it, go to its right child | A, B | D |
| left is NULL: pop B, visit it, go to its right child | A | DB |
| push E, go to its left child | A, E | DB |
| left is NULL: pop E, visit it, go to its right child | A | DBE |
| left is NULL: pop A, visit it, go to its right child | empty | DBEA |
| push C, go to its left child | C | DBEA |
| left is NULL: pop C, visit it, go to its right child | empty | DBEAC |

Inorder = **D B E A C**.`,
          keys: ["push a", "push b", "push d", "pop d", "dbeac", "stack"]
        },
        {
          id: "u3-tr-preorder-nr",
          kind: "algo",
          q: "Write the algorithm for non-recursive preorder traversal. Why is the right child pushed first?",
          a: `1. If root = NULL, stop. **Push root** on an empty stack S.
2. While S is not empty: **pop** a node and **visit** it; push its **right child** (if any), then push its **left child** (if any).

The right child is pushed first so that the **left child is on top** and gets processed first.

**Algorithm PreorderNonRec(root)**

\`\`\`
if (root = NULL) then return
create empty stack S;   push(S, root)
while (S is not empty) do
{
    cur ← pop(S)
    visit(cur)
    if (cur->right ≠ NULL) then push(S, cur->right)
    if (cur->left ≠ NULL) then push(S, cur->left)
}
\`\`\``,
          keys: ["push root", "pop", "visit", "push right", "push left", "left on top"]
        },
        {
          id: "u3-tr-preorder-nr-trace",
          kind: "trace",
          q: "Trace non-recursive preorder on the tree A(B(D,E), C).",
          a: `| Action | Stack (bottom → top) | Output |
|---|---|---|
| push root A | A | |
| pop A, visit it; push C, B | C, B | A |
| pop B, visit it; push E, D | C, E, D | AB |
| pop D, visit it; no children | C, E | ABD |
| pop E, visit it; no children | C | ABDE |
| pop C, visit it; no children | empty | ABDEC |

Preorder = **A B D E C**.`,
          keys: ["push a", "push c, b", "push e, d", "abdec", "pop"]
        },
        {
          id: "u3-tr-postorder-nr",
          kind: "algo",
          q: "Write the algorithm for non-recursive postorder traversal (two-stack method) and explain why it works.",
          a: `1. If root = NULL, stop. **Push root on stack S1**.
2. While S1 is not empty: **pop** a node from S1 and **push it on S2**; then push its **left child** and its **right child** (if any) on S1.
3. **Pop all nodes from S2** and visit them. This order is the postorder.

**Why it works:** S2 receives the nodes in the order **root, right, left**. Popping S2 reverses it to **left, right, root**.

**Algorithm PostorderNonRec(root)**

\`\`\`
if (root = NULL) then return
create empty stacks S1, S2;   push(S1, root)
while (S1 is not empty) do
{
    cur ← pop(S1)
    push(S2, cur)
    if (cur->left ≠ NULL) then push(S1, cur->left)
    if (cur->right ≠ NULL) then push(S1, cur->right)
}
while (S2 is not empty) do
    visit(pop(S2))
\`\`\``,
          keys: ["two stacks", "s1", "s2", "push left then right", "root, right, left", "reverse", "left, right, root"]
        },
        {
          id: "u3-tr-postorder-nr-trace",
          kind: "trace",
          q: "Trace non-recursive postorder (two stacks) on the tree A(B(D,E), C).",
          a: `| Action | S1 (bottom → top) | S2 (bottom → top) |
|---|---|---|
| push root A on S1 | A | empty |
| pop A from S1, push it on S2; push B, C on S1 | B, C | A |
| pop C from S1, push it on S2 | B | A, C |
| pop B from S1, push it on S2; push D, E on S1 | D, E | A, C, B |
| pop E from S1, push it on S2 | D | A, C, B, E |
| pop D from S1, push it on S2 | empty | A, C, B, E, D |
| pop everything from S2 and visit | empty | Output: D E B C A |

Postorder = **D E B C A**.`,
          keys: ["s1", "s2", "a, c, b, e, d", "d e b c a", "pop s2"]
        },
        {
          id: "u3-tr-nr-code",
          kind: "code",
          q: "Write the C++ code for non-recursive inorder, preorder and postorder traversals.",
          a: `\`\`\`cpp
void inorderNonRec(Node* root) {
    stack<Node*> s;
    Node* cur = root;
    while (cur != NULL || !s.empty()) {
        while (cur != NULL) { s.push(cur); cur = cur->left; }
        cur = s.top(); s.pop();
        cout << cur->data << " ";
        cur = cur->right;
    }
}

void preorderNonRec(Node* root) {
    if (root == NULL) return;
    stack<Node*> s;
    s.push(root);
    while (!s.empty()) {
        Node* cur = s.top(); s.pop();
        cout << cur->data << " ";
        if (cur->right != NULL) s.push(cur->right);
        if (cur->left != NULL) s.push(cur->left);
    }
}

void postorderNonRec(Node* root) {
    if (root == NULL) return;
    stack<Node*> s1, s2;
    s1.push(root);
    while (!s1.empty()) {
        Node* cur = s1.top(); s1.pop();
        s2.push(cur);
        if (cur->left != NULL) s1.push(cur->left);
        if (cur->right != NULL) s1.push(cur->right);
    }
    while (!s2.empty()) { cout << s2.top()->data << " "; s2.pop(); }
}
\`\`\``,
          keys: ["stack<node*>", "s.push", "s.top()", "s.pop()", "cur->left", "cur->right", "s1", "s2"]
        },
        {
          id: "u3-tr-construct",
          kind: "algo",
          q: "How is a binary tree constructed from two traversals?",
          a: `A binary tree can be built **uniquely** from **inorder + preorder** or from **inorder + postorder**. (**Preorder + postorder alone is not enough.**)

1. The **first element of preorder** (or the **last element of postorder**) is the **root**.
2. Find the root in the inorder sequence. Everything to its **left** is the **left subtree**; everything to its **right** is the **right subtree**.
3. **Repeat** the same steps for each subtree.`,
          keys: ["inorder + preorder", "inorder + postorder", "first of preorder", "last of postorder", "root", "left subtree", "right subtree", "repeat"]
        },
        {
          id: "u3-tr-construct-ex",
          kind: "trace",
          q: "Previous-year example: construct the tree from Preorder: G B Q A C K F P D E R H and Inorder: Q B K C F A G P E D H R.",
          a: `Steps (root = first in the preorder of that part):

1. Root **G**. In the inorder, left of G: Q B K C F A; right of G: P E D H R.
2. Root **B**. Left of B: Q; right of B: K C F A.
3. Root **A**. Left of A: K C F; right of A: nothing.
4. Root **C**. Left of C: K; right of C: F.
5. Root **P**. Left of P: nothing; right of P: E D H R.
6. Root **D**. Left of D: E; right of D: H R.
7. Root **R**. Left of R: H; right of R: nothing.

**Constructed tree:** G has left B and right P. B has left Q and right A. A has left C (C has left K, right F). P has right D. D has left E and right R. R has left H.

**Check:** postorder of this tree is **Q K F C A B E H R D P G**.`,
          keys: ["root g", "b", "a", "c", "p", "d", "r", "q k f c a b e h r d p g"]
        }
      ]
    },
    {
      id: "u3-bst",
      title: "4. Binary Search Tree (BST)",
      cards: [
        {
          id: "u3-bst-def",
          kind: "def",
          q: "What is a binary search tree (BST)? State its important property.",
          a: `Binary search tree is a binary tree that is either **empty** or satisfies these rules for every node:

1. All keys in the **left subtree are smaller** than the key of the node.
2. All keys in the **right subtree are greater** than the key of the node.
3. The left and right subtrees are themselves **binary search trees**.

Normally **duplicate keys are not allowed**.

**Important property:** the **inorder traversal of a BST gives the keys in ascending (sorted) order**. For the example BST 12(7(5,9(–,10)),19): 5, 7, 9, 10, 12, 19.`,
          keys: ["left smaller", "right greater", "subtrees are bst", "no duplicates", "inorder", "ascending"],
          tip: "left < root < right; inorder = sorted."
        },
        {
          id: "u3-bst-node",
          kind: "code",
          q: "Write the C++ node structure for a BST.",
          a: `\`\`\`cpp
struct Node {
    int   data;
    Node* left;
    Node* right;
};
Node* root = NULL;
\`\`\``,
          keys: ["struct node", "data", "left", "right", "root = null"]
        },
        {
          id: "u3-bst-search-algo",
          kind: "algo",
          q: "Explain searching in a BST (idea and algorithm).",
          a: `**Idea:** compare the key with the root. If equal, it is found. If the key is smaller, search only the **left subtree**; if greater, search only the **right subtree**. Each comparison removes one whole subtree, like binary search.

1. Set temp = root.
2. If temp = NULL, the key is **not present**; stop.
3. If key = temp->data, the key is **found**; stop.
4. If key < temp->data, set temp = temp->left; otherwise set temp = temp->right. Go to step 2.`,
          keys: ["temp = root", "null not found", "key = temp->data", "left", "right", "binary search"]
        },
        {
          id: "u3-bst-search-pseudo",
          kind: "code",
          q: "Write the iterative and recursive pseudocode for BST search.",
          a: `**Algorithm Search(root, key)** (iterative)

\`\`\`
temp ← root
while (temp ≠ NULL) do
{
    if (key = temp->data) then
        return temp
    else if (key < temp->data) then
        temp ← temp->left
    else
        temp ← temp->right
}
return NULL          // not found
\`\`\`

**Algorithm RSearch(T, key)** (recursive)

\`\`\`
if (T = NULL) then
    return NULL
if (key = T->data) then
    return T
if (key < T->data) then
    return RSearch(T->left, key)
else
    return RSearch(T->right, key)
\`\`\``,
          keys: ["temp ← root", "temp ≠ null", "key = temp->data", "temp->left", "temp->right", "return null", "rsearch"]
        },
        {
          id: "u3-bst-search-trace",
          kind: "trace",
          q: "Search for 10 in the BST 12(7(5,9(–,10)),19). How many comparisons?",
          a: `1. Compare 10 with the root 12: 10 < 12, so move to the **left** subtree (no need to look at the right subtree).
2. 10 > 7, move **right**.
3. 10 > 9, move **right**.
4. 10 = 10, **found** after **4 comparisons**.`,
          keys: ["12", "left", "7", "right", "9", "found", "4 comparisons"]
        },
        {
          id: "u3-bst-insert-algo",
          kind: "algo",
          q: "Explain insertion in a BST (idea and algorithm).",
          a: `**Idea:** a new key is always inserted as a **leaf**. Search for the key as usual; the place where the search falls off the tree (reaches NULL) is where the new node is attached.

1. Create newNode with the key; set its left and right to NULL.
2. If root = NULL, set root = newNode and stop.
3. Set temp = root and parent = NULL.
4. While temp ≠ NULL: set parent = temp; if key < temp->data move to temp->left, otherwise move to temp->right.
5. If key < parent->data, set parent->left = newNode; otherwise set parent->right = newNode.`,
          keys: ["new node", "leaf", "root = null", "temp", "parent", "key < parent->data", "attach"]
        },
        {
          id: "u3-bst-insert-pseudo",
          kind: "code",
          q: "Write the iterative and recursive pseudocode for BST insertion.",
          a: `**Algorithm Insert(key)** (iterative)

\`\`\`
newNode ← new Node(key)
if (root = NULL) then
{   root ← newNode;   return   }
temp ← root;   parent ← NULL
while (temp ≠ NULL) do
{
    parent ← temp
    if (key < temp->data) then
        temp ← temp->left
    else
        temp ← temp->right
}
if (key < parent->data) then
    parent->left ← newNode
else
    parent->right ← newNode
\`\`\`

**Algorithm RInsert(T, key)** (recursive)

\`\`\`
if (T = NULL) then
    return new Node(key)
if (key < T->data) then
    T->left ← RInsert(T->left, key)
else if (key > T->data) then
    T->right ← RInsert(T->right, key)
return T
// call: root ← RInsert(root, key)
\`\`\``,
          keys: ["newnode", "parent ← temp", "key < temp->data", "parent->left", "parent->right", "rinsert", "return t"]
        },
        {
          id: "u3-bst-insert-ex1",
          kind: "trace",
          q: "Build a BST by inserting 12, 7, 9, 19, 5, 10 in this order.",
          a: `1. Insert **12**: becomes the root.
2. Insert **7**: 7 < 12, left child of 12.
3. Insert **9**: 9 < 12, go left; 9 > 7, right child of 7.
4. Insert **19**: 19 > 12, right child of 12.
5. Insert **5**: 5 < 12, 5 < 7, left child of 7.
6. Insert **10**: 10 < 12, 10 > 7, 10 > 9, right child of 9.

Final tree: 12 (left 7 (left 5, right 9 (right 10)), right 19). Inorder: 5, 7, 9, 10, 12, 19.`,
          keys: ["12 root", "7 left", "9", "19 right", "5", "10", "inorder sorted"]
        },
        {
          id: "u3-bst-insert-ex2",
          kind: "trace",
          q: "Previous-year: insert G, C, B, A, D, E, F, I, H into an empty BST and represent the tree using an array (static memory allocation).",
          a: `**Building the tree (root G):**

1. G: root.
2. C < G: left of G.
3. B < G, B < C: left of C.
4. A < G, < C, < B: left of B.
5. D < G, D < C? No, D > C: right of C.
6. E > C, E > D: right of D.
7. F > C, > D, > E: right of E.
8. I > G: right of G.
9. H > G, H < I: left of I.

**Array representation (index: node):** 0: G, 1: C, 2: I, 3: B, 4: D, 5: H, 7: A, 10: E, 22: F. All other positions up to index 22 are empty.

(Left child at 2i+1, right child at 2i+2: C=1 → B=3, D=4; B=3 → A=7; D=4 → E=10; E=10 → F=22; I=2 → H=5.)

**Inorder:** A B C D E F G H I`,
          keys: ["g root", "c left", "i right", "0: g", "1: c", "2: i", "22: f", "inorder a b c d e f g h i"]
        },
        {
          id: "u3-bst-delete-cases",
          kind: "algo",
          q: "Explain deletion in a BST: the three cases.",
          a: `First **search** for the node. Then there are three cases, depending on how many children the node has.

| Case | What to do |
|---|---|
| 1. Node is a leaf (no child) | Simply remove it: set the parent's link to NULL |
| 2. Node has one child | Link the parent directly to that child (the child takes the node's place), then remove the node |
| 3. Node has two children | Find its **inorder successor** (the smallest key in its right subtree). Copy the successor's key into the node, then delete the successor from the right subtree. (The successor has no left child, so that deletion is case 1 or 2.) The **inorder predecessor** (largest key in the left subtree) can be used instead |`,
          keys: ["leaf", "set parent link null", "one child", "child replaces", "two children", "inorder successor", "smallest right subtree", "predecessor"]
        },
        {
          id: "u3-bst-delete-ex",
          kind: "trace",
          q: "Show the deletion cases on the BST 12(7(5,9(–,10)),19) (each deletion on the original tree).",
          a: `- **Case 1: delete 19 (a leaf):** just remove it. Tree: 12(7(5,9(–,10)), –).
- **Case 2: delete 9 (one child):** its child 10 is linked to 7. Tree: 12(7(5,10),19).
- **Case 3 (a): delete 12 (two children) using the inorder predecessor:** 10, the largest key of the left subtree, replaces it. Tree: 10(7(5,9),19).
- **Case 3 (b): delete 12 (two children) using the inorder successor:** 19, the smallest key of the right subtree, replaces it. Tree: 19(7(5,9(–,10)),–).`,
          keys: ["delete 19 leaf", "delete 9", "10 linked to 7", "delete 12", "predecessor 10", "successor 19"]
        },
        {
          id: "u3-bst-delete-pseudo",
          kind: "algo",
          q: "Write the pseudocode for BST deletion (Delete and FindMin).",
          a: `**Algorithm Delete(T, key)** // returns the root of the changed subtree

\`\`\`
if (T = NULL) then return NULL                         // key not found
if (key < T->data) then        T->left ← Delete(T->left, key)
else if (key > T->data) then T->right ← Delete(T->right, key)
else                                                   // node found
{
     if (T->left = NULL) then                          // case 1 or 2
     {   temp ← T->right;    delete T;   return temp   }
     else if (T->right = NULL) then                    // case 2
     {   temp ← T->left;     delete T;   return temp   }
     else                                              // case 3
     {
          succ ← FindMin(T->right)                     // inorder successor
          T->data ← succ->data
          T->right ← Delete(T->right, succ->data)
     }
}
return T
\`\`\`

**Algorithm FindMin(T)**

\`\`\`
while (T->left ≠ NULL) do T ← T->left
return T
\`\`\``,
          keys: ["t = null", "key < t->data", "t->left = null", "temp", "findmin", "succ", "t->data ← succ->data", "delete(t->right"]
        },
        {
          id: "u3-bst-code",
          kind: "code",
          q: "Write the C++ code for BST search, insert, findMin, deleteNode and inorder.",
          a: `\`\`\`cpp
Node* search(int key) {
    Node* temp = root;
    while (temp != NULL) {
        if (key == temp->data) return temp;
        else if (key < temp->data) temp = temp->left;
        else temp = temp->right;
    }
    return NULL;
}

void insert(int key) {
    Node* n = new Node;
    n->data = key; n->left = n->right = NULL;
    if (root == NULL) { root = n; return; }
    Node *temp = root, *parent = NULL;
    while (temp != NULL) {
        parent = temp;
        if (key < temp->data) temp = temp->left;
        else temp = temp->right;
    }
    if (key < parent->data) parent->left = n;
    else parent->right = n;
}

Node* findMin(Node* t) {
    while (t->left != NULL) t = t->left;
    return t;
}

Node* deleteNode(Node* t, int key) {
    if (t == NULL) return NULL;
    if (key < t->data)      t->left = deleteNode(t->left, key);
    else if (key > t->data) t->right = deleteNode(t->right, key);
    else {
        if (t->left == NULL) { Node* temp = t->right; delete t; return temp; }
        if (t->right == NULL) { Node* temp = t->left; delete t; return temp; }
        Node* succ = findMin(t->right);          // two children
        t->data = succ->data;
        t->right = deleteNode(t->right, succ->data);
    }
    return t;
}
// call: root = deleteNode(root, key);

void inorder(Node* t) {                          // prints keys in sorted order
    if (t != NULL) { inorder(t->left); cout << t->data << " "; inorder(t->right); }
}
\`\`\``,
          keys: ["temp = root", "key == temp->data", "parent", "findmin", "deletenode", "succ", "t->data = succ->data", "delete t"]
        },
        {
          id: "u3-bst-extra",
          kind: "code",
          q: "Write C++ code for minValue, displayLeaves and mirror on a BST.",
          a: `\`\`\`cpp
int minValue(Node* t) { return findMin(t)->data; }          // leftmost node

void displayLeaves(Node* t) {                    // print all leaf nodes
    if (t == NULL) return;
    if (t->left == NULL && t->right == NULL) cout << t->data << " ";
    displayLeaves(t->left);
    displayLeaves(t->right);
}

void mirror(Node* t) {                              // swap left and right of every node
    if (t == NULL) return;
    swap(t->left, t->right);
    mirror(t->left);
    mirror(t->right);
}
\`\`\``,
          keys: ["findmin", "leftmost", "left == null && right == null", "displayleaves", "swap(t->left, t->right)", "mirror"]
        },
        {
          id: "u3-bst-analysis",
          kind: "formula",
          q: "Analyse the time complexity of BST operations (best, average, worst).",
          a: `Search, insertion and deletion all walk down **one path from the root**, so they take **O(h)** time, where h is the height of the tree.

| Case | Shape of tree | Height | Time |
|---|---|---|---|
| Best / average | Balanced (keys inserted in random order) | about log₂ n | O(log n) |
| Worst | Skewed (keys inserted in sorted order, e.g. 10, 20, 30, 40) | n | O(n) |

Inserting 10, 20, 30, 40 in sorted order gives a **right-skewed BST**: searching becomes linear.

To avoid the worst case, the tree must be kept **balanced**, i.e. its height must be kept as small as possible. That is the purpose of height balanced and weight balanced trees. Types of balanced search trees: **AVL trees, Red-Black trees, B trees and B+ trees**.`,
          keys: ["o(h)", "o(log n)", "o(n)", "skewed", "sorted order", "balanced", "avl"]
        }
      ]
    },
    {
      id: "u3-balanced",
      title: "4.5 Height Balanced and 4.6 Weight Balanced Trees",
      cards: [
        {
          id: "u3-avl-def",
          kind: "def",
          q: "What is a height balanced tree? What is an AVL tree?",
          a: `Height balanced tree is a binary tree in which the **absolute difference between the heights of the left and right subtrees of any node is at most 1**. Key examples: the **AVL tree** and the **Red-Black tree**.

An **AVL tree** is a **self-balancing binary search tree** in which the heights of the two subtrees of every node differ by at most 1. (The name AVL comes from its inventors Adelson-Velsky and Landis.)`,
          keys: ["height difference", "at most 1", "avl", "self-balancing", "bst", "red-black", "adelson-velsky"]
        },
        {
          id: "u3-avl-bf",
          kind: "formula",
          q: "Define the balance factor in an AVL tree. What values are allowed and what happens otherwise?",
          a: `**Balance factor (BF) of a node = height of left subtree − height of right subtree**

In an AVL tree the balance factor of every node must be **−1, 0 or +1**. If after an insertion or deletion some node gets a balance factor of **+2 or −2**, the tree is rebalanced by **rotations**. Because the tree stays balanced, its height is always O(log n), so search, insert and delete are **O(log n) even in the worst case**.

**Sign convention:** most textbooks use BF = height(left) − height(right), so +1 means the left subtree is higher. The class PPT describes it the other way (−1 = left subtree higher, +1 = right subtree higher), i.e. height(right) − height(left). Both are accepted: **write the formula you are using**. What matters is that |BF| ≤ 1 at every node.`,
          keys: ["h(left) − h(right)", "−1, 0, +1", "±2", "rotations", "o(log n)", "write formula"]
        },
        {
          id: "u3-avl-rot-table",
          kind: "list",
          q: "List the four AVL rotation cases (LL, RR, LR, RL): when each happens and its fix.",
          a: `Let **A** be the nearest ancestor of the new node whose balance factor has become ±2.

| Case | When it happens | Fix |
|---|---|---|
| LL | New node inserted in the left subtree of the left child of A | **Single right rotation** at A |
| RR | New node inserted in the right subtree of the right child of A | **Single left rotation** at A |
| LR | New node inserted in the right subtree of the left child of A | **Left rotation at the left child, then right rotation at A** (double rotation) |
| RL | New node inserted in the left subtree of the right child of A | **Right rotation at the right child, then left rotation at A** (double rotation) |`,
          keys: ["ll", "single right rotation", "rr", "single left rotation", "lr", "rl", "double rotation"],
          tip: "Same side = single, opposite sides = double."
        },
        {
          id: "u3-avl-rot-ex",
          kind: "trace",
          q: "Show the four rotation examples: LL (insert 30, 20, 10), RR (10, 20, 30), LR (30, 10, 20), RL (10, 30, 20).",
          a: `- **LL: insert 30, 20, 10.** Node 30 gets BF +2 (left-left chain 30–20–10). Single right rotation at 30. Result: 20 root with children 10 and 30.
- **RR: insert 10, 20, 30.** Node 10 gets BF −2 (right-right chain). Single left rotation at 10. Result: 20 root with children 10 and 30.
- **LR: insert 30, 10, 20.** Node 30 gets BF +2 (10 is left child, 20 is right child of 10). Left rotation at 10, then right rotation at 30. Result: 20 root with children 10 and 30.
- **RL: insert 10, 30, 20.** Node 10 gets BF −2 (30 is right child, 20 is left child of 30). Right rotation at 30, then left rotation at 10. Result: 20 root with children 10 and 30.`,
          keys: ["ll 30 20 10", "rr 10 20 30", "lr 30 10 20", "rl 10 30 20", "20 root", "single", "double"]
        },
        {
          id: "u3-avl-rot-algo",
          kind: "algo",
          q: "Write the algorithms RotateRight and RotateLeft, and how LR and RL cases use them.",
          a: `**Algorithm RotateRight(A)** // used for the LL case

\`\`\`
B ← A->left
A->left ← B->right
B->right ← A
return B                    // B is the new root of this subtree
\`\`\`

**Algorithm RotateLeft(A)** // used for the RR case

\`\`\`
B ← A->right
A->right ← B->left
B->left ← A
return B
\`\`\`

- **LR case:** A->left ← RotateLeft(A->left); return RotateRight(A)
- **RL case:** A->right ← RotateRight(A->right); return RotateLeft(A)`,
          keys: ["b ← a->left", "a->left ← b->right", "b->right ← a", "rotateleft", "rotateright", "return b", "lr", "rl"]
        },
        {
          id: "u3-avl-trace",
          kind: "trace",
          q: "Previous-year: obtain an AVL tree by inserting 50, 55, 60, 15, 10, 40, 20, 45, 30, 70, 80 one at a time. Label the rotations.",
          a: `| Insert | Result / rotation |
|---|---|
| 50 | balanced (root 50) |
| 55 | balanced (55 right of 50) |
| 60 | **RR at 50: left rotation** → 55 root, children 50 and 60 |
| 15 | balanced (15 left of 50) |
| 10 | **LL at 50: right rotation** → 15 replaces 50 under 55: 55(15(10,50),60) |
| 40 | **LR at 55: left rotation at 15, then right rotation at 55** → 50 root: 50(15(10,40),55(–,60)) |
| 20 | balanced (20 under 40) |
| 45 | balanced (45 under 40) |
| 30 | **RL at 15: right rotation at 40, then left rotation at 15** → 20 replaces 15: 50(20(15(10,–),40(30,45)),55(–,60)) |
| 70 | **RR at 55: left rotation** → 60 replaces 55 with children 55 and 70 |
| 80 | balanced (80 under 70) |

**Final tree:** root 50; left 20 (children 15 [left child 10] and 40 [children 30, 45]); right 60 (children 55 and 70 [right child 80]).

Rotations: after 60: RR at 50; after 10: LL at 50; after 40: LR at 55; after 30: RL at 15; after 70: RR at 55; final root 50.`,
          keys: ["rr at 50", "ll at 50", "lr at 55", "rl at 15", "rr at 55", "root 50", "balanced"]
        },
        {
          id: "u3-wbt-def",
          kind: "def",
          q: "What is a weight balanced tree? Give the balance rule, balance factor and key example.",
          a: `Weight balanced tree is a binary tree that is kept balanced using the **number of nodes (the weight) of the subtrees** instead of their heights: for every node, the number of nodes in the left subtree is **at least half and at most twice** the number of nodes in the right subtree.

**R / 2 ≤ L ≤ 2R** (L, R = number of nodes in the left and right subtrees)

- **Balance factor of a node** = (number of external nodes in its left subtree) / (total number of external nodes in its subtree). An external node is an empty (NULL) position; a subtree with k nodes has k + 1 external nodes.
- **Key example: BB[α] trees** (bounded-balance trees), in which the balance factor of every node must lie between **α and 1 − α**.
- In simple words: neither subtree is allowed to hold too large a share of the nodes. When the rule is broken after an insertion or deletion, **rotations** are used to restore it, as in AVL trees.
- The height stays O(log n), so search, insertion and deletion are **O(log n)**.`,
          keys: ["number of nodes", "weight", "r/2 ≤ l ≤ 2r", "external nodes", "bb[α]", "α and 1 − α", "rotations", "o(log n)"]
        },
        {
          id: "u3-wbt-ex",
          kind: "trace",
          q: "Example of a weight balanced tree: check 50(30(20,40),70(60,80)).",
          a: `At the root L = 3 and R = 3, so **R/2 ≤ L ≤ 2R** holds. At nodes 30 and 70, L = 1 and R = 1.

Balance factor of the root = external nodes in the left subtree / total external nodes = **4 / 8 = 1/2**.`,
          keys: ["l = 3", "r = 3", "r/2 ≤ l ≤ 2r", "external nodes", "4 / 8", "1/2"]
        },
        {
          id: "u3-hb-wb-compare",
          kind: "compare",
          q: "Compare height balanced tree and weight balanced tree.",
          a: `| Attribute | Height balanced tree | Weight balanced tree |
|---|---|---|
| Definition | A binary tree in which the heights of the two child subtrees of any node differ by at most one | A binary tree in which the sizes (number of nodes) of the left and right subtrees of any node are kept balanced |
| Balance criteria | Height difference between the left and right subtrees is at most 1 | Size of the left subtree is at least half and at most twice the size of the right subtree |
| Stored in each node | Balance factor or height | Size (weight) of the subtree |
| Rebalancing | Rotations (LL, RR, LR, RL) | Rotations (single and double) |
| Insertion complexity | O(log n) | O(log n) |
| Deletion complexity | O(log n) | O(log n) |
| Key example | AVL tree, Red-Black tree | BB[α] tree |`,
          keys: ["height difference", "at most 1", "size", "half and twice", "balance factor", "weight", "ll, rr, lr, rl", "bb[α]"]
        }
      ]
    },
    {
      id: "u3-heap",
      title: "5. Heaps",
      cards: [
        {
          id: "u3-heap-def",
          kind: "def",
          q: "What is a heap? Define max heap and min heap.",
          a: `Heap is a special tree-based data structure: a **complete (nearly complete) binary tree**, in which all levels are full except possibly the last, which is filled from left to right, and in which the key of every node satisfies the **heap property** with respect to its children.

- **Max heap:** the key of every node is **greater than or equal to** the keys of its children. The **largest element is at the root**.
- **Min heap:** the key of every node is **less than or equal to** the keys of its children. The **smallest element is at the root**.

Example max heap: 50(30(15,10),20(8,5)). Example min heap: 5(10(30,20),15(50,40)).`,
          keys: ["complete binary tree", "heap property", "max heap", "≥ children", "largest at root", "min heap", "≤ children", "smallest at root"]
        },
        {
          id: "u3-heap-props",
          kind: "concept",
          q: "What are the two requirements of a heap, and the characteristics of a heap?",
          a: `A heap has two requirements:

- **Shape property:** complete binary tree.
- **Order property:** parent ≥ children (max heap) or parent ≤ children (min heap).

There is **no rule between left and right children**, so a heap is only **partially ordered**.

**Characteristics:**

1. It is a complete binary tree, which gives efficient memory use and a predictable shape.
2. Heap order property: the root holds the maximum (max heap) or minimum (min heap).
3. The top element is accessed in **O(1)**.
4. Insertion and deletion take **O(log n)**.`,
          keys: ["shape property", "order property", "partially ordered", "complete", "o(1)", "o(log n)"]
        },
        {
          id: "u3-heap-array",
          kind: "formula",
          q: "How is a heap stored in an array? Give the index formulas and facts about leaves.",
          a: `Because a heap is a complete binary tree, it is stored in an array **with no gaps**. With the root at index 0:

- left child = **2i + 1**
- right child = **2i + 2**
- parent = **(i − 1) / 2**

Example: the max heap 50(30(15,10),20(8,5)) as an array: **50 30 20 15 10 8 5** (index 0 to 6). Node 30 is at i = 1: its children are at 3 and 4 (15 and 10), its parent is at 0 (50).

In a heap of n elements, the **nodes at indices n/2 to n − 1 are leaves**, and the **last internal node is at index n/2 − 1**. The height of a heap is **O(log n)**.`,
          keys: ["no gaps", "2i + 1", "2i + 2", "(i − 1) / 2", "n/2 to n − 1 leaves", "n/2 − 1", "o(log n)"]
        },
        {
          id: "u3-heap-vs-bst",
          kind: "compare",
          q: "Compare binary search tree and heap.",
          a: `| Point | Binary search tree | Heap |
|---|---|---|
| Ordering | left < root < right | root ≥ both children (max heap) |
| Shape | Any shape | Always a complete binary tree |
| Storage | Usually linked | Array |
| Searching a key | O(log n) if balanced | O(n) |
| Finding max (or min) | O(h) | O(1), it is the root |
| Main use | Searching | Priority queue, heap sort |`,
          keys: ["left < root < right", "complete", "linked", "array", "o(n)", "o(1)", "priority queue"]
        },
        {
          id: "u3-heap-heapify",
          kind: "algo",
          q: "Explain Heapify (reheap down / heapify down / bubble down) for a max heap.",
          a: `**Purpose:** the subtrees of node i are already heaps, but A[i] may be smaller than its children. Heapify **pushes A[i] down** until the heap property holds. (All algorithms are for a max heap stored in A[0..n−1]; for a min heap, reverse the comparisons.)

1. Set largest = i, l = 2i + 1, r = 2i + 2.
2. If l < n and A[l] > A[largest], set largest = l.
3. If r < n and A[r] > A[largest], set largest = r.
4. If largest ≠ i, **swap A[i] and A[largest]**, and call heapify on index largest.

**Algorithm Heapify(A, n, i)**

\`\`\`
largest ← i;   l ← 2*i + 1;   r ← 2*i + 2
if (l < n and A[l] > A[largest]) then largest ← l
if (r < n and A[r] > A[largest]) then largest ← r
if (largest ≠ i) then
{
    swap(A[i], A[largest])
    Heapify(A, n, largest)
}
\`\`\`

Heapify moves down at most one path from the node to a leaf, so it takes **O(log n)**.`,
          keys: ["largest = i", "l = 2i + 1", "r = 2i + 2", "a[l] > a[largest]", "swap", "recursive heapify", "o(log n)"]
        },
        {
          id: "u3-heap-insert",
          kind: "algo",
          q: "Explain insertion into a max heap (reheap up / heapify up / bubble up).",
          a: `1. Put the new key **at the end** of the array (the next free position of the last level): A[n] = x, then n = n + 1. This keeps the tree complete.
2. Compare the new key with its **parent**. While it is greater than its parent, **swap** them and move up.
3. Stop when the parent is greater or equal, or the root is reached.

**Algorithm HeapInsert(A, n, x)**

\`\`\`
n ← n + 1;   i ← n - 1
A[i] ← x
while (i > 0 and A[(i-1)/2] < A[i]) do
{
    swap(A[i], A[(i-1)/2])
    i ← (i-1)/2                  // move up to the parent
}
\`\`\`

Time: **O(log n)** (moves up at most the height of the tree).`,
          keys: ["end of array", "complete", "compare parent", "swap", "move up", "a[(i-1)/2] < a[i]", "o(log n)"]
        },
        {
          id: "u3-heap-insert-trace",
          kind: "trace",
          q: "Reheap up example: convert the array 10 15 21 30 18 19 into a max heap by inserting the elements one by one.",
          a: `| Insert | Action | Heap (array) |
|---|---|---|
| 10 | first node | 10 |
| 15 | swap with 10 | 15 10 |
| 21 | swap with 15 | 21 10 15 |
| 30 | placed under 10; swap with 10, then with 21 | 30 21 15 10 |
| 18 | no swap needed | 30 21 15 10 18 |
| 19 | placed under 15; swap with 15 | 30 21 19 10 18 15 |

**Final max heap as an array: 30 21 19 10 18 15.**`,
          keys: ["10", "15 swap 10", "21 swap 15", "30", "18 no swap", "19 swap 15", "30 21 19 10 18 15"]
        },
        {
          id: "u3-heap-delete",
          kind: "algo",
          q: "Explain deletion of the root (delete max) from a max heap.",
          a: `In a heap **only the root (the maximum) is deleted**.

1. Save the root: max = A[0].
2. Move the **last element to the root**: A[0] = A[n − 1], then n = n − 1.
3. Call **heapify(A, n, 0)** to push the new root down to its proper place.
4. Return max.

**Algorithm DeleteMax(A, n)**

\`\`\`
if (n = 0) then { write "Heap is empty"; return }
max ← A[0]
A[0] ← A[n-1]
n ← n - 1
Heapify(A, n, 0)
return max
\`\`\`

Time: **O(log n)** (moves down at most the height of the tree).`,
          keys: ["only root", "save max", "last to root", "n = n − 1", "heapify(a, n, 0)", "return max", "o(log n)"]
        },
        {
          id: "u3-heap-delete-trace",
          kind: "trace",
          q: "Reheap down example: delete the maximum from the max heap 9 6 3 2 4.",
          a: `Heap: 9(6(2,4),3).

1. **Step 1:** remove the root 9; the last element is 4.
2. **Step 2:** move 4 to the root: 4(6(2),3).
3. **Step 3:** larger child is 6 (6 > 3); swap 4 and 6 → 6(4(2),3).

Heap property restored: **6 4 3 2**. Deleted value = **9**.`,
          keys: ["remove root 9", "last element 4", "move 4 to root", "swap with larger child", "6 4 3 2", "deleted 9"]
        },
        {
          id: "u3-heap-build",
          kind: "algo",
          q: "How is a heap built from an array (BuildHeap)?",
          a: `All **leaves are already heaps** of one node. So start from the **last internal node (index n/2 − 1)** and call heapify on every node **going backwards up to the root**.

**Algorithm BuildHeap(A, n)**

\`\`\`
for i ← n/2 - 1 downto 0 do
    Heapify(A, n, i)
\`\`\`

Time: **O(n)**: most nodes are near the bottom and move very little.`,
          keys: ["leaves already heaps", "n/2 − 1", "downto 0", "heapify", "backwards", "o(n)"]
        },
        {
          id: "u3-heap-build-trace",
          kind: "trace",
          q: "Build a max heap from 82 90 10 12 15 77 55 23 (n = 8).",
          a: `Last internal node at index n/2 − 1 = 3. As a tree: 82(90(12(23,–),15),10(77,55)).

| Step | Action | Array |
|---|---|---|
| start | given array as a tree | 82 90 10 12 15 77 55 23 |
| heapify(i = 3, key 12) | swap 23 and 12 | 82 90 10 23 15 77 55 12 |
| heapify(i = 2, key 10) | swap 77 and 10 | 82 90 77 23 15 10 55 12 |
| heapify(i = 1, key 90) | no change | 82 90 77 23 15 10 55 12 |
| heapify(i = 0, key 82) | swap 90 and 82 | 90 82 77 23 15 10 55 12 |

**Max heap as an array: 90 82 77 23 15 10 55 12.**`,
          keys: ["n/2 − 1 = 3", "swap 23 and 12", "swap 77 and 10", "no change", "swap 90 and 82", "90 82 77 23 15 10 55 12"]
        },
        {
          id: "u3-heap-complexity",
          kind: "formula",
          q: "Give the time complexity of heap operations (find max, insert, delete max, build heap).",
          a: `| Operation | Time | Reason |
|---|---|---|
| Find max (peek) | O(1) | It is A[0] |
| Insert | O(log n) | Moves up at most the height of the tree |
| Delete max | O(log n) | Moves down at most the height of the tree |
| Build heap | O(n) | Most nodes are near the bottom and move very little |`,
          keys: ["o(1)", "a[0]", "o(log n)", "height", "o(n)", "build heap"]
        },
        {
          id: "u3-heap-code",
          kind: "code",
          q: "Write the C++ code for a max heap: heapify, insertHeap, deleteMax and buildHeap.",
          a: `\`\`\`cpp
void heapify(int A[], int n, int i) {
    int largest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && A[l] > A[largest]) largest = l;
    if (r < n && A[r] > A[largest]) largest = r;
    if (largest != i) {
        swap(A[i], A[largest]);
        heapify(A, n, largest);
    }
}

void insertHeap(int A[], int &n, int x) {
    int i = n++;
    A[i] = x;
    while (i > 0 && A[(i - 1) / 2] < A[i]) {
        swap(A[i], A[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}

int deleteMax(int A[], int &n) {
    int mx = A[0];
    A[0] = A[n - 1];
    n--;
    heapify(A, n, 0);
    return mx;
}

void buildHeap(int A[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(A, n, i);
}
\`\`\``,
          keys: ["largest = i", "l = 2 * i + 1", "a[l] > a[largest]", "swap", "(i - 1) / 2", "a[0] = a[n - 1]", "n--", "n / 2 - 1"]
        },
        {
          id: "u3-heap-apps",
          kind: "list",
          q: "List the applications of heaps.",
          a: `1. **Priority queues:** elements with higher priority are processed first.
2. **Heap sort:** an in-place O(n log n) sorting algorithm.
3. **Graph algorithms:** Dijkstra's shortest path and Prim's minimum spanning tree.

Also: finding the k largest or smallest elements, CPU job scheduling, Huffman coding.`,
          keys: ["priority queue", "heap sort", "dijkstra", "prim", "k largest", "job scheduling", "huffman"]
        },
        {
          id: "u3-heap-advdis",
          kind: "list",
          q: "State the advantages and disadvantages of a heap.",
          a: `**Advantages:**

- Efficient priority queue operations (O(log n) insertion and deletion).
- Memory-efficient because it is stored in one contiguous array.
- Suitable for heap sort.
- Works well for data that keeps changing.

**Disadvantages:**

- Searching for an arbitrary element is slow, **O(n)**.
- The elements are **not in sorted order**.
- Maintaining the heap property makes the code a little more complex.`,
          keys: ["priority queue", "o(log n)", "contiguous array", "heap sort", "search o(n)", "not sorted"]
        }
      ]
    },
    {
      id: "u3-heapsort",
      title: "5.3 Heap Sort",
      cards: [
        {
          id: "u3-hs-idea",
          kind: "concept",
          q: "Explain the idea of heap sort and its step-by-step process.",
          a: `**Idea:** heap sort uses a heap to sort a list. In a max heap the largest element is at the root. **Delete the root: swap it with the last element**, so it reaches its final position. Now **reduce the heap size by one** and **heapify the root** again. Repeat until the heap has one element.

**Step-by-step process (class PPT):**

1. Construct a binary tree from the given list.
2. Transform it into a heap.
3. Delete the root element using the heapify method.
4. Put the deleted element into the sorted list.
5. Repeat until the heap becomes empty.
6. Display the sorted list.

With a **min heap** the deleted elements come out in ascending order; with a **max heap** each deleted element is placed at the end of the array, which sorts the array in ascending order **in place**.`,
          keys: ["max heap", "delete root", "swap with last", "reduce heap size", "heapify", "ascending", "in place"]
        },
        {
          id: "u3-hs-algo",
          kind: "algo",
          q: "Write the algorithm for heap sort.",
          a: `1. Build a max heap from the array: for i = n/2 − 1 down to 0, call heapify(A, n, i).
2. For i = n − 1 down to 1:
   - a. Swap A[0] and A[i] (the largest goes to the end).
   - b. Call heapify(A, i, 0) on the reduced heap of size i.
3. The array is now sorted in **ascending order**.

**Algorithm HeapSort(A, n)**

\`\`\`
for i ← n/2 - 1 downto 0 do                     // phase 1: build max heap
    Heapify(A, n, i)
for i ← n-1 downto 1 do                         // phase 2: sort
{
    swap(A[0], A[i])                            // largest to its final place
    Heapify(A, i, 0)                            // restore heap on A[0..i-1]
}
\`\`\``,
          keys: ["build max heap", "n/2 − 1", "swap a[0] and a[i]", "heapify(a, i, 0)", "n − 1 downto 1", "ascending"]
        },
        {
          id: "u3-hs-code",
          kind: "code",
          q: "Write the C++ code for heap sort.",
          a: `\`\`\`cpp
void heapSort(int A[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)                         // build max heap
        heapify(A, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(A[0], A[i]);                                        // move current max to the end
        heapify(A, i, 0);                                        // heapify the reduced heap
    }
}
\`\`\``,
          keys: ["n / 2 - 1", "heapify(a, n, i)", "i = n - 1", "swap(a[0], a[i])", "heapify(a, i, 0)"]
        },
        {
          id: "u3-hs-trace",
          kind: "trace",
          q: "Sort 82 90 10 12 15 77 55 23 using heap sort.",
          a: `**Phase 1** (build max heap) gives: 90 82 77 23 15 10 55 12

**Phase 2:**

| Step | Swap root with last of heap | Then | Array after the step |
|---|---|---|---|
| i=7 | delete root 90: swap A[0] = 90 and A[7] = 12 | heapify(A, 7, 0) | 82 23 77 12 15 10 55 90 |
| i=6 | delete root 82: swap A[0] = 82 and A[6] = 55 | heapify(A, 6, 0) | 77 23 55 12 15 10 82 90 |
| i=5 | delete root 77: swap A[0] = 77 and A[5] = 10 | heapify(A, 5, 0) | 55 23 10 12 15 77 82 90 |
| i=4 | delete root 55: swap A[0] = 55 and A[4] = 15 | heapify(A, 4, 0) | 23 15 10 12 55 77 82 90 |
| i=3 | delete root 23: swap A[0] = 23 and A[3] = 12 | heapify(A, 3, 0) | 15 12 10 23 55 77 82 90 |
| i=2 | delete root 15: swap A[0] = 15 and A[2] = 10 | heapify(A, 2, 0) | 12 10 15 23 55 77 82 90 |
| i=1 | delete root 12: swap A[0] = 12 and A[1] = 10 | heapify(A, 1, 0) | 10 12 15 23 55 77 82 90 |

**Sorted: 10 12 15 23 55 77 82 90**`,
          keys: ["90 82 77 23 15 10 55 12", "swap a[0]", "heapify", "82 23 77 12 15 10 55 90", "10 12 15 23 55 77 82 90"]
        },
        {
          id: "u3-hs-analysis",
          kind: "formula",
          q: "Analyse heap sort: time complexity, space, in-place, stable. Why O(n log n)?",
          a: `Building the heap takes **O(n)**. Then heapify, which costs **O(log n)**, is called **n − 1 times**. Total = O(n) + O(n log n) = **O(n log n)**.

| Best | Average | Worst | Space | In-place | Stable |
|---|---|---|---|---|---|
| O(n log n) | O(n log n) | O(n log n) | O(1) | Yes | No |

Heap sort gives the guaranteed O(n log n) of merge sort **without needing an extra array**. To sort in **descending order**, use a **min heap** instead.`,
          keys: ["build o(n)", "heapify o(log n)", "n − 1 times", "o(n log n)", "o(1) space", "in-place", "not stable"]
        }
      ]
    },
    {
      id: "u3-revision",
      title: "6. Quick Revision",
      cards: [
        {
          id: "u3-rev-compare",
          kind: "compare",
          q: "Compare the complexities of BST (average), BST (worst), AVL and Heap for search, insert, delete and find max/min.",
          a: `| Operation | BST (average) | BST (worst) | AVL | Heap |
|---|---|---|---|---|
| Search | O(log n) | O(n) | O(log n) | O(n) |
| Insert | O(log n) | O(n) | O(log n) | O(log n) |
| Delete | O(log n) | O(n) | O(log n) | O(log n) (root) |
| Find max / min | O(log n) | O(n) | O(log n) | O(1) |`,
          keys: ["bst average o(log n)", "bst worst o(n)", "avl o(log n)", "heap search o(n)", "heap find max o(1)"]
        },
        {
          id: "u3-rev-tree",
          kind: "list",
          q: "Quick revision: tree and binary tree formulas.",
          a: `- **Tree:** n nodes, n − 1 edges, no cycle. Degree = number of children; leaf = degree 0.
- **Binary tree:** at most 2 children. Root at level 0: max nodes at level l = 2^l; max nodes for height h = 2^(h+1) − 1; min nodes = h + 1; n0 = n2 + 1.
- **Array representation (root at 0):** left = 2i + 1, right = 2i + 2, parent = (i − 1)/2. (Root at 1: 2i, 2i + 1, i/2.)
- **Traversals:** inorder L D R, preorder D L R, postorder L R D. Non-recursive versions use a stack.`,
          keys: ["n − 1 edges", "2^l", "2^(h+1) − 1", "h + 1", "n0 = n2 + 1", "2i + 1", "ldr", "dlr", "lrd"]
        },
        {
          id: "u3-rev-bst-heap",
          kind: "list",
          q: "Quick revision: BST, AVL, weight balanced, heap and heap sort.",
          a: `- **BST:** left < root < right; inorder gives sorted order; search, insert, delete are O(h): O(log n) average, O(n) worst (skewed).
- **BST deletion:** leaf → remove; one child → child replaces node; two children → replace by inorder successor.
- **AVL (height balanced):** balance factor = h(left) − h(right) must be −1, 0 or 1; fixed by LL, RR, LR, RL rotations.
- **Weight balanced:** balance is kept using the number of nodes in the subtrees: R/2 ≤ L ≤ 2R; example BB[α] tree.
- **Heap:** complete binary tree + heap property; max heap root is the largest. Insert = add at end and sift up; delete = move last to root and heapify.
- **Heap sort:** build max heap, then repeatedly swap root with last and heapify; O(n log n), in-place, not stable.`,
          keys: ["left < root < right", "inorder sorted", "inorder successor", "−1, 0, 1", "r/2 ≤ l ≤ 2r", "sift up", "o(n log n)", "not stable"]
        }
      ]
    },
    {
      id: "u3-pyq",
      title: "Question bank (PYQs)",
      cards: [
        {
          id: "u3-pyq-1",
          kind: "pyq",
          q: "Q1 [5 marks]. Explain the following terms with respect to a tree, with a suitable example: (i) root (ii) leaf node (iii) siblings (iv) degree of a node (v) degree of a tree. (End-sem May 2024, Q4(c))",
          a: `**Definition:** a tree is a non-linear hierarchical structure of nodes connected by edges, with n nodes and n − 1 edges. Example tree: A(B(D,E(I,J),F), C(G(K),H)).

- **(i) Root:** the node at the top of the tree. There is only one root, and one path from the root to any node. Example: **A**.
- **(ii) Leaf node:** a node that does not have any child (external / terminal node). Example: **D, I, J, F, K, H**.
- **(iii) Siblings:** nodes that belong to the same parent. Example: **B and C; D, E and F; G and H; I and J**.
- **(iv) Degree of a node:** the total number of children of that node. Example: degree(A) = 2, degree(B) = 3, degree(G) = 1, degree(D) = 0.
- **(v) Degree of a tree:** the highest degree among all the nodes. Example: **3** (node B).`,
          keys: ["root", "leaf", "no child", "siblings", "same parent", "degree of node", "number of children", "degree of tree", "highest degree"]
        },
        {
          id: "u3-pyq-2",
          kind: "pyq",
          q: "Q2 [5 marks]. Explain the difference between the array representation and the linked representation of a binary tree, with a suitable example of each. (End-sem Oct 2022, Q4(a))",
          a: `**Array representation:** nodes are numbered level by level, left to right, as if the tree were complete; with root at index 0, node i has left child 2i + 1, right child 2i + 2 and parent ⌊(i − 1)/2⌋.

Example tree A(B(D,E), C(–,F)): index 0..6 = A B C D E – F. C is at index 2; its right child F is at 2×2+2 = 6; index 5 is empty.

**Linked representation:** each node has three fields: left pointer, data, right pointer; a missing child is NULL.

\`\`\`cpp
struct Node { int data; Node* left; Node* right; };
\`\`\`

Example: A points to B and C; B points to D and E; C has left NULL and right F.

**Differences:**

| Point | Array representation | Linked representation |
|---|---|---|
| Memory | Static, may waste many cells | Dynamic, 2 pointers per node |
| Finding parent / child | By index arithmetic, O(1) | Child by pointer; parent not directly |
| Insertion / deletion | Costly | Easy (change pointers) |
| Best suited for | Complete binary trees, heaps | Any shape of tree, BST |`,
          keys: ["array", "level by level", "2i + 1", "linked", "left, data, right", "null", "static", "dynamic", "wasteful sparse"]
        },
        {
          id: "u3-pyq-3",
          kind: "pyq",
          q: "Q3 [5 marks]. Construct a binary tree from the given traversals, showing the intermediate steps. Preorder: G B Q A C K F P D E R H. Inorder: Q B K C F A G P E D H R. (End-sem Oct 2022, Q3(a); End-sem May 2024, Q3(a))",
          a: `**Method:** a binary tree can be built uniquely from inorder + preorder. The first element of preorder is the root; everything left of it in inorder is the left subtree, everything right is the right subtree; repeat for each subtree.

**Steps:**

1. Root **G**. Inorder left of G: Q B K C F A; right of G: P E D H R.
2. Root **B**. Left of B: Q; right of B: K C F A.
3. Root **A**. Left of A: K C F; right of A: nothing.
4. Root **C**. Left of C: K; right of C: F.
5. Root **P**. Left of P: nothing; right of P: E D H R.
6. Root **D**. Left of D: E; right of D: H R.
7. Root **R**. Left of R: H; right of R: nothing.

**Tree:** G(B(Q, A(C(K,F), –)), P(–, D(E, R(H, –)))).

**Check:** postorder of this tree = **Q K F C A B E H R D P G**.`,
          keys: ["first of preorder is root", "inorder split", "g", "b", "a", "c", "p", "d", "r", "q k f c a b e h r d p g"]
        },
        {
          id: "u3-pyq-4",
          kind: "pyq",
          q: "Q4 [5 marks]. Write pseudocode for the non-recursive inorder traversal of a binary tree. (End-sem May 2022, Q4(b))",
          a: `**Idea:** recursion uses the system stack; here we use our own stack of node pointers.

**Steps:**

1. Create an empty stack S and set cur = root.
2. While cur ≠ NULL or S is not empty, repeat steps 3 to 5.
3. While cur ≠ NULL: push cur on S and move to the left child.
4. Pop a node from S into cur and visit it.
5. Move to its right child.

**Algorithm InorderNonRec(root)**

\`\`\`
create empty stack S;   cur ← root
while (cur ≠ NULL or S is not empty) do
{
    while (cur ≠ NULL) do          // go as far left as possible
    {   push(S, cur);   cur ← cur->left   }
    cur ← pop(S)
    visit(cur)
    cur ← cur->right               // now handle the right subtree
}
\`\`\`

**Example:** tree A(B(D,E),C) gives D B E A C.

**Time complexity:** O(n), each node is pushed and popped once; stack space O(h).`,
          keys: ["empty stack", "cur = root", "push", "go left", "pop", "visit", "cur->right", "o(n)"]
        },
        {
          id: "u3-pyq-5",
          kind: "pyq",
          q: "Q5 [5 marks]. Explain how to convert a general tree into a binary tree, with an example. (In-sem May 2023, Q4(c); End-sem May 2022, Q3(b))",
          a: `**Left-child right-sibling representation:** every node has exactly two links whatever its degree: the **left link** points to its first (leftmost) child and the **right link** points to its next sibling. Any general tree thus becomes a binary tree.

**Rule:**

1. Keep the link from each node to its **leftmost child**.
2. Join all **siblings with horizontal links**.
3. **Remove** the other parent-child links.
4. Turn the picture **45° clockwise**.

The root never has a right child because it has no sibling.

**Example:** general tree A(B(D,E(I,J),F), C(G(K),H)) becomes the binary tree: A.left = B; B.left = D, B.right = C; D.right = E; E.left = I, E.right = F; I.right = J; C.left = G; G.left = K, G.right = H.`,
          keys: ["left-child right-sibling", "leftmost child", "sibling link", "remove other links", "45° clockwise", "root no right child", "example"]
        },
        {
          id: "u3-pyq-6",
          kind: "pyq",
          q: "Q6 [5 marks]. The following keys are inserted into an empty binary search tree in the given order: G, C, B, A, D, E, F, I, H. Construct the tree step by step and represent it using static (array) memory allocation. (In-sem May 2023, Q3(b))",
          a: `**Rule:** compare with each node; smaller goes left, larger goes right; the new key becomes a leaf.

**Steps (root G):**

1. G: root.
2. C < G: left of G.
3. B < G, B < C: left of C.
4. A < G, < C, < B: left of B.
5. D < G, D > C: right of C.
6. E > C, E > D: right of D.
7. F > C, > D, > E: right of E.
8. I > G: right of G.
9. H > G, H < I: left of I.

**Tree:** G(C(B(A,–), D(–, E(–, F))), I(H, –)).

**Array representation** (root at 0, left = 2i+1, right = 2i+2):

| Index | Node |
|---|---|
| 0 | G |
| 1 | C |
| 2 | I |
| 3 | B |
| 4 | D |
| 5 | H |
| 7 | A |
| 10 | E |
| 22 | F |

All other positions up to index 22 are empty. **Inorder:** A B C D E F G H I.`,
          keys: ["g root", "left smaller", "right larger", "c", "b", "a", "d", "e", "f", "i", "h", "index 22", "2i+1"]
        },
        {
          id: "u3-pyq-7",
          kind: "pyq",
          q: "Q7 [5 marks]. What is a binary search tree? Explain insertion of a node and deletion of a node (all cases) in a BST and state their time complexities. (End-sem Oct 2021, Q3(b); End-sem May 2022, Q3(c))",
          a: `**Definition:** a binary search tree is a binary tree that is either empty or, for every node: all keys in the left subtree are smaller, all keys in the right subtree are greater, and both subtrees are BSTs. Duplicates are normally not allowed. Inorder traversal gives sorted order.

**Insertion:** a new key is always inserted as a **leaf**.

1. Create newNode; left = right = NULL.
2. If root = NULL, root = newNode; stop.
3. Set temp = root, parent = NULL.
4. While temp ≠ NULL: parent = temp; if key < temp->data go left, else go right.
5. If key < parent->data, parent->left = newNode; else parent->right = newNode.

Example: inserting 12, 7, 9, 19, 5, 10 gives 12(7(5,9(–,10)),19).

**Deletion** (first search for the node):

| Case | What to do |
|---|---|
| 1. Leaf | Remove it: set the parent's link to NULL |
| 2. One child | Link the parent directly to the child, then remove the node |
| 3. Two children | Copy the inorder successor (smallest key of right subtree) into the node, then delete the successor from the right subtree; the inorder predecessor can be used instead |

**Time complexity:** all operations walk one path, so **O(h)**: **O(log n)** best/average (balanced), **O(n)** worst (skewed tree, e.g. sorted input).`,
          keys: ["bst definition", "left smaller", "insert as leaf", "temp, parent", "leaf delete", "one child", "two children", "inorder successor", "o(h)", "o(log n)", "o(n) worst"]
        },
        {
          id: "u3-pyq-8",
          kind: "pyq",
          q: "Q8 [5 marks]. Obtain an AVL tree by inserting one element at a time in the sequence 50, 55, 60, 15, 10, 40, 20, 45, 30, 70, 80. Label the rotations at each stage. (End-sem May 2024, Q5(b); AVL rotations also in Oct 2021, Q6(b))",
          a: `**AVL tree:** a self-balancing BST in which the balance factor (h(left) − h(right)) of every node is −1, 0 or +1. If a node gets ±2, rotate: LL = single right rotation; RR = single left rotation; LR = left rotation at left child then right rotation at A; RL = right rotation at right child then left rotation at A.

| Insert | Result / rotation |
|---|---|
| 50 | balanced |
| 55 | balanced |
| 60 | **RR at 50**: left rotation → 55(50, 60) |
| 15 | balanced |
| 10 | **LL at 50**: right rotation → 55(15(10,50), 60) |
| 40 | **LR at 55**: left rotation at 15, then right rotation at 55 → 50(15(10,40), 55(–,60)) |
| 20 | balanced |
| 45 | balanced |
| 30 | **RL at 15**: right rotation at 40, then left rotation at 15 → 50(20(15(10,–), 40(30,45)), 55(–,60)) |
| 70 | **RR at 55**: left rotation → 60 with children 55 and 70 |
| 80 | balanced |

**Final tree:** 50(20(15(10,–), 40(30,45)), 60(55, 70(–,80))). Final root 50.

Rotations in order: RR at 50; LL at 50; LR at 55; RL at 15; RR at 55.`,
          keys: ["avl", "balance factor", "rr at 50", "ll at 50", "lr at 55", "rl at 15", "rr at 55", "root 50"]
        },
        {
          id: "u3-pyq-9",
          kind: "pyq",
          q: "Q9 [5 marks]. Illustrate with examples the reheap up and reheap down operations on a heap. List any three applications of heaps. (End-sem Oct 2022, Q6(b))",
          a: `**Heap:** a complete binary tree where every node satisfies the heap property (max heap: parent ≥ children, root is largest).

**Reheap up (insertion):** put the new key at the end of the array, then while it is greater than its parent, swap and move up; stop when the parent is greater or equal or root is reached. O(log n).

Example: insert 10, 15, 21, 30, 18, 19 one by one: 10 → 15 swaps with 10 → 21 swaps with 15 → 30 swaps with 10 then 21 → 18 no swap → 19 swaps with 15. Final heap: **30 21 19 10 18 15**.

**Reheap down (delete root):** save the root, move the last element to the root, reduce n, then heapify: swap with the larger child until the heap property holds. O(log n).

Example: delete max from heap 9 6 3 2 4: remove 9, move last element 4 to root, swap 4 with larger child 6. Result: **6 4 3 2**; deleted value 9.

**Three applications of heaps:**

1. Priority queues.
2. Heap sort (in-place O(n log n)).
3. Graph algorithms: Dijkstra's shortest path and Prim's minimum spanning tree.

(Also: k largest/smallest elements, CPU job scheduling, Huffman coding.)`,
          keys: ["reheap up", "insert at end", "swap with parent", "reheap down", "move last to root", "swap with larger child", "priority queue", "heap sort", "dijkstra"]
        },
        {
          id: "u3-pyq-10",
          kind: "pyq",
          q: "Q10 [5 marks]. Sort the numbers 5, 3, 17, 10, 84, 19, 22 in ascending order using heap sort (max heap, using heapify) and explain the time complexity of heap sort. (End-sem May 2022, Q6(a); End-sem May 2024, Q6(c))",
          a: `**Method:** build a max heap (heapify from index n/2 − 1 down to 0); then for i = n − 1 down to 1 swap A[0] with A[i] and heapify the reduced heap A[0..i−1].

**Phase 1: build max heap** (n = 7, last internal node index 2):

1. heapify(2): 17 vs children 19, 22 → swap with 22: 5 3 22 10 84 19 17
2. heapify(1): 3 vs children 10, 84 → swap with 84: 5 84 22 10 3 19 17
3. heapify(0): 5 vs 84, 22 → swap with 84, then 5 vs 10, 3 → swap with 10.

Max heap = **84 10 22 5 3 19 17**.

**Phase 2: sort**

| Step | Swap root with last | Array after heapify |
|---|---|---|
| i=6 | swap 84 and 17 | 22 10 19 5 3 17 84 |
| i=5 | swap 22 and 17 | 19 10 17 5 3 22 84 |
| i=4 | swap 19 and 3 | 17 10 3 5 19 22 84 |
| i=3 | swap 17 and 5 | 10 5 3 17 19 22 84 |
| i=2 | swap 10 and 3 | 5 3 10 17 19 22 84 |
| i=1 | swap 5 and 3 | 3 5 10 17 19 22 84 |

**Sorted list: 3, 5, 10, 17, 19, 22, 84.**

**Time complexity:** building the heap takes O(n). Heapify costs O(log n) and is called n − 1 times, so total = O(n) + O(n log n) = **O(n log n)** in best, average and worst case. Space O(1): in-place, but not stable.`,
          keys: ["build max heap", "84 10 22 5 3 19 17", "swap root with last", "heapify", "3, 5, 10, 17, 19, 22, 84", "o(n log n)", "build o(n)", "in-place"]
        }
      ]
    }
  ]
});
