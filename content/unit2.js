window.DSA = window.DSA || [];
window.DSA.push({
  unit: 2,
  title: "Linear Data Structures",
  topics: [
    {
      id: "u2-ll-intro",
      title: "1.1 Linked Lists: Introduction",
      cards: [
        {
          id: "u2-ll-def",
          kind: "def",
          q: "What is a linked list?",
          a: `**Linked list** is a **linear data structure** made of **nodes**, where every node stores the **data** and the **address (link) of the next node**.

The nodes need not be stored next to each other in memory; the links keep them in order.`,
          keys: ["linear", "nodes", "data", "address", "next node", "not contiguous"],
          tip: "Train: each coach is a node linked to the next; add or remove a coach without disturbing the others."
        },
        {
          id: "u2-ll-terms",
          kind: "def",
          q: "Define node, head (start) and NULL in a linked list.",
          a: `- **Node**: one element of the list. It has a **data (info) part** (the actual value) and a **next (link) part** (a pointer to the next node).
- **head (start)**: a pointer that stores the **address of the first node**. It is the entry point of the list and is used to traverse it. If head = NULL, the **list is empty**.
- **NULL**: the link of the **last node** is NULL, which marks the **end of the list**.`,
          keys: ["data part", "next part", "head", "first node", "null", "last node", "empty"]
        },
        {
          id: "u2-ll-why",
          kind: "list",
          q: "Why linked lists? State the limitations of arrays that a linked list solves.",
          a: `**Limitations of arrays**
- The size of an array is **fixed**; memory is wasted if it is too big, and it **overflows** if it is too small.
- Insertion and deletion in the middle need **shifting of many elements**, which is O(n).
- An array needs **one continuous block** of memory.

**How a linked list solves them:** memory is taken at **run time** for each node (dynamic memory allocation with \`new\`), and insertion or deletion only **changes a few links**.`,
          keys: ["fixed size", "shifting", "o(n)", "continuous memory", "dynamic", "links"]
        },
        {
          id: "u2-ll-vs-array",
          kind: "compare",
          q: "Compare an array and a linked list.",
          a: `| Point | Array | Linked list |
|---|---|---|
| Size | Fixed (static) | Grows and shrinks at run time (dynamic) |
| Memory | Continuous block | Nodes can be anywhere; joined by pointers |
| Access | Direct / random access by index, O(1) | Sequential access only, O(n) |
| Insertion / deletion | Needs shifting, O(n) | Only links change, O(1) once the position is known |
| Extra memory | None | Extra pointer in every node |
| Binary search | Possible | Not efficient |`,
          keys: ["fixed", "dynamic", "random access", "sequential", "shifting", "extra pointer", "binary search"]
        },
        {
          id: "u2-ll-types",
          kind: "list",
          q: "What are the types of linked list?",
          a: `1. **Singly linked list (SLL)**: each node has **one link**, to the next node. Traversal is only **forward**.
2. **Doubly linked list (DLL)**: each node has **two links**, to the previous and to the next node. Traversal is possible in **both directions**.
3. **Circular linked list (CLL)**: the **last node points back to the first node** instead of NULL.`,
          keys: ["singly", "doubly", "circular", "one link", "two links", "last node", "first node"]
        }
      ]
    },
    {
      id: "u2-sll",
      title: "1.2 Singly Linked List (SLL)",
      cards: [
        {
          id: "u2-sll-node",
          kind: "code",
          q: "Write the node structure of a singly linked list in C++ (and how to create/free a node).",
          a: `\`\`\`cpp
struct Node {
    int   data;                      // information
    Node* next;                      // address of the next node
};
Node* head = NULL;                   // empty list
\`\`\`

Create a node: \`Node* newNode = new Node;\` and free it: \`delete ptr;\`. The notation \`p->data\` means "data part of the node pointed to by p".`,
          keys: ["struct node", "int data", "node* next", "head = null", "new node", "delete"]
        },
        {
          id: "u2-sll-ops",
          kind: "list",
          q: "List the basic operations on a linked list.",
          a: `- **Traversal**: access each node.
- **Insertion**: add a node at the beginning, in the middle or at the end.
- **Deletion**: remove a node from the beginning, a given position or the end.
- **Search**: find a node with a given value.
- **Update**: change the data of a node without changing the links.
- **Sort**.`,
          keys: ["traversal", "insertion", "deletion", "search", "update", "sort"]
        },
        {
          id: "u2-sll-trav",
          kind: "algo",
          q: "Algorithm: traverse / display a singly linked list.",
          a: `Start from **head** and follow the **next** links until **NULL** is reached.

\`\`\`
Algorithm Display(head)
{
    temp ← head
    while (temp ≠ NULL) do
    {
        write temp->data
        temp ← temp->next
    }
}
\`\`\`

Time: O(n) (visits nodes one by one).`,
          keys: ["temp", "head", "temp != null", "temp->next", "write data", "o(n)"]
        },
        {
          id: "u2-sll-insbeg",
          kind: "algo",
          q: "Algorithm: insert at the beginning of an SLL.",
          a: `1. Create **newNode** and store x in its data part.
2. Set **newNode->next = head** (new node points to the old first node).
3. Set **head = newNode**.

\`\`\`
Algorithm InsertBegin(x)
{
    newNode ← new Node;                     newNode->data ← x
    newNode->next ← head
    head ← newNode
}
\`\`\`

Time: **O(1)** (only head changes).`,
          keys: ["newnode", "newnode->next = head", "head = newnode", "o(1)"],
          tip: "Hook the new node onto the list first, then move head."
        },
        {
          id: "u2-sll-insend",
          kind: "algo",
          q: "Algorithm: insert at the end of an SLL.",
          a: `1. Create **newNode** with data x and **next = NULL**.
2. If **head = NULL**, set head = newNode and stop.
3. Otherwise set **temp = head** and move temp forward while **temp->next ≠ NULL** (temp stops at the last node).
4. Set **temp->next = newNode**.

\`\`\`
Algorithm InsertEnd(x)
{
    newNode ← new Node;    newNode->data ← x;   newNode->next ← NULL
    if (head = NULL) then head ← newNode
    else
    {
         temp ← head
         while (temp->next ≠ NULL) do temp ← temp->next
         temp->next ← newNode
    }
}
\`\`\`

Time: **O(n)** (must walk to the last node; O(1) if a tail pointer is kept).`,
          keys: ["next = null", "head = null", "temp->next != null", "last node", "temp->next = newnode", "o(n)"]
        },
        {
          id: "u2-sll-insend-flow",
          kind: "trace",
          q: "Flowchart of insert at end (SLL): describe the decisions in order.",
          a: `1. **Start insertEnd(x)**.
2. Create newNode; newNode->data = x; newNode->next = NULL.
3. Decision **head == NULL ?**
   - Yes: head = newNode; Return.
   - No: temp = head.
4. Decision **temp->next != NULL ?**
   - Yes: temp = temp->next, then ask again (loop).
   - No: temp->next = newNode; Return.`,
          keys: ["head == null", "temp = head", "temp->next != null", "temp = temp->next", "temp->next = newnode"]
        },
        {
          id: "u2-sll-insafter",
          kind: "algo",
          q: "Algorithm: insert after a given position (in the middle) of an SLL. Why does the order of the two link changes matter?",
          a: `1. Create **newNode** with data x.
2. Set **temp = head** and move it forward **(pos − 1) times**, so that temp is the node after which we insert.
3. If **temp = NULL**, the position is invalid; stop.
4. Set **newNode->next = temp->next**.
5. Set **temp->next = newNode**.

\`\`\`
Algorithm InsertAfter(pos, x)
{
    temp ← head
    for i ← 1 to pos-1 do
        if (temp ≠ NULL) then temp ← temp->next
    if (temp = NULL) then { write "Invalid position"; return }
    newNode ← new Node;   newNode->data ← x
    newNode->next ← temp->next
    temp->next ← newNode
}
\`\`\`

**Order matters:** first join the new node to the rest of the list (step 4), then change temp->next (step 5). If step 5 is done first, the **address of the remaining list is lost**.

Example: inserting 25 after node 20 (pos = 2) in 10 → 20 → 30 gives 10 → 20 → 25 → 30.`,
          keys: ["pos - 1", "temp", "newnode->next = temp->next", "temp->next = newnode", "order", "lost"],
          tip: "New node grabs the tail first (1), then the old node points to it (2)."
        },
        {
          id: "u2-sll-inspos",
          kind: "concept",
          q: "What is insertAtPosition(val, pos) in the class code of an SLL?",
          a: `The function **insertAtPosition(val, pos)** makes the new node the **pos-th node** of the list.

- If **pos = 1** it is insertion at the beginning.
- Otherwise move temp to node **(pos − 1)** and do the same two link changes.

So it is the same as "**insert after position pos − 1**".`,
          keys: ["pos-th node", "pos = 1", "beginning", "pos - 1", "insert after"]
        },
        {
          id: "u2-sll-delbeg",
          kind: "algo",
          q: "Algorithm: delete from the beginning of an SLL.",
          a: `1. If **head = NULL**, print "List is empty" and stop.
2. Set **temp = head**.
3. Set **head = head->next**.
4. **Free temp**.

Time: O(1).`,
          keys: ["head = null", "temp = head", "head = head->next", "free", "o(1)"]
        },
        {
          id: "u2-sll-delend",
          kind: "algo",
          q: "Algorithm: delete from the end of an SLL.",
          a: `1. If **head = NULL**, print "List is empty" and stop.
2. If **head->next = NULL** (only one node), free head, set head = NULL and stop.
3. Set **temp = head** and move forward while **temp->next->next ≠ NULL** (temp stops at the **second-last node**).
4. Free **temp->next** and set **temp->next = NULL**.

Time: O(n).`,
          keys: ["only one node", "temp->next->next", "second-last", "free", "temp->next = null", "o(n)"]
        },
        {
          id: "u2-sll-delval",
          kind: "algo",
          q: "Algorithm: delete a node with a given value (key) from an SLL.",
          a: `1. If **head = NULL**, print "List is empty" and stop.
2. If **head->data = key**, delete the first node (as above) and stop.
3. Set **prev = head** and **cur = head->next**.
4. While **cur ≠ NULL and cur->data ≠ key**: set prev = cur and cur = cur->next.
5. If **cur = NULL**, print "Key not found" and stop.
6. Set **prev->next = cur->next** (bypass the node) and **free cur**.

\`\`\`
Algorithm DeleteValue(key)
{
    if (head = NULL) then { write "List is empty"; return }
    if (head->data = key) then
    {   temp ← head; head ← head->next; delete temp; return   }
    prev ← head;   cur ← head->next
    while (cur ≠ NULL and cur->data ≠ key) do
    {   prev ← cur;   cur ← cur->next   }
    if (cur = NULL) then write "Key not found"
    else
    {   prev->next ← cur->next;   delete cur   }
}
\`\`\`

Example: deleting 20 from 10 → 20 → 30: the previous node (10) is linked directly to the next node (30).`,
          keys: ["prev", "cur", "key", "prev->next = cur->next", "bypass", "key not found", "delete"]
        },
        {
          id: "u2-sll-delval-flow",
          kind: "trace",
          q: "Flowchart of delete a given value (SLL): describe the decisions in order.",
          a: `1. **Start deleteValue(key)**.
2. **head == NULL ?** Yes: print "List is empty", Return.
3. **head->data == key ?** Yes: temp = head; head = head->next; delete temp; Return.
4. prev = head; cur = head->next.
5. **cur != NULL and cur->data != key ?** Yes: prev = cur; cur = cur->next; repeat.
6. **cur == NULL ?** Yes: print "Key not found", Return.
7. No: prev->next = cur->next; delete cur; Return.`,
          keys: ["head == null", "head->data == key", "prev = head", "cur = head->next", "cur == null", "delete cur"]
        },
        {
          id: "u2-sll-delpos",
          kind: "algo",
          q: "Algorithm: delete a node at a given position of an SLL.",
          a: `1. If **head = NULL**, stop. If **pos = 1**, delete the first node.
2. Move **temp** to the node just before the required position (**pos − 1**).
3. If **temp or temp->next is NULL**, the position is out of range; stop.
4. Set **del = temp->next**, then **temp->next = del->next** (the node is excluded from the chain) and **free del**.`,
          keys: ["pos = 1", "pos - 1", "out of range", "del = temp->next", "temp->next = del->next", "free"]
        },
        {
          id: "u2-sll-search",
          kind: "algo",
          q: "Algorithm: search a key in a linked list. Why only linear search?",
          a: `A linked list has **no index**, so only **linear search** is possible: compare the key with each node from head onwards.

1. Set **temp = head** and **pos = 1**.
2. While **temp ≠ NULL**: if temp->data = key, report "found at position pos" and stop; otherwise set temp = temp->next and pos = pos + 1.
3. If the loop ends, report "key not found".

\`\`\`
Algorithm Search(key)
{
    temp ← head;   pos ← 1
    while (temp ≠ NULL) do
    {
        if (temp->data = key) then return pos
        temp ← temp->next;   pos ← pos + 1
    }
    return -1          // not found
}
\`\`\`

Time: O(n).`,
          keys: ["no index", "linear search", "temp", "pos", "key", "return -1", "o(n)"]
        },
        {
          id: "u2-sll-search-flow",
          kind: "trace",
          q: "Flowchart of search (SLL): describe the steps.",
          a: `1. **Start search(key)**; temp = head, pos = 1.
2. **temp != NULL ?** No: print "key not found", Return.
3. Yes: **temp->data == key ?** Yes: print "found at position pos", Return.
4. No: temp = temp->next; pos = pos + 1; go back to step 2.`,
          keys: ["temp = head", "pos = 1", "temp != null", "temp->data == key", "pos = pos + 1"]
        },
        {
          id: "u2-sll-code-ins",
          kind: "code",
          q: "C++ code: SLL insertBegin, insertEnd and insertAfter.",
          a: `\`\`\`cpp
void insertBegin(int x) {
    Node* newNode = new Node;
    newNode->data = x;
    newNode->next = head;
    head = newNode;
}

void insertEnd(int x) {
    Node* newNode = new Node;
    newNode->data = x;
    newNode->next = NULL;
    if (head == NULL) { head = newNode; return; }
    Node* temp = head;
    while (temp->next != NULL) temp = temp->next;
    temp->next = newNode;
}

void insertAfter(int pos, int x) {          // insert after position pos (1-based)
    Node* temp = head;
    for (int i = 1; i < pos && temp != NULL; i++) temp = temp->next;
    if (temp == NULL) { cout << "Invalid position\\n"; return; }
    Node* newNode = new Node;
    newNode->data = x;
    newNode->next = temp->next;
    temp->next = newNode;
}
\`\`\``,
          keys: ["newnode->next = head", "head = newnode", "temp->next != null", "temp->next = newnode", "i < pos", "invalid position"]
        },
        {
          id: "u2-sll-code-del",
          kind: "code",
          q: "C++ code: SLL deleteBegin, deleteEnd and deleteValue.",
          a: `\`\`\`cpp
void deleteBegin() {
    if (head == NULL) { cout << "List is empty\\n"; return; }
    Node* temp = head;
    head = head->next;
    delete temp;
}

void deleteEnd() {
    if (head == NULL) { cout << "List is empty\\n"; return; }
    if (head->next == NULL) { delete head; head = NULL; return; }
    Node* temp = head;
    while (temp->next->next != NULL) temp = temp->next;
    delete temp->next;
    temp->next = NULL;
}

void deleteValue(int key) {
    if (head == NULL) { cout << "List is empty\\n"; return; }
    if (head->data == key) { deleteBegin(); return; }
    Node *prev = head, *cur = head->next;
    while (cur != NULL && cur->data != key) { prev = cur; cur = cur->next; }
    if (cur == NULL) { cout << "Key not found\\n"; return; }
    prev->next = cur->next;
    delete cur;
}
\`\`\``,
          keys: ["head = head->next", "delete temp", "temp->next->next", "prev", "cur", "prev->next = cur->next", "delete cur"]
        },
        {
          id: "u2-sll-code-rest",
          kind: "code",
          q: "C++ code: SLL search, deleteAtPosition, update and display.",
          a: `\`\`\`cpp
int search(int key) {                       // returns position, or -1
    int pos = 1;
    for (Node* temp = head; temp != NULL; temp = temp->next, pos++)
        if (temp->data == key) return pos;
    return -1;
}

void deleteAtPosition(int pos) {            // pos = 1 means the first node
    if (head == NULL) return;
    if (pos == 1) { deleteBegin(); return; }
    Node* temp = head;
    for (int i = 1; i < pos - 1 && temp != NULL; i++) temp = temp->next;
    if (temp == NULL || temp->next == NULL) { cout << "Position out of range\\n"; return; }
    Node* del = temp->next;
    temp->next = del->next;
    delete del;
}

void update(int oldValue, int newValue) {   // change the data of a node
    for (Node* temp = head; temp != NULL; temp = temp->next)
        if (temp->data == oldValue) { temp->data = newValue; return; }
}

void display() {
    for (Node* temp = head; temp != NULL; temp = temp->next)
        cout << temp->data << " -> ";
    cout << "NULL\\n";
}
\`\`\``,
          keys: ["return pos", "return -1", "pos - 1", "del = temp->next", "temp->data = newvalue", "cout << temp->data"]
        },
        {
          id: "u2-sll-complexity",
          kind: "compare",
          q: "Time complexity of SLL operations (with reasons).",
          a: `| Operation | Time | Reason |
|---|---|---|
| Insert / delete at beginning | O(1) | Only head changes |
| Insert / delete at end | O(n) | Must walk to the last node (O(1) for insert if a tail pointer is kept) |
| Insert / delete at a position | O(n) | Must walk to that position |
| Search, traversal | O(n) | Visits nodes one by one |`,
          keys: ["o(1)", "o(n)", "head", "last node", "tail pointer", "traversal"]
        }
      ]
    },
    {
      id: "u2-dll",
      title: "1.3 Doubly Linked List (DLL)",
      cards: [
        {
          id: "u2-dll-def",
          kind: "def",
          q: "What is a doubly linked list? Give its node structure.",
          a: `**Doubly linked list** is a linked list in which every node has **two links**: **prev** points to the previous node and **next** points to the next node. The prev of the first node and the next of the last node are **NULL**.

\`\`\`cpp
struct Node {
    int   data;
    Node* prev;                    // address of previous node
    Node* next;                    // address of next node
};
Node* head = NULL;
\`\`\``,
          keys: ["two links", "prev", "next", "first node", "last node", "null", "struct node"]
        },
        {
          id: "u2-dll-adv",
          kind: "list",
          q: "Advantages and disadvantages of a DLL over an SLL.",
          a: `**Advantages**
- Can be traversed **forward and backward**.
- A node can be **deleted when only its own address is known** (no need to find the previous node).
- **Insertion before a node** is easy.

**Disadvantages**
- **One extra pointer per node** (more memory).
- Every insertion and deletion has to **update more links**.`,
          keys: ["forward and backward", "delete", "own address", "insertion before", "extra pointer", "more links"]
        },
        {
          id: "u2-dll-ins-beg-end",
          kind: "algo",
          q: "Algorithm: insert at the beginning and at the end of a DLL.",
          a: `**At the beginning**
1. Create newNode with data x; set **newNode->prev = NULL** and **newNode->next = head**.
2. If **head ≠ NULL**, set **head->prev = newNode**.
3. Set **head = newNode**.

**At the end**
1. Create newNode with data x and **next = NULL**.
2. If **head = NULL**, set newNode->prev = NULL, head = newNode and stop.
3. Move **temp** to the last node. Set **temp->next = newNode** and **newNode->prev = temp**.`,
          keys: ["newnode->prev = null", "newnode->next = head", "head->prev = newnode", "temp->next = newnode", "newnode->prev = temp"]
        },
        {
          id: "u2-dll-ins-mid",
          kind: "algo",
          q: "Algorithm: insert after a given node p in a DLL (four links, in order).",
          a: `Four links must be set. Do them in this order:

1. **newNode->prev = p**
2. **newNode->next = p->next**
3. If p->next ≠ NULL, then **p->next->prev = newNode**
4. **p->next = newNode**

\`\`\`
Algorithm DLL_InsertAfter(p, x)
{
    newNode ← new Node;   newNode->data ← x
    newNode->prev ← p
    newNode->next ← p->next
    if (p->next ≠ NULL) then p->next->prev ← newNode
    p->next ← newNode
}
\`\`\`

Example: inserting 20 between 10 and 30.`,
          keys: ["newnode->prev = p", "newnode->next = p->next", "p->next->prev = newnode", "p->next = newnode", "four links", "order"],
          tip: "New node's two links first (1, 2), then fix the neighbours: right one (3), left one (4)."
        },
        {
          id: "u2-dll-del",
          kind: "algo",
          q: "Algorithm: delete a node cur (found by key) from a DLL.",
          a: `1. If cur is the first node, set **head = cur->next**; otherwise set **cur->prev->next = cur->next**.
2. If cur is not the last node, set **cur->next->prev = cur->prev**.
3. **Free cur**.

\`\`\`
Algorithm DLL_Delete(key)
{
    cur ← head
    while (cur ≠ NULL and cur->data ≠ key) do cur ← cur->next
    if (cur = NULL) then { write "Key not found"; return }
    if (cur->prev = NULL) then head ← cur->next
    else cur->prev->next ← cur->next
    if (cur->next ≠ NULL) then cur->next->prev ← cur->prev
    delete cur
}
\`\`\``,
          keys: ["cur->prev->next = cur->next", "cur->next->prev = cur->prev", "head = cur->next", "first node", "last node", "free"]
        },
        {
          id: "u2-dll-code-ins",
          kind: "code",
          q: "C++ code: DLL insertBegin, insertEnd and insertAfter(key, x).",
          a: `\`\`\`cpp
void insertBegin(int x) {
    Node* n = new Node;
    n->data = x; n->prev = NULL; n->next = head;
    if (head != NULL) head->prev = n;
    head = n;
}

void insertEnd(int x) {
    Node* n = new Node;
    n->data = x; n->next = NULL;
    if (head == NULL) { n->prev = NULL; head = n; return; }
    Node* temp = head;
    while (temp->next != NULL) temp = temp->next;
    temp->next = n;
    n->prev = temp;
}

void insertAfter(int key, int x) {          // insert x after the node holding key
    Node* p = head;
    while (p != NULL && p->data != key) p = p->next;
    if (p == NULL) { cout << "Key not found\\n"; return; }
    Node* n = new Node;
    n->data = x;
    n->prev = p;
    n->next = p->next;
    if (p->next != NULL) p->next->prev = n;
    p->next = n;
}
\`\`\``,
          keys: ["n->prev = null", "head->prev = n", "n->prev = temp", "n->prev = p", "n->next = p->next", "p->next->prev = n"]
        },
        {
          id: "u2-dll-code-rest",
          kind: "code",
          q: "C++ code: DLL deleteValue, search, displayForward and displayBackward.",
          a: `\`\`\`cpp
void deleteValue(int key) {
    Node* cur = head;
    while (cur != NULL && cur->data != key) cur = cur->next;
    if (cur == NULL) { cout << "Key not found\\n"; return; }
    if (cur->prev == NULL) head = cur->next;
    else                    cur->prev->next = cur->next;
    if (cur->next != NULL) cur->next->prev = cur->prev;
    delete cur;
}

int search(int key) {
    int pos = 1;
    for (Node* t = head; t != NULL; t = t->next, pos++)
        if (t->data == key) return pos;
    return -1;
}

void displayForward() {
    for (Node* t = head; t != NULL; t = t->next) cout << t->data << " ";
    cout << "\\n";
}

void displayBackward() {
    if (head == NULL) return;
    Node* t = head;
    while (t->next != NULL) t = t->next;    // go to last node
    for (; t != NULL; t = t->prev) cout << t->data << " ";
    cout << "\\n";
}
\`\`\``,
          keys: ["cur->prev == null", "head = cur->next", "cur->prev->next", "cur->next->prev", "t->prev", "last node"]
        }
      ]
    },
    {
      id: "u2-cll",
      title: "1.4 Circular Linked List (CLL)",
      cards: [
        {
          id: "u2-cll-def",
          kind: "def",
          q: "What is a circular linked list? State its main properties.",
          a: `**Circular linked list** is a linked list in which the **last node points back to the first node** instead of NULL. So there is **no NULL link** and the list has no real "end". It can be **singly circular** or **doubly circular**.

- Any node can be the starting point; the whole list can be reached from any node.
- Traversal stops when we **come back to the starting node** (not when NULL is found), so a **do-while** loop is used.
- It is convenient to keep a pointer to the last node (**tail**). Then **tail->next is the first node**, and insertion at both the beginning and the end takes **O(1)**.`,
          keys: ["last node", "first node", "no null", "do-while", "tail", "tail->next", "o(1)"]
        },
        {
          id: "u2-cll-trav",
          kind: "algo",
          q: "Algorithm: traverse / display a circular linked list (using tail).",
          a: `\`\`\`
Algorithm CLL_Display(tail)
{
    if (tail = NULL) then { write "List is empty"; return }
    temp ← tail->next              // first node
    repeat
        write temp->data
        temp ← temp->next
    until (temp = tail->next)      // back at the first node
}
\`\`\``,
          keys: ["tail = null", "tail->next", "repeat", "until", "temp = tail->next", "first node"]
        },
        {
          id: "u2-cll-insbeg",
          kind: "algo",
          q: "Algorithm: insert at the beginning and at the end of a CLL (with tail).",
          a: `**Insert at the beginning**
1. Create **newNode** with data x.
2. If **tail = NULL** (empty list): set tail = newNode and **newNode->next = newNode** (it points to itself). Stop.
3. Otherwise set **newNode->next = tail->next** and **tail->next = newNode**.

**Insert at the end**
Do exactly the same steps as insert at the beginning, and then set **tail = newNode** (the new node becomes the last node).`,
          keys: ["tail = null", "points to itself", "newnode->next = tail->next", "tail->next = newnode", "tail = newnode"]
        },
        {
          id: "u2-cll-delbeg",
          kind: "algo",
          q: "Algorithm: delete from the beginning of a CLL (with tail).",
          a: `1. If **tail = NULL**, print "List is empty" and stop.
2. Set **temp = tail->next** (first node).
3. If **temp = tail** (only one node), set **tail = NULL**; otherwise set **tail->next = temp->next**.
4. **Free temp**.`,
          keys: ["tail = null", "temp = tail->next", "only one node", "tail->next = temp->next", "free"]
        },
        {
          id: "u2-cll-delval",
          kind: "algo",
          q: "Algorithm: delete a given value from a CLL (with tail).",
          a: `1. If **tail = NULL**, stop. Set **prev = tail** and **cur = tail->next**.
2. Move prev and cur forward until **cur->data = key** or cur comes back to the first node.
3. If the key was found: if cur is the only node set **tail = NULL**; otherwise set **prev->next = cur->next**, and if **cur = tail** set **tail = prev**. **Free cur**.`,
          keys: ["prev = tail", "cur = tail->next", "only node", "prev->next = cur->next", "cur = tail", "tail = prev"]
        },
        {
          id: "u2-cll-code",
          kind: "code",
          q: "C++ code: circular (singly) linked list insertBegin, insertEnd and deleteBegin.",
          a: `\`\`\`cpp
struct Node { int data; Node* next; };
Node* tail = NULL;                    // tail->next is the first node

void insertBegin(int x) {
    Node* n = new Node;
    n->data = x;
    if (tail == NULL) { tail = n; n->next = n; return; }
    n->next = tail->next;
    tail->next = n;
}

void insertEnd(int x) {
    insertBegin(x);
    tail = tail->next;                        // new node becomes the last node
}

void deleteBegin() {
    if (tail == NULL) { cout << "List is empty\\n"; return; }
    Node* temp = tail->next;
    if (temp == tail) tail = NULL;    // only one node
    else              tail->next = temp->next;
    delete temp;
}
\`\`\``,
          keys: ["tail == null", "n->next = n", "n->next = tail->next", "tail = tail->next", "temp == tail", "delete temp"]
        },
        {
          id: "u2-cll-code2",
          kind: "code",
          q: "C++ code: circular linked list deleteValue and display.",
          a: `\`\`\`cpp
void deleteValue(int key) {
    if (tail == NULL) return;
    Node *prev = tail, *cur = tail->next;
    do {
         if (cur->data == key) {
             if (cur == prev) tail = NULL;                               // single node
             else {
                 prev->next = cur->next;
                 if (cur == tail) tail = prev;
             }
             delete cur;
             return;
         }
         prev = cur; cur = cur->next;
    } while (cur != tail->next);
    cout << "Key not found\\n";
}

void display() {
    if (tail == NULL) { cout << "List is empty\\n"; return; }
    Node* temp = tail->next;
    do {
         cout << temp->data << " ";
         temp = temp->next;
    } while (temp != tail->next);
    cout << "\\n";
}
\`\`\``,
          keys: ["do", "while", "cur == prev", "prev->next = cur->next", "tail = prev", "tail->next"]
        },
        {
          id: "u2-cll-apps",
          kind: "list",
          q: "Applications of a circular linked list.",
          a: `- **Round-robin CPU scheduling**
- **Turn-by-turn multiplayer games**
- **Repeating playlists**
- Implementation of **circular queues**`,
          keys: ["round-robin", "scheduling", "multiplayer games", "playlists", "circular queue"]
        }
      ]
    },
    {
      id: "u2-ll-compare",
      title: "1.5 Comparison and Applications of Linked Lists",
      cards: [
        {
          id: "u2-ll-cmp3",
          kind: "compare",
          q: "Compare singly, doubly and circular linked lists.",
          a: `| Point | Singly | Doubly | Circular |
|---|---|---|---|
| Links per node | 1 (next) | 2 (prev, next) | 1 (or 2 if doubly circular) |
| Traversal | Forward only | Forward and backward | Forward, round and round |
| Last node points to | NULL | NULL | First node |
| Memory per node | Least | Most | Same as singly |
| Delete a node whose address is given | O(n), need previous node | O(1) | O(n) |
| Typical use | Stack, simple lists | Browser back/forward, undo/redo | Round-robin scheduling |`,
          keys: ["next", "prev", "forward only", "both directions", "null", "first node", "o(1)", "round-robin"]
        },
        {
          id: "u2-ll-uses",
          kind: "list",
          q: "List the uses (applications) of linked lists.",
          a: `1. **Dynamic memory allocation**: ideal when the amount of data is not known in advance; used in memory management.
2. **Implementing stacks and queues**: a singly linked list can work as a stack or a queue by adding and removing nodes at the ends.
3. **Browser history**: back and forward navigation is managed with a doubly linked list.
4. **Undo functionality**: operations are stored in a list and reversed by moving backwards.
5. **Music playlists and image viewers**: next and previous items are reached with a doubly linked list.
6. **Graph representation**: adjacency lists are linked lists.
7. **Polynomial arithmetic**: each node stores one term of a polynomial.

**Other uses:** sparse matrices, chaining in hash tables.`,
          keys: ["dynamic memory", "stacks and queues", "browser history", "undo", "playlists", "adjacency list", "polynomial"]
        }
      ]
    },
    {
      id: "u2-stack",
      title: "2.1-2.4 Stack ADT, Implementations and Applications",
      cards: [
        {
          id: "u2-stack-def",
          kind: "def",
          q: "What is a stack?",
          a: `**Stack** is a linear data structure in which **insertion and deletion are done at only one end, called the top**. The element inserted last is removed first: **LIFO (Last In, First Out)**.

In other words, a stack is "a collection of similar data items in which both insertion and deletion are performed based on the LIFO principle".`,
          keys: ["linear", "one end", "top", "lifo", "last in first out"],
          tip: "Pile of plates: put on the top, take from the top."
        },
        {
          id: "u2-stack-adt",
          kind: "def",
          q: "Define the Stack ADT (data and operations).",
          a: `**Data:** an ordered list of elements and a variable **top** showing the position of the topmost element.

**Operations:**
- **push(x)**: insert x on the top. If the stack is full, this is **overflow**.
- **pop()**: remove and return the top element. If the stack is empty, this is **underflow**.
- **peek() / top()**: return the top element without removing it.
- **isEmpty()**: true if the stack has no element.
- **isFull()**: true if no more elements can be added (array implementation).
- **size()**: return the number of elements; **display()**: show all elements from top to bottom.

The ADT defines the operations **without the implementation details**. A stack can be implemented using an **array (static)** or a **linked list (dynamic)**.`,
          keys: ["push", "pop", "peek", "isempty", "isfull", "overflow", "underflow", "top"]
        },
        {
          id: "u2-stack-arr-cond",
          kind: "formula",
          q: "Stack using an array: initial value of top, empty condition and full condition.",
          a: `An array **stack[MAX]** stores the elements and an integer **top** stores the index of the top element.

- Initially **top = -1** (empty stack).
- Empty condition: **top == -1**
- Full condition: **top == MAX - 1**`,
          keys: ["top = -1", "top == -1", "top == max - 1", "empty", "full"]
        },
        {
          id: "u2-stack-arr-algo",
          kind: "algo",
          q: "Algorithm: PUSH(x) and POP() for an array stack.",
          a: `**PUSH(x)**
1. If **top = MAX − 1**, print "Stack Overflow" and stop.
2. Set **top = top + 1**.
3. Set **stack[top] = x**.

**POP()**
1. If **top = −1**, print "Stack Underflow" and stop.
2. Set **x = stack[top]**.
3. Set **top = top − 1** and return x.

\`\`\`
Algorithm Push(x)                          Algorithm Pop()
{                                          {
    if (top = MAX-1) then                      if (top = -1) then
        write "Stack Overflow"                     write "Stack Underflow"
    else                                       else
    {                                          {
        top ← top + 1                              x ← stack[top]
        stack[top] ← x                             top ← top - 1
    }                                              return x
}                                              }
                                           }
\`\`\`

Both take O(1). (Flowchart: push asks "top == MAX - 1 ?" Yes: Overflow; No: top = top + 1, stack[top] = x. Pop asks "top == -1 ?" Yes: Underflow; No: x = stack[top], top = top - 1, return x.)`,
          keys: ["top = max-1", "overflow", "top = top + 1", "stack[top] = x", "top = -1", "underflow", "top = top - 1"]
        },
        {
          id: "u2-stack-arr-trace",
          kind: "trace",
          q: "Trace: MAX = 4; push(10), push(20), push(30), pop(), push(40), push(50), push(60).",
          a: `| Operation | Stack (bottom → top) | top |
|---|---|---|
| push(10) | 10 | 0 |
| push(20) | 10, 20 | 1 |
| push(30) | 10, 20, 30 | 2 |
| pop() | 10, 20 (returns 30) | 1 |
| push(40) | 10, 20, 40 | 2 |
| push(50) | 10, 20, 40, 50 | 3 |
| push(60) | 10, 20, 40, 50 (**Overflow**) | 3 |`,
          keys: ["push(10)", "pop returns 30", "top = 3", "overflow", "push(60)"]
        },
        {
          id: "u2-stack-arr-code",
          kind: "code",
          q: "C++ code: stack using an array (class Stack).",
          a: `\`\`\`cpp
#define MAX 100
class Stack {
    int a[MAX];
    int top;
public:
    Stack() { top = -1; }
    bool isEmpty() { return top == -1; }
    bool isFull() { return top == MAX - 1; }
    void push(int x) {
        if (isFull()) { cout << "Stack Overflow\\n"; return; }
        a[++top] = x;
    }
    int pop() {
        if (isEmpty()) { cout << "Stack Underflow\\n"; return -1; }
        return a[top--];
    }
    int peek() {
        if (isEmpty()) return -1;
        return a[top];
    }
    void display() {                      // from top to bottom
        if (isEmpty()) { cout << "Stack is Empty\\n"; return; }
        for (int i = top; i >= 0; i--) cout << a[i] << "\\n";
    }
};
\`\`\``,
          keys: ["top = -1", "top == max - 1", "a[++top] = x", "a[top--]", "overflow", "underflow", "peek"]
        },
        {
          id: "u2-stack-ll",
          kind: "algo",
          q: "Stack using a linked list: idea and PUSH(x) / POP() algorithms.",
          a: `Each element is a **node**. The **top pointer points to the first node** of the list. **Push = insert at the beginning** and **pop = delete from the beginning**, so both take **O(1)**. There is no fixed size, so overflow happens only when memory is finished.

**PUSH(x)**
1. Create newNode and set newNode->data = x.
2. Set **newNode->next = top**.
3. Set **top = newNode**.

**POP()**
1. If **top = NULL**, print "Stack Underflow" and stop.
2. Set **temp = top** and **x = temp->data**.
3. Set **top = top->next**, **free temp** and return x.

Example: after push(10), push(20), push(30): top → 30 → 20 → 10 → NULL.`,
          keys: ["top", "first node", "insert at beginning", "delete from beginning", "o(1)", "newnode->next = top", "top = null"]
        },
        {
          id: "u2-stack-ll-code",
          kind: "code",
          q: "C++ code: stack using a linked list.",
          a: `\`\`\`cpp
struct Node { int data; Node* next; };

class Stack {
    Node* top;
public:
    Stack() { top = NULL; }
    bool isEmpty() { return top == NULL; }
    void push(int x) {
        Node* n = new Node;
        n->data = x;
        n->next = top;
        top = n;
    }
    int pop() {
        if (isEmpty()) { cout << "Stack Underflow\\n"; return -1; }
        Node* temp = top;
        int x = temp->data;
        top = top->next;
        delete temp;
        return x;
    }
    int peek() { return isEmpty() ? -1 : top->data; }
    void display() {
        for (Node* temp = top; temp != NULL; temp = temp->next) cout << temp->data <<
"\\n";
    }
};
\`\`\``,
          keys: ["top = null", "n->next = top", "top = n", "temp = top", "top = top->next", "delete temp"]
        },
        {
          id: "u2-stack-impl-cmp",
          kind: "compare",
          q: "Compare array and linked list implementation of a stack.",
          a: `| Point | Array implementation | Linked list implementation |
|---|---|---|
| Size | Fixed (MAX) | Dynamic, grows as needed |
| Overflow | When top = MAX − 1 | Only when memory is exhausted |
| Memory | May be wasted if stack is mostly empty | Extra pointer per element, but no unused slots |
| Push / pop time | O(1) | O(1) |
| Ease | Simple | Slightly more code (pointers) |`,
          keys: ["fixed", "dynamic", "overflow", "memory wasted", "extra pointer", "o(1)", "simple"]
        },
        {
          id: "u2-stack-apps",
          kind: "list",
          q: "List the applications of a stack.",
          a: `- **Function call management and recursion** (the system call stack).
- **Expression evaluation and conversion**: infix to postfix / prefix, evaluation of postfix and prefix expressions.
- **Backtracking** algorithms (maze solving, N-Queens) and **depth-first search** of a graph.
- **Undo** mechanism in editors.
- **Page navigation** in web browsers (back button).
- **Syntax checking** in compilers, e.g. checking balanced parentheses.
- **Reversing** a string or a list.`,
          keys: ["recursion", "expression", "backtracking", "dfs", "undo", "browser", "balanced parentheses", "reversing"]
        }
      ]
    },
    {
      id: "u2-notation",
      title: "2.5 Expression Notations",
      cards: [
        {
          id: "u2-notation-types",
          kind: "compare",
          q: "What are infix, prefix and postfix notations?",
          a: `An arithmetic expression is made of **operands** (A, B, 5 ...) and **operators** (+, −, *, /, ^). It can be written in three ways:

| Notation | Position of operator | Example | Also called |
|---|---|---|---|
| Infix | Between the operands | A + B | Normal form used by humans |
| Prefix | Before the operands | + A B | Polish notation |
| Postfix | After the operands | A B + | Reverse Polish notation (RPN) |`,
          keys: ["infix", "prefix", "postfix", "between", "before", "after", "polish", "reverse polish"]
        },
        {
          id: "u2-notation-why",
          kind: "concept",
          q: "Why postfix / prefix?",
          a: `**Infix** needs **brackets and precedence rules**, so a computer would have to scan it **many times**.

**Postfix and prefix** need **no brackets** and can be evaluated in **one scan using a stack**.`,
          keys: ["brackets", "precedence", "one scan", "stack", "many times"]
        },
        {
          id: "u2-notation-prec",
          kind: "formula",
          q: "Operator precedence and associativity table.",
          a: `| Operator | Precedence | Associativity |
|---|---|---|
| ^ (power) | 3 (highest) | Right to left |
| *  /  % | 2 | Left to right |
| +  - | 1 (lowest) | Left to right |`,
          keys: ["^", "3", "highest", "right to left", "left to right", "+ -", "lowest"]
        },
        {
          id: "u2-notation-bracket",
          kind: "concept",
          q: "Conversion by hand: the bracket method.",
          a: `**Fully bracket** the expression according to precedence, then **move each operator to the place of its closing bracket** (for postfix) or **opening bracket** (for prefix).

Example: A + B * C = (A + (B * C))
- Postfix: **A B C * +**
- Prefix: **+ A * B C**`,
          keys: ["fully bracket", "closing bracket", "opening bracket", "postfix", "prefix", "abc*+"]
        }
      ]
    },
    {
      id: "u2-in2post",
      title: "2.6 Infix to Postfix Conversion",
      cards: [
        {
          id: "u2-in2post-algo",
          kind: "algo",
          q: "Algorithm: convert infix to postfix using a stack.",
          a: `**Idea:** scan the infix expression left to right. Operands go straight to the output. Operators wait on a stack until an operator of lower precedence (or a closing bracket) arrives.

1. Create an **empty stack** and an empty **postfix string**.
2. Scan the infix expression from **left to right**, one symbol ch at a time:
   - a. If ch is an **operand**, add it to postfix.
   - b. If ch is **(**, push it on the stack.
   - c. If ch is **)**, pop from the stack and add to postfix until **(** is found. Remove ( from the stack; do not add it to postfix.
   - d. If ch is an **operator**: while the stack is not empty, the top is not ( and the top operator has **precedence greater than or equal** to ch, pop it and add it to postfix. Then **push ch**. (For **^**, which is right-associative, pop only if the top has **greater** precedence.)
3. After the scan, **pop all remaining operators** and add them to postfix.`,
          keys: ["left to right", "operand", "push (", "pop until (", "precedence", "greater or equal", "pop all", "^ right-associative"],
          tip: "Operand → out; ( → push; ) → pop till (; operator → pop higher-or-equal, then push; end → pop all."
        },
        {
          id: "u2-in2post-pseudo",
          kind: "code",
          q: "Pseudocode: InfixToPostfix(infix).",
          a: `\`\`\`
Algorithm InfixToPostfix(infix)
{
    create empty stack S;    postfix ← ""
    for each symbol ch in infix (left to right) do
    {
        if (ch is an operand) then postfix ← postfix + ch
        else if (ch = '(') then      push(S, ch)
        else if (ch = ')') then
        {
             while (top(S) ≠ '(') do postfix ← postfix + pop(S)
             pop(S)                              // remove '('
        }
        else                                     // ch is an operator
        {
             while (S not empty and top(S) ≠ '(' and
                    (prec(top(S)) > prec(ch) or
                    (prec(top(S)) = prec(ch) and ch ≠ '^'))) do
                 postfix ← postfix + pop(S)
             push(S, ch)
        }
    }
    while (S not empty) do postfix ← postfix + pop(S)
    return postfix
}
\`\`\``,
          keys: ["stack s", "postfix", "operand", "'('", "')'", "prec(top(s)) > prec(ch)", "ch != '^'", "pop(s)"]
        },
        {
          id: "u2-in2post-flow",
          kind: "trace",
          q: "Flowchart of infix to postfix: describe it in order.",
          a: `1. **Start**; read infix expression; create empty stack, postfix = "".
2. **More symbols to scan ?** No: pop all remaining operators and add them to postfix; print postfix; Stop.
3. Yes: ch = next symbol.
4. ch is an operand? Yes: add ch to postfix.
5. ch is '(' ? Yes: push ch on stack.
6. ch is ')' ? Yes: pop and add to postfix until '('; remove '(' from stack.
7. Otherwise (operator): while stack top is an operator with precedence >= ch, pop it and add to postfix; then push ch on stack.
8. Go back to step 2.`,
          keys: ["read infix", "empty stack", "operand", "'('", "')'", "precedence >= ch", "pop all"]
        },
        {
          id: "u2-in2post-ex1",
          kind: "trace",
          q: "Trace: convert (A + B) * (C - D) to postfix (class example).",
          a: `| Symbol | Action | Stack (bottom → top) | Postfix so far |
|---|---|---|---|
| ( | push ( | ( | |
| A | operand: add to output | ( | A |
| + | push + | (+ | A |
| B | operand: add to output | (+ | AB |
| ) | pop until ( ; discard ( | empty | AB+ |
| * | push * | * | AB+ |
| ( | push ( | *( | AB+ |
| C | operand: add to output | *( | AB+C |
| - | push - | *(- | AB+C |
| D | operand: add to output | *(- | AB+CD |
| ) | pop until ( ; discard ( | * | AB+CD- |
| end | pop all: * | empty | AB+CD-* |

**Postfix = AB+CD-***`,
          keys: ["ab+", "ab+cd-", "ab+cd-*", "pop until (", "discard", "pop all"]
        },
        {
          id: "u2-in2post-ex2",
          kind: "trace",
          q: "Trace: convert A+B*C^D-E/F to postfix (previous year paper).",
          a: `| Symbol | Action | Stack (bottom → top) | Postfix so far |
|---|---|---|---|
| A | operand: add to output | empty | A |
| + | push + | + | A |
| B | operand: add to output | + | AB |
| * | push * | +* | AB |
| C | operand: add to output | +* | ABC |
| ^ | push ^ | +*^ | ABC |
| D | operand: add to output | +*^ | ABCD |
| - | pop ^ * + ; push - | - | ABCD^*+ |
| E | operand: add to output | - | ABCD^*+E |
| / | push / | -/ | ABCD^*+E |
| F | operand: add to output | -/ | ABCD^*+EF |
| end | pop all: / - | empty | ABCD^*+EF/- |

**Postfix = ABCD^*+EF/-**`,
          keys: ["abcd^*+", "pop ^ * +", "push -", "abcd^*+ef/-", "pop all"]
        },
        {
          id: "u2-in2post-practice",
          kind: "compare",
          q: "More infix to postfix conversions for practice.",
          a: `| Infix | Postfix |
|---|---|
| A+B*C | ABC*+ |
| (A+B)*C | AB+C* |
| ((A+B)*C-(D-E))/(F+G) | AB+C*DE--FG+/ |
| P*(X/Y*Z-Q/(A+B)) | PXY/Z*QAB+/-* |
| A+B*C/D | ABC*D/+ |
| A-B/(C+D*E) | ABCDE*+/- |
| ((A+B)*C-(D-E))^(F+G) | AB+C*DE--FG+^ |
| A^B^C | ABC^^ |`,
          keys: ["abc*+", "ab+c*", "ab+c*de--fg+/", "pxy/z*qab+/-*", "abc^^", "abcde*+/-"]
        },
        {
          id: "u2-in2post-code",
          kind: "code",
          q: "C++ code: prec() and infixToPostfix().",
          a: `\`\`\`cpp
int prec(char op) {
    if (op == '^') return 3;
    if (op == '*' || op == '/' || op == '%') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}

string infixToPostfix(string infix) {
    stack<char> s;                 // STL stack; an array stack works the same way
    string post = "";
    for (char ch : infix) {
        if (isalnum(ch)) post += ch;                    // operand
        else if (ch == '(') s.push(ch);
        else if (ch == ')') {
            while (s.top() != '(') { post += s.top(); s.pop(); }
            s.pop();                                    // remove '('
        }
        else {                                          // operator
            while (!s.empty() && s.top() != '(' &&
                   (prec(s.top()) > prec(ch) ||
                   (prec(s.top()) == prec(ch) && ch != '^'))) {
                post += s.top(); s.pop();
            }
            s.push(ch);
        }
    }
    while (!s.empty()) { post += s.top(); s.pop(); }
    return post;
}
\`\`\``,
          keys: ["prec", "isalnum", "s.push", "s.top() != '('", "prec(s.top()) > prec(ch)", "ch != '^'", "post += s.top()"]
        }
      ]
    },
    {
      id: "u2-in2pre",
      title: "2.7 Infix to Prefix Conversion",
      cards: [
        {
          id: "u2-in2pre-algo",
          kind: "algo",
          q: "Algorithm: convert infix to prefix using a stack.",
          a: `1. **Reverse** the infix expression. While reversing, change every **(** to **)** and every **)** to **(**.
2. Convert the reversed expression to **postfix** using the stack method, with one change: an incoming operator pops the stack top only if the top has **strictly greater** precedence (for **^** pop when it is **greater or equal**). This keeps the left-to-right order of equal operators correct after the final reversal.
3. **Reverse the result**. This is the prefix expression.

\`\`\`
Algorithm InfixToPrefix(infix)
{
    rev ← reverse(infix)
    for each symbol in rev do              // swap the brackets
        if (symbol = '(') then symbol ← ')'
        else if (symbol = ')') then symbol ← '('
    post ← ModifiedInfixToPostfix(rev)     // pop only when prec(top) > prec(ch)
    return reverse(post)
}
\`\`\``,
          keys: ["reverse", "swap brackets", "modified postfix", "strictly greater", "^ greater or equal", "reverse result"],
          tip: "Reverse + swap brackets → postfix (pop only if strictly greater) → reverse."
        },
        {
          id: "u2-in2pre-trace",
          kind: "trace",
          q: "Trace: convert A^B*C-D+E/F/(G+H) to prefix (previous year paper).",
          a: `**Step 1:** reversed with brackets swapped = **(H+G)/F/E+D-C*B^A**

| Symbol | Action | Stack (bottom → top) | Output so far |
|---|---|---|---|
| ( | push ( | ( | |
| H | operand: add to output | ( | H |
| + | push + | (+ | H |
| G | operand: add to output | (+ | HG |
| ) | pop until ( ; discard ( | empty | HG+ |
| / | push / | / | HG+ |
| F | operand: add to output | / | HG+F |
| / | push / | // | HG+F |
| E | operand: add to output | // | HG+FE |
| + | pop / / ; push + | + | HG+FE// |
| D | operand: add to output | + | HG+FE//D |
| - | push - | +- | HG+FE//D |
| C | operand: add to output | +- | HG+FE//DC |
| * | push * | +-* | HG+FE//DC |
| B | operand: add to output | +-* | HG+FE//DCB |
| ^ | push ^ | +-*^ | HG+FE//DCB |
| A | operand: add to output | +-*^ | HG+FE//DCBA |
| end | pop all: ^ * - + | empty | HG+FE//DCBA^*-+ |

**Step 2 result** = HG+FE//DCBA^*-+

**Step 3:** reverse it → **Prefix = +-*^ABCD//EF+GH**`,
          keys: ["(h+g)/f/e+d-c*b^a", "hg+fe//dcba^*-+", "+-*^abcd//ef+gh", "reverse", "pop / /"]
        },
        {
          id: "u2-in2pre-practice",
          kind: "compare",
          q: "More infix to prefix conversions for practice.",
          a: `| Infix | Prefix |
|---|---|
| (A-B)/(C+D) | /-AB+CD |
| ((A+B)*C-(D-E))^(F+G) | ^-*+ABC-DE+FG |
| A+B*C^D-E/F | -+A*B^CD/EF |
| (A+B)*C-D/(E+F) | -*+ABC/D+EF |`,
          keys: ["/-ab+cd", "^-*+abc-de+fg", "-+a*b^cd/ef", "-*+abc/d+ef"]
        },
        {
          id: "u2-in2pre-code",
          kind: "code",
          q: "C++ code: infixToPrefix().",
          a: `\`\`\`cpp
string infixToPrefix(string infix) {
    reverse(infix.begin(), infix.end());
    for (char &ch : infix) {                                              // swap brackets
        if (ch == '(') ch = ')';
        else if (ch == ')') ch = '(';
    }
    stack<char> s;
    string post = "";
    for (char ch : infix) {
        if (isalnum(ch)) post += ch;
        else if (ch == '(') s.push(ch);
        else if (ch == ')') {
            while (s.top() != '(') { post += s.top(); s.pop(); }
            s.pop();
        }
        else {
            while (!s.empty() && s.top() != '(' &&
                   (prec(s.top()) > prec(ch) ||
                   (prec(s.top()) == prec(ch) && ch == '^'))) {
                post += s.top(); s.pop();
            }
            s.push(ch);
        }
    }
    while (!s.empty()) { post += s.top(); s.pop(); }
    reverse(post.begin(), post.end());
    return post;
}
\`\`\``,
          keys: ["reverse(infix", "swap brackets", "ch = ')'", "ch == '^'", "prec(s.top()) > prec(ch)", "reverse(post"]
        }
      ]
    },
    {
      id: "u2-eval",
      title: "2.8 Expression Evaluation",
      cards: [
        {
          id: "u2-eval-post-algo",
          kind: "algo",
          q: "Algorithm: evaluate a postfix expression.",
          a: `1. Create an **empty stack**.
2. Scan the postfix expression from **left to right**:
   - a. If the symbol is an **operand**, push it.
   - b. If the symbol is an **operator**: pop the top element as **op2**, pop the next as **op1**, calculate **op1 operator op2** and push the result.
3. At the end, the **only value left on the stack is the answer**.

**Careful:** the first popped value is the **second operand**. For "8 2 /" we get op2 = 2, op1 = 8, so the result is 8 / 2 = 4 (not 2 / 8).

\`\`\`
Algorithm EvaluatePostfix(postfix)
{
    create empty stack S
    for each symbol ch in postfix (left to right) do
    {
        if (ch is an operand) then push(S, value of ch)
        else
        {
             op2 ← pop(S);   op1 ← pop(S)
             result ← op1 ch op2
             push(S, result)
        }
    }
    return pop(S)
}
\`\`\``,
          keys: ["left to right", "operand push", "op2", "op1", "op1 operator op2", "push result", "one value left"],
          tip: "Postfix: first pop = op2 (second operand)."
        },
        {
          id: "u2-eval-post-trace",
          kind: "trace",
          q: "Trace: evaluate the postfix expression 6 2 3 + - 3 8 2 / + *",
          a: `| Symbol | Action | Stack (bottom → top) |
|---|---|---|
| 6 | operand: push 6 | 6 |
| 2 | operand: push 2 | 6, 2 |
| 3 | operand: push 3 | 6, 2, 3 |
| + | op2 = 3, op1 = 2; push 2 + 3 = 5 | 6, 5 |
| - | op2 = 5, op1 = 6; push 6 - 5 = 1 | 1 |
| 3 | operand: push 3 | 1, 3 |
| 8 | operand: push 8 | 1, 3, 8 |
| 2 | operand: push 2 | 1, 3, 8, 2 |
| / | op2 = 2, op1 = 8; push 8 / 2 = 4 | 1, 3, 4 |
| + | op2 = 4, op1 = 3; push 3 + 4 = 7 | 1, 7 |
| * | op2 = 7, op1 = 1; push 1 * 7 = 7 | 7 |

**Result = 7**`,
          keys: ["2 + 3 = 5", "6 - 5 = 1", "8 / 2 = 4", "3 + 4 = 7", "1 * 7 = 7", "result = 7"]
        },
        {
          id: "u2-eval-post-code",
          kind: "code",
          q: "C++ code: apply() and evaluatePostfix() (single-digit operands).",
          a: `\`\`\`cpp
int apply(int a, int b, char op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        case '^': return (int)pow(a, b);
    }
    return 0;
}

int evaluatePostfix(string post) {
    stack<int> s;
    for (char ch : post) {
        if (ch == ' ') continue;
        if (isdigit(ch)) s.push(ch - '0');             // operand
        else {
            int op2 = s.top(); s.pop();
            int op1 = s.top(); s.pop();
            s.push(apply(op1, op2, ch));
        }
    }
    return s.top();
}
\`\`\``,
          keys: ["apply", "switch", "isdigit", "ch - '0'", "op2 = s.top()", "op1 = s.top()", "apply(op1, op2, ch)"]
        },
        {
          id: "u2-eval-pre-algo",
          kind: "algo",
          q: "Algorithm: evaluate a prefix expression.",
          a: `1. Create an **empty stack**.
2. Scan the prefix expression from **right to left**:
   - a. If the symbol is an **operand**, push it.
   - b. If the symbol is an **operator**: pop the top as **op1**, pop the next as **op2**, calculate **op1 operator op2** and push the result.
3. The value left on the stack is the answer.

(Difference from postfix: scan direction is reversed and the **first popped value is op1**.)`,
          keys: ["right to left", "operand push", "op1", "op2", "op1 operator op2", "stack"],
          tip: "Prefix: scan right to left; first pop = op1."
        },
        {
          id: "u2-eval-pre-trace",
          kind: "trace",
          q: "Trace: evaluate + - * A B C D for A = 2, B = 3, C = 4, D = 5 (previous year paper).",
          a: `The expression is + - * 2 3 4 5; scan from the right end.

| Symbol | Action | Stack (bottom → top) |
|---|---|---|
| 5 | operand: push 5 | 5 |
| 4 | operand: push 4 | 5, 4 |
| 3 | operand: push 3 | 5, 4, 3 |
| 2 | operand: push 2 | 5, 4, 3, 2 |
| * | op1 = 2, op2 = 3; push 2 * 3 = 6 | 5, 4, 6 |
| - | op1 = 6, op2 = 4; push 6 - 4 = 2 | 5, 2 |
| + | op1 = 2, op2 = 5; push 2 + 5 = 7 | 7 |

**Result = 7**

(Class example: * + 2 3 4 = (2 + 3) × 4 = 20.)`,
          keys: ["right end", "2 * 3 = 6", "6 - 4 = 2", "2 + 5 = 7", "result = 7", "20"]
        },
        {
          id: "u2-eval-pre-code",
          kind: "code",
          q: "C++ code: evaluatePrefix().",
          a: `\`\`\`cpp
int evaluatePrefix(string pre) {
    stack<int> s;
    for (int i = pre.length() - 1; i >= 0; i--) {               // right to left
        char ch = pre[i];
        if (ch == ' ') continue;
        if (isdigit(ch)) s.push(ch - '0');
        else {
            int op1 = s.top(); s.pop();
            int op2 = s.top(); s.pop();
            s.push(apply(op1, op2, ch));
        }
    }
    return s.top();
}
\`\`\``,
          keys: ["pre.length() - 1", "i >= 0", "isdigit", "op1 = s.top()", "op2 = s.top()", "apply(op1, op2, ch)"]
        }
      ]
    },
    {
      id: "u2-recursion",
      title: "2.9 Recursion using Stack",
      cards: [
        {
          id: "u2-rec-def",
          kind: "def",
          q: "What is recursion? What does every recursive function need?",
          a: `**Recursion** is a technique in which a **function calls itself** to solve a smaller version of the same problem.

Every recursive function needs a **base case** (where it stops) and a **recursive case** (where it calls itself).`,
          keys: ["function calls itself", "smaller", "base case", "recursive case"]
        },
        {
          id: "u2-rec-stack",
          kind: "concept",
          q: "How does the system use a stack for recursion?",
          a: `Whenever any function is called, the system pushes an **activation record (stack frame)** on the **call stack**. The record holds the function's **parameters**, its **local variables** and the **return address** (where to continue after the call). When the function returns, its record is popped and control goes back to the return address.

In recursion, each call pushes a new record, so the calls pile up until the base case is reached (**winding phase**). Then the records are popped one by one in reverse order and the results are combined (**unwinding phase**). This is **LIFO** behaviour, and that is why a stack is used.`,
          keys: ["activation record", "call stack", "parameters", "local variables", "return address", "winding", "unwinding", "lifo"]
        },
        {
          id: "u2-rec-fact-code",
          kind: "code",
          q: "C++ code: recursive factorial.",
          a: `\`\`\`cpp
int fact(int n) {
    if (n == 0) return 1;                             // base case
    return n * fact(n - 1);                           // recursive case
}
\`\`\``,
          keys: ["n == 0", "return 1", "n * fact(n - 1)", "base case", "recursive case"]
        },
        {
          id: "u2-rec-fact-trace",
          kind: "trace",
          q: "Trace: call stack for fact(3).",
          a: `**Winding (pushes):** fact(3), fact(2), fact(1), fact(0). The stack grows: fact(3) → fact(3), fact(2) → fact(3), fact(2), fact(1) → fact(3), fact(2), fact(1), fact(0) (base case).

**Unwinding (returns, in reverse):**
1. fact(0) returns **1**
2. fact(1) = 1 × 1 = **1**
3. fact(2) = 2 × 1 = **2**
4. fact(3) = 3 × 2 = **6**`,
          keys: ["fact(3)", "fact(0)", "base case", "returns 1", "reverse", "6"]
        },
        {
          id: "u2-rec-overflow",
          kind: "concept",
          q: "What is stack overflow in recursion?",
          a: `If the **base case is missing or never reached**, records keep getting pushed on the call stack until **memory is full**. This error is called **stack overflow**.`,
          keys: ["base case missing", "records pushed", "memory full", "stack overflow"]
        },
        {
          id: "u2-rec-remove",
          kind: "algo",
          q: "How can recursion be removed using an explicit stack? Give the factorial algorithm.",
          a: `Because recursion is nothing but push and pop on the call stack, any recursive algorithm can be rewritten as a **loop with our own stack**: **push the pending work instead of calling, and pop instead of returning**.

\`\`\`
Algorithm FactUsingStack(n)
{
    create empty stack S
    while (n > 0) do            // winding: same as the recursive calls
    {   push(S, n);   n ← n - 1   }
    result ← 1                  // base case
    while (S not empty) do      // unwinding: same as the returns
        result ← result * pop(S)
    return result
}
\`\`\`

\`\`\`cpp
int factUsingStack(int n) {
    stack<int> s;
    while (n > 0) { s.push(n); n--; }
    int result = 1;
    while (!s.empty()) { result *= s.top(); s.pop(); }
    return result;
}
\`\`\``,
          keys: ["explicit stack", "push", "pop", "winding", "unwinding", "result = 1", "result *= s.top()"]
        },
        {
          id: "u2-rec-hanoi",
          kind: "code",
          q: "Tower of Hanoi: problem statement, number of moves and C++ code.",
          a: `Move **n disks from peg A to peg C using peg B**, one disk at a time, never placing a bigger disk on a smaller one. The recursive solution needs **2^n − 1 moves**.

\`\`\`cpp
void hanoi(int n, char from, char to, char aux) {
    if (n == 0) return;
    hanoi(n - 1, from, aux, to);                       // move n-1 disks to aux
    cout << "Move disk " << n << " from " << from << " to " << to << "\\n";
    hanoi(n - 1, aux, to, from);                       // move them onto disk n
}
\`\`\``,
          keys: ["2^n - 1", "from", "to", "aux", "hanoi(n - 1", "n == 0", "bigger disk"]
        },
        {
          id: "u2-rec-vs-iter",
          kind: "compare",
          q: "Compare recursion and iteration.",
          a: `| Point | Recursion | Iteration |
|---|---|---|
| Method | Function calls itself | Loop repeats a block |
| Stops when | Base case is reached | Loop condition becomes false |
| Memory | More: one stack frame per call | Less: no extra frames |
| Speed | Slower (call and return overhead) | Faster |
| Code | Short and close to the mathematical definition | Usually longer |
| Failure | Stack overflow if too deep | Infinite loop |`,
          keys: ["calls itself", "loop", "base case", "stack frame", "slower", "stack overflow", "infinite loop"]
        }
      ]
    },
    {
      id: "u2-queue",
      title: "3.1-3.2 Queue ADT, Linear Queue and Circular Queue",
      cards: [
        {
          id: "u2-queue-def",
          kind: "def",
          q: "What is a queue?",
          a: `**Queue** is a linear data structure in which **insertion is done at one end called the rear** and **deletion is done at the other end called the front**. The element inserted first is removed first: **FIFO (First In, First Out)**.

A queue is a **non-primitive, linear** data structure. Because the first element inserted is the first one deleted, it is also called a **FIFO or LILO (Last In, Last Out)** list. Two pointers mark its ends: **FRONT** tracks the first element and **REAR** tracks the last element; initially both are **−1**.`,
          keys: ["linear", "rear", "front", "fifo", "insertion", "deletion", "-1"],
          tip: "Line at a ticket window: join at the back, served from the front."
        },
        {
          id: "u2-queue-adt",
          kind: "def",
          q: "Define the Queue ADT (data and operations).",
          a: `**Data:** an ordered list of elements with two positions, **front** and **rear**.

**Operations:**
- **enqueue(x)**: insert x at the rear. If the queue is full, this is **overflow**.
- **dequeue()**: remove and return the front element. If the queue is empty, this is **underflow**.
- **peek() / getFront()**: return the front element without removing it.
- **isEmpty()**, **isFull()**: check the state of the queue.`,
          keys: ["enqueue", "dequeue", "front", "rear", "overflow", "underflow", "peek", "isempty"]
        },
        {
          id: "u2-queue-lin-algo",
          kind: "algo",
          q: "Algorithm: Enqueue(x) and Dequeue() for a linear queue using an array.",
          a: `Take an array **queue[MAX]** with **front = -1** and **rear = -1**.

\`\`\`
Algorithm Enqueue(x)                           Algorithm Dequeue()
{                                              {
    if (rear = MAX-1) then                         if (front = -1 or front > rear) then
        write "Queue Overflow"                         write "Queue Underflow"
    else                                           else
    {                                              {
        if (front = -1) then front ← 0                 x ← queue[front]
        rear ← rear + 1                                front ← front + 1
        queue[rear] ← x                                if (front > rear) then
    }                                                      front ← rear ← -1   // empty again
}                                                      return x
                                                   }
                                               }
\`\`\`

Overflow: rear = MAX − 1. Underflow: front = −1 or front > rear.`,
          keys: ["rear = max-1", "overflow", "front = -1", "front > rear", "underflow", "rear + 1", "front + 1"]
        },
        {
          id: "u2-queue-lin-drawback",
          kind: "concept",
          q: "What is the drawback of a linear queue?",
          a: `After some deletions, the cells at the beginning of the array become free, but **rear has already reached MAX − 1**, so the queue reports "overflow" **even though there is empty space**. This **wasted space** is the reason we use a **circular queue**.

Example: MAX = 5, enqueue 10, 20, 30, 40, 50 and dequeue three times: only 40 and 50 remain, front = 3, rear = 4. Three cells are free but enqueue(60) says overflow.`,
          keys: ["rear = max - 1", "overflow", "empty space", "wasted", "circular queue", "front = 3"]
        },
        {
          id: "u2-queue-types",
          kind: "list",
          q: "What are the types of queues?",
          a: `1. **Simple (linear) queue**: follows FIFO; insertion at rear, deletion at front.
2. **Circular queue**: the last position is connected to the first, forming a circle (also called a **ring buffer**).
3. **Priority queue**: every element has a priority; the highest priority element is removed first.
4. **Deque (double-ended queue)**: insertion and deletion are possible at both ends.`,
          keys: ["simple", "circular", "ring buffer", "priority", "deque", "both ends"]
        },
        {
          id: "u2-queue-impl",
          kind: "concept",
          q: "Ways to implement a queue: array vs linked list.",
          a: `A queue can be implemented using a **1-D array** or a **linked list**.

- **Array:** all operations are **O(1)** and the code is easy, but the **maximum size must be fixed beforehand** and cannot change at run time.
- **Linked list:** each node has a data part and a link part; a **front pointer** holds the address of the first node and a **rear pointer** the address of the last node; the queue can **grow as needed**.`,
          keys: ["1-d array", "linked list", "o(1)", "fixed size", "front pointer", "rear pointer", "grow"]
        },
        {
          id: "u2-cq-def",
          kind: "def",
          q: "What is a circular queue? Give the wrap-around formulas and the empty/full conditions.",
          a: `**Circular queue** is a queue in which the **last position of the array is treated as connected to the first position**, so the array behaves like a **ring**. When rear (or front) reaches the end, it **wraps around to index 0** if that cell is free.

The wrap-around is done with the **modulo operator**:

**rear = (rear + 1) % MAX** and **front = (front + 1) % MAX**

- Initially: **front = rear = -1**
- Empty condition: **front == -1**
- Full condition: **(rear + 1) % MAX == front**`,
          keys: ["ring", "wrap around", "modulo", "(rear + 1) % max", "front == -1", "full", "last connected to first"]
        },
        {
          id: "u2-cq-algo",
          kind: "algo",
          q: "Algorithm: ENQUEUE(x) and DEQUEUE() of a circular queue.",
          a: `**ENQUEUE(x)**
1. If **(rear + 1) % MAX = front**, print "Queue Overflow" and stop.
2. If **front = −1** (first element), set **front = 0**.
3. Set **rear = (rear + 1) % MAX**.
4. Set **queue[rear] = x**.

**DEQUEUE()**
1. If **front = −1**, print "Queue Underflow" and stop.
2. Set **x = queue[front]**.
3. If **front = rear** (only one element was left), set **front = rear = −1**.
4. Otherwise set **front = (front + 1) % MAX**. Return x.

\`\`\`
Algorithm CQ_Enqueue(x)                       Algorithm CQ_Dequeue()
{                                             {
    if ((rear + 1) mod MAX = front) then          if (front = -1) then
        write "Queue Overflow"                        write "Queue Underflow"
    else                                          else
    {                                             {
        if (front = -1) then front ← 0                x ← queue[front]
        rear ← (rear + 1) mod MAX                     if (front = rear) then
        queue[rear] ← x                                   front ← rear ← -1
    }                                                 else
}                                                         front ← (front + 1) mod MAX
                                                      return x
                                                  }
                                              }
\`\`\``,
          keys: ["(rear + 1) % max = front", "overflow", "front = 0", "rear = (rear + 1) % max", "front = -1", "underflow", "front = rear"]
        },
        {
          id: "u2-cq-flow",
          kind: "trace",
          q: "Flowcharts of circular queue enqueue and dequeue: describe the decisions.",
          a: `**enqueue(x)**
1. **(rear + 1) % MAX == front ?** Yes: print "Queue Overflow", Return.
2. No: **front == -1 ?** Yes: front = 0.
3. rear = (rear + 1) % MAX; queue[rear] = x; Return.

**dequeue()**
1. **front == -1 ?** Yes: print "Queue Underflow", Return.
2. No: x = queue[front].
3. **front == rear ?** Yes: front = rear = -1. No: front = (front + 1) % MAX.
4. Return x.`,
          keys: ["(rear + 1) % max == front", "front == -1", "front = 0", "x = queue[front]", "front == rear", "return x"]
        },
        {
          id: "u2-cq-trace",
          kind: "trace",
          q: "Trace: circular queue with MAX = 5 (enqueue 10..50, enqueue 60, two dequeues, enqueue 60, 70, then dequeues).",
          a: `| Operation | front | rear | Array [0..4] | Remark |
|---|---|---|---|---|
| enqueue(10) | 0 | 0 | 10 _ _ _ _ | rear = 0 |
| enqueue(20) | 0 | 1 | 10 20 _ _ _ | rear = 1 |
| enqueue(30) | 0 | 2 | 10 20 30 _ _ | rear = 2 |
| enqueue(40) | 0 | 3 | 10 20 30 40 _ | rear = 3 |
| enqueue(50) | 0 | 4 | 10 20 30 40 50 | rear = 4 |
| enqueue(60) | 0 | 4 | 10 20 30 40 50 | Overflow: (rear + 1) % 5 = front |
| dequeue() | 1 | 4 | _ 20 30 40 50 | returns 10; front = 1 |
| dequeue() | 2 | 4 | _ _ 30 40 50 | returns 20; front = 2 |
| enqueue(60) | 2 | 0 | 60 _ 30 40 50 | rear = 0 (wrapped around) |
| enqueue(70) | 2 | 1 | 60 70 30 40 50 | rear = 1 (wrapped around) |
| dequeue() | 3 | 1 | 60 70 _ 40 50 | returns 30; front = 3 |
| dequeue() | 4 | 1 | 60 70 _ _ 50 | returns 40; front = 4 |
| dequeue() | 0 | 1 | 60 70 _ _ _ | returns 50; front = 0 (wrapped around) |
| dequeue() | 1 | 1 | _ 70 _ _ _ | returns 60; front = 1 |

Notice how 60 and 70 **reuse cells 0 and 1**.`,
          keys: ["overflow", "wrapped around", "rear = 0", "front = 0", "returns 50", "reuse cells"]
        },
        {
          id: "u2-cq-code",
          kind: "code",
          q: "C++ code: circular queue (class CircularQueue).",
          a: `\`\`\`cpp
#define MAX 5
class CircularQueue {
    int q[MAX];
    int front, rear;
public:
    CircularQueue() { front = rear = -1; }
    bool isEmpty() { return front == -1; }
    bool isFull() { return (rear + 1) % MAX == front; }
    void enqueue(int x) {
        if (isFull()) { cout << "Queue Overflow\\n"; return; }
        if (front == -1) front = 0;
        rear = (rear + 1) % MAX;
        q[rear] = x;
    }
    int dequeue() {
        if (isEmpty()) { cout << "Queue Underflow\\n"; return -1; }
        int x = q[front];
        if (front == rear) front = rear = -1;      // queue became empty
        else front = (front + 1) % MAX;
        return x;
    }
    void display() {
        if (isEmpty()) { cout << "Queue is empty\\n"; return; }
        int i = front;
        while (true) {
            cout << q[i] << " ";
            if (i == rear) break;
            i = (i + 1) % MAX;
        }
        cout << "\\n";
    }
};
\`\`\``,
          keys: ["front = rear = -1", "(rear + 1) % max == front", "front == -1", "rear = (rear + 1) % max", "front == rear", "i == rear"]
        },
        {
          id: "u2-cq-vs-lq",
          kind: "compare",
          q: "Compare linear queue and circular queue.",
          a: `| Point | Linear queue | Circular queue |
|---|---|---|
| Arrangement | Straight line | Ring; last cell connects to the first |
| Memory use | Freed cells at the front are wasted | Freed cells are reused |
| Full condition | rear = MAX − 1 | (rear + 1) % MAX = front |
| Next position | rear + 1 | (rear + 1) % MAX |`,
          keys: ["straight line", "ring", "wasted", "reused", "rear = max - 1", "(rear + 1) % max"]
        },
        {
          id: "u2-queue-ll",
          kind: "code",
          q: "Queue using a linked list: idea and C++ code.",
          a: `Keep two pointers: **front** (first node) and **rear** (last node). **Enqueue = insert at the end using rear**; **dequeue = delete from the beginning using front**. Both are **O(1)** and there is **no fixed size**.

\`\`\`cpp
struct Node { int data; Node* next; };
Node *front = NULL, *rear = NULL;

void enqueue(int x) {
    Node* n = new Node;
    n->data = x; n->next = NULL;
    if (rear == NULL) front = rear = n;                          // first element
    else { rear->next = n; rear = n; }
}

int dequeue() {
    if (front == NULL) { cout << "Queue Underflow\\n"; return -1; }
    Node* temp = front;
    int x = temp->data;
    front = front->next;
    if (front == NULL) rear = NULL;           // queue became empty
    delete temp;
    return x;
}

void printQueue() {
    for (Node* temp = front; temp != NULL; temp = temp->next) cout << temp->data << " ";
    cout << "\\n";
}
\`\`\``,
          keys: ["front", "rear", "rear->next = n", "rear = n", "front = front->next", "rear = null", "o(1)"]
        }
      ]
    },
    {
      id: "u2-pq",
      title: "3.3 Priority Queue",
      cards: [
        {
          id: "u2-pq-def",
          kind: "def",
          q: "What is a priority queue?",
          a: `**Priority queue** is a queue in which **every element has a priority**. The element with the **highest priority is removed first**. If two elements have the **same priority**, they are served in the order in which they arrived (**FIFO**).

Example: in a hospital, an emergency patient is treated before others even if he came later.`,
          keys: ["priority", "highest priority", "removed first", "same priority", "fifo", "arrived"]
        },
        {
          id: "u2-pq-types",
          kind: "list",
          q: "Types of priority queue: ascending and descending.",
          a: `- **Ascending priority queue (min-priority):** the **smallest value** has the highest priority and is removed first.
- **Descending priority queue (max-priority):** the **largest value** has the highest priority and is removed first.`,
          keys: ["ascending", "min-priority", "smallest", "descending", "max-priority", "largest"]
        },
        {
          id: "u2-pq-impl",
          kind: "compare",
          q: "Ways to implement a priority queue with their complexities.",
          a: `| Implementation | Insert | Delete highest | Idea |
|---|---|---|---|
| Unordered array / list | O(1) | O(n) | Insert anywhere; search for the highest priority at deletion |
| Ordered array / list | O(n) | O(1) | Keep elements sorted by priority; delete from the front |
| Heap (Unit III) | O(log n) | O(log n) | Best overall; used in practice |`,
          keys: ["unordered", "ordered", "heap", "o(1)", "o(n)", "o(log n)"]
        },
        {
          id: "u2-pq-algo",
          kind: "algo",
          q: "Algorithm: priority queue using an ordered linked list (INSERT(x, p) and DELETE()).",
          a: `Each node stores **data, priority and next**. The list is kept **sorted** so that the highest priority node (here: **smallest priority number**) is always first.

**INSERT(x, p)**
1. Create newNode with data x and priority p.
2. If the list is empty or **p is smaller than the priority of the first node**, insert newNode at the beginning.
3. Otherwise move temp forward while the next node exists and its **priority is ≤ p**. Insert newNode after temp.

**DELETE()**
1. If the list is empty, print "Underflow". Otherwise **remove and return the first node** (it has the highest priority).

\`\`\`
Algorithm PQ_Insert(x, p)
{
    newNode ← new Node; newNode->data ← x; newNode->priority ← p
    if (front = NULL or p < front->priority) then
    {   newNode->next ← front;    front ← newNode   }
    else
    {
         temp ← front
         while (temp->next ≠ NULL and temp->next->priority ≤ p) do
             temp ← temp->next
         newNode->next ← temp->next
         temp->next ← newNode
    }
}
\`\`\`

Time: insert O(n), delete O(1). The "≤" keeps equal priorities in FIFO order.`,
          keys: ["data", "priority", "sorted", "smallest priority number", "p < front->priority", "priority <= p", "remove first node"]
        },
        {
          id: "u2-pq-trace",
          kind: "trace",
          q: "Trace: insert (A,3), (B,1), (C,2), (D,1) into a priority queue (smaller number = higher priority). What is the deletion order?",
          a: `| Operation | List from front (data(priority)) |
|---|---|
| insert(A, 3) | A(3) |
| insert(B, 1) | B(1) → A(3) |
| insert(C, 2) | B(1) → C(2) → A(3) |
| insert(D, 1) | B(1) → D(1) → C(2) → A(3) |

Deletions then give **B, D, C, A**. B comes before D because both have priority 1 and **B arrived first**.`,
          keys: ["b(1)", "d(1)", "c(2)", "a(3)", "b, d, c, a", "arrived first"]
        },
        {
          id: "u2-pq-code",
          kind: "code",
          q: "C++ code: priority queue using an ordered linked list.",
          a: `\`\`\`cpp
struct Node { char data; int priority; Node* next; };
Node* front = NULL;

void insert(char x, int p) {                 // smaller p = higher priority
    Node* n = new Node;
    n->data = x; n->priority = p;
    if (front == NULL || p < front->priority) {
        n->next = front;
        front = n;
    } else {
        Node* temp = front;
        while (temp->next != NULL && temp->next->priority <= p)
             temp = temp->next;
        n->next = temp->next;
        temp->next = n;
    }
}

char deleteHighest() {
    if (front == NULL) { cout << "Underflow\\n"; return '\\0'; }
    Node* temp = front;
    char x = temp->data;
    front = front->next;
    delete temp;
    return x;
}
\`\`\``,
          keys: ["priority", "p < front->priority", "temp->next->priority <= p", "n->next = temp->next", "front = front->next", "underflow"]
        },
        {
          id: "u2-pq-apps",
          kind: "list",
          q: "Applications of a priority queue.",
          a: `- **CPU scheduling** by priority
- **Dijkstra's** shortest path and **Prim's** MST algorithms
- **Huffman coding**
- Handling **interrupts**
- **Event-driven simulation**`,
          keys: ["cpu scheduling", "dijkstra", "prim", "huffman", "interrupts", "simulation"]
        }
      ]
    },
    {
      id: "u2-deque",
      title: "3.4-3.5 Deque and Applications of Queues",
      cards: [
        {
          id: "u2-dq-def",
          kind: "def",
          q: "What is a deque (double-ended queue)? List its operations.",
          a: `**Deque** (pronounced "deck") is a linear data structure in which **insertion and deletion can be done at both ends, front and rear**.

**Operations:** insertFront(x), insertRear(x), deleteFront(), deleteRear(), getFront(), getRear(), isEmpty(), isFull().`,
          keys: ["both ends", "front", "rear", "insertfront", "insertrear", "deletefront", "deleterear"]
        },
        {
          id: "u2-dq-types",
          kind: "list",
          q: "Types of deque. How is a deque a generalisation of stack and queue?",
          a: `- **Input-restricted deque:** insertion is allowed at **only one end (rear)**, deletion at both ends.
- **Output-restricted deque:** deletion is allowed at **only one end (front)**, insertion at both ends.

A deque can work as a **stack** (use one end only) and as a **queue** (insert at rear, delete at front), so it is a **generalisation of both**.`,
          keys: ["input-restricted", "output-restricted", "one end", "stack", "queue", "generalisation"]
        },
        {
          id: "u2-dq-ops",
          kind: "compare",
          q: "Deque using a circular array: steps of insertRear, insertFront, deleteFront, deleteRear.",
          a: `Use **dq[MAX]** with **front = rear = -1**. Moving forward is **(i + 1) % MAX** and moving backward is **(i − 1 + MAX) % MAX**.

| Operation | Steps |
|---|---|
| insertRear(x) | If full: overflow. If empty: front = rear = 0. Else rear = (rear + 1) % MAX. Store dq[rear] = x. |
| insertFront(x) | If full: overflow. If empty: front = rear = 0. Else front = (front − 1 + MAX) % MAX. Store dq[front] = x. |
| deleteFront() | If empty: underflow. Take x = dq[front]. If front = rear: front = rear = −1. Else front = (front + 1) % MAX. |
| deleteRear() | If empty: underflow. Take x = dq[rear]. If front = rear: front = rear = −1. Else rear = (rear − 1 + MAX) % MAX. |`,
          keys: ["front = rear = 0", "(rear + 1) % max", "(front - 1 + max) % max", "(front + 1) % max", "(rear - 1 + max) % max", "overflow", "underflow"]
        },
        {
          id: "u2-dq-pseudo",
          kind: "algo",
          q: "Pseudocode: InsertFront(x) and DeleteRear() of a deque.",
          a: `\`\`\`
Algorithm InsertFront(x)
{
    if ((rear + 1) mod MAX = front) then write "Deque Overflow"
    else
    {
         if (front = -1) then front ← rear ← 0
         else front ← (front - 1 + MAX) mod MAX
         dq[front] ← x
    }
}

Algorithm DeleteRear()
{
    if (front = -1) then write "Deque Underflow"
    else
    {
         x ← dq[rear]
         if (front = rear) then front ← rear ← -1
         else rear ← (rear - 1 + MAX) mod MAX
         return x
    }
}
\`\`\``,
          keys: ["(rear + 1) mod max = front", "front = -1", "front - 1 + max", "dq[front] = x", "x = dq[rear]", "rear - 1 + max"]
        },
        {
          id: "u2-dq-trace",
          kind: "trace",
          q: "Trace: deque with MAX = 5 (insertRear 10, 20; insertFront 5, 3; deleteRear; deleteFront; insertRear 40).",
          a: `| Operation | front | rear | Array [0..4] | Remark |
|---|---|---|---|---|
| insertRear(10) | 0 | 0 | 10 _ _ _ _ | rear = 0 |
| insertRear(20) | 0 | 1 | 10 20 _ _ _ | rear = 1 |
| insertFront(5) | 4 | 1 | 10 20 _ _ 5 | front = (front − 1 + 5) % 5 = 4 |
| insertFront(3) | 3 | 1 | 10 20 _ 3 5 | front = (front − 1 + 5) % 5 = 3 |
| deleteRear() | 3 | 0 | 10 _ _ 3 5 | returns 20; rear = 0 |
| deleteFront() | 4 | 0 | 10 _ _ _ 5 | returns 3; front = 4 |
| insertRear(40) | 4 | 1 | 10 40 _ _ 5 | rear = 1 |`,
          keys: ["front = 4", "front = 3", "(front - 1 + 5) % 5", "returns 20", "returns 3", "rear = 1"]
        },
        {
          id: "u2-dq-code",
          kind: "code",
          q: "C++ code: deque using a circular array.",
          a: `\`\`\`cpp
#define MAX 5
class Deque {
    int dq[MAX];
    int front, rear;
public:
    Deque() { front = rear = -1; }
    bool isEmpty() { return front == -1; }
    bool isFull() { return (rear + 1) % MAX == front; }
    void insertRear(int x) {
        if (isFull()) { cout << "Deque Overflow\\n"; return; }
        if (isEmpty()) front = rear = 0;
        else rear = (rear + 1) % MAX;
        dq[rear] = x;
    }
    void insertFront(int x) {
        if (isFull()) { cout << "Deque Overflow\\n"; return; }
        if (isEmpty()) front = rear = 0;
        else front = (front - 1 + MAX) % MAX;
        dq[front] = x;
    }
    int deleteFront() {
        if (isEmpty()) { cout << "Deque Underflow\\n"; return -1; }
        int x = dq[front];
        if (front == rear) front = rear = -1;
        else front = (front + 1) % MAX;
        return x;
    }
    int deleteRear() {
        if (isEmpty()) { cout << "Deque Underflow\\n"; return -1; }
        int x = dq[rear];
        if (front == rear) front = rear = -1;
        else rear = (rear - 1 + MAX) % MAX;
        return x;
    }
};
\`\`\``,
          keys: ["insertrear", "insertfront", "deletefront", "deleterear", "(front - 1 + max) % max", "(rear - 1 + max) % max", "front == rear"]
        },
        {
          id: "u2-dq-apps",
          kind: "list",
          q: "Applications of a deque.",
          a: `- **Undo/redo** with a limited history
- Checking **palindromes**
- **Sliding-window** problems
- **Job-stealing** schedulers
- Storing **browser history**`,
          keys: ["undo", "palindromes", "sliding-window", "job-stealing", "browser history"]
        },
        {
          id: "u2-queue-apps",
          kind: "list",
          q: "List the applications of queues.",
          a: `- **Multi-programming:** the programs waiting in main memory are organised as queues.
- **Networks:** routers and switches keep the waiting packets in queues.
- **Job scheduling:** jobs are given to the processor one by one from a queue, e.g. CPU scheduling and disk scheduling.
- **Interrupts:** handling of interrupts in real-time systems in the order of arrival.
- **Shared resources:** a queue is the waiting list for a single shared resource such as a printer (**print spooling**).
- **Buffers** between a fast sender and a slow receiver, **breadth-first search** of a graph, call centre and ticket-booking systems.`,
          keys: ["multi-programming", "networks", "job scheduling", "interrupts", "printer", "buffers", "bfs"]
        },
        {
          id: "u2-stack-vs-queue",
          kind: "compare",
          q: "Compare stack and queue.",
          a: `| Point | Stack | Queue |
|---|---|---|
| Order | LIFO | FIFO |
| Ends used | One end (top) for both insert and delete | Two ends: insert at rear, delete at front |
| Operations | push, pop | enqueue, dequeue |
| Pointers | One (top) | Two (front, rear) |
| Example | Pile of plates | Line at a ticket counter |
| Used in | Recursion, expression conversion, DFS | Scheduling, buffering, BFS |`,
          keys: ["lifo", "fifo", "one end", "two ends", "push pop", "enqueue dequeue", "dfs", "bfs"]
        }
      ]
    },
    {
      id: "u2-revision",
      title: "4. Quick Revision",
      cards: [
        {
          id: "u2-rev-table",
          kind: "compare",
          q: "Quick revision table: SLL, DLL, CLL, stack, circular queue, priority queue, deque.",
          a: `| Structure | Key idea | Insert | Delete | Empty / full test |
|---|---|---|---|---|
| SLL | node = data + next | O(1) at head, O(n) at end | O(1) at head, O(n) at end | head = NULL |
| DLL | node = prev + data + next | 4 links change in the middle | O(1) if node address known | head = NULL |
| CLL | last->next = first | O(1) at both ends with tail | O(1) at beginning | tail = NULL |
| Stack (array) | LIFO, one end (top) | push: top++, O(1) | pop: top--, O(1) | top = −1 / top = MAX − 1 |
| Circular queue | FIFO, ring using % | rear = (rear+1) % MAX | front = (front+1) % MAX | front = −1 / (rear+1) % MAX = front |
| Priority queue | highest priority leaves first | O(n) ordered list | O(1) ordered list | front = NULL |
| Deque | insert and delete at both ends | O(1) at either end | O(1) at either end | same as circular queue |`,
          keys: ["head = null", "tail = null", "top = -1", "top = max - 1", "front = -1", "(rear+1) % max", "o(1)"]
        },
        {
          id: "u2-rev-expr",
          kind: "list",
          q: "Quick revision: conversion and evaluation of expressions, and recursion.",
          a: `- **Infix to postfix:** operand → output; ( → push; ) → pop till (; operator → pop higher-or-equal precedence, then push; at the end pop all.
- **Infix to prefix:** reverse and swap brackets → modified postfix → reverse.
- **Postfix evaluation:** scan left to right; operand → push; operator → op2 = pop, op1 = pop, push (op1 operator op2).
- **Prefix evaluation:** scan right to left; operator → op1 = pop, op2 = pop, push (op1 operator op2).
- **Recursion:** each call pushes an activation record (parameters, locals, return address); returns pop them in LIFO order.`,
          keys: ["operand output", "pop till (", "reverse swap brackets", "left to right", "right to left", "op2 = pop", "activation record"]
        }
      ]
    },
    {
      id: "u2-pyq",
      title: "Question bank (PYQs)",
      cards: [
        {
          id: "u2-pyq-q1",
          kind: "pyq",
          q: "Q1. [5] Write code (or pseudocode) for creating a singly linked list, inserting a node and displaying the list. Mention the time complexity of the operations. (End-sem Oct 2022, Q2(b))",
          a: `**Definition:** Linked list is a linear data structure made of nodes; each node stores data and the address of the next node. In a singly linked list each node has one link (next); the last node's next is NULL and **head** points to the first node.

**Node and creation**
\`\`\`cpp
struct Node {
    int   data;
    Node* next;
};
Node* head = NULL;                   // empty list
\`\`\`

**Insert (beginning)**
1. Create newNode and store x in data.
2. newNode->next = head.
3. head = newNode.

\`\`\`cpp
void insertBegin(int x) {
    Node* newNode = new Node;
    newNode->data = x;
    newNode->next = head;
    head = newNode;
}
\`\`\`

**Insert (end)**
\`\`\`cpp
void insertEnd(int x) {
    Node* newNode = new Node;
    newNode->data = x;
    newNode->next = NULL;
    if (head == NULL) { head = newNode; return; }
    Node* temp = head;
    while (temp->next != NULL) temp = temp->next;
    temp->next = newNode;
}
\`\`\`

**Display**
\`\`\`cpp
void display() {
    for (Node* temp = head; temp != NULL; temp = temp->next)
        cout << temp->data << " -> ";
    cout << "NULL\\n";
}
\`\`\`

**Time complexity**
- Insert / delete at beginning: **O(1)** (only head changes).
- Insert at end: **O(n)** (walk to last node; O(1) with a tail pointer).
- Insert at a position: **O(n)**.
- Display / search: **O(n)** (visits nodes one by one).

**Example:** insert 20 then insert 10 at beginning gives head → 10 → 20 → NULL.`,
          keys: ["struct node", "head", "newnode->next = head", "temp->next != null", "display", "o(1)", "o(n)"]
        },
        {
          id: "u2-pyq-q2",
          kind: "pyq",
          q: "Q2. [5] Write code (or pseudocode) for creating a doubly linked list, inserting a node and displaying the list. Mention the time complexity of the operations. (End-sem Oct 2021, Q1(b))",
          a: `**Definition:** Doubly linked list is a linked list in which every node has two links: **prev** points to the previous node and **next** points to the next node. The prev of the first node and the next of the last node are NULL.

**Node and creation**
\`\`\`cpp
struct Node {
    int   data;
    Node* prev;
    Node* next;
};
Node* head = NULL;
\`\`\`

**Insert at the beginning**
1. Create newNode; newNode->prev = NULL; newNode->next = head.
2. If head ≠ NULL, head->prev = newNode.
3. head = newNode.

\`\`\`cpp
void insertBegin(int x) {
    Node* n = new Node;
    n->data = x; n->prev = NULL; n->next = head;
    if (head != NULL) head->prev = n;
    head = n;
}

void insertEnd(int x) {
    Node* n = new Node;
    n->data = x; n->next = NULL;
    if (head == NULL) { n->prev = NULL; head = n; return; }
    Node* temp = head;
    while (temp->next != NULL) temp = temp->next;
    temp->next = n;
    n->prev = temp;
}
\`\`\`

**Insert after a node p (four links, in order):** newNode->prev = p; newNode->next = p->next; if (p->next ≠ NULL) p->next->prev = newNode; p->next = newNode.

**Display**
\`\`\`cpp
void displayForward() {
    for (Node* t = head; t != NULL; t = t->next) cout << t->data << " ";
    cout << "\\n";
}
\`\`\`
Backward display: go to the last node, then follow prev links.

**Time complexity**
- Insert at beginning: **O(1)**.
- Insert at end: **O(n)** (O(1) with a tail pointer).
- Insert after a known node p: **O(1)**.
- Display (forward or backward): **O(n)**.

**Note:** a DLL needs one extra pointer per node, but a node can be deleted in O(1) when its address is known.`,
          keys: ["prev", "next", "newnode->prev", "head->prev = n", "p->next->prev", "displayforward", "o(1)", "o(n)"]
        },
        {
          id: "u2-pyq-q3",
          kind: "pyq",
          q: "Q3. [5] Define stack as an ADT. Write pseudocode for the push and pop operations and state the overflow and underflow conditions. (End-sem May 2022, Q1(a))",
          a: `**Stack as an ADT**
Stack is a linear data structure in which insertion and deletion are done at only one end, called the **top** (**LIFO**: Last In, First Out).
- **Data:** an ordered list of elements and a variable top showing the position of the topmost element.
- **Operations:** push(x) (insert on top; overflow if full), pop() (remove and return top; underflow if empty), peek() / top(), isEmpty(), isFull(), size(), display().
- The ADT defines the operations without the implementation details.

**Array implementation:** stack[MAX], top = −1 initially.

**Pseudocode**
\`\`\`
Algorithm Push(x)                          Algorithm Pop()
{                                          {
    if (top = MAX-1) then                      if (top = -1) then
        write "Stack Overflow"                     write "Stack Underflow"
    else                                       else
    {                                          {
        top ← top + 1                              x ← stack[top]
        stack[top] ← x                             top ← top - 1
    }                                              return x
}                                              }
                                           }
\`\`\`

**Conditions**
- **Overflow** (stack full): **top == MAX − 1**; push is not possible.
- **Underflow** (stack empty): **top == −1**; pop is not possible.

Both push and pop take **O(1)** time.`,
          keys: ["lifo", "top", "adt", "push", "pop", "top == max - 1", "top == -1", "overflow", "underflow"]
        },
        {
          id: "u2-pyq-q4",
          kind: "pyq",
          q: "Q4. [5] Convert the following infix expressions to postfix using a stack, showing the stack contents: (i) A+B*C^D-E/F (ii) ((A+B)*C-(D-E))^(F+G). (End-sem Oct 2021, Q2(a))",
          a: `**Rules:** operand → output; ( → push; ) → pop till ( ; operator → pop while top has higher or equal precedence (for ^ only higher), then push; at the end pop all. Precedence: ^ (3) > * / (2) > + − (1).

**(i) A+B*C^D-E/F**

| Symbol | Action | Stack | Postfix |
|---|---|---|---|
| A | output | empty | A |
| + | push | + | A |
| B | output | + | AB |
| * | push | +* | AB |
| C | output | +* | ABC |
| ^ | push | +*^ | ABC |
| D | output | +*^ | ABCD |
| - | pop ^ * + ; push - | - | ABCD^*+ |
| E | output | - | ABCD^*+E |
| / | push | -/ | ABCD^*+E |
| F | output | -/ | ABCD^*+EF |
| end | pop all: / - | empty | ABCD^*+EF/- |

**Answer (i): ABCD^*+EF/-**

**(ii) ((A+B)*C-(D-E))^(F+G)**

| Symbol | Action | Stack | Postfix |
|---|---|---|---|
| ( | push | ( | |
| ( | push | (( | |
| A | output | (( | A |
| + | push | ((+ | A |
| B | output | ((+ | AB |
| ) | pop till ( | ( | AB+ |
| * | push | (* | AB+ |
| C | output | (* | AB+C |
| - | pop *; push - | (- | AB+C* |
| ( | push | (-( | AB+C* |
| D | output | (-( | AB+C*D |
| - | push | (-(- | AB+C*D |
| E | output | (-(- | AB+C*DE |
| ) | pop till ( | (- | AB+C*DE- |
| ) | pop till ( | empty | AB+C*DE-- |
| ^ | push | ^ | AB+C*DE-- |
| ( | push | ^( | AB+C*DE-- |
| F | output | ^( | AB+C*DE--F |
| + | push | ^(+ | AB+C*DE--F |
| G | output | ^(+ | AB+C*DE--FG |
| ) | pop till ( | ^ | AB+C*DE--FG+ |
| end | pop all: ^ | empty | AB+C*DE--FG+^ |

**Answer (ii): AB+C*DE--FG+^**`,
          keys: ["abcd^*+ef/-", "ab+c*de--fg+^", "operand output", "push (", "pop till (", "precedence", "pop all"]
        },
        {
          id: "u2-pyq-q5",
          kind: "pyq",
          q: "Q5. [5] Clearly indicate the contents of the stack during the conversion of the infix expression A^B*C-D+E/F/(G+H) to prefix. (End-sem May 2024, Q1(b); similar in Oct 2022, Q1(a))",
          a: `**Method:** (1) reverse the infix and swap brackets; (2) convert to postfix using the stack with the modified rule (an incoming operator pops only if the top has strictly greater precedence; for ^ pop when greater or equal); (3) reverse the result.

**Step 1:** reversed with brackets swapped = **(H+G)/F/E+D-C*B^A**

| Symbol | Action | Stack (bottom → top) | Output so far |
|---|---|---|---|
| ( | push ( | ( | |
| H | output | ( | H |
| + | push + | (+ | H |
| G | output | (+ | HG |
| ) | pop until ( | empty | HG+ |
| / | push / | / | HG+ |
| F | output | / | HG+F |
| / | push / | // | HG+F |
| E | output | // | HG+FE |
| + | pop / / ; push + | + | HG+FE// |
| D | output | + | HG+FE//D |
| - | push - | +- | HG+FE//D |
| C | output | +- | HG+FE//DC |
| * | push * | +-* | HG+FE//DC |
| B | output | +-* | HG+FE//DCB |
| ^ | push ^ | +-*^ | HG+FE//DCB |
| A | output | +-*^ | HG+FE//DCBA |
| end | pop all: ^ * - + | empty | HG+FE//DCBA^*-+ |

**Step 2 result:** HG+FE//DCBA^*-+

**Step 3:** reverse it.

**Prefix = +-*^ABCD//EF+GH**`,
          keys: ["reverse", "swap brackets", "(h+g)/f/e+d-c*b^a", "hg+fe//dcba^*-+", "+-*^abcd//ef+gh", "strictly greater"]
        },
        {
          id: "u2-pyq-q6",
          kind: "pyq",
          q: "Q6. [5] If A, B, C and D are 2, 3, 4 and 5, calculate the value of the prefix expressions (i) + - * A B C D (ii) - * A + B C D, showing the contents of the stack. (End-sem May 2024, Q2(a))",
          a: `**Method (prefix evaluation):** scan from **right to left**; operand → push; operator → pop **op1** (first), pop **op2** (second), push (op1 operator op2).

**(i) + - * A B C D = + - * 2 3 4 5**

| Symbol | Action | Stack (bottom → top) |
|---|---|---|
| 5 | push | 5 |
| 4 | push | 5, 4 |
| 3 | push | 5, 4, 3 |
| 2 | push | 5, 4, 3, 2 |
| * | op1 = 2, op2 = 3; 2 * 3 = 6 | 5, 4, 6 |
| - | op1 = 6, op2 = 4; 6 - 4 = 2 | 5, 2 |
| + | op1 = 2, op2 = 5; 2 + 5 = 7 | 7 |

**Answer (i) = 7**

**(ii) - * A + B C D = - * 2 + 3 4 5**

| Symbol | Action | Stack (bottom → top) |
|---|---|---|
| 5 | push | 5 |
| 4 | push | 5, 4 |
| 3 | push | 5, 4, 3 |
| + | op1 = 3, op2 = 4; 3 + 4 = 7 | 5, 7 |
| 2 | push | 5, 7, 2 |
| * | op1 = 2, op2 = 7; 2 * 7 = 14 | 5, 14 |
| - | op1 = 14, op2 = 5; 14 - 5 = 9 | 9 |

**Answer (ii) = 9**`,
          keys: ["right to left", "op1", "op2", "7", "9", "push", "stack"]
        },
        {
          id: "u2-pyq-q7",
          kind: "pyq",
          q: "Q7. [5] Discuss the merits of a circular queue over a linear queue and write pseudocode for the overflow and underflow conditions of a circular queue. (End-sem May 2022, Q1(b))",
          a: `**Linear queue drawback:** after some deletions, cells at the beginning of the array become free, but rear has already reached MAX − 1, so the queue reports "overflow" even though there is empty space. Example: MAX = 5, after enqueuing 10..50 and dequeuing three times, front = 3, rear = 4; three cells are free but enqueue(60) says overflow.

**Circular queue:** the last position is treated as connected to the first (a ring); rear and front wrap around using modulo: rear = (rear + 1) % MAX, front = (front + 1) % MAX.

**Merits of circular queue over linear queue**
- **Freed cells are reused** (no wasted memory); the linear queue wastes freed cells at the front.
- Full condition is (rear + 1) % MAX = front, so overflow occurs only when **all cells are really occupied**.
- Next position is (rear + 1) % MAX, so rear and front wrap around to index 0.
- Enqueue and dequeue are still **O(1)**.

**Pseudocode for the conditions**
\`\`\`
Algorithm CQ_Enqueue(x)
{
    if ((rear + 1) mod MAX = front) then          // OVERFLOW condition
        write "Queue Overflow"
    else
    {
        if (front = -1) then front ← 0
        rear ← (rear + 1) mod MAX
        queue[rear] ← x
    }
}

Algorithm CQ_Dequeue()
{
    if (front = -1) then                          // UNDERFLOW condition
        write "Queue Underflow"
    else
    {
        x ← queue[front]
        if (front = rear) then front ← rear ← -1
        else front ← (front + 1) mod MAX
        return x
    }
}
\`\`\`

- **Overflow:** (rear + 1) % MAX == front.
- **Underflow:** front == −1.`,
          keys: ["wasted space", "reused", "ring", "modulo", "(rear + 1) % max == front", "front == -1", "overflow", "underflow"]
        },
        {
          id: "u2-pyq-q8",
          kind: "pyq",
          q: "Q8. [5] Write pseudocode for a queue implemented using an array with the operations: (i) queue full (ii) queue empty (iii) enqueue (iv) dequeue. (End-sem Oct 2021, Q2(b))",
          a: `Use an array queue[MAX] with front = rear = −1 initially. The circular form (which avoids wasted space) is given; for a plain linear queue the full test is rear = MAX − 1.

**(i) Queue full**
\`\`\`
Algorithm IsFull()
{
    return ((rear + 1) mod MAX = front)       // linear queue: rear = MAX - 1
}
\`\`\`

**(ii) Queue empty**
\`\`\`
Algorithm IsEmpty()
{
    return (front = -1)
}
\`\`\`

**(iii) Enqueue**
\`\`\`
Algorithm Enqueue(x)
{
    if ((rear + 1) mod MAX = front) then
        write "Queue Overflow"
    else
    {
        if (front = -1) then front ← 0
        rear ← (rear + 1) mod MAX
        queue[rear] ← x
    }
}
\`\`\`

**(iv) Dequeue**
\`\`\`
Algorithm Dequeue()
{
    if (front = -1) then
        write "Queue Underflow"
    else
    {
        x ← queue[front]
        if (front = rear) then front ← rear ← -1
        else front ← (front + 1) mod MAX
        return x
    }
}
\`\`\`

All four operations take **O(1)** time.`,
          keys: ["isfull", "isempty", "(rear + 1) mod max = front", "front = -1", "enqueue", "dequeue", "front = rear", "o(1)"]
        },
        {
          id: "u2-pyq-q9",
          kind: "pyq",
          q: "Q9. [5] Implement a priority queue using a linked representation and mention the time complexity of its operations. How is a priority queue different from a simple queue? (End-sem Oct 2022, Q1(b); May 2022, Q2(c))",
          a: `**Priority queue:** a queue in which every element has a priority; the element with the highest priority is removed first. Equal priorities are served in FIFO order.

**Linked representation (ordered list):** each node stores **data, priority and next**. The list is kept sorted so the highest priority node (smallest priority number) is always first.

**INSERT(x, p)**
1. Create newNode with data x and priority p.
2. If the list is empty or p < priority of the first node, insert at the beginning.
3. Otherwise move temp forward while the next node exists and its priority ≤ p; insert newNode after temp.

**DELETE()**
1. If the list is empty, print "Underflow".
2. Otherwise remove and return the first node.

\`\`\`cpp
struct Node { char data; int priority; Node* next; };
Node* front = NULL;

void insert(char x, int p) {                 // smaller p = higher priority
    Node* n = new Node;
    n->data = x; n->priority = p;
    if (front == NULL || p < front->priority) {
        n->next = front;
        front = n;
    } else {
        Node* temp = front;
        while (temp->next != NULL && temp->next->priority <= p)
             temp = temp->next;
        n->next = temp->next;
        temp->next = n;
    }
}

char deleteHighest() {
    if (front == NULL) { cout << "Underflow\\n"; return '\\0'; }
    Node* temp = front;
    char x = temp->data;
    front = front->next;
    delete temp;
    return x;
}
\`\`\`

**Time complexity (ordered linked list):** insert **O(n)**, delete highest **O(1)**. (Unordered list: insert O(1), delete O(n). Heap: O(log n) for both.)

**Priority queue vs simple queue**

| Point | Simple queue | Priority queue |
|---|---|---|
| Removal order | FIFO: the element that came first leaves first | Highest priority leaves first; FIFO only among equal priorities |
| Element | Only data | Data plus a priority |
| Insertion | Always at rear, O(1) | At the position given by priority (ordered list O(n)) |
| Example | Line at a ticket window | Emergency patient in a hospital |`,
          keys: ["priority", "ordered", "data priority next", "insert o(n)", "delete o(1)", "fifo", "highest priority", "heap"]
        },
        {
          id: "u2-pyq-q10",
          kind: "pyq",
          q: "Q10. [5] What is a double ended queue? Mention its types and explain the enqueue and dequeue operations of a double ended queue. (End-sem May 2024, Q2(c))",
          a: `**Deque (double-ended queue):** a linear data structure in which insertion and deletion can be done at **both ends, front and rear**.

**Types**
- **Input-restricted deque:** insertion at only one end (rear), deletion at both ends.
- **Output-restricted deque:** deletion at only one end (front), insertion at both ends.

A deque can work as a stack (one end only) and as a queue (insert at rear, delete at front).

**Implementation:** circular array dq[MAX] with front = rear = −1; forward is (i + 1) % MAX and backward is (i − 1 + MAX) % MAX.

**Enqueue (insertion)**
- **insertRear(x):** if full: overflow. If empty: front = rear = 0. Else rear = (rear + 1) % MAX. Store dq[rear] = x.
- **insertFront(x):** if full: overflow. If empty: front = rear = 0. Else front = (front − 1 + MAX) % MAX. Store dq[front] = x.

**Dequeue (deletion)**
- **deleteFront():** if empty: underflow. x = dq[front]. If front = rear: front = rear = −1. Else front = (front + 1) % MAX.
- **deleteRear():** if empty: underflow. x = dq[rear]. If front = rear: front = rear = −1. Else rear = (rear − 1 + MAX) % MAX.

\`\`\`
Algorithm InsertFront(x)
{
    if ((rear + 1) mod MAX = front) then write "Deque Overflow"
    else
    {
         if (front = -1) then front ← rear ← 0
         else front ← (front - 1 + MAX) mod MAX
         dq[front] ← x
    }
}

Algorithm DeleteRear()
{
    if (front = -1) then write "Deque Underflow"
    else
    {
         x ← dq[rear]
         if (front = rear) then front ← rear ← -1
         else rear ← (rear - 1 + MAX) mod MAX
         return x
    }
}
\`\`\`

All four operations take **O(1)** time.`,
          keys: ["both ends", "input-restricted", "output-restricted", "insertfront", "insertrear", "deletefront", "deleterear", "circular array"]
        }
      ]
    }
  ]
});
