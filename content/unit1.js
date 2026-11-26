window.DSA = window.DSA || [];
window.DSA.push({
  unit: 1,
  title: "Introduction & Algorithm Analysis",
  topics: [
    {
      id: "u1-intro-ds",
      title: "1. Introduction to Data Structures",
      cards: [
        {
          id: "u1-dsa-overview",
          kind: "concept",
          q: "Overview: what are data structures and what is an algorithm? How do they go hand in hand?",
          a: `**Data structures** is about how data can be stored in different structures. A **data structure** is a way to store data; we structure data in different ways depending on what data we have and what we want to do with it. Example: a **family tree** to store data about the people we are related to.

**Algorithms** is about how to solve different problems, often by searching through and manipulating data structures. An **algorithm** is a set of step-by-step instructions to solve a given problem. Example: a **cooking recipe**.

DSA go hand in hand: a data structure is not worth much if we cannot search or manipulate it efficiently using algorithms, and algorithms are not worth much without a data structure to work on.`,
          keys: ["store data", "step-by-step", "solve problems", "family tree", "recipe", "hand in hand"],
          tip: "Data structure = the shelf; algorithm = how you find/arrange things on it."
        },
        {
          id: "u1-google-maps",
          kind: "concept",
          q: "Easy example linking a data structure and an algorithm: Google Maps.",
          a: `The whole map is stored as a **graph** (data structure): locations and junctions are **nodes**, and roads are **edges**.

When you ask for directions, an algorithm (**Dijkstra's algorithm**) finds the **shortest route** on that graph.`,
          keys: ["graph", "nodes", "edges", "dijkstra", "shortest route"]
        },
        {
          id: "u1-where-dsa",
          kind: "list",
          q: "Where is DSA needed?",
          a: `- Managing **large amounts of data** (social networks, search engines)
- **Scheduling tasks** (which task the computer should do first)
- **Planning routes** (GPS: shortest path from A to B)
- **Optimising processes** so that they finish as quickly as possible`,
          keys: ["large data", "scheduling", "routes", "shortest path", "optimising"]
        },
        {
          id: "u1-dsa-importance",
          kind: "list",
          q: "List the importance of DSA (5 points).",
          a: `1. **Efficiency**: less CPU time and memory
2. **Problem solving**: a systematic, step-by-step way to solve problems
3. **Memory management**: better use of memory
4. **Data management**: data is organised so that it can be accessed quickly
5. **Algorithmic thinking**: improves the programmer's problem-solving skill`,
          keys: ["efficiency", "problem solving", "memory management", "data management", "algorithmic thinking"],
          tip: "E-P-M-D-A: Efficiency, Problem solving, Memory, Data, Algorithmic thinking."
        },
        {
          id: "u1-data-info",
          kind: "def",
          q: "What is data? What is information? Differentiate atomic and composite data.",
          a: `**Data** is a collection of **raw facts and figures**: numbers, characters, symbols, etc. On its own it has no meaning. Example: \`21\`, \`"Pune"\`, \`87.5\`.

When data is **processed and given a meaning**, it becomes **information**. Example: "Roll no. 21 from Pune scored 87.5%" is information built from the three pieces of data above.

- **Atomic data**: a single value that cannot be divided further, e.g. the integer \`4592\`.
- **Composite data**: can be broken into meaningful sub-fields, e.g. a date (day, month, year) or a student record (roll no., name, marks).`,
          keys: ["raw facts", "no meaning", "processed", "information", "atomic", "composite"],
          tip: "Data + meaning = information."
        },
        {
          id: "u1-data-object",
          kind: "def",
          q: "What is a data object? Give examples.",
          a: `**Data object** is a set of elements (a **domain of values**) from which a variable takes its value. In simple words, it is the set of all possible values of one kind.

- Integers: D = {0, ±1, ±2, ±3, ...}
- Alphabets: D = {A, B, C, ..., Z}
- Boolean: D = {true, false}

A data object may be **finite** (alphabets) or **infinite** (integers). In a program, a data object is the actual **storage area** (the variable or instance) that holds a value at run time, e.g. \`int marks = 90;\` creates a data object named \`marks\`.`,
          keys: ["set of elements", "domain", "variable", "finite", "infinite", "storage area"]
        },
        {
          id: "u1-data-vs-object",
          kind: "compare",
          q: "Compare Data and Data object.",
          a: `| Point | Data | Data object |
|---|---|---|
| Meaning | Raw facts and figures | A set of elements (domain) from which values are taken; in a program, a named storage area holding a value |
| Example | 25, 'A', 72.5 | The set of integers; the variable int age |
| Nature | A single value with no structure | Has a type and a set of permitted values |`,
          keys: ["raw facts", "domain", "storage area", "type", "permitted values"]
        },
        {
          id: "u1-data-type-def",
          kind: "def",
          q: "What is a data type? Give an example.",
          a: `**Data type = a set of values + the set of operations allowed on those values.** It tells the compiler how much **memory** to reserve and what can be done with the data.

Example: \`int\` in C++ holds whole numbers (values) and supports \`+ - * / %\` (operations).`,
          keys: ["set of values", "operations", "memory", "compiler", "int"],
          tip: "Type = values + operations."
        },
        {
          id: "u1-data-type-categories",
          kind: "compare",
          q: "Categories of data types with C++ examples.",
          a: `| Category | Meaning | Examples (C++) |
|---|---|---|
| Primitive / built-in | Provided directly by the language; hold a single value. | int, float, double, char, bool |
| Derived | Built from primitive types. | array, pointer, reference, function |
| User-defined | Created by the programmer to model real things. | struct, class, union, enum |`,
          keys: ["primitive", "built-in", "derived", "user-defined", "struct", "array"]
        },
        {
          id: "u1-adt-def",
          kind: "def",
          q: "What is an Abstract Data Type (ADT)?",
          a: `**ADT** is a **mathematical model** of data that tells **what data** is stored and **what operations** can be done on it, but **hides how** it is stored and how the operations are written.

**ADT = Data + Operations + Rules (axioms)**, with the **implementation hidden**.

The word *abstract* means we look only at the essential features and ignore the internal details. This is called **abstraction**, and hiding the details is called **encapsulation / information hiding**.`,
          keys: ["mathematical model", "what data", "operations", "hides how", "implementation", "axioms"],
          tip: "TV remote: you know the buttons (operations), not the circuit inside (implementation)."
        },
        {
          id: "u1-adt-stack",
          kind: "concept",
          q: "Example of an ADT: the Stack ADT (data, operations, rule).",
          a: `**Data**: an ordered collection of elements in which insertion and deletion happen only at one end called **top** (Last In, First Out).

**Operations**:
- \`create()\` - make an empty stack
- \`push(x)\` - insert x at the top
- \`pop()\` - remove and return the top element
- \`peek()\` - return the top element without removing it
- \`isEmpty()\`, \`isFull()\` - check the state of the stack

**Rule (axiom)**: \`pop(push(S, x)) = x\`.

The same Stack ADT can be implemented with an **array** or with a **linked list**, and the user's code does not change.`,
          keys: ["top", "lifo", "push", "pop", "peek", "pop(push(s, x)) = x"]
        },
        {
          id: "u1-adt-class",
          kind: "code",
          q: "Write the Stack ADT as a C++ class.",
          a: `\`\`\`cpp
class Stack {                 // ADT: the user sees only the public part
private:
    int a[100];               // hidden implementation (could be a linked list too)
    int top;
public:
    Stack() { top = -1; }
    void push(int x) { if (top < 99) a[++top] = x; }
    int pop()        { return (top >= 0) ? a[top--] : -1; }
    int peek()       { return (top >= 0) ? a[top]   : -1; }
    bool isEmpty()   { return top == -1; }
};
\`\`\``,
          keys: ["private", "public", "top = -1", "a[++top]", "a[top--]", "isempty"]
        },
        {
          id: "u1-adt-advantages",
          kind: "list",
          q: "Advantages of ADT.",
          a: `1. The **implementation can change** without affecting user code
2. Code becomes **reusable and modular**
3. **Errors are easier to find** because data can only be changed through the defined operations
4. The program is **easier to understand**`,
          keys: ["implementation change", "reusable", "modular", "errors", "easier to understand"]
        },
        {
          id: "u1-dt-adt-ds",
          kind: "compare",
          q: "Compare Data type, Abstract data type and Data structure.",
          a: `| Point | Data type | Abstract data type | Data structure |
|---|---|---|---|
| What it is | Values + operations, provided by the language | Logical description: what data and what operations | Actual implementation: how the data is arranged in memory |
| Example | int, char | Stack, Queue, List | Array-based stack, linked-list-based stack |`,
          keys: ["values + operations", "logical", "implementation", "memory", "stack"]
        },
        {
          id: "u1-ds-def",
          kind: "def",
          q: "What is a data structure? Give its formal definition.",
          a: `**Data structure** is a way of **organising and storing data** in the computer's memory so that it can be **accessed and modified efficiently**. It describes the data elements, the **relationship** between them, and the **operations** on them.

Formally, a data structure is a triple **d = (D, F, A)**, where:
- **D** = set of data objects (domain)
- **F** = set of functions (operations)
- **A** = set of axioms (rules)`,
          keys: ["organising", "storing", "efficiently", "relationship", "operations", "(d, f, a)"],
          tip: "D-F-A: Domain, Functions, Axioms."
        },
        {
          id: "u1-why-ds",
          kind: "concept",
          q: "Why do we need data structures? Quote Wirth's formula.",
          a: `A good choice of data structure makes a program **faster** and lets it use **less memory**.

Example: searching a name in an unsorted list of 10 lakh names may need **10 lakh comparisons**, but if the names are kept **sorted in an array**, binary search needs only about **20**.

**Program = Algorithm + Data Structure** (Niklaus Wirth).`,
          keys: ["faster", "less memory", "10 lakh", "binary search", "algorithm + data structure", "wirth"]
        },
        {
          id: "u1-ds-classification",
          kind: "concept",
          q: "Draw/describe the classification of data structures.",
          a: `**Data Structure** splits into:

- **Primitive**: int, float, char, pointer
- **Non-primitive**
  - **Linear**: Array, Linked list, Stack, Queue
  - **Non-linear**: Tree, Graph`,
          keys: ["primitive", "non-primitive", "linear", "non-linear", "array", "tree", "graph"]
        },
        {
          id: "u1-ds-types-table",
          kind: "compare",
          q: "Types of data structures: Primitive, Non-primitive, Linear, Non-linear, Static, Dynamic (meaning and examples).",
          a: `| Type | Meaning | Examples |
|---|---|---|
| Primitive | Basic building blocks that directly handle simple data; supported by every language. | int, char, bool, float, pointer |
| Non-primitive | More complex structures built from primitive types; organise a group of values for efficient access. Two kinds: linear and non-linear. | array, linked list, stack, queue, tree, graph |
| Linear | Elements are arranged one after another in a sequence. | array, linked list, stack, queue |
| Non-linear | Elements are arranged in a hierarchy or network, not in one sequence. | tree, graph |
| Static | Size is fixed at compile time and cannot be changed later; suitable when the maximum amount of data is known beforehand. | array |
| Dynamic | Can grow and shrink at run time; uses pointers; suitable when the amount of data is not known in advance. | linked list, stack, queue (linked), tree, graph |`,
          keys: ["primitive", "non-primitive", "static", "fixed at compile time", "dynamic", "grow and shrink", "pointers"]
        },
        {
          id: "u1-static-dynamic",
          kind: "compare",
          q: "Static vs Dynamic data structures (with examples).",
          a: `| Point | Static | Dynamic |
|---|---|---|
| Size | Fixed at compile time, cannot be changed later | Grows and shrinks at run time |
| Use when | Maximum amount of data is known beforehand | Amount of data is not known in advance |
| Pointers | Not needed | Uses pointers |
| Examples | array | linked list, stack, queue (linked), tree, graph |`,
          keys: ["fixed", "compile time", "run time", "grow", "shrink", "pointers", "array"]
        },
        {
          id: "u1-persistent-ephemeral",
          kind: "compare",
          q: "Persistent vs Ephemeral data structures.",
          a: `**Ephemeral data structure**: only the **latest version** exists. When it is updated, the old version is lost. Ordinary arrays, stacks, queues and linked lists are ephemeral.

**Persistent data structure**: every update creates a **new version** and the old versions are still available for reading (and sometimes for updating). Example: version history of a document, undo/redo, version control such as **Git**.`,
          keys: ["ephemeral", "persistent", "latest version", "old version", "new version", "git", "undo"]
        },
        {
          id: "u1-linear-def",
          kind: "def",
          q: "What is a linear data structure? Give examples.",
          a: `**Linear data structure**: every element has exactly one element before it (**predecessor**) and one after it (**successor**), except the first and the last. All elements lie on a **single level**, so the whole structure can be visited in **one pass**.

- **Array** - same-type elements stored in continuous memory, accessed by index.
- **Linked list** - nodes connected by pointers; each node stores data and the address of the next node.
- **Stack** - insertion and deletion at one end only (LIFO). Example: pile of plates.
- **Queue** - insertion at rear, deletion at front (FIFO). Example: ticket line.`,
          keys: ["predecessor", "successor", "single level", "one pass", "array", "linked list", "stack", "queue"]
        },
        {
          id: "u1-nonlinear-def",
          kind: "def",
          q: "What is a non-linear data structure? Give examples.",
          a: `**Non-linear data structure**: an element can be connected to **more than one element**. Data is arranged on **many levels** (hierarchy) or as a **network**, so it cannot be visited in a single straight pass.

- **Tree** - hierarchical; one root, each node has children. Example: folder structure on a computer.
- **Graph** - a set of vertices connected by edges in any pattern. Example: road map, social network.`,
          keys: ["more than one", "levels", "hierarchy", "network", "tree", "graph", "root"]
        },
        {
          id: "u1-linear-chars",
          kind: "list",
          q: "Characteristics of linear and of non-linear data structures.",
          a: `**Linear**:
1. **Sequential order**: elements are stored one after the other
2. **Single level**: all elements are on the same level
3. **Contiguous memory** in some of them, such as arrays
4. **Simple traversal**: easy to go through each element from first to last

**Non-linear**:
1. Hierarchical structure
2. Multiple levels
3. Dynamic relationships between elements
4. Efficient data retrieval
5. Non-contiguous memory allocation
6. Special traversal methods
7. More complex operations`,
          keys: ["sequential", "single level", "contiguous", "traversal", "hierarchical", "multiple levels", "non-contiguous"]
        },
        {
          id: "u1-linear-vs-nonlinear",
          kind: "compare",
          q: "Compare Linear and Non-linear data structures.",
          a: `| Point | Linear | Non-linear |
|---|---|---|
| Arrangement | Sequential, one after another | Hierarchical or network |
| Levels | Single level | Multiple levels |
| Traversal | All elements in one pass | Not possible in one simple pass; needs special methods (DFS, BFS, inorder ...) |
| Relationship | One-to-one | One-to-many or many-to-many |
| Implementation | Easy | More difficult |
| Memory use | Often less efficient | Usually more efficient |
| Memory allocation | Contiguous (array) or non-contiguous (linked list) | Typically non-contiguous |
| Access time | O(1) in arrays, O(n) in linked lists | Depends on the structure, e.g. O(log n) in a balanced tree, O(V + E) in a graph |
| Examples | Array, linked list, stack, queue | Tree, graph, heap |`,
          keys: ["sequential", "hierarchical", "one-to-one", "one-to-many", "single level", "multiple levels", "traversal"]
        },
        {
          id: "u1-ds-operations",
          kind: "list",
          q: "List the common operations on data structures.",
          a: `- **Traversing** - visiting every element once
- **Searching** - finding the location of a given element
- **Insertion** - adding a new element
- **Deletion** - removing an element
- **Sorting** - arranging elements in ascending or descending order
- **Merging** - combining two sorted lists into one sorted list`,
          keys: ["traversing", "searching", "insertion", "deletion", "sorting", "merging"]
        }
      ]
    },
    {
      id: "u1-intro-algo",
      title: "2. Introduction to Algorithms",
      cards: [
        {
          id: "u1-algo-def",
          kind: "def",
          q: "Define an algorithm.",
          a: `**Algorithm** is a **finite set of clear, step-by-step instructions** that, when followed, solves a particular problem and produces the required output.

Example: a recipe for making tea has ingredients (**input**), fixed steps, it ends after some time (**finite**), and it gives tea (**output**).`,
          keys: ["finite", "step-by-step", "instructions", "solves", "problem", "output"]
        },
        {
          id: "u1-algo-chars",
          kind: "list",
          q: "Characteristics of an algorithm.",
          a: `| Characteristic | Meaning |
|---|---|
| 1. Correctness | Must give the correct output for all possible valid inputs. |
| 2. Efficiency | Should use computing resources well: little time and little space (memory). |
| 3. Finiteness | Must always stop after a finite number of steps; no infinite loop. |
| 4. Definiteness | Every step precisely defined, only one meaning. "Add a little to x" is not definite; "x = x + 1" is. |
| 5. Input | Zero or more inputs supplied from outside. |
| 6. Output | One or more well-defined outputs related to the inputs. |
| 7. Generality | Works for a whole class of problems (any valid input), not one particular case. |

Many textbooks also list **effectiveness** (every step is basic enough to be carried out exactly, in finite time, with pen and paper) and **language independence** (it can be coded in any language).`,
          keys: ["correctness", "efficiency", "finiteness", "definiteness", "input", "output", "generality"],
          tip: "C-E-F-D-I-O-G."
        },
        {
          id: "u1-algo-vs-program",
          kind: "compare",
          q: "Algorithm vs Program.",
          a: `- An **algorithm** must always **terminate** and is written in a **language-free** way.
- A **program** is an algorithm written in a **programming language**, and a program **need not terminate** (an operating system keeps running).`,
          keys: ["terminate", "language-free", "programming language", "operating system"]
        },
        {
          id: "u1-algo-spec",
          kind: "list",
          q: "Algorithm specification: what are the three ways to describe an algorithm?",
          a: `"Specification" means the way we write down or describe an algorithm.

1. **Natural language (step form)**: steps in plain English, numbered. Easy to read but can be long and sometimes unclear.
2. **Flowchart**: a picture of the algorithm using standard symbols joined by arrows. Easy to follow for small problems.
3. **Pseudocode**: a mix of English and programming-style statements. No strict syntax, so quick to write, yet precise enough to convert into code.`,
          keys: ["natural language", "flowchart", "pseudocode", "symbols", "arrows", "no strict syntax"]
        },
        {
          id: "u1-flowchart-symbols",
          kind: "compare",
          q: "Flowchart symbols and their use.",
          a: `| Name | Use |
|---|---|
| Terminal (oval) | Start and Stop of the algorithm |
| Input / Output (parallelogram) | Read data or print result |
| Process (rectangle) | Calculation or assignment, e.g. sum = sum + i |
| Decision (diamond) | Condition with Yes / No (True / False) branches |
| Flow line (arrow) | Shows the order in which steps are executed |
| Connector (circle) | Joins two parts of a flowchart |
| Predefined process | Call to another function / sub-algorithm |`,
          keys: ["oval", "parallelogram", "rectangle", "diamond", "arrow", "connector", "predefined"]
        },
        {
          id: "u1-pseudocode-conv",
          kind: "list",
          q: "Common pseudocode conventions.",
          a: `- Start with \`Algorithm Name(parameters)\`; use \`//\` for comments.
- Assignment is written as \`x ← value\` (or \`x := value\`).
- Selection: \`if (condition) then ... else ...\`
- Loops: \`for i ← 1 to n do\`, \`while (condition) do\`, \`repeat ... until (condition)\`
- Blocks are shown by indentation or \`{ }\`; input/output with \`read\` and \`write\`; result with \`return\`.`,
          keys: ["algorithm", "//", "←", "if", "for", "while", "repeat", "return"]
        },
        {
          id: "u1-findmax-steps",
          kind: "algo",
          q: "Example: find the largest element of an array (algorithm in steps and pseudocode).",
          a: `**Steps**
1. Start.
2. Read n and the n elements of array A.
3. Set max = A[0] and i = 1.
4. If i ≥ n, go to step 7.
5. If A[i] > max, set max = A[i].
6. Set i = i + 1 and go to step 4.
7. Print max.
8. Stop.

**Pseudocode**
\`\`\`
Algorithm FindMax(A, n)
// A[0..n-1] is an array of n numbers
{
    max ← A[0]
    for i ← 1 to n-1 do
        if (A[i] > max) then
            max ← A[i]
    return max
}
\`\`\`

Flowchart: Start → Read n and array A → max = A[0], i = 1 → decision i < n? (No: Print max → Stop) → decision A[i] > max? (Yes: max = A[i]) → i = i + 1 → back to i < n.`,
          keys: ["max = a[0]", "i = 1", "a[i] > max", "max = a[i]", "print max"]
        },
        {
          id: "u1-recursive-algo",
          kind: "def",
          q: "What is a recursive algorithm?",
          a: `An algorithm that **calls itself** is recursive. It needs a **base case** (where it stops) and a **recursive case** (where it calls itself on a **smaller input**).

Example: \`fact(n) = 1\` if n = 0, else \`n × fact(n-1)\`. Merge sort and quick sort in this unit are recursive.`,
          keys: ["calls itself", "base case", "recursive case", "smaller input", "fact"]
        }
      ]
    },
    {
      id: "u1-perf",
      title: "3. Performance Analysis (Time & Space)",
      cards: [
        {
          id: "u1-priori-posteriori",
          kind: "compare",
          q: "Performance analysis: a priori vs a posteriori analysis.",
          a: `There can be many algorithms for the same problem. Performance analysis tells us which one is better by measuring two resources: **memory (space)** and **running time**.

- **A priori analysis (performance analysis)**: done **before running**, on paper; **independent of machine and language**. This is what we study.
- **A posteriori analysis (performance measurement)**: done **after coding** by actually running the program and measuring time and memory; **depends on the machine**.`,
          keys: ["a priori", "before running", "independent", "a posteriori", "after coding", "machine"]
        },
        {
          id: "u1-space-def",
          kind: "def",
          q: "Define space complexity and give its formula (fixed and variable parts).",
          a: `**Space complexity** is the total amount of **memory** an algorithm needs to run to completion, written as a function of the input size n.

**S(P) = c + SP(instance)**

- **Fixed part (c)**: does not depend on the input. Space for the code, simple variables and constants.
- **Variable part SP**: depends on the input. Space for arrays whose size depends on n, dynamically allocated memory, and the **recursion stack**.

**Auxiliary space** is the extra space used apart from the input itself. When we say bubble sort uses O(1) space, we mean auxiliary space.`,
          keys: ["memory", "s(p) = c + sp", "fixed part", "variable part", "recursion stack", "auxiliary"],
          tip: "S(P) = c + SP: constant part + input-dependent part."
        },
        {
          id: "u1-space-examples",
          kind: "trace",
          q: "Space complexity examples: return a+b+c; iterative sum of A[n]; recursive sum rsum(A, n).",
          a: `| Algorithm | Space needed | Complexity |
|---|---|---|
| return a + b + c; | Only 3 simple variables; nothing depends on input size. | O(1) |
| Iterative sum of array A[n] | n words for A + 1 each for n, i, sum = n + 3. | O(n) |
| Recursive sum rsum(A, n) | Each call stores n, address of A and return address = 3 words; depth of recursion is n + 1, so 3(n + 1). | O(n) |`,
          keys: ["o(1)", "n + 3", "3(n + 1)", "recursion depth", "o(n)"]
        },
        {
          id: "u1-time-def",
          kind: "def",
          q: "Define time complexity. What is the frequency count (step count) method and its counting rules?",
          a: `**Time complexity** is the amount of computer **time** an algorithm needs to run to completion, written as a function of the input size n.

We do not measure it in seconds (depends on machine). Instead we **count how many times the basic statements are executed**: the **frequency count / step count method**.

**Rules for counting:**
- comments and declarations = **0** steps
- an assignment, comparison or return = **1** step
- loop header \`for (i = 0; i < n; i++)\` runs **n + 1** times (the extra one is the final failed check)
- the body of that loop runs **n** times`,
          keys: ["frequency count", "step count", "basic statements", "n + 1", "comments = 0", "input size"]
        },
        {
          id: "u1-freq-sum",
          kind: "trace",
          q: "Frequency count Example 1: sum of n array elements.",
          a: `| Statement | Frequency |
|---|---|
| sum = 0; | 1 |
| for (i = 0; i < n; i++) | n+1 |
| sum = sum + A[i]; | n |
| return sum; | 1 |
| **Total** | **2n + 3** |

T(n) = 2n + 3, so the time complexity is **O(n)**.`,
          keys: ["2n + 3", "n+1", "o(n)", "sum = sum + a[i]"]
        },
        {
          id: "u1-freq-matrix",
          kind: "trace",
          q: "Frequency count Example 2: nested loops (matrix addition, n × n).",
          a: `| Statement | Frequency |
|---|---|
| for (i = 0; i < n; i++) | n+1 |
| for (j = 0; j < n; j++) | n(n + 1) |
| C[i][j] = A[i][j] + B[i][j]; | n×n |
| **Total** | **2n² + 2n + 1** |

T(n) = 2n² + 2n + 1, so the time complexity is **O(n²)**.`,
          keys: ["n(n + 1)", "n×n", "2n² + 2n + 1", "o(n²)"]
        },
        {
          id: "u1-freq-doubling",
          kind: "trace",
          q: "Frequency count Example 3: loop variable doubles each time, for (i = 1; i < n; i = i * 2).",
          a: `i takes the values 1, 2, 4, 8, ..., 2^k. The loop stops when 2^k ≥ n, i.e. **k = log₂ n**. So the body runs about log₂ n times and the complexity is **O(log n)**.`,
          keys: ["1, 2, 4, 8", "2^k", "log₂ n", "o(log n)"]
        },
        {
          id: "u1-exam-shortcut",
          kind: "list",
          q: "Shortcut for exams: how to get the O() from a code/expression quickly?",
          a: `Keep only the **fastest-growing term** and drop its constant: 5n² + 3n + 7 → **O(n²)**.

- One loop → **O(n)**
- Two nested loops → **O(n²)**
- Loop that halves or doubles → **O(log n)**
- Halving inside a loop of n → **O(n log n)**`,
          keys: ["fastest-growing", "drop constant", "o(n)", "o(n²)", "o(log n)", "o(n log n)"]
        },
        {
          id: "u1-asymptotic-intro",
          kind: "concept",
          q: "What are asymptotic notations? Name the three main ones.",
          a: `For large inputs the exact count (like 2n + 3) is not important; only the **rate of growth** matters. **Asymptotic notations** are mathematical tools that describe this growth rate for large n.

Three main notations: **Big-Oh (O)** - upper bound, **Omega (Ω)** - lower bound, **Theta (Θ)** - tight bound.`,
          keys: ["growth rate", "large n", "big-oh", "omega", "theta", "upper", "lower", "tight"]
        },
        {
          id: "u1-bigoh",
          kind: "def",
          q: "Big-Oh notation (O): definition, meaning and examples.",
          a: `**Definition**: f(n) = O(g(n)) if there exist positive constants **c** and **n₀** such that **f(n) ≤ c · g(n) for all n ≥ n₀**.

**Meaning**: f(n) never grows faster than g(n). It is an **upper bound**: the maximum time an algorithm can take, normally used for the **worst case**.

**Example 1**: f(n) = 3n + 2. 3n + 2 ≤ 4n for all n ≥ 2. So c = 4, n₀ = 2, g(n) = n, hence 3n + 2 = O(n).

**Example 2**: f(n) = 10n² + 4n + 2. 10n² + 4n + 2 ≤ 11n² for all n ≥ 5. So c = 11, n₀ = 5 and f(n) = O(n²).`,
          keys: ["f(n) ≤ c · g(n)", "c and n₀", "upper bound", "worst case", "n ≥ n₀", "never grows faster"],
          tip: "O = Over (ceiling): f stays below c·g."
        },
        {
          id: "u1-omega",
          kind: "def",
          q: "Omega notation (Ω): definition, meaning and example.",
          a: `**Definition**: f(n) = Ω(g(n)) if there exist positive constants **c** and **n₀** such that **f(n) ≥ c · g(n) for all n ≥ n₀**.

**Meaning**: f(n) grows at least as fast as g(n). It is a **lower bound**: the minimum time needed, normally used for the **best case**.

**Example**: f(n) = 3n + 2. 3n + 2 ≥ 3n for all n ≥ 1. So c = 3, n₀ = 1 and 3n + 2 = Ω(n).`,
          keys: ["f(n) ≥ c · g(n)", "lower bound", "best case", "at least as fast", "n₀", "minimum time"]
        },
        {
          id: "u1-theta",
          kind: "def",
          q: "Theta notation (Θ): definition, meaning and example.",
          a: `**Definition**: f(n) = Θ(g(n)) if there exist positive constants **c₁, c₂ and n₀** such that **c₁ · g(n) ≤ f(n) ≤ c₂ · g(n) for all n ≥ n₀**.

**Meaning**: f(n) grows at **exactly the same rate** as g(n); bounded from above and below. Commonly used to describe the **average case** or an exact growth rate.

**Example**: f(n) = 3n + 2. 3n ≤ 3n + 2 ≤ 4n for all n ≥ 2. So c₁ = 3, c₂ = 4, n₀ = 2 and 3n + 2 = Θ(n).`,
          keys: ["c₁", "c₂", "tight bound", "same rate", "above and below", "average case", "n₀"]
        },
        {
          id: "u1-notation-graphs",
          kind: "concept",
          q: "Graphs of the three asymptotic notations (what the figure shows) and the relation between them.",
          a: `- **f(n) = O(g(n))**: f(n) stays **below** c·g(n) after n₀.
- **f(n) = Ω(g(n))**: f(n) stays **above** c·g(n) after n₀.
- **f(n) = Θ(g(n))**: f(n) stays **between** c₁·g(n) and c₂·g(n) after n₀.

**Note**: f(n) = Θ(g(n)) is true exactly when f(n) = O(g(n)) **and** f(n) = Ω(g(n)) are both true. Two more notations exist: **little-oh o** (strictly smaller growth) and **little-omega ω** (strictly larger growth).`,
          keys: ["below", "above", "between", "both", "little-oh", "little-omega", "n₀"]
        },
        {
          id: "u1-notation-summary",
          kind: "compare",
          q: "Compare O, Ω, Θ (bound type, inequality, case).",
          a: `| Notation | Bound | Inequality | Usually used for |
|---|---|---|---|
| O (Big-Oh) | Upper | f ≤ c·g | Worst case |
| Ω (Omega) | Lower | f ≥ c·g | Best case |
| Θ (Theta) | Tight | c₁·g ≤ f ≤ c₂·g | Average case / exact growth |`,
          keys: ["upper", "lower", "tight", "worst", "best", "average"]
        },
        {
          id: "u1-growth-order",
          kind: "formula",
          q: "Write the order of common growth rates (slowest growing = best).",
          a: `**O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2^n) < O(n!)**`,
          keys: ["o(1)", "o(log n)", "o(n)", "o(n log n)", "o(n²)", "o(2^n)", "o(n!)"]
        },
        {
          id: "u1-growth-table",
          kind: "compare",
          q: "Growth-rate table: names, values for n = 10, 100, 1000, and examples.",
          a: `| Complexity | Name | n = 10 | n = 100 | n = 1000 | Example |
|---|---|---|---|---|---|
| O(1) | Constant | 1 | 1 | 1 | Access A[i] |
| O(log n) | Logarithmic | about 3 | about 7 | about 10 | Binary search |
| O(n) | Linear | 10 | 100 | 1000 | Linear search |
| O(n log n) | Linearithmic | about 33 | about 664 | about 9966 | Merge sort |
| O(n²) | Quadratic | 100 | 10,000 | 10,00,000 | Bubble sort |
| O(2^n) | Exponential | 1024 | about 10^30 | about 10^301 | Tower of Hanoi |`,
          keys: ["constant", "logarithmic", "linear", "linearithmic", "quadratic", "exponential", "tower of hanoi"]
        },
        {
          id: "u1-cases-def",
          kind: "compare",
          q: "Best, average and worst cases (meaning + linear search example).",
          a: `For the same input size n, an algorithm can take different amounts of time depending on how the input is arranged.

| Case | Meaning | Linear search for key in n elements |
|---|---|---|
| Best case | Input for which the algorithm takes the minimum time. | Key is the first element: 1 comparison, O(1). |
| Worst case | Input for which the algorithm takes the maximum time. A guarantee: never slower than this. | Key is the last element or not present: n comparisons, O(n). |
| Average case | Expected time over all possible inputs of size n (each assumed equally likely). | (1 + 2 + ... + n) / n = (n + 1) / 2 comparisons, O(n). |`,
          keys: ["minimum time", "maximum time", "expected", "guarantee", "(n + 1) / 2", "equally likely"]
        },
        {
          id: "u1-why-worst",
          kind: "concept",
          q: "Why is the worst case used most?",
          a: `1. It gives an **upper limit that is always safe**.
2. It happens fairly often in practice (e.g. searching for something that is **not there**).
3. The **average case is usually harder to calculate**.`,
          keys: ["upper limit", "safe", "not there", "harder", "average"]
        }
      ]
    },
    {
      id: "u1-searching",
      title: "4. Searching Techniques",
      cards: [
        {
          id: "u1-search-def",
          kind: "def",
          q: "Define searching.",
          a: `**Searching** is the process of finding whether a given element (called the **key**) is present in a list, and if it is, finding its **position**.

Searching algorithms are methods used to locate a specific element in a collection of data. Input: a list (array) and a target value (key).`,
          keys: ["key", "present", "list", "position", "locate"]
        },
        {
          id: "u1-linear-idea",
          kind: "concept",
          q: "Linear (sequential) search: idea.",
          a: `Start from the **first element** and compare the key with **every element one by one** until the key is found or the list ends. The list **does not need to be sorted**.`,
          keys: ["first element", "one by one", "key", "list ends", "not sorted"]
        },
        {
          id: "u1-linear-algo",
          kind: "algo",
          q: "Linear search: algorithm (steps) and pseudocode.",
          a: `1. Start.
2. Read n, the array A and the key.
3. Set i = 0.
4. If i ≥ n, print "key not found" and go to step 7.
5. If A[i] = key, print "key found at index i" and go to step 7.
6. Set i = i + 1 and go to step 4.
7. Stop.

**Pseudocode**
\`\`\`
Algorithm LinearSearch(A, n, key)
{
    for i ← 0 to n-1 do
        if (A[i] = key) then
            return i         // found
    return -1               // not found
}
\`\`\``,
          keys: ["i = 0", "i ≥ n", "a[i] = key", "i = i + 1", "return -1", "not found"]
        },
        {
          id: "u1-linear-code",
          kind: "code",
          q: "Linear search: C++ code.",
          a: `\`\`\`cpp
int linearSearch(int A[], int n, int key) {
    for (int i = 0; i < n; i++)
        if (A[i] == key)
            return i;           // found at index i
    return -1;                 // not found
}
\`\`\``,
          keys: ["for", "a[i] == key", "return i", "return -1", "i < n"]
        },
        {
          id: "u1-linear-trace",
          kind: "trace",
          q: "Linear search example: search key = 33 in 10 14 19 26 27 31 33 35 42 44.",
          a: `Compare 33 with 10 (no), 14 (no), 19 (no), 26 (no), 27 (no), 31 (no), 33 (yes).

Key found at **index 6 (position 7)** after **7 comparisons**.`,
          keys: ["index 6", "position 7", "7 comparisons", "33"]
        },
        {
          id: "u1-linear-analysis",
          kind: "formula",
          q: "Linear search: best/average/worst case, space, advantages and disadvantage.",
          a: `| Case | When | Comparisons | Time |
|---|---|---|---|
| Best | Key at first position | 1 | O(1) |
| Average | Key somewhere in the middle | (n + 1) / 2 | O(n) |
| Worst | Key at last position or absent | n | O(n) |

**Space**: O(1).

**Advantages**: very simple; works on both sorted and unsorted lists, and on linked lists.

**Disadvantage**: inefficient for large data sets.`,
          keys: ["o(1)", "o(n)", "(n + 1) / 2", "simple", "unsorted", "linked lists", "inefficient"]
        },
        {
          id: "u1-binary-idea",
          kind: "concept",
          q: "Binary search: idea.",
          a: `The list **must be sorted**. Compare the key with the **middle element**. If equal, the search is over. If the key is smaller, search only the **left half**; if larger, search only the **right half**. Each comparison throws away half of the remaining list. This is a **divide and conquer** method.`,
          keys: ["sorted", "middle element", "left half", "right half", "half", "divide and conquer"]
        },
        {
          id: "u1-binary-algo",
          kind: "algo",
          q: "Binary search: algorithm (steps).",
          a: `1. Start.
2. Read n, the sorted array A and the key.
3. Set low = 0 and high = n − 1.
4. If low > high, print "key not found" and go to step 8.
5. Set mid = (low + high) / 2.
6. If A[mid] = key, print "key found at index mid" and go to step 8.
7. If key < A[mid], set high = mid − 1; otherwise set low = mid + 1. Go to step 4.
8. Stop.`,
          keys: ["low = 0", "high = n − 1", "mid = (low + high) / 2", "a[mid] = key", "high = mid − 1", "low = mid + 1"]
        },
        {
          id: "u1-binary-pseudo",
          kind: "algo",
          q: "Binary search: pseudocode (iterative and recursive).",
          a: `**Iterative**
\`\`\`
Algorithm BinarySearch(A, n, key)
{
    low ← 0; high ← n-1
    while (low ≤ high) do
    {
        mid ← (low + high) / 2
        if (A[mid] = key) then return mid
        else if (key < A[mid]) then
             high ← mid - 1
        else
             low ← mid + 1
    }
    return -1
}
\`\`\`

**Recursive**
\`\`\`
Algorithm RBinSearch(A, low, high, key)
{
    if (low > high) then return -1
    mid ← (low + high) / 2
    if (A[mid] = key) then return mid
    else if (key < A[mid]) then
         return RBinSearch(A, low, mid-1, key)
    else
         return RBinSearch(A, mid+1, high, key)
}
\`\`\``,
          keys: ["low", "high", "mid", "a[mid] = key", "mid - 1", "mid+1", "return -1"]
        },
        {
          id: "u1-binary-code",
          kind: "code",
          q: "Binary search: C++ code.",
          a: `\`\`\`cpp
int binarySearch(int A[], int n, int key) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;       // same as (low + high) / 2
        if (A[mid] == key)      return mid;      // found
        else if (key < A[mid]) high = mid - 1;   // go to left half
        else                    low = mid + 1;   // go to right half
    }
    return -1;                                   // not found
}
\`\`\``,
          keys: ["low", "high", "mid", "a[mid] == key", "high = mid - 1", "low = mid + 1", "return -1"]
        },
        {
          id: "u1-binary-trace",
          kind: "trace",
          q: "Binary search example: key = 47 in 0 4 7 10 14 23 45 47 53 (n = 9, index 0 to 8).",
          a: `| Step | low | high | mid | A[mid] | Decision |
|---|---|---|---|---|---|
| 1 | 0 | 8 | 4 | 14 | 47 > 14: go right, low = 5 |
| 2 | 5 | 8 | 6 | 45 | 47 > 45: go right, low = 7 |
| 3 | 7 | 8 | 7 | 47 | 47 = 47: found at index 7 |

Only **3 comparisons** were needed; linear search would need 8.`,
          keys: ["mid = 4", "low = 5", "low = 7", "index 7", "3 comparisons"]
        },
        {
          id: "u1-binary-analysis",
          kind: "formula",
          q: "Binary search analysis: derive O(log n), recurrence, max comparisons, cases, space.",
          a: `In the 1st iteration the whole array is searched (n), in the 2nd half (n/2), 3rd n/4, and in the i-th iteration n/2^i. So the list size becomes half each time: n → n/2 → n/4 → ... → 1. If this takes k steps then n / 2^k = 1, so **k = log₂ n**.

**Recurrence**: T(n) = T(n/2) + 1, which gives **T(n) = O(log n)**.

**Maximum number of comparisons** = ⌊log₂ n⌋ + 1 (for n = 9 that is 4).

| Case | When | Time |
|---|---|---|
| Best | Key is the middle element in the first comparison | O(1) |
| Average | Key found after some halvings | O(log n) |
| Worst | Key at an end or absent | O(log n) |

**Space**: O(1) iterative, O(log n) recursive (recursion stack).`,
          keys: ["n/2", "log₂ n", "t(n) = t(n/2) + 1", "⌊log₂ n⌋ + 1", "o(log n)", "o(1)", "recursion stack"]
        },
        {
          id: "u1-linear-vs-binary",
          kind: "compare",
          q: "Compare Linear search and Binary search.",
          a: `| Point | Linear search | Binary search |
|---|---|---|
| Requirement | List may be unsorted | List must be sorted |
| Method | Checks elements one by one | Divide and conquer; halves the list each time |
| Worst-case time | O(n) | O(log n) |
| Best-case time | O(1) | O(1) |
| Data structure | Array or linked list | Needs direct access, so array |
| Suitable for | Small lists | Large sorted lists |
| 1000 elements, worst case | 1000 comparisons | 10 comparisons |`,
          keys: ["unsorted", "sorted", "one by one", "divide and conquer", "o(n)", "o(log n)", "array"]
        }
      ]
    },
    {
      id: "u1-sorting-intro",
      title: "5. Sorting Techniques (basics)",
      cards: [
        {
          id: "u1-sort-def",
          kind: "def",
          q: "Define sorting. Give uses of sorting.",
          a: `**Sorting** is the process of arranging the elements of a list in a particular order, **ascending or descending**.

**Uses**: student names in alphabetical order for attendance; products arranged by price or rating on shopping sites; library books by title or author; faster searching in databases; ranking of scores in sports; analysing stock prices and transactions in finance.`,
          keys: ["arranging", "order", "ascending", "descending", "searching", "ranking"]
        },
        {
          id: "u1-sort-terms",
          kind: "list",
          q: "Important sorting terms: pass, internal/external sorting, in-place, stable, adaptive.",
          a: `- **Pass**: one complete trip through the list (or the unsorted part of it).
- **Internal sorting**: only main (primary) memory is used; suitable for small lists (e.g. selection sort, insertion sort).
- **External sorting**: data too large for main memory, so secondary memory (disk) is also used (e.g. external merge sort).
- **In-place sort**: needs only a constant amount of extra memory, O(1). Bubble, selection and insertion sort are in-place; merge sort is not.
- **Stable sort**: two equal elements keep their original relative order after sorting. Bubble, insertion and merge sort are stable; selection and quick sort are not.
- **Adaptive sort**: runs faster when the input is already partly sorted (bubble with flag, insertion).`,
          keys: ["pass", "internal", "external", "in-place", "o(1)", "stable", "adaptive", "relative order"]
        },
        {
          id: "u1-sort-stability-eff",
          kind: "concept",
          q: "Sort stability, efficiency and passes (with example).",
          a: `- **Stability**: a sort is stable if equal keys stay in their original order. Example: sorting (Amit, 70), (Riya, 60), (Zoya, 70) by marks with a stable sort always keeps **Amit before Zoya**.
- **Efficiency**: measured by the number of **comparisons and swaps**, i.e. the time complexity (O(n²) for the simple sorts, O(n log n) for merge and quick sort) and the extra memory used.
- **Pass**: one complete scan of the unsorted part; bubble, selection and insertion sort need **n − 1 passes** for n elements.`,
          keys: ["equal keys", "original order", "amit before zoya", "comparisons", "swaps", "n − 1 passes", "extra memory"]
        }
      ]
    },
    {
      id: "u1-bubble",
      title: "5.1 Bubble Sort",
      cards: [
        {
          id: "u1-bubble-idea",
          kind: "concept",
          q: "Bubble sort: idea.",
          a: `**Compare each pair of neighbouring elements** and swap them if they are in the wrong order. After pass 1 the **largest element "bubbles up"** to the last position; after pass 2 the second largest reaches the second-last position, and so on. For n elements at most **n − 1 passes** are needed. If a pass makes **no swap**, the list is already sorted and we stop early (the **flag** improvement).`,
          keys: ["neighbouring", "swap", "wrong order", "largest", "bubbles up", "n − 1 passes", "flag"]
        },
        {
          id: "u1-bubble-algo",
          kind: "algo",
          q: "Bubble sort: algorithm (steps) and pseudocode.",
          a: `1. Start.
2. Read n and the array A.
3. Set i = 0.
4. If i ≥ n − 1, go to step 10.
5. Set j = 0 and swapped = false.
6. If j ≥ n − i − 1, go to step 8.
7. If A[j] > A[j+1], swap them and set swapped = true. Set j = j + 1 and go to step 6.
8. If swapped = false, go to step 10.
9. Set i = i + 1 and go to step 4.
10. Print the sorted array.
11. Stop.

**Pseudocode**
\`\`\`
Algorithm BubbleSort(A, n)
{
    for i ← 0 to n-2 do
    {
        swapped ← false
        for j ← 0 to n-i-2 do
            if (A[j] > A[j+1]) then
            {
                swap(A[j], A[j+1])
                swapped ← true
            }
        if (swapped = false) then break     // already sorted
    }
}
\`\`\``,
          keys: ["swapped", "a[j] > a[j+1]", "n − i − 1", "swap", "break", "i ≥ n − 1"]
        },
        {
          id: "u1-bubble-trace",
          kind: "trace",
          q: "Bubble sort example: sort 5 3 8 4 6 (n = 5), pass by pass.",
          a: `| Pass | Compare | Action | Array after the step |
|---|---|---|---|
| Pass 1 | (5, 3) | 5 > 3, swap | 3 5 8 4 6 |
| | (5, 8) | 5 ≤ 8, no swap | 3 5 8 4 6 |
| | (8, 4) | 8 > 4, swap | 3 5 4 8 6 |
| | (8, 6) | 8 > 6, swap | 3 5 4 6 8 |
| | | End of pass 1 | 3 5 4 6 8 |
| Pass 2 | (3, 5) | 3 ≤ 5, no swap | 3 5 4 6 8 |
| | (5, 4) | 5 > 4, swap | 3 4 5 6 8 |
| | (5, 6) | 5 ≤ 6, no swap | 3 4 5 6 8 |
| | | End of pass 2 | 3 4 5 6 8 |
| Pass 3 | (3, 4) | 3 ≤ 4, no swap | 3 4 5 6 8 |
| | (4, 5) | 4 ≤ 5, no swap | 3 4 5 6 8 |
| | | End of pass 3: no swap, so stop | 3 4 5 6 8 |`,
          keys: ["3 5 4 6 8", "3 4 5 6 8", "no swap", "pass 3", "stop"]
        },
        {
          id: "u1-bubble-code",
          kind: "code",
          q: "Bubble sort: C++ code.",
          a: `\`\`\`cpp
void bubbleSort(int A[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (A[j] > A[j + 1]) {
                swap(A[j], A[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;       // no swap in this pass: stop early
    }
}
\`\`\``,
          keys: ["swapped", "n - i - 1", "a[j] > a[j + 1]", "swap", "break", "i < n - 1"]
        },
        {
          id: "u1-bubble-analysis",
          kind: "formula",
          q: "Bubble sort: analysis (comparisons, best/average/worst, space, stability).",
          a: `Comparisons in pass 1, 2, ..., n−1 are (n−1), (n−2), ..., 1. Total = (n−1) + (n−2) + ... + 1 = **n(n−1)/2 = O(n²)**.

| Case | When | Time |
|---|---|---|
| Best | Already sorted (with flag: one pass, n − 1 comparisons, no swaps) | O(n) |
| Average | Random order | O(n²) |
| Worst | Sorted in reverse order | O(n²) |

**Space**: O(1), in-place. **Stable**: yes. Without the flag, the best case is also O(n²).`,
          keys: ["n(n−1)/2", "o(n²)", "o(n)", "flag", "reverse", "o(1)", "stable"]
        }
      ]
    },
    {
      id: "u1-selection",
      title: "5.2 Selection Sort",
      cards: [
        {
          id: "u1-selection-idea",
          kind: "concept",
          q: "Selection sort: idea.",
          a: `In each pass, **select the smallest element** from the unsorted part and **swap it with the first element** of the unsorted part. After pass 1 the smallest is at index 0, after pass 2 the second smallest is at index 1, and so on. Needs **n − 1 passes** and **at most one swap per pass**.`,
          keys: ["smallest", "unsorted part", "swap", "first element", "n − 1 passes", "one swap"]
        },
        {
          id: "u1-selection-algo",
          kind: "algo",
          q: "Selection sort: algorithm (steps) and pseudocode.",
          a: `1. Start.
2. Read n and the array A.
3. Set i = 0.
4. If i ≥ n − 1, go to step 10.
5. Set min = i and j = i + 1.
6. If j ≥ n, go to step 8.
7. If A[j] < A[min], set min = j. Set j = j + 1 and go to step 6.
8. If min ≠ i, swap A[i] and A[min].
9. Set i = i + 1 and go to step 4.
10. Print the sorted array.
11. Stop.

**Pseudocode**
\`\`\`
Algorithm SelectionSort(A, n)
{
    for i ← 0 to n-2 do
    {
        min ← i
        for j ← i+1 to n-1 do
            if (A[j] < A[min]) then
                min ← j
        if (min ≠ i) then
            swap(A[i], A[min])
    }
}
\`\`\``,
          keys: ["min = i", "j = i + 1", "a[j] < a[min]", "min = j", "min ≠ i", "swap"]
        },
        {
          id: "u1-selection-trace",
          kind: "trace",
          q: "Selection sort example: sort 20 12 10 15 2 (n = 5).",
          a: `| Pass | Unsorted part | Minimum | Action | Array after the pass |
|---|---|---|---|---|
| Pass 1 | 20, 12, 10, 15, 2 | 2 | swap 20 and 2 | 2 12 10 15 20 |
| Pass 2 | 12, 10, 15, 20 | 10 | swap 12 and 10 | 2 10 12 15 20 |
| Pass 3 | 12, 15, 20 | 12 | already in place, no swap | 2 10 12 15 20 |
| Pass 4 | 15, 20 | 15 | already in place, no swap | 2 10 12 15 20 |

Sorted: 2 10 12 15 20.`,
          keys: ["swap 20 and 2", "swap 12 and 10", "no swap", "2 10 12 15 20", "minimum"]
        },
        {
          id: "u1-selection-code",
          kind: "code",
          q: "Selection sort: C++ code.",
          a: `\`\`\`cpp
void selectionSort(int A[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min = i;                                  // index of smallest so far
        for (int j = i + 1; j < n; j++)
            if (A[j] < A[min])
                min = j;
        if (min != i)
            swap(A[i], A[min]);
    }
}
\`\`\``,
          keys: ["min = i", "j = i + 1", "a[j] < a[min]", "min = j", "min != i", "swap"]
        },
        {
          id: "u1-selection-analysis",
          kind: "formula",
          q: "Selection sort: analysis (cases, swaps, space, stability, when to use).",
          a: `The inner loop always runs fully, whatever the input: (n−1) + (n−2) + ... + 1 = **n(n−1)/2 comparisons**. So best, average and worst cases are all **O(n²)**.

The number of **swaps is at most n − 1, i.e. O(n)**, the smallest among the simple sorts.

**Space**: O(1), in-place. **Stable**: **no** (a long-distance swap can jump over an equal element; e.g. [5a, 5b, 2] becomes [2, 5b, 5a]).

**Use when**: swapping (writing) is costly.`,
          keys: ["n(n−1)/2", "o(n²)", "n − 1 swaps", "o(1)", "not stable", "swapping costly"]
        }
      ]
    },
    {
      id: "u1-insertion",
      title: "5.3 Insertion Sort",
      cards: [
        {
          id: "u1-insertion-idea",
          kind: "concept",
          q: "Insertion sort: idea.",
          a: `Like arranging **playing cards in hand**. The left part of the array is kept **sorted**. Take the next element (the **key**), **shift** every sorted element that is bigger than key **one place to the right**, and **insert** key in the gap. The first element alone is treated as already sorted, so we begin from **index 1**.`,
          keys: ["playing cards", "sorted part", "key", "shift", "right", "insert", "index 1"]
        },
        {
          id: "u1-insertion-algo",
          kind: "algo",
          q: "Insertion sort: algorithm (steps) and pseudocode.",
          a: `1. Start.
2. Read n and the array A.
3. Set i = 1.
4. If i ≥ n, go to step 9.
5. Set key = A[i] and j = i − 1.
6. While j ≥ 0 and A[j] > key: set A[j+1] = A[j] and j = j − 1.
7. Set A[j+1] = key.
8. Set i = i + 1 and go to step 4.
9. Print the sorted array.
10. Stop.

**Pseudocode**
\`\`\`
Algorithm InsertionSort(A, n)
{
    for i ← 1 to n-1 do
    {
        key ← A[i]
        j ← i - 1
        while (j ≥ 0 and A[j] > key) do
        {
            A[j+1] ← A[j]          // shift right
            j ← j - 1
        }
        A[j+1] ← key               // insert key in the gap
    }
}
\`\`\``,
          keys: ["key = a[i]", "j = i − 1", "a[j] > key", "a[j+1] = a[j]", "a[j+1] = key", "i = 1"]
        },
        {
          id: "u1-insertion-trace",
          kind: "trace",
          q: "Insertion sort example: sort 23 1 10 5 2 (n = 5). First element 23 is the sorted part.",
          a: `| Pass | key | Action | Array after the pass |
|---|---|---|---|
| Pass 1 | 1 | shift 23 right; insert 1 at index 0 | 1 23 10 5 2 |
| Pass 2 | 10 | shift 23 right; insert 10 at index 1 | 1 10 23 5 2 |
| Pass 3 | 5 | shift 23, 10 right; insert 5 at index 1 | 1 5 10 23 2 |
| Pass 4 | 2 | shift 23, 10, 5 right; insert 2 at index 1 | 1 2 5 10 23 |`,
          keys: ["1 23 10 5 2", "1 10 23 5 2", "1 5 10 23 2", "1 2 5 10 23", "shift"]
        },
        {
          id: "u1-insertion-code",
          kind: "code",
          q: "Insertion sort: C++ code.",
          a: `\`\`\`cpp
void insertionSort(int A[], int n) {
    for (int i = 1; i < n; i++) {
        int key = A[i];
        int j = i - 1;
        while (j >= 0 && A[j] > key) {
            A[j + 1] = A[j];       // shift bigger element to the right
            j--;
        }
        A[j + 1] = key;            // put key in its correct place
    }
}
\`\`\``,
          keys: ["key = a[i]", "j = i - 1", "j >= 0", "a[j] > key", "a[j + 1] = a[j]", "a[j + 1] = key"]
        },
        {
          id: "u1-insertion-analysis",
          kind: "formula",
          q: "Insertion sort: analysis (best/average/worst, space, stability, when to use).",
          a: `| Case | When | Comparisons | Time |
|---|---|---|---|
| Best | Already sorted: the while loop fails at once in every pass | n−1 | O(n) |
| Average | Random order: about half of the sorted part is shifted each time | about n²/4 | O(n²) |
| Worst | Reverse sorted: every key is shifted to the front, 1 + 2 + ... + (n−1) | n(n−1)/2 | O(n²) |

**Space**: O(1), in-place. **Stable**: yes.

**Use when**: the list is small or almost sorted; also good for data that arrives one item at a time (**online sorting**).`,
          keys: ["o(n)", "o(n²)", "n−1", "n(n−1)/2", "stable", "almost sorted", "online"]
        }
      ]
    },
    {
      id: "u1-merge",
      title: "5.4 Merge Sort",
      cards: [
        {
          id: "u1-merge-idea",
          kind: "concept",
          q: "Merge sort: idea (divide, conquer, combine).",
          a: `Merge sort uses **divide and conquer**.

1. **Divide**: split the array into two halves at the middle.
2. **Conquer**: sort each half by calling merge sort again (recursion). A part with one element is already sorted, so the recursion stops there.
3. **Combine**: merge the two sorted halves into one sorted array.

The real work is done by the **merge step**: keep one pointer on each sorted half, repeatedly copy the smaller of the two pointed elements into a temporary array B, and at the end copy whatever is left.`,
          keys: ["divide", "conquer", "combine", "halves", "merge", "temporary array", "recursion"]
        },
        {
          id: "u1-merge-algo",
          kind: "algo",
          q: "Merge sort: algorithm MERGESORT(A, low, high) and MERGE(A, low, mid, high).",
          a: `**MERGESORT(A, low, high)**
1. If low ≥ high, return (zero or one element).
2. Set mid = (low + high) / 2.
3. Call mergeSort(A, low, mid).
4. Call mergeSort(A, mid + 1, high).
5. Call merge(A, low, mid, high).

**MERGE(A, low, mid, high)**
1. Set i = low (start of left half), j = mid + 1 (start of right half), k = 0 (index in B).
2. While i ≤ mid and j ≤ high: if A[i] ≤ A[j], copy A[i] to B[k] and increase i; otherwise copy A[j] to B[k] and increase j. Increase k.
3. Copy any remaining elements of the left half to B.
4. Copy any remaining elements of the right half to B.
5. Copy B back into A[low..high].`,
          keys: ["low ≥ high", "mid", "mergesort(a, low, mid)", "mid + 1", "merge", "a[i] ≤ a[j]", "copy b back"]
        },
        {
          id: "u1-merge-pseudo",
          kind: "algo",
          q: "Merge sort: pseudocode of MergeSort and Merge.",
          a: `\`\`\`
Algorithm MergeSort(A, low, high)
{
    if (low < high) then
    {
        mid ← (low + high) / 2
        MergeSort(A, low, mid)
        MergeSort(A, mid+1, high)
        Merge(A, low, mid, high)
    }
}

Algorithm Merge(A, low, mid, high)
{
    i ← low; j ← mid+1; k ← 0
    while (i ≤ mid and j ≤ high) do
    {
        if (A[i] ≤ A[j]) then { B[k] ← A[i]; i ← i+1 }
        else                  { B[k] ← A[j]; j ← j+1 }
        k ← k+1
    }
    while (i ≤ mid) do { B[k] ← A[i]; i ← i+1; k ← k+1 }
    while (j ≤ high) do { B[k] ← A[j]; j ← j+1; k ← k+1 }
    for t ← 0 to k-1 do A[low + t] ← B[t]
}
\`\`\``,
          keys: ["low < high", "mid", "mergesort", "merge", "a[i] ≤ a[j]", "b[k]", "i ≤ mid", "j ≤ high"]
        },
        {
          id: "u1-merge-trace",
          kind: "trace",
          q: "Merge sort example: sort 38 27 43 3 9 82 10 (divide and merge levels).",
          a: `| Level | Array / parts |
|---|---|
| Given | 38 27 43 3 9 82 10 |
| Divide 1 | 38 27 43 3 / 9 82 10 |
| Divide 2 | 38 27 / 43 3 / 9 82 / 10 |
| Divide 3 | 38 / 27 / 43 / 3 / 9 / 82 / 10 |
| Merge 1 | 27 38 / 3 43 / 9 82 / 10 |
| Merge 2 | 3 27 38 43 / 9 10 82 |
| Merge 3 | 3 9 10 27 38 43 82 |`,
          keys: ["divide", "27 38", "3 27 38 43", "9 10 82", "3 9 10 27 38 43 82", "merge"]
        },
        {
          id: "u1-merge-one-merge",
          kind: "trace",
          q: "How one merge works: merge 3 27 38 43 with 9 10 82 (last step).",
          a: `| Compare | Smaller one copied to B | B so far |
|---|---|---|
| 3 and 9 | 3 (from left) | 3 |
| 27 and 9 | 9 (from right) | 3 9 |
| 27 and 10 | 10 (from right) | 3 9 10 |
| 27 and 82 | 27 (from left) | 3 9 10 27 |
| 38 and 82 | 38 (from left) | 3 9 10 27 38 |
| 43 and 82 | 43 (from left) | 3 9 10 27 38 43 |
| one half is finished | copy the rest: 82 | 3 9 10 27 38 43 82 |`,
          keys: ["3 and 9", "smaller", "copy the rest", "82", "3 9 10 27 38 43 82"]
        },
        {
          id: "u1-merge-code",
          kind: "code",
          q: "Merge sort: C++ code (merge and mergeSort).",
          a: `\`\`\`cpp
void merge(int A[], int low, int mid, int high) {
    int B[100];                            // temporary array
    int i = low, j = mid + 1, k = 0;
    while (i <= mid && j <= high) {
        if (A[i] <= A[j]) B[k++] = A[i++];
        else              B[k++] = A[j++];
    }
    while (i <= mid) B[k++] = A[i++];      // leftover of left half
    while (j <= high) B[k++] = A[j++];     // leftover of right half
    for (int t = 0; t < k; t++)
        A[low + t] = B[t];                 // copy back
}

void mergeSort(int A[], int low, int high) {
    if (low < high) {
        int mid = (low + high) / 2;
        mergeSort(A, low, mid);
        mergeSort(A, mid + 1, high);
        merge(A, low, mid, high);
    }
}
\`\`\``,
          keys: ["b[100]", "i <= mid", "j <= high", "a[i] <= a[j]", "b[k++]", "a[low + t] = b[t]", "mid = (low + high) / 2", "merge(a, low, mid, high)"]
        },
        {
          id: "u1-merge-analysis",
          kind: "formula",
          q: "Merge sort: analysis (recurrence, derivation, cases, space, stability, use).",
          a: `Sorting n elements = sorting two halves of size n/2 + merging them in n steps. Recurrence:

**T(n) = 2T(n/2) + n, with T(1) = 1.**

Expanding: T(n) = 2T(n/2) + n = 4T(n/4) + 2n = 8T(n/8) + 3n = ... = 2^k T(n/2^k) + kn. Put 2^k = n, so k = log₂ n:

**T(n) = n·T(1) + n log₂ n = O(n log n).**

Simple view: the array is halved log₂ n times (number of levels) and each level needs n work to merge, giving n × log n.

**Time**: best = average = worst = **O(n log n)**, because the array is always split in the middle whatever the data.

**Space**: O(n) for the temporary array, so **not in-place**. **Stable**: yes (because of the ≤ in the merge).

**Use when**: a guaranteed O(n log n) is needed, for linked lists, and for external sorting of very large files.`,
          keys: ["t(n) = 2t(n/2) + n", "log₂ n", "o(n log n)", "o(n)", "not in-place", "stable", "linked lists", "external"]
        }
      ]
    },
    {
      id: "u1-quick",
      title: "5.5 Quick Sort",
      cards: [
        {
          id: "u1-quick-idea",
          kind: "concept",
          q: "Quick sort: idea (pivot, partition, recursion).",
          a: `Quick sort is a highly efficient, **in-place** sorting algorithm that also uses **divide and conquer**, but the hard work is done **before** the recursive calls.

1. **Choose a pivot**: select one element as the benchmark. It can be the first, the last, the middle (median) or a random element. As in the class notes, we take the **last element** as the pivot.
2. **Partition**: rearrange so that all elements **smaller than the pivot** come to its left and all **larger** elements go to its right. The pivot is now in its **final sorted position**.
3. **Recursion**: apply the same two steps to the left sub-array and the right sub-array. Stops when a sub-array has zero or one element. **No combine step** is needed.`,
          keys: ["pivot", "partition", "smaller", "larger", "final position", "recursion", "no combine", "in-place"]
        },
        {
          id: "u1-quick-partition-idea",
          kind: "concept",
          q: "How does partition work (last element as pivot)?",
          a: `Index **i** marks the end of the "smaller than pivot" region (initially **low − 1**). Index **j** scans the array from **low to high − 1**. Whenever **A[j] is smaller than the pivot**, i is increased and **A[i] and A[j] are swapped**, so the small element joins the left region. At the end the **pivot is swapped with A[i + 1]**, which is its correct place.`,
          keys: ["i = low − 1", "j", "low to high − 1", "a[j] < pivot", "swap", "a[i + 1]", "pivot"]
        },
        {
          id: "u1-quick-algo",
          kind: "algo",
          q: "Quick sort: algorithms QUICKSORT(A, low, high) and PARTITION(A, low, high).",
          a: `**QUICKSORT(A, low, high)**
1. If low ≥ high, return.
2. Set p = partition(A, low, high).
3. Call quickSort(A, low, p − 1).
4. Call quickSort(A, p + 1, high).

**PARTITION(A, low, high)**
1. Set pivot = A[high] and i = low − 1.
2. For j = low to high − 1: if A[j] < pivot, set i = i + 1 and swap A[i] and A[j].
3. Swap A[i + 1] and A[high] (the pivot goes to its final place).
4. Return i + 1.`,
          keys: ["low ≥ high", "p = partition", "p − 1", "p + 1", "pivot = a[high]", "i = low − 1", "return i + 1"]
        },
        {
          id: "u1-quick-pseudo",
          kind: "algo",
          q: "Quick sort: pseudocode of QuickSort and Partition.",
          a: `\`\`\`
Algorithm QuickSort(A, low, high)
{
    if (low < high) then
    {
        p ← Partition(A, low, high)
        QuickSort(A, low, p-1)
        QuickSort(A, p+1, high)
    }
}

Algorithm Partition(A, low, high)
{
    pivot ← A[high]                         // last element is the pivot
    i ← low - 1
    for j ← low to high-1 do
        if (A[j] < pivot) then
        {
            i ← i + 1
            swap(A[i], A[j])
        }
    swap(A[i+1], A[high])
    return i + 1
}
\`\`\``,
          keys: ["low < high", "partition", "p-1", "p+1", "pivot ← a[high]", "i ← low - 1", "swap(a[i+1], a[high])"]
        },
        {
          id: "u1-quick-trace-partition",
          kind: "trace",
          q: "Quick sort example: first partition of 9 4 8 3 7 1 6 2 5 (last element 5 as pivot, i starts at −1).",
          a: `| j | A[j] | Action | Array after the step |
|---|---|---|---|
| 0 | 9 | 9 ≥ 5: no action | 9 4 8 3 7 1 6 2 5 |
| 1 | 4 | 4 < 5: i = 0; swap A[0] = 9 and A[1] = 4 | 4 9 8 3 7 1 6 2 5 |
| 2 | 8 | 8 ≥ 5: no action | 4 9 8 3 7 1 6 2 5 |
| 3 | 3 | 3 < 5: i = 1; swap A[1] = 9 and A[3] = 3 | 4 3 8 9 7 1 6 2 5 |
| 4 | 7 | 7 ≥ 5: no action | 4 3 8 9 7 1 6 2 5 |
| 5 | 1 | 1 < 5: i = 2; swap A[2] = 8 and A[5] = 1 | 4 3 1 9 7 8 6 2 5 |
| 6 | 6 | 6 ≥ 5: no action | 4 3 1 9 7 8 6 2 5 |
| 7 | 2 | 2 < 5: i = 3; swap A[3] = 9 and A[7] = 2 | 4 3 1 2 7 8 6 9 5 |
| end | | swap A[i+1] = A[4] = 7 with the pivot 5; pivot fixed at index 4 | 4 3 1 2 5 8 6 9 7 |`,
          keys: ["pivot = 5", "i = −1", "swap", "4 3 1 2 5 8 6 9 7", "index 4"]
        },
        {
          id: "u1-quick-trace-calls",
          kind: "trace",
          q: "Quick sort example (9 4 8 3 7 1 6 2 5): all recursive calls.",
          a: `| Call | Pivot | Result | Array |
|---|---|---|---|
| quickSort(0, 8) | 5 | pivot 5 placed at index 4 | 4 3 1 2 5 8 6 9 7 |
| quickSort(0, 3) | 2 | pivot 2 placed at index 1 | 1 2 4 3 5 8 6 9 7 |
| quickSort(0, 0) | – | single element, already in place | 1 2 4 3 5 8 6 9 7 |
| quickSort(2, 3) | 3 | pivot 3 placed at index 2 | 1 2 3 4 5 8 6 9 7 |
| quickSort(3, 3) | – | single element, already in place | 1 2 3 4 5 8 6 9 7 |
| quickSort(5, 8) | 7 | pivot 7 placed at index 6 | 1 2 3 4 5 6 7 9 8 |
| quickSort(5, 5) | – | single element, already in place | 1 2 3 4 5 6 7 9 8 |
| quickSort(7, 8) | 8 | pivot 8 placed at index 7 | 1 2 3 4 5 6 7 8 9 |
| quickSort(8, 8) | – | single element, already in place | 1 2 3 4 5 6 7 8 9 |`,
          keys: ["quicksort(0, 8)", "pivot 5", "pivot 2", "pivot 7", "pivot 8", "1 2 3 4 5 6 7 8 9"]
        },
        {
          id: "u1-quick-code",
          kind: "code",
          q: "Quick sort: C++ code (partition and quickSort).",
          a: `\`\`\`cpp
int partition(int A[], int low, int high) {
    int pivot = A[high];               // last element as pivot
    int i = low - 1;
    for (int j = low; j <= high - 1; j++) {
        if (A[j] < pivot) {
            i++;
            swap(A[i], A[j]);
        }
    }
    swap(A[i + 1], A[high]);           // put pivot in its final place
    return i + 1;
}

void quickSort(int A[], int low, int high) {
    if (low < high) {
        int p = partition(A, low, high);
        quickSort(A, low, p - 1);
        quickSort(A, p + 1, high);
    }
}
\`\`\``,
          keys: ["pivot = a[high]", "i = low - 1", "a[j] < pivot", "i++", "swap(a[i + 1], a[high])", "return i + 1", "quicksort(a, low, p - 1)", "p + 1"]
        },
        {
          id: "u1-quick-analysis",
          kind: "formula",
          q: "Quick sort: analysis (best/average/worst with recurrences, space, stability, avoiding worst case).",
          a: `Partitioning n elements takes n steps. What matters is how evenly the pivot divides the array.

| Case | When | Recurrence | Time |
|---|---|---|---|
| Best | Pivot always lands in the middle; two equal halves | T(n) = 2T(n/2) + n | O(n log n) |
| Average | Random data; splits are reasonably balanced | solves to about 1.39 n log₂ n | O(n log n) |
| Worst | Pivot is always the smallest or largest element, e.g. array already sorted (or reverse sorted); one part has n − 1 elements, the other 0 | T(n) = T(n−1) + n = n + (n−1) + ... + 1 = n(n+1)/2 | O(n²) |

**Space**: no extra array (in-place), but the recursion stack uses O(log n) on average and O(n) in the worst case. **Stable**: no.

**Avoiding the worst case**: choose the pivot randomly or use the median of the first, middle and last elements.

In practice quick sort is usually the fastest of these sorts for arrays because it works in-place and has small constant factors.`,
          keys: ["t(n) = 2t(n/2) + n", "t(n−1) + n", "n(n+1)/2", "o(n²)", "o(n log n)", "already sorted", "random pivot", "median", "not stable"]
        },
        {
          id: "u1-merge-vs-quick",
          kind: "compare",
          q: "Compare Merge sort and Quick sort.",
          a: `| Point | Merge sort | Quick sort |
|---|---|---|
| Division | Always into two equal halves | Depends on the pivot; parts may be unequal |
| Main work | In merging (after recursive calls) | In partitioning (before recursive calls) |
| Worst-case time | O(n log n) | O(n²) |
| Extra space | O(n), not in-place | O(log n) stack, in-place |
| Stable | Yes | No |
| Best suited for | Linked lists, very large / external data | Arrays in main memory |`,
          keys: ["equal halves", "pivot", "merging", "partitioning", "o(n log n)", "o(n²)", "stable", "in-place"]
        }
      ]
    },
    {
      id: "u1-revision",
      title: "6. Quick Revision Tables",
      cards: [
        {
          id: "u1-rev-sorting",
          kind: "compare",
          q: "Sorting algorithms summary table (best, average, worst, space, stable, in-place, method).",
          a: `| Algorithm | Best | Average | Worst | Space | Stable | In-place | Method |
|---|---|---|---|---|---|---|---|
| Bubble | O(n)* | O(n²) | O(n²) | O(1) | Yes | Yes | Exchange neighbours |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | No | Yes | Select minimum |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Yes | Yes | Insert into sorted part |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | No | Divide and conquer |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | No | Yes | Divide and conquer |

\* with the "swapped" flag; without it the best case of bubble sort is O(n²).`,
          keys: ["bubble", "selection", "insertion", "merge", "quick", "o(n log n)", "o(n²)", "stable"]
        },
        {
          id: "u1-rev-searching",
          kind: "compare",
          q: "Searching algorithms summary table.",
          a: `| Algorithm | Best | Average | Worst | Space | Needs sorted list? |
|---|---|---|---|---|---|
| Linear search | O(1) | O(n) | O(n) | O(1) | No |
| Binary search | O(1) | O(log n) | O(log n) | O(1) | Yes |`,
          keys: ["linear", "binary", "o(1)", "o(n)", "o(log n)", "sorted"]
        },
        {
          id: "u1-rev-hooks",
          kind: "list",
          q: "One-line memory hooks for each sort and for O / Ω / Θ.",
          a: `- **Bubble**: compare neighbours, biggest goes to the end each pass.
- **Selection**: pick the smallest, put it at the front; fewest swaps.
- **Insertion**: like sorting cards in hand; best for nearly sorted data.
- **Merge**: split in half, sort halves, merge; always n log n but needs extra array.
- **Quick**: pivot goes to its place, smaller on left, bigger on right; worst case on already sorted data.
- **O / Ω / Θ**: upper / lower / tight bound → f ≤ c·g / f ≥ c·g / c₁·g ≤ f ≤ c₂·g.`,
          keys: ["neighbours", "smallest", "cards", "split", "pivot", "upper", "lower", "tight"]
        }
      ]
    },
    {
      id: "u1-pyq",
      title: "Question bank (PYQs)",
      cards: [
        {
          id: "u1-pyq-1",
          kind: "pyq",
          q: "Q1. Define the following terms with an example of each: (i) data (ii) data object (iii) data type (iv) data structure. [5] (In-sem Oct 2023, Q1(a))",
          a: `**(i) Data**: a collection of raw facts and figures (numbers, characters, symbols) with no meaning on its own. Example: 21, "Pune", 87.5. When processed and given a meaning it becomes information.

**(ii) Data object**: a set of elements (a domain of values) from which a variable takes its value; in a program it is the storage area (variable) holding a value at run time. Example: Boolean D = {true, false}; \`int marks = 90;\` creates a data object marks.

**(iii) Data type**: a set of values + the set of operations allowed on those values; it tells the compiler how much memory to reserve. Example: \`int\` holds whole numbers and supports + - * / %.

**(iv) Data structure**: a way of organising and storing data in the computer's memory so that it can be accessed and modified efficiently; it describes the data elements, the relationship between them and the operations on them (d = (D, F, A)). Example: array, linked list, stack, queue, tree, graph.`,
          keys: ["raw facts", "domain", "set of values", "operations", "organising", "memory", "example"]
        },
        {
          id: "u1-pyq-2",
          kind: "pyq",
          q: "Q2. Explain with examples: (i) static and dynamic data structures (ii) linear and non-linear data structures. [5] (In-sem Oct 2023 Q1(b); In-sem May 2023 Q1(a))",
          a: `**(i) Static and dynamic data structures**
- **Static**: size is fixed at compile time and cannot be changed later; suitable when the maximum amount of data is known beforehand. Example: array.
- **Dynamic**: can grow and shrink at run time; uses pointers; suitable when the amount of data is not known in advance. Example: linked list, stack/queue (linked), tree, graph.

**(ii) Linear and non-linear data structures**
- **Linear**: elements arranged one after another in a sequence; each element has one predecessor and one successor (except first and last); single level; traversed in one pass. Examples: array, linked list, stack (LIFO), queue (FIFO).
- **Non-linear**: an element can be connected to more than one element; arranged in a hierarchy or network on multiple levels; needs special traversal (DFS, BFS, inorder). Examples: tree (folder structure), graph (road map).

Relationship: linear is one-to-one; non-linear is one-to-many or many-to-many.`,
          keys: ["static", "dynamic", "compile time", "run time", "linear", "non-linear", "hierarchy", "array", "tree"]
        },
        {
          id: "u1-pyq-3",
          kind: "pyq",
          q: "Q3. What is time complexity? How is the time complexity of an algorithm computed? Explain how frequency count is used, with an example. [5] (In-sem Oct 2023 Q2(b); In-sem May 2023 Q2(b))",
          a: `**Definition**: time complexity is the amount of computer time an algorithm needs to run to completion, written as a function of the input size n.

**How computed**: not in seconds (machine dependent) but by counting how many times basic statements execute: the **frequency count / step count method**. Then keep only the fastest-growing term and drop its constant.

**Rules**: comments and declarations = 0; assignment, comparison, return = 1; loop header \`for (i = 0; i < n; i++)\` runs n + 1 times; its body runs n times.

**Example: sum of n array elements**

| Statement | Frequency |
|---|---|
| sum = 0; | 1 |
| for (i = 0; i < n; i++) | n+1 |
| sum = sum + A[i]; | n |
| return sum; | 1 |
| Total | 2n + 3 |

T(n) = 2n + 3, so the time complexity is **O(n)**.`,
          keys: ["time complexity", "frequency count", "basic statements", "n+1", "2n + 3", "o(n)", "input size"]
        },
        {
          id: "u1-pyq-4",
          kind: "pyq",
          q: "Q4. Discuss the time complexity and space complexity of an algorithm with examples. Explain Big-O, Omega and Theta notations in brief. [5] (In-sem May 2023 Q1(b))",
          a: `**Space complexity**: total memory an algorithm needs to run to completion, as a function of n. S(P) = c + SP(instance): fixed part c (code, simple variables, constants) + variable part (arrays depending on n, dynamic memory, recursion stack). Example: iterative sum of A[n] uses n + 3 words, O(n); \`return a + b + c\` uses 3 variables, O(1).

**Time complexity**: time an algorithm needs, as a function of n, found by the frequency count. Example: sum of n elements, T(n) = 2n + 3 = O(n); matrix addition T(n) = 2n² + 2n + 1 = O(n²).

**Asymptotic notations** (growth rate for large n):
- **Big-Oh O (upper bound)**: f(n) = O(g(n)) if f(n) ≤ c·g(n) for all n ≥ n₀. Worst case. Example: 3n + 2 ≤ 4n for n ≥ 2, so O(n).
- **Omega Ω (lower bound)**: f(n) ≥ c·g(n) for all n ≥ n₀. Best case. Example: 3n + 2 ≥ 3n, so Ω(n).
- **Theta Θ (tight bound)**: c₁·g(n) ≤ f(n) ≤ c₂·g(n) for all n ≥ n₀. Exact growth / average case. Example: 3n ≤ 3n + 2 ≤ 4n, so Θ(n).`,
          keys: ["space complexity", "time complexity", "fixed part", "variable part", "big-oh", "omega", "theta", "upper bound", "lower bound", "tight bound"]
        },
        {
          id: "u1-pyq-5",
          kind: "pyq",
          q: "Q5. Explain linear search and binary search with an example of each. State the difference between them. [5] (In-sem Oct 2023 Q3(b); In-sem May 2023 Q3(c))",
          a: `**Linear search**: start from the first element and compare the key with every element one by one until found or list ends; list need not be sorted.
Example: key = 33 in 10 14 19 26 27 31 33 35 42 44: compare with 10, 14, 19, 26, 27, 31 (no), 33 (yes) - found at index 6 after 7 comparisons.
Time: best O(1), average and worst O(n); space O(1).

**Binary search**: list must be sorted; compare key with middle; if smaller go left half, if larger go right half (divide and conquer).
Steps: low = 0, high = n−1; while low ≤ high: mid = (low + high)/2; if A[mid] = key found; else if key < A[mid] high = mid−1; else low = mid+1.
Example: key = 47 in 0 4 7 10 14 23 45 47 53:

| Step | low | high | mid | A[mid] | Decision |
|---|---|---|---|---|---|
| 1 | 0 | 8 | 4 | 14 | go right, low = 5 |
| 2 | 5 | 8 | 6 | 45 | go right, low = 7 |
| 3 | 7 | 8 | 7 | 47 | found at index 7 |

Time: best O(1), average and worst O(log n); space O(1).

**Difference**

| Point | Linear | Binary |
|---|---|---|
| Requirement | Unsorted allowed | Must be sorted |
| Method | One by one | Divide and conquer |
| Worst case | O(n) | O(log n) |
| Structure | Array or linked list | Array |`,
          keys: ["linear search", "binary search", "sorted", "mid", "low", "high", "o(n)", "o(log n)", "divide and conquer"]
        },
        {
          id: "u1-pyq-6",
          kind: "pyq",
          q: "Q6. Sort the following list using bubble sort and show the output of each pass: 10, 5, 4, 18, 17, 1, 2. [5] (In-sem Oct 2023 Q3(c))",
          a: `**Bubble sort**: compare neighbours, swap if A[j] > A[j+1]; after each pass the largest goes to the end.

| Pass | Array after the pass |
|---|---|
| Given | 10, 5, 4, 18, 17, 1, 2 |
| Pass 1 | 5, 4, 10, 17, 1, 2, 18 |
| Pass 2 | 4, 5, 10, 1, 2, 17, 18 |
| Pass 3 | 4, 5, 1, 2, 10, 17, 18 |
| Pass 4 | 4, 1, 2, 5, 10, 17, 18 |
| Pass 5 | 1, 2, 4, 5, 10, 17, 18 |
| Pass 6 | no swap, stop (with flag) |

**Sorted list: 1, 2, 4, 5, 10, 17, 18.**

Time O(n²) (worst), space O(1), stable.`,
          keys: ["5, 4, 10, 17, 1, 2, 18", "pass 1", "swap", "1, 2, 4, 5, 10, 17, 18", "largest", "no swap"]
        },
        {
          id: "u1-pyq-7",
          kind: "pyq",
          q: "Q7. Explain sort stability, efficiency and passes with an example. List the characteristics of sorting algorithms. [5] (In-sem Oct 2023 Q4(a); In-sem May 2023 Q3(a))",
          a: `**Stability**: a sort is stable if equal keys stay in their original order. Example: sorting (Amit, 70), (Riya, 60), (Zoya, 70) by marks with a stable sort always keeps Amit before Zoya. Bubble, insertion and merge sort are stable; selection and quick sort are not.

**Efficiency**: measured by the number of comparisons and swaps, i.e. time complexity (O(n²) for the simple sorts, O(n log n) for merge and quick sort), and the extra memory used.

**Passes**: one complete scan of the unsorted part; bubble, selection and insertion sort need n − 1 passes for n elements. Example: bubble sort of 5 3 8 4 6 takes pass 1 → 3 5 4 6 8, pass 2 → 3 4 5 6 8.

**Characteristics of sorting algorithms**
- **Internal / external** sorting (main memory vs disk)
- **In-place** (O(1) extra memory)
- **Stable** (equal elements keep relative order)
- **Adaptive** (faster on partly sorted input)
- **Time complexity** (best / average / worst) and **space**
- **Number of passes**`,
          keys: ["stable", "equal keys", "original order", "efficiency", "comparisons", "swaps", "pass", "n − 1", "in-place", "adaptive"]
        },
        {
          id: "u1-pyq-8",
          kind: "pyq",
          q: "Q8. Sort the following numbers using quick sort, showing each partition: 25, 57, 48, 37, 12, 92, 86, 33. [5] (In-sem Oct 2023 Q4(b))",
          a: `**Method**: last element is the pivot; i = low − 1; j scans low..high−1; if A[j] < pivot then i++ and swap A[i], A[j]; finally swap A[i+1] with pivot.

| Call | Pivot | Result of partition |
|---|---|---|
| quickSort(0, 7) | 33 | 25, 12, 33, 37, 57, 92, 86, 48 (33 fixed at index 2) |
| quickSort(0, 1) | 12 | 12, 25, 33, 37, 57, 92, 86, 48 (12 at index 0) |
| quickSort(3, 7) | 48 | 12, 25, 33, 37, 48, 92, 86, 57 (48 at index 4) |
| quickSort(5, 7) | 57 | 12, 25, 33, 37, 48, 57, 86, 92 (57 at index 5) |
| quickSort(6, 7) | 92 | 12, 25, 33, 37, 48, 57, 86, 92 (92 at index 7) |

**Sorted list: 12, 25, 33, 37, 48, 57, 86, 92.**

Time: best/average O(n log n), worst O(n²); in-place; not stable.`,
          keys: ["pivot", "33", "25, 12, 33, 37, 57, 92, 86, 48", "partition", "12, 25, 33, 37, 48, 57, 86, 92", "last element"]
        },
        {
          id: "u1-pyq-9",
          kind: "pyq",
          q: "Q9. Sort the data using merge sort and show all passes: 10, 5, 7, 6, 1, 4, 8, 3, 2, 9. [5] (In-sem Oct 2023 Q4(c))",
          a: `**Merge sort**: divide at mid = (low + high)/2 until one element; then merge sorted halves.

**Divide**
- 10 5 7 6 1 | 4 8 3 2 9
- 10 5 7 | 6 1 | 4 8 3 | 2 9
- 10 5 | 7 | 6 | 1 | 4 8 | 3 | 2 | 9
- 10 | 5 | 7 | 6 | 1 | 4 | 8 | 3 | 2 | 9

**Merge (in order of the recursive calls)**
1. 10 + 5 → 5 10
2. 5 10 + 7 → 5 7 10
3. 6 + 1 → 1 6
4. 5 7 10 + 1 6 → 1 5 6 7 10
5. 4 + 8 → 4 8
6. 4 8 + 3 → 3 4 8
7. 2 + 9 → 2 9
8. 3 4 8 + 2 9 → 2 3 4 8 9
9. 1 5 6 7 10 + 2 3 4 8 9 → **1 2 3 4 5 6 7 8 9 10**

**Sorted list: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.**

Time O(n log n) in all cases; space O(n); stable.`,
          keys: ["divide", "merge", "5 10", "1 5 6 7 10", "2 3 4 8 9", "1, 2, 3, 4, 5, 6, 7, 8, 9, 10", "o(n log n)"]
        },
        {
          id: "u1-pyq-10",
          kind: "pyq",
          q: "Q10. Write the algorithm for insertion sort and explain its best-case and worst-case time complexity. [5] (In-sem May 2023 Q4(b))",
          a: `**Idea**: keep the left part sorted; take the next element (key), shift larger sorted elements one place right, insert key in the gap. Start from index 1.

**Algorithm**
1. Start.
2. Read n and the array A.
3. Set i = 1.
4. If i ≥ n, go to step 9.
5. Set key = A[i] and j = i − 1.
6. While j ≥ 0 and A[j] > key: set A[j+1] = A[j] and j = j − 1.
7. Set A[j+1] = key.
8. Set i = i + 1 and go to step 4.
9. Print the sorted array. Stop.

**Pseudocode**
\`\`\`
Algorithm InsertionSort(A, n)
{
    for i ← 1 to n-1 do
    {
        key ← A[i]
        j ← i - 1
        while (j ≥ 0 and A[j] > key) do
        {
            A[j+1] ← A[j]
            j ← j - 1
        }
        A[j+1] ← key
    }
}
\`\`\`

**Best case**: array already sorted; the while condition fails at once in every pass, so only n − 1 comparisons and no shifts: **O(n)**.

**Worst case**: array reverse sorted; every key is shifted to the front, comparisons 1 + 2 + ... + (n−1) = n(n−1)/2: **O(n²)**.

Average: about n²/4 comparisons, O(n²). Space O(1), stable.`,
          keys: ["key = a[i]", "j = i − 1", "a[j] > key", "shift", "best case", "o(n)", "worst case", "o(n²)", "n(n−1)/2", "reverse sorted"]
        }
      ]
    }
  ]
});
