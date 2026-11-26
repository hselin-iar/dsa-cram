window.DSA = window.DSA || [];
window.DSA.push({
  unit: 5,
  title: "Hashing and File Systems",
  topics: [
    {
      id: "u5-hash-basics",
      title: "1. Hashing: Basic Concepts",
      cards: [
        {
          id: "u5-hashing-def",
          kind: "def",
          q: "What is hashing? Why is it used?",
          a: `Linear search needs **O(n)** comparisons and binary search **O(log n)**. Hashing finds a record in **constant time, O(1)**, without comparing it with many other records: the position of a record is **calculated from its key**.

**Hashing** is a searching technique in which a large domain of key values is placed into specific locations of a table called the **hash table**, and the location is calculated from the key value itself using a **hash function**. To search for the key, the same function is applied again and we go directly to that location.

Daily life: a college roll number retrieves a student's information; a library book number tells the exact position of the book and to whom it is issued.`,
          keys: ["searching technique", "hash table", "hash function", "key", "o(1)", "location"],
          tip: "Roll number -> straight to the student: no scanning."
        },
        {
          id: "u5-hash-table-function",
          kind: "def",
          q: "Define hash table and hash function. What is the idea of hashing?",
          a: `- **Hash table**: an array of some constant size in which a key value is placed at a specific location.
- **Hash function**: a function that translates keys into array indices. Large keys are converted into small keys (indices) by the hash function.
- **Idea of hashing**: distribute the entries (key/value pairs) **uniformly** across the array, so that an element can be accessed in **O(1)** time using its key.`,
          keys: ["array", "constant size", "translates keys", "indices", "uniformly", "o(1)"]
        },
        {
          id: "u5-hash-example",
          kind: "trace",
          q: "Show with an example how keys 23, 45, 18 are mapped into a hash table using h(k) = k mod 10.",
          a: `Hash function: **h(k) = k mod 10**, table positions 0 to 9.

| Key | h(k) | Stored at index |
|---|---|---|
| 23 | 23 mod 10 = 3 | 3 |
| 45 | 45 mod 10 = 5 | 5 |
| 18 | 18 mod 10 = 8 | 8 |

Keys are mapped to table positions by the hash function. To search 45, compute h(45) = 5 and go directly to index 5.`,
          keys: ["k mod 10", "index 3", "index 5", "index 8", "directly"]
        },
        {
          id: "u5-terminology",
          kind: "compare",
          q: "Hashing terminology: define key, hash table, hash function, home address, bucket.",
          a: `| Term | Meaning |
|---|---|
| Key | The value used to identify a record (roll number, account number, word ...). |
| Hash table | An array of fixed size m in which the records are stored. Its positions are numbered 0 to m − 1. |
| Hash function h(k) | A function that takes a key k and returns an index between 0 and m − 1. Example: h(k) = k mod 10. |
| Hash value / home address | The index h(k) produced for a key. It is the place where the key should ideally be stored. |
| Bucket | One position of the hash table. A bucket may have one or more slots, each able to hold one record. |`,
          keys: ["key", "fixed size m", "0 to m − 1", "home address", "bucket", "slots"]
        },
        {
          id: "u5-collision-def",
          kind: "def",
          q: "Define collision, synonyms and overflow.",
          a: `- **Collision**: the situation when two different keys get the same hash value, h(k1) = h(k2). Example: 23 mod 10 = 3 and 43 mod 10 = 3.
- **Synonyms**: keys that hash to the same address. 23 and 43 are synonyms.
- **Overflow**: the situation when a key hashes to a bucket that is already full. If each bucket has only one slot, every collision is also an overflow.`,
          keys: ["same hash value", "synonyms", "same address", "bucket", "full", "one slot"]
        },
        {
          id: "u5-load-factor",
          kind: "formula",
          q: "What is the load factor (λ)? What does a smaller λ mean?",
          a: `**λ = n / m = (number of keys stored) / (size of the table)**

It shows how full the table is. A **smaller λ means fewer collisions**.`,
          keys: ["λ", "n / m", "keys stored", "table size", "fewer collisions"]
        },
        {
          id: "u5-terms-misc",
          kind: "def",
          q: "Define probe, clustering, perfect hash function and rehashing.",
          a: `- **Probe**: one access (look-up) of a table position while inserting or searching.
- **Clustering**: keys getting collected in groups of neighbouring positions, which makes later insertions and searches slow.
- **Perfect hash function**: a hash function that gives a different address for every key of a given set, so there is **no collision**.
- **Rehashing**: when the table becomes too full, a **bigger table** is created (about **double** the size, usually **prime**) and all keys are inserted again using a new hash function.`,
          keys: ["probe", "clustering", "perfect", "no collision", "rehashing", "double", "prime"]
        },
        {
          id: "u5-good-hash",
          kind: "list",
          q: "Write the characteristics of a good hash function.",
          a: `1. It should be **easy and fast to compute**.
2. It should **distribute the keys uniformly** over the whole table, so that collisions are few.
3. It should **use all parts of the key** (all digits or characters), so that similar keys do not land together.
4. It should always give the **same address for the same key** (deterministic).
5. The address must lie **within the table range 0 to m − 1**.`,
          keys: ["fast", "uniformly", "all parts", "deterministic", "same address", "0 to m − 1"],
          tip: "F-U-A-D-R: Fast, Uniform, All parts, Deterministic, Range."
        }
      ]
    },
    {
      id: "u5-hash-functions",
      title: "2. Hashing Functions",
      cards: [
        {
          id: "u5-hf-division",
          kind: "concept",
          q: "Explain the division (modulo) method of hashing with an example.",
          a: `**h(k) = k mod m**

Divide the key by the table size m and take the **remainder**. It is the simplest and most used method. **m should be a prime number not close to a power of 2**, because that spreads the keys better.

Example: m = 97, k = 3205. 3205 mod 97 = 4, so the key is stored at index 4.`,
          keys: ["k mod m", "remainder", "simplest", "prime", "power of 2"]
        },
        {
          id: "u5-hf-midsquare",
          kind: "concept",
          q: "Explain the mid-square method of hashing with an example.",
          a: `**Square the key and take some digits from the middle of the square** as the address. The middle digits depend on all digits of the key, so the spread is good.

Example: k = 3205, table of 100 positions (2 digits needed). k² = 10272025. The middle two digits are 72, so **h(k) = 72**.`,
          keys: ["square", "middle digits", "all digits", "10272025", "72"]
        },
        {
          id: "u5-hf-folding",
          kind: "concept",
          q: "Explain the folding method (fold-shift and fold-boundary) with an example.",
          a: `Break the key into **parts of equal length** (the last part may be shorter), **add the parts and ignore the final carry**.

- **Fold-shift**: add the parts as they are.
- **Fold-boundary**: **reverse the first and the last parts** (as if the paper were folded at the boundaries) and then add.

Example: k = 123456789, table of 1000 positions (3-digit address). Parts: 123, 456, 789.

- Fold-shift: 123 + 456 + 789 = 1368; ignoring the carry, **h(k) = 368**.
- Fold-boundary: 321 + 456 + 987 = 1764; ignoring the carry, **h(k) = 764**.`,
          keys: ["equal parts", "add", "carry", "fold-shift", "fold-boundary", "reverse"]
        },
        {
          id: "u5-hf-digit-extraction",
          kind: "concept",
          q: "Explain the digit extraction (digit analysis) method with an example.",
          a: `**Select some digits of the key from fixed positions** and use them as the address. The positions chosen should be the ones whose digits **vary the most**.

Example: k = 379452; taking the 1st, 3rd and 5th digits gives **h(k) = 395**.`,
          keys: ["select digits", "fixed positions", "vary the most", "379452", "395"]
        },
        {
          id: "u5-hf-multiplication",
          kind: "formula",
          q: "Explain the multiplication method of hashing (formula and example).",
          a: `**h(k) = ⌊ m × (k × A mod 1) ⌋, where 0 < A < 1**

Multiply the key by a constant A, take the **fractional part**, multiply it by m and take the **floor**. A common choice is **A = 0.618** (the golden ratio constant). The value of m is not critical here.

Example: k = 123, m = 100, A = 0.618. k × A = 76.014; fractional part = 0.014; 100 × 0.014 = 1.4, so **h(k) = 1**.`,
          keys: ["constant a", "fractional part", "floor", "0.618", "golden ratio", "m not critical"]
        },
        {
          id: "u5-hf-strings",
          kind: "concept",
          q: "How are string keys hashed?",
          a: `For string keys, the **ASCII codes of the characters are combined** (for example added, or added with weights) and then the **division method** is applied.`,
          keys: ["ascii", "combined", "added", "weights", "division method"]
        },
        {
          id: "u5-hf-list",
          kind: "list",
          q: "List the five hashing functions (methods) in this unit.",
          a: `1. **Division (modulo)** method: h(k) = k mod m
2. **Mid-square** method
3. **Folding** method (fold-shift, fold-boundary)
4. **Digit extraction** (digit analysis) method
5. **Multiplication** method: h(k) = ⌊m × (k × A mod 1)⌋`,
          keys: ["division", "mid-square", "folding", "digit extraction", "multiplication"]
        }
      ]
    },
    {
      id: "u5-collision-handling",
      title: "3. Collision and Overflow Handling",
      cards: [
        {
          id: "u5-collision-why",
          kind: "concept",
          q: "Why can collisions not be avoided, and what does a collision resolution technique do?",
          a: `The number of possible keys is usually **much larger than the table size**, so collisions cannot be avoided completely. A **collision resolution technique** decides where to store a key when its home address is already occupied.`,
          keys: ["keys larger than table", "unavoidable", "home address", "occupied", "where to store"]
        },
        {
          id: "u5-closed-open-hashing",
          kind: "concept",
          q: "Write a short note on closed hashing and open hashing.",
          a: `- **Closed hashing** (also called **open addressing**): every key is stored **inside the hash table itself**; when a collision occurs another empty position of the same table is found by **probing** (linear probing, quadratic probing, double hashing).
- **Open hashing** (also called **separate chaining**): the keys that collide are stored **outside the table in a linked list** attached to that position.`,
          keys: ["closed hashing", "open addressing", "inside the table", "probing", "open hashing", "separate chaining", "linked list"]
        },
        {
          id: "u5-collision-classification",
          kind: "list",
          q: "Classify the collision / overflow handling techniques.",
          a: `**Collision / overflow handling**

- **Open addressing (closed hashing)** = overflow handling **without chaining**: linear probing, quadratic probing, double hashing.
- **Chaining** = overflow handling **with chaining**: separate chaining, chaining without replacement, chaining with replacement.`,
          keys: ["open addressing", "linear", "quadratic", "double hashing", "separate chaining", "replacement"]
        },
        {
          id: "u5-collision-techniques",
          kind: "compare",
          q: "Explain the two families of collision resolution: open addressing vs chaining.",
          a: `| Technique | Idea |
|---|---|
| Open addressing (closed hashing), overflow handling without chaining | All keys are stored inside the table itself. On a collision, other positions of the table are examined (probed) in a fixed sequence until an empty one is found. Methods: linear probing, quadratic probing, double hashing. |
| Chaining, overflow handling with chaining | Synonyms are linked together in a chain. In separate chaining (open hashing) every table position points to a linked list outside the table. In chaining with / without replacement the chain is kept inside the table using an extra link field. |

Common example used in this unit: table size 10, h(k) = k mod 10, keys **11, 32, 41, 54, 33, 22, 76** inserted in this order.`,
          keys: ["inside the table", "probed", "fixed sequence", "chain", "linked list", "link field"]
        }
      ]
    },
    {
      id: "u5-linear-probing",
      title: "3.1 Open Addressing: Linear Probing",
      cards: [
        {
          id: "u5-lp-def",
          kind: "def",
          q: "Define linear probing and give its formula.",
          a: `**Linear probing**: if the home position h(k) is occupied, examine the **next positions one by one**, h(k) + 1, h(k) + 2, ..., going back to position 0 after the last position, until an empty position is found.

**hᵢ(k) = (h(k) + i) mod m, i = 0, 1, 2, ..., m − 1**`,
          keys: ["next positions", "one by one", "(h + i) mod m", "wrap", "empty position"]
        },
        {
          id: "u5-lp-insert-algo",
          kind: "algo",
          q: "Write the algorithm to INSERT a key using linear probing.",
          a: `1. Compute h = key mod m. Set i = 0.
2. If i = m, the table is full; stop.
3. Compute pos = (h + i) mod m.
4. If table[pos] is empty, store the key there and stop.
5. Otherwise set i = i + 1 and go to step 2.

Pseudocode:

\`\`\`
Algorithm LP_Insert(key)
{
    h ← key mod m
    for i ← 0 to m-1 do
    {
        pos ← (h + i) mod m
        if (table[pos] = EMPTY) then
        {
            table[pos] ← key
            return
        }
    }
    write "Table is full"
}
\`\`\``,
          keys: ["h = key mod m", "pos", "(h + i) mod m", "empty", "table is full", "i = i + 1"]
        },
        {
          id: "u5-lp-search-algo",
          kind: "algo",
          q: "Write the algorithm to SEARCH for a key using linear probing.",
          a: `1. Compute h = key mod m. Set i = 0.
2. If i = m, the key is not present; stop.
3. Compute pos = (h + i) mod m.
4. If table[pos] = key, the key is found at pos; stop.
5. If table[pos] is empty (never used), the key is not present; stop.
6. Otherwise set i = i + 1 and go to step 2.

Pseudocode:

\`\`\`
Algorithm LP_Search(key)
{
    h ← key mod m
    for i ← 0 to m-1 do
    {
        pos ← (h + i) mod m
        if (table[pos] = key) then
            return pos
        if (table[pos] = EMPTY) then
            return -1
    }
    return -1
}
\`\`\``,
          keys: ["found at pos", "empty", "not present", "(h + i) mod m", "return -1"]
        },
        {
          id: "u5-lp-trace",
          kind: "trace",
          q: "Insert 11, 32, 41, 54, 33, 22, 76 into a table of size 10 (h = k mod 10) using linear probing. Show probes and the final table.",
          a: `| Key | h(k) | Positions probed | Probes | Stored at | Remark |
|---|---|---|---|---|---|
| 11 | 1 | 1 | 1 | 1 | home position is free |
| 32 | 2 | 2 | 1 | 2 | home position is free |
| 41 | 1 | 1→2→3 | 3 | 3 | collision at 1, 2; free at 3 |
| 54 | 4 | 4 | 1 | 4 | home position is free |
| 33 | 3 | 3→4→5 | 3 | 5 | collision at 3, 4; free at 5 |
| 22 | 2 | 2→3→4→5→6 | 5 | 6 | collision at 2, 3, 4, 5; free at 6 |
| 76 | 6 | 6→7 | 2 | 7 | collision at 6; free at 7 |

Final hash table (linear probing):

| Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| Key | – | 11 | 32 | 41 | 54 | 33 | 22 | 76 | – | – |

**Total probes = 16**`,
          keys: ["41 at 3", "33 at 5", "22 at 6", "76 at 7", "16 probes", "collision"]
        },
        {
          id: "u5-lp-deletion",
          kind: "concept",
          q: "How is deletion done in linear probing? Why can a position not simply be made empty?",
          a: `A deleted position **cannot simply be made empty**, because a search for a key stored beyond it would stop there by mistake. So the position is marked with a special value **DELETED** (a **tombstone**). Search **continues past** such a position; insertion **may reuse** it.`,
          keys: ["deleted", "tombstone", "search continues", "insertion reuse", "stop by mistake"],
          tip: "Tombstone = 'someone was here, keep walking'."
        },
        {
          id: "u5-lp-adv-dis",
          kind: "list",
          q: "State the advantages and disadvantage of linear probing. What is primary clustering?",
          a: `**Advantages**

- Very simple.
- No extra memory for links.
- Good use of the cache.

**Disadvantage: primary clustering.** Occupied positions join into **long continuous blocks**. Any key that hashes anywhere into a block must travel to its end, and then makes the block even longer, so performance drops quickly as the table fills.`,
          keys: ["simple", "no extra memory", "cache", "primary clustering", "continuous blocks"]
        },
        {
          id: "u5-lp-code",
          kind: "code",
          q: "Write C++ code for linear probing: init, insert, search and remove.",
          a: `\`\`\`cpp
#define SIZE 10
#define EMPTY -1
#define DELETED -2
int table[SIZE];

void init() {
    for (int i = 0; i < SIZE; i++) table[i] = EMPTY;
}

void insert(int key) {
    int h = key % SIZE;
    for (int i = 0; i < SIZE; i++) {
        int pos = (h + i) % SIZE;
        if (table[pos] == EMPTY || table[pos] == DELETED) {
            table[pos] = key;
            return;
        }
    }
    cout << "Table is full\\n";
}

int search(int key) {                     // returns index, or -1
    int h = key % SIZE;
    for (int i = 0; i < SIZE; i++) {
        int pos = (h + i) % SIZE;
        if (table[pos] == key)   return pos;
        if (table[pos] == EMPTY) return -1;
    }
    return -1;
}

void remove(int key) {
    int pos = search(key);
    if (pos != -1) table[pos] = DELETED;   // leave a tombstone
}
\`\`\``,
          keys: ["key % size", "(h + i) % size", "empty", "deleted", "table[pos] == key", "return -1"]
        }
      ]
    },
    {
      id: "u5-quadratic-probing",
      title: "3.2 Open Addressing: Quadratic Probing",
      cards: [
        {
          id: "u5-qp-def",
          kind: "def",
          q: "Define quadratic probing and give its formula.",
          a: `**Quadratic probing**: if the home position is occupied, examine the positions at distances 1², 2², 3², ... from it, that is **h + 1, h + 4, h + 9, ...** (all mod m).

**hᵢ(k) = (h(k) + i²) mod m, i = 0, 1, 2, ...**

The algorithm is the same as linear probing; only the formula for pos changes from (h + i) to **(h + i * i)**.`,
          keys: ["1², 2², 3²", "h + 1", "h + 4", "h + 9", "(h + i²) mod m"]
        },
        {
          id: "u5-qp-algo",
          kind: "algo",
          q: "Write the pseudocode for insertion using quadratic probing.",
          a: `\`\`\`
Algorithm QP_Insert(key)
{
    h ← key mod m
    for i ← 0 to m-1 do
    {
        pos ← (h + i*i) mod m
        if (table[pos] = EMPTY) then
        {   table[pos] ← key;   return   }
    }
    write "No free position found"
}
\`\`\``,
          keys: ["h ← key mod m", "i*i", "pos", "empty", "no free position"]
        },
        {
          id: "u5-qp-trace",
          kind: "trace",
          q: "Insert 11, 32, 41, 54, 33, 22, 76 into a table of size 10 (h = k mod 10) using quadratic probing.",
          a: `| Key | h(k) | Positions probed | Probes | Stored at | Remark |
|---|---|---|---|---|---|
| 11 | 1 | 1 | 1 | 1 | home position is free |
| 32 | 2 | 2 | 1 | 2 | home position is free |
| 41 | 1 | 1→2→5 | 3 | 5 | collision at 1, 2; free at 5 |
| 54 | 4 | 4 | 1 | 4 | home position is free |
| 33 | 3 | 3 | 1 | 3 | home position is free |
| 22 | 2 | 2→3→6 | 3 | 6 | collision at 2, 3; free at 6 |
| 76 | 6 | 6→7 | 2 | 7 | collision at 6; free at 7 |

Final hash table (quadratic probing):

| Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| Key | – | 11 | 32 | 33 | 54 | 41 | 22 | 76 | – | – |

**Total probes = 12**`,
          keys: ["41 at 5", "1→2→5", "22 at 6", "12 probes", "33 at 3"]
        },
        {
          id: "u5-qp-adv-dis",
          kind: "list",
          q: "State the advantages and disadvantages of quadratic probing over linear probing.",
          a: `**Advantage**: the probes **jump away from the home position**, so the long blocks of linear probing do not form (**no primary clustering**).

**Disadvantages**

- Keys with the same home address still follow the same probe sequence (**secondary clustering**).
- The probe sequence **may not visit every position**, so a free position can be missed.
- If **m is prime** and the table is **less than half full (λ < 0.5)**, an empty position is always found.`,
          keys: ["no primary clustering", "secondary clustering", "may not visit", "prime", "λ < 0.5", "same probe sequence"]
        },
        {
          id: "u5-qp-code",
          kind: "code",
          q: "Write C++ code for quadratic probing: init, insert and search.",
          a: `\`\`\`cpp
#define SIZE 10
#define EMPTY -1
int table[SIZE];

void init() { for (int i = 0; i < SIZE; i++) table[i] = EMPTY; }

void insert(int key) {
    int h = key % SIZE;
    for (int i = 0; i < SIZE; i++) {
        int pos = (h + i * i) % SIZE;
        if (table[pos] == EMPTY) { table[pos] = key; return; }
    }
    cout << "No free position found\\n";
}

int search(int key) {
    int h = key % SIZE;
    for (int i = 0; i < SIZE; i++) {
        int pos = (h + i * i) % SIZE;
        if (table[pos] == key)   return pos;
        if (table[pos] == EMPTY) return -1;
    }
    return -1;
}
\`\`\``,
          keys: ["(h + i * i) % size", "empty", "table[pos] == key", "return -1", "no free position"]
        },
        {
          id: "u5-double-hashing",
          kind: "concept",
          q: "What is double hashing?",
          a: `A **second hash function decides the step size**:

**hᵢ(k) = (h₁(k) + i × h₂(k)) mod m**, for example **h₂(k) = 7 − (k mod 7)**.

Different keys then get different step sizes, which **removes secondary clustering** as well.`,
          keys: ["second hash function", "step size", "h1", "h2", "secondary clustering", "7 − (k mod 7)"]
        },
        {
          id: "u5-lp-vs-qp",
          kind: "compare",
          q: "Compare linear probing and quadratic probing.",
          a: `| Point | Linear probing | Quadratic probing |
|---|---|---|
| Probe sequence | h, h+1, h+2, h+3, ... | h, h+1, h+4, h+9, ... |
| Formula | (h + i) mod m | (h + i²) mod m |
| Clustering | Primary clustering | Secondary clustering only |
| Visits all positions? | Yes; a free position is always found | Not always; needs prime m and λ < 0.5 |
| Simplicity | Simplest | Slightly more calculation |`,
          keys: ["h+1", "h+4", "primary clustering", "secondary clustering", "prime", "simplest"]
        }
      ]
    },
    {
      id: "u5-separate-chaining",
      title: "3.3 Separate Chaining (Open Hashing)",
      cards: [
        {
          id: "u5-sc-def",
          kind: "def",
          q: "Define separate chaining.",
          a: `**Separate chaining**: every position of the hash table holds a **pointer to a linked list (chain)**. All keys that hash to the same position are stored in the list of that position. A collision just **adds one more node** to the list.`,
          keys: ["pointer", "linked list", "chain", "same position", "one more node"]
        },
        {
          id: "u5-sc-insert-algo",
          kind: "algo",
          q: "Write the algorithm to INSERT a key in separate chaining.",
          a: `1. Compute h = key mod m.
2. Create newNode with the key and next = NULL.
3. If table[h] = NULL, set table[h] = newNode.
4. Otherwise go to the last node of the list at table[h] and link newNode after it. (Inserting at the beginning of the list is also correct and takes O(1).)

Pseudocode:

\`\`\`
Algorithm SC_Insert(key)
{
    h ← key mod m
    newNode ← new Node;  newNode->data ← key;  newNode->next ← NULL
    if (table[h] = NULL) then table[h] ← newNode
    else
    {
        temp ← table[h]
        while (temp->next ≠ NULL) do temp ← temp->next
        temp->next ← newNode
    }
}
\`\`\``,
          keys: ["h = key mod m", "newnode", "next = null", "table[h]", "last node", "link"]
        },
        {
          id: "u5-sc-search-algo",
          kind: "algo",
          q: "Write the algorithm to SEARCH for a key in separate chaining.",
          a: `1. Compute h = key mod m and set temp = table[h].
2. While temp ≠ NULL: if temp->data = key, the key is found; otherwise temp = temp->next.
3. If the list ends, the key is not present.

Pseudocode:

\`\`\`
Algorithm SC_Search(key)
{
    temp ← table[key mod m]
    while (temp ≠ NULL) do
    {
        if (temp->data = key) then return true
        temp ← temp->next
    }
    return false
}
\`\`\``,
          keys: ["temp = table[h]", "temp->data = key", "temp->next", "list ends", "not present"]
        },
        {
          id: "u5-sc-trace",
          kind: "trace",
          q: "Insert 11, 32, 41, 54, 33, 22, 76 using separate chaining (size 10, h = k mod 10). Show the lists.",
          a: `| Index | Chain |
|---|---|
| 0 | NULL |
| 1 | 11 → 41 → NULL |
| 2 | 32 → 22 → NULL |
| 3 | 33 → NULL |
| 4 | 54 → NULL |
| 5 | NULL |
| 6 | 76 → NULL |
| 7 | NULL |
| 8 | NULL |
| 9 | NULL |

11 and 41 share the list of position 1; 32 and 22 share the list of position 2.`,
          keys: ["11 → 41", "32 → 22", "33", "54", "76", "null"]
        },
        {
          id: "u5-sc-adv-dis",
          kind: "list",
          q: "State the advantages and disadvantages of separate chaining. What is the average time?",
          a: `**Advantages**

- Simple.
- The table never becomes "full" (λ can be more than 1).
- Deletion is easy (delete a node from a list).
- No clustering.

**Disadvantages**

- Extra memory for the pointers.
- Some table positions stay unused while lists grow.
- If many keys fall in one list, searching that list takes **O(n)**.

With a good hash function the average length of a list is the load factor λ, so the average time for search, insert and delete is **O(1 + λ)**.`,
          keys: ["never full", "λ", "easy deletion", "no clustering", "extra memory", "o(1 + λ)", "o(n)"]
        },
        {
          id: "u5-sc-code",
          kind: "code",
          q: "Write C++ code for separate chaining: insert, search, remove and display.",
          a: `\`\`\`cpp
#define SIZE 10
struct Node { int data; Node* next; };
Node* table[SIZE];                  // all NULL at the start

void insert(int key) {
    int h = key % SIZE;
    Node* n = new Node;
    n->data = key; n->next = NULL;
    if (table[h] == NULL) { table[h] = n; return; }
    Node* temp = table[h];
    while (temp->next != NULL) temp = temp->next;
    temp->next = n;
}

bool search(int key) {
    for (Node* t = table[key % SIZE]; t != NULL; t = t->next)
        if (t->data == key) return true;
    return false;
}

void remove(int key) {
    int h = key % SIZE;
    Node *cur = table[h], *prev = NULL;
    while (cur != NULL && cur->data != key) { prev = cur; cur = cur->next; }
    if (cur == NULL) return;                  // not found
    if (prev == NULL) table[h] = cur->next;   // first node of the list
    else prev->next = cur->next;
    delete cur;
}

void display() {
    for (int i = 0; i < SIZE; i++) {
        cout << i << ": ";
        for (Node* t = table[i]; t != NULL; t = t->next) cout << t->data << " -> ";
        cout << "NULL\\n";
    }
}
\`\`\``,
          keys: ["struct node", "table[h]", "temp->next", "prev", "cur", "delete cur", "key % size"]
        }
      ]
    },
    {
      id: "u5-chain-without-replacement",
      title: "3.4 Chaining Without Replacement",
      cards: [
        {
          id: "u5-cwor-def",
          kind: "def",
          q: "Define chaining without replacement. What are the two fields of each table position?",
          a: `Here the chain is kept **inside the hash table**. Every position has two fields: the **key** and a **chain (link) field** that stores the index of the next synonym, or **−1** if there is none.

**Chaining without replacement**: when a collision occurs, the new key is put in the **next empty position found by linear probing**, and that position is **linked to the end of the chain** of its synonyms. A key that is already sitting in the table is **never moved**, even if it is occupying some other key's home position.

In university papers this is also written as "linear probing with chaining, without replacement" (or just "linear probing without replacement"). The positions of the keys are the same as in plain linear probing; the chain only makes searching faster.`,
          keys: ["inside the table", "chain field", "-1", "next empty", "linear probing", "never moved", "end of chain"]
        },
        {
          id: "u5-cwor-algo",
          kind: "algo",
          q: "Write the algorithm for insertion in chaining without replacement.",
          a: `1. Compute h = key mod m.
2. If position h is empty, store the key there and stop.
3. Otherwise find the next empty position j by linear probing from h.
4. Starting at h, find the first position that holds a synonym of the key (a key with the same hash value h). If there is one, follow its chain to the last synonym and set the chain field of that position to j.
5. Store the key at position j.

Pseudocode:

\`\`\`
Algorithm InsertWithoutReplacement(key)
{
    h ← key mod m
    if (table[h].key = EMPTY) then { table[h].key ← key; return }
    j ← h
    repeat j ← (j + 1) mod m until (table[j].key = EMPTY)   // next empty position
    i ← h;  steps ← 0                                       // look for a synonym
    while (steps < m and (table[i].key = EMPTY or table[i].key mod m ≠ h)) do
    {   i ← (i + 1) mod m;  steps ← steps + 1   }
    table[j].key ← key
    if (steps < m) then                                     // a synonym exists
    {
        while (table[i].chain ≠ -1) do i ← table[i].chain   // end of its chain
        table[i].chain ← j
    }
}
\`\`\``,
          keys: ["next empty", "j", "synonym", "chain", "last synonym", "store key at j"]
        },
        {
          id: "u5-cwor-trace",
          kind: "trace",
          q: "Insert 11, 32, 41, 54, 33, 22, 76 using chaining without replacement (size 10, h = k mod 10).",
          a: `| Key | h(k) | What happens |
|---|---|---|
| 11 | 1 | position 1 is free: store at 1 |
| 32 | 2 | position 2 is free: store at 2 |
| 41 | 1 | position 1 is occupied by 11; next empty is 3: store at 3; last synonym is at 1, so chain[1] = 3 |
| 54 | 4 | position 4 is free: store at 4 |
| 33 | 3 | position 3 is occupied by 41 (not a synonym, not moved); next empty is 5: store at 5; no synonym in the table, so no link |
| 22 | 2 | position 2 is occupied by 32; next empty is 6: store at 6; last synonym is at 2, so chain[2] = 6 |
| 76 | 6 | position 6 is occupied by 22 (not a synonym, not moved); next empty is 7: store at 7; no synonym, so no link |

Final table (without replacement):

| Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| Key | – | 11 | 32 | 41 | 54 | 33 | 22 | 76 | – | – |
| Chain | -1 | 3 | 6 | -1 | -1 | -1 | -1 | -1 | -1 | -1 |`,
          keys: ["chain[1] = 3", "chain[2] = 6", "41 at 3", "33 at 5", "not moved", "76 at 7"]
        },
        {
          id: "u5-cwor-solved",
          kind: "trace",
          q: "Solved example (previous year): size 10, h(x) = x mod 10. Insert 31, 3, 4, 21, 61, 6, 71, 8, 9, 25 using linear probing (chaining) without replacement and find the average number of comparisons to search.",
          a: `| Key | h(k) | What happens |
|---|---|---|
| 31 | 1 | position 1 is free: store at 1 |
| 3 | 3 | free: store at 3 |
| 4 | 4 | free: store at 4 |
| 21 | 1 | position 1 occupied by 31; next empty is 2: store at 2; chain[1] = 2 |
| 61 | 1 | position 1 occupied by 31; next empty is 5: store at 5; last synonym is at 2, so chain[2] = 5 |
| 6 | 6 | free: store at 6 |
| 71 | 1 | position 1 occupied by 31; next empty is 7: store at 7; last synonym is at 5, so chain[5] = 7 |
| 8 | 8 | free: store at 8 |
| 9 | 9 | free: store at 9 |
| 25 | 5 | position 5 occupied by 61 (not a synonym, not moved); next empty is 0: store at 0; no link |

Final table:

| Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| Key | 25 | 31 | 21 | 3 | 4 | 61 | 6 | 71 | 8 | 9 |
| Chain | -1 | 2 | 5 | -1 | -1 | 7 | -1 | -1 | -1 | -1 |

Comparisons to search each key (31, 3, 4, 21, 61, 6, 71, 8, 9, 25) = 1 + 1 + 1 + 2 + 3 + 1 + 4 + 1 + 1 + 6 = **21**

**Average = 21/10 = 2.1**`,
          keys: ["chain[1] = 2", "chain[2] = 5", "chain[5] = 7", "25 at 0", "21", "2.1"]
        },
        {
          id: "u5-cwor-drawback",
          kind: "concept",
          q: "What is the drawback of chaining without replacement?",
          a: `A key may be stored at a position that is the **home of some other key** (in the first example, 41 sits at index 3, the home of 33). When 33 arrives it cannot use its own home position, so its **chain does not start at its home address** and searching for it needs **extra probes**.`,
          keys: ["home of other key", "41", "33", "chain does not start at home", "extra probes"]
        }
      ]
    },
    {
      id: "u5-chain-with-replacement",
      title: "3.5 Chaining With Replacement",
      cards: [
        {
          id: "u5-cwr-def",
          kind: "def",
          q: "Define chaining with replacement.",
          a: `**Chaining with replacement**: if the home position of the new key is occupied by a key that **does not belong there** (its own hash value is different), that key is **moved (replaced)** to an empty position and the new key is stored at its home position. So **every chain always starts at its home address**.`,
          keys: ["home position", "does not belong", "moved", "empty position", "chain starts at home"]
        },
        {
          id: "u5-cwr-algo",
          kind: "algo",
          q: "Write the algorithm for insertion in chaining with replacement.",
          a: `1. Compute h = key mod m.
2. If position h is empty, store the key there and stop.
3. Find the next empty position j by linear probing from h.
4. If the key at h is a **synonym** (its hash value is also h): store the new key at j, follow the chain from h to its end and link j there.
5. Otherwise (the key at h does not belong to h): (a) move the key at h, with its chain value, to position j; (b) in that key's chain, find the position whose chain field is h and change it to j; (c) store the new key at h with chain = −1.

Pseudocode:

\`\`\`
Algorithm InsertWithReplacement(key)
{
    h ← key mod m
    if (table[h].key = EMPTY) then { table[h].key ← key; return }
    j ← h
    repeat j ← (j + 1) mod m until (table[j].key = EMPTY)   // next empty position
    if (table[h].key mod m = h) then                        // occupant is a synonym
    {
        i ← h
        while (table[i].chain ≠ -1) do i ← table[i].chain
        table[i].chain ← j
        table[j].key ← key
    }
    else                                                    // occupant is not a synonym
    {
        table[j] ← table[h]                                 // move the occupant to j
        for p ← 0 to m-1 do
            if (table[p].chain = h) then table[p].chain ← j // repair its chain
        table[h].key ← key;  table[h].chain ← -1
    }
}
\`\`\``,
          keys: ["next empty", "synonym", "move", "chain field", "h", "chain = -1", "j"]
        },
        {
          id: "u5-cwr-trace",
          kind: "trace",
          q: "Insert 11, 32, 41, 54, 33, 22, 76 using chaining with replacement (size 10, h = k mod 10).",
          a: `| Key | h(k) | What happens |
|---|---|---|
| 11 | 1 | position 1 is free: store at 1 |
| 32 | 2 | position 2 is free: store at 2 |
| 41 | 1 | position 1 holds its synonym 11; next empty is 3: store at 3; chain[1] = 3 |
| 54 | 4 | position 4 is free: store at 4 |
| 33 | 3 | position 3 holds 41, which belongs to position 1: move 41 to 5 and set chain[1] = 5; store 33 at its home 3 |
| 22 | 2 | position 2 holds its synonym 32; next empty is 6: store at 6; chain[2] = 6 |
| 76 | 6 | position 6 holds 22, which belongs to position 2: move 22 to 7 and set chain[2] = 7; store 76 at its home 6 |

Final table (with replacement), every chain starts at its home position:

| Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| Key | – | 11 | 32 | 33 | 54 | 41 | 76 | 22 | – | – |
| Chain | -1 | 5 | 7 | -1 | -1 | -1 | -1 | -1 | -1 | -1 |`,
          keys: ["move 41 to 5", "chain[1] = 5", "move 22 to 7", "chain[2] = 7", "33 at 3", "76 at 6"]
        },
        {
          id: "u5-cwr-solved",
          kind: "trace",
          q: "Solved example (previous year): create a hash table for 29, 50, 28, 19, 17, 15, 18, 14, 38 with h(k) = k % 10 using chaining with replacement. Find the average comparisons.",
          a: `| Key | h(k) | What happens |
|---|---|---|
| 29 | 9 | position 9 is free: store at 9 |
| 50 | 0 | free: store at 0 |
| 28 | 8 | free: store at 8 |
| 19 | 9 | position 9 holds its synonym 29; next empty is 1: store at 1; chain[9] = 1 |
| 17 | 7 | free: store at 7 |
| 15 | 5 | free: store at 5 |
| 18 | 8 | position 8 holds its synonym 28; next empty is 2: store at 2; chain[8] = 2 |
| 14 | 4 | free: store at 4 |
| 38 | 8 | position 8 holds its synonym 28; next empty is 3: store at 3; chain[2] = 3 |

Final table:

| Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| Key | 50 | 19 | 18 | 38 | 14 | 15 | – | 17 | 28 | 29 |
| Chain | -1 | -1 | 3 | -1 | -1 | -1 | -1 | -1 | 2 | 1 |

Comparisons to search each key = 1 + 1 + 1 + 2 + 1 + 1 + 2 + 1 + 3 = **13**; **average = 13/9 = 1.44**`,
          keys: ["chain[9] = 1", "chain[8] = 2", "chain[2] = 3", "13", "1.44"]
        },
        {
          id: "u5-cwr-search",
          kind: "concept",
          q: "How is searching done in chaining with replacement? How does it compare with insertion cost?",
          a: `Compute h; if position h is **empty** or holds a key with a **different hash value**, the key is **not in the table**; otherwise **follow the chain from h** comparing each key.

Searching is **faster** than without replacement, but **insertion costs more** because of the moving.`,
          keys: ["compute h", "different hash value", "follow the chain", "faster search", "insertion costs more"]
        },
        {
          id: "u5-chain-code",
          kind: "code",
          q: "Write C++ code for chaining without replacement and with replacement (init, nextEmpty, both inserts, search).",
          a: `\`\`\`cpp
#define SIZE 10
#define EMPTY -1
struct Slot { int key; int chain; };
Slot table[SIZE];

void init() {
    for (int i = 0; i < SIZE; i++) { table[i].key = EMPTY; table[i].chain = -1; }
}

int nextEmpty(int h) {                  // linear probing; -1 if the table is full
    for (int i = 1; i < SIZE; i++) {
        int j = (h + i) % SIZE;
        if (table[j].key == EMPTY) return j;
    }
    return -1;
}

void insertWithoutReplacement(int key) {
    int h = key % SIZE;
    if (table[h].key == EMPTY) { table[h].key = key; return; }
    int j = nextEmpty(h);
    if (j == -1) { cout << "Table is full\\n"; return; }
    int i = h, steps = 0;               // find the first synonym
    while (steps < SIZE && (table[i].key == EMPTY || table[i].key % SIZE != h)) {
        i = (i + 1) % SIZE;
        steps++;
    }
    table[j].key = key;
    if (steps < SIZE) {
        while (table[i].chain != -1) i = table[i].chain;
        table[i].chain = j;
    }
}

void insertWithReplacement(int key) {
    int h = key % SIZE;
    if (table[h].key == EMPTY) { table[h].key = key; return; }
    int j = nextEmpty(h);
    if (j == -1) { cout << "Table is full\\n"; return; }
    if (table[h].key % SIZE == h) {     // occupant is a synonym
        int i = h;
        while (table[i].chain != -1) i = table[i].chain;
        table[i].chain = j;
        table[j].key = key;
    } else {                            // replace the occupant
        table[j] = table[h];
        for (int p = 0; p < SIZE; p++)
            if (table[p].chain == h) table[p].chain = j;
        table[h].key = key;
        table[h].chain = -1;
    }
}

int searchWithReplacement(int key) {    // returns index, or -1
    int h = key % SIZE;
    if (table[h].key == EMPTY || table[h].key % SIZE != h) return -1;
    for (int i = h; i != -1; i = table[i].chain)
        if (table[i].key == key) return i;
    return -1;
}
\`\`\``,
          keys: ["struct slot", "chain", "nextempty", "table[j] = table[h]", "table[p].chain == h", "synonym", "key % size != h"]
        },
        {
          id: "u5-with-vs-without",
          kind: "compare",
          q: "Compare chaining without replacement and chaining with replacement.",
          a: `| Point | Without replacement | With replacement |
|---|---|---|
| Key already in the table | Never moved | Moved if it is sitting at another key's home position |
| Start of a chain | May not be at the home address | Always at the home address |
| Insertion | Simpler and faster | More work (move + repair chain) |
| Searching | Slower; may need extra probes to find the chain | Faster; go to the home address and follow the chain |`,
          keys: ["never moved", "moved", "home address", "insertion", "searching", "repair chain"]
        }
      ]
    },
    {
      id: "u5-technique-compare",
      title: "3.6 Comparison of the Techniques",
      cards: [
        {
          id: "u5-oa-vs-sc",
          kind: "compare",
          q: "Compare open addressing (without chaining) and separate chaining (with chaining).",
          a: `| Point | Open addressing (without chaining) | Separate chaining (with chaining) |
|---|---|---|
| Where keys are stored | Inside the table | In linked lists outside the table |
| Extra memory | None | Pointers for every node |
| Load factor | Cannot exceed 1 | Can exceed 1 |
| Table full? | Possible; needs rehashing | Never full |
| Clustering | Yes (primary / secondary) | No |
| Deletion | Difficult (needs tombstones) | Easy |
| Best when | Number of keys is known and the table is not too full | Number of keys is unknown or deletions are frequent |`,
          keys: ["inside the table", "outside", "load factor", "rehashing", "clustering", "tombstones", "deletion"]
        },
        {
          id: "u5-hash-complexity",
          kind: "formula",
          q: "What is the time complexity of hashing (average and worst case)?",
          a: `Search, insert and delete take **O(1) on average** when the load factor is kept small. In the **worst case** (all keys colliding) they take **O(n)**.`,
          keys: ["o(1)", "average", "worst case", "o(n)", "all keys colliding", "load factor"]
        },
        {
          id: "u5-hash-applications",
          kind: "list",
          q: "List the applications of hashing.",
          a: `- Symbol tables in compilers
- Database indexing
- Dictionaries and spell checkers
- Caches
- Password storage and verification
- Sets and maps in programming languages (unordered_map in C++)
- Detecting duplicates
- Library book indexing`,
          keys: ["symbol table", "database indexing", "dictionaries", "caches", "password", "unordered_map", "duplicates"]
        }
      ]
    },
    {
      id: "u5-file-basics",
      title: "4.1 File Systems: Basic Concepts",
      cards: [
        {
          id: "u5-file-def",
          kind: "def",
          q: "What is a file? Define field, record, file and key.",
          a: `Data kept in variables, arrays and linked lists lives in main memory (RAM) and is lost when the program ends. To keep data permanently it must be stored on **secondary storage** (hard disk, SSD) in the form of **files**.

**File** is a **named collection of related records** stored on secondary storage. A **record** is a collection of related fields, and a **field** is a single item of data.

- **Field**: the smallest unit of meaningful data, e.g. roll number, name, marks.
- **Record**: all the fields of one entity, e.g. the details of one student.
- **File**: all the records of the same kind, e.g. the student file of a class.
- **Key (primary key)**: a field whose value is **different for every record** and identifies it, e.g. roll number. Other fields used for searching are **secondary keys**.

Example: a student file with 3 records, each with 3 fields (Roll no., Name, Marks); roll no. is the key.`,
          keys: ["secondary storage", "named collection", "records", "field", "primary key", "secondary keys", "unique"]
        },
        {
          id: "u5-file-types",
          kind: "list",
          q: "What are the types of files?",
          a: `- By the **form of the data**: **text files** and **binary files**.
- By **organisation**: **sequential**, **indexed sequential** and **direct access (random)** files.`,
          keys: ["text", "binary", "sequential", "indexed sequential", "direct access"]
        },
        {
          id: "u5-text-vs-binary",
          kind: "compare",
          q: "Differentiate between a text file and a binary file.",
          a: `| Point | Text file | Binary file |
|---|---|---|
| Stores data as | Readable characters (ASCII) | The same bytes as in memory |
| Readable in an editor | Yes | No |
| Size and speed | Larger and slower (conversion is needed) | Compact and faster |
| Record length | Varies | Fixed, so direct access to the n-th record is easy |
| Read / write in C++ | >> , << , getline() | read() , write() |`,
          keys: ["readable characters", "ascii", "same bytes as memory", "compact", "fixed", "read()", "write()", "getline"]
        },
        {
          id: "u5-file-operations",
          kind: "list",
          q: "List the operations on files.",
          a: `Create a file, open it, write (add) records, read (display) records, search for a record, modify (update) a record, delete a record, append records at the end, close the file.

Other utility operations: **copy, rename, merge and sort**.`,
          keys: ["create", "open", "write", "read", "search", "modify", "delete", "append", "close"]
        }
      ]
    },
    {
      id: "u5-file-organisation",
      title: "4.2 File Organisation",
      cards: [
        {
          id: "u5-file-org-def",
          kind: "def",
          q: "What is file organisation?",
          a: `File organisation is the **way the records are arranged on the storage device**. It decides how records are stored and how they can be accessed.`,
          keys: ["arranged", "records", "storage device", "how accessed"]
        },
        {
          id: "u5-seq-file",
          kind: "concept",
          q: "Explain the sequential file organisation with its advantages and disadvantages.",
          a: `Records are stored **one after another**, in the order of arrival or sorted on the key. To reach a record, **all records before it must be read**. Insertion in the middle and deletion need the file to be **rewritten** (usually through a temporary file).

**Advantages**: simple; no wasted space; best when most records are processed together (payroll, result preparation).

**Disadvantages**: searching is slow, **O(n)**; insertion and deletion are costly.`,
          keys: ["one after another", "read all before", "rewritten", "temporary file", "o(n)", "payroll", "costly"]
        },
        {
          id: "u5-indexed-file",
          kind: "concept",
          q: "Explain the indexed sequential file organisation with its advantages and disadvantages.",
          a: `Records are stored in **key order** (sequentially) and, in addition, an **index** is kept. The index is a small table of **(key, address) pairs**. To find a record, the **index is searched first** and then the file is read from the address given. So both sequential processing and fast random access are possible.

**Advantages**: fast search; supports both sequential and direct access.

**Disadvantages**: extra space for the index; the index must be updated on every insertion and deletion; performance drops as overflow records grow, so the file needs **reorganising** from time to time.`,
          keys: ["key order", "index", "(key, address)", "index first", "extra space", "overflow", "reorganising"]
        },
        {
          id: "u5-direct-file",
          kind: "concept",
          q: "Explain the direct access (random / hashed) file organisation with its advantages and disadvantages.",
          a: `The **address of a record is calculated from its key using a hash function**, and the record is read or written directly at that address without reading the others. Collisions are handled by the techniques of section 3 (probing or chaining). This is where **hashing and file systems meet**.

**Advantages**: fastest access, **O(1) on average**; best for interactive systems (banking, reservations).

**Disadvantages**: records are not in key order, so sequential processing is poor; collisions must be handled; space may be wasted in a table that is partly empty.`,
          keys: ["hash function", "calculated address", "directly", "o(1)", "collisions", "not in key order", "wasted space"]
        },
        {
          id: "u5-file-org-compare",
          kind: "compare",
          q: "Compare the sequential, index sequential and direct access file organisations.",
          a: `| Point | Sequential | Indexed sequential | Direct (hashed) |
|---|---|---|---|
| Arrangement | One after another | In key order + index | At address h(key) |
| Access to a record | Read all earlier records | Through the index | Calculated address |
| Search time | O(n) | O(log n) for the index | O(1) average |
| Insertion / deletion | Costly (rewrite file) | Moderate (update index) | Easy |
| Extra space | None | Index | Unused slots |
| Sequential processing | Very good | Good | Poor |
| Example use | Payroll, backups | Library catalogue | Bank accounts, reservations |`,
          keys: ["one after another", "index", "h(key)", "o(n)", "o(log n)", "o(1)", "rewrite"]
        }
      ]
    },
    {
      id: "u5-cpp-files",
      title: "4.3 File Handling in C++",
      cards: [
        {
          id: "u5-fstream-classes",
          kind: "compare",
          q: "Name the three C++ file stream classes (header <fstream>) with purpose and default mode.",
          a: `C++ treats a file as a **stream of bytes**. The header **<fstream>** provides three classes.

| Class | Purpose | Default mode |
|---|---|---|
| ofstream | Output file stream: write to a file | ios::out |
| ifstream | Input file stream: read from a file | ios::in |
| fstream | Both reading and writing | must be given |`,
          keys: ["ofstream", "ifstream", "fstream", "ios::out", "ios::in", "<fstream>", "must be given"]
        },
        {
          id: "u5-file-steps",
          kind: "algo",
          q: "What are the steps to use a file in C++?",
          a: `1. Include <fstream> and create a stream object.
2. Open the file: file.open("name", mode); (or give the name in the constructor).
3. Check that it opened: if (!file) { ... }
4. Read or write the data.
5. Close the file: file.close();`,
          keys: ["include <fstream>", "stream object", "open", "check", "read or write", "close"]
        },
        {
          id: "u5-file-modes",
          kind: "list",
          q: "Explain the file opening modes ios::in, out, app, ate, trunc, binary.",
          a: `| Mode | Meaning |
|---|---|
| ios::in | Open for reading. |
| ios::out | Open for writing. The old contents are erased; the file is created if it does not exist. |
| ios::app | Append: every write goes to the end of the file; old contents are kept. |
| ios::ate | Open and move to the end at once; the position can be changed afterwards. |
| ios::trunc | Delete the old contents when the file is opened. |
| ios::binary | Open in binary mode instead of text mode. |

Modes are combined with **|** , for example ios::in | ios::out | ios::binary.`,
          keys: ["ios::in", "ios::out", "ios::app", "ios::ate", "ios::trunc", "ios::binary", "combined"]
        },
        {
          id: "u5-file-pointers",
          kind: "concept",
          q: "What are the get and put file pointers? Explain seekg, seekp, tellg, tellp and the 'from' values.",
          a: `Every file has a **get pointer** (the place of the next read) and a **put pointer** (the place of the next write).

| Function | Meaning |
|---|---|
| seekg(offset, from) | Move the get (read) pointer. |
| seekp(offset, from) | Move the put (write) pointer. |
| tellg() , tellp() | Return the current position of the get / put pointer (in bytes from the beginning). |

**from** values: **ios::beg** (from the beginning), **ios::cur** (from the current position), **ios::end** (from the end).

Example: file.seekg((n - 1) * sizeof(Student), ios::beg); moves to the n-th record directly. This is how **direct access** is done with fixed-length records.`,
          keys: ["get pointer", "put pointer", "seekg", "seekp", "tellg", "tellp", "ios::beg", "ios::cur", "ios::end"]
        },
        {
          id: "u5-seek-prototypes",
          kind: "code",
          q: "Give the prototypes of seekg, seekp, tellg and tellp with examples.",
          a: `| Prototype | Example |
|---|---|
| istream& seekg(streampos pos); | fin.seekg(0); go to the beginning for reading. |
| istream& seekg(streamoff off, ios::seekdir dir); | fin.seekg(-10, ios::end); go to 10 bytes before the end. |
| ostream& seekp(streampos pos); | fout.seekp(20, ios::beg); the next write happens at byte 20. |
| ostream& seekp(streamoff off, ios::seekdir dir); | file.seekp(-sizeof(s), ios::cur); go back by one record to overwrite it. |
| streampos tellg(); | long p = fin.tellg(); p is the current read position. After fin.seekg(0, ios::end) it gives the size of the file in bytes. |
| streampos tellp(); | long p = fout.tellp(); p is the current write position, i.e. the number of bytes written so far in a new file. |`,
          keys: ["istream& seekg", "ostream& seekp", "streampos", "streamoff", "ios::seekdir", "tellg", "tellp"]
        },
        {
          id: "u5-file-other-funcs",
          kind: "list",
          q: "What do eof(), fail(), is_open(), remove() and rename() do?",
          a: `- **eof()**: true when the end of the file has been reached.
- **fail()**: true when the last operation failed.
- **is_open()**: tells whether the file is open.
- **remove("a")**: deletes a file.
- **rename("a", "b")**: renames a file (both remove and rename are from <cstdio>).`,
          keys: ["eof", "fail", "is_open", "remove", "rename", "<cstdio>"]
        },
        {
          id: "u5-text-file-code",
          kind: "code",
          q: "Write C++ code to write to and read from a text file.",
          a: `\`\`\`cpp
void writeText() {
    ofstream fout("notes.txt");              // opens for writing
    if (!fout) { cout << "Cannot open file\\n"; return; }
    fout << "Data Structures\\n";
    fout << "Unit 5: Hashing and File Systems\\n";
    fout.close();
}

void readText() {
    ifstream fin("notes.txt");               // opens for reading
    if (!fin) { cout << "Cannot open file\\n"; return; }
    string line;
    while (getline(fin, line))               // read line by line till end of file
        cout << line << "\\n";
    fin.close();
}
\`\`\``,
          keys: ["ofstream", "ifstream", "getline", "fout <<", "close", "if (!fout)", "while"]
        }
      ]
    },
    {
      id: "u5-file-operations-impl",
      title: "4.4 Data Storage and Operations using File Handling",
      cards: [
        {
          id: "u5-student-struct",
          kind: "code",
          q: "Which structure and file name are used for the student record file (binary sequential file)?",
          a: `Student records are stored in a **binary sequential file student.dat**.

\`\`\`cpp
struct Student {
    int   roll;
    char name[20];
    float marks;
};
const char* FILE_NAME = "student.dat";
\`\`\``,
          keys: ["struct student", "roll", "name[20]", "marks", "student.dat"]
        },
        {
          id: "u5-add-record-algo",
          kind: "algo",
          q: "Write the steps to add (append) a record to a sequential file.",
          a: `1. Read the details of the student from the user.
2. Open the file in **append + binary** mode.
3. Write the record at the end of the file.
4. Close the file.`,
          keys: ["read details", "append", "binary", "write at end", "close"]
        },
        {
          id: "u5-display-algo",
          kind: "algo",
          q: "Write the steps to display all records of a sequential file.",
          a: `1. Open the file for reading in binary mode.
2. Read one record. While the read is successful: print the record and read the next one.
3. Close the file.`,
          keys: ["open for reading", "binary", "read one record", "while", "print", "close"]
        },
        {
          id: "u5-search-record-algo",
          kind: "algo",
          q: "Write the steps and pseudocode to search for a record in a sequential file.",
          a: `1. Read the roll number to search (key).
2. Open the file for reading.
3. Read records one by one. If the roll number of a record equals the key, print the record and stop reading.
4. If the end of the file is reached, print "Record not found".
5. Close the file.

Pseudocode:

\`\`\`
Algorithm SearchRecord(key)
{
    open file for reading
    found ← false
    while (read next record s from file is successful) do
        if (s.roll = key) then
        {   write s;  found ← true;  break   }
    if (found = false) then write "Record not found"
    close file
}
\`\`\``,
          keys: ["read key", "open for reading", "s.roll = key", "found", "record not found", "close"]
        },
        {
          id: "u5-modify-record-algo",
          kind: "algo",
          q: "Write the steps to modify (update) a record in a sequential file.",
          a: `1. Open the file for **both reading and writing**.
2. Read records one by one, **remembering the position before each read**.
3. When the record with the given roll number is found: change its fields, move the put pointer back to the remembered position with **seekp()**, and write the record again over the old one.
4. Close the file.`,
          keys: ["reading and writing", "remember position", "seekp", "overwrite", "close"]
        },
        {
          id: "u5-delete-record-algo",
          kind: "algo",
          q: "Write the steps and pseudocode to delete a record from a sequential file.",
          a: `A record cannot be cut out of the middle of a sequential file, so a **temporary file** is used.

1. Open the original file for reading and a temporary file for writing.
2. Read records from the original file one by one. **Copy every record to the temporary file except the one to be deleted.**
3. Close both files.
4. Delete the original file and rename the temporary file to the original name.

Pseudocode:

\`\`\`
Algorithm DeleteRecord(key)
{
    open "student.dat" for reading as fin
    open "temp.dat" for writing as fout
    while (read next record s from fin is successful) do
        if (s.roll ≠ key) then
            write s to fout          // copy all except the one to delete
    close fin;  close fout
    remove("student.dat")
    rename("temp.dat", "student.dat")
}
\`\`\`

Another way is **logical deletion**: keep the record in the file but mark it with a flag such as roll = −1, and skip marked records while reading.`,
          keys: ["temporary file", "copy all except", "close both", "remove", "rename", "logical deletion"]
        },
        {
          id: "u5-student-file-code",
          kind: "code",
          q: "Write C++ code for the student record file: add, display, search, modify, delete and read n-th record.",
          a: `\`\`\`cpp
void addRecord(Student s) {
    ofstream fout(FILE_NAME, ios::app | ios::binary);
    fout.write((char*)&s, sizeof(s));
    fout.close();
}

void displayAll() {
    ifstream fin(FILE_NAME, ios::binary);
    Student s;
    while (fin.read((char*)&s, sizeof(s)))
        cout << s.roll << " " << s.name << " " << s.marks << "\\n";
    fin.close();
}

bool searchRecord(int roll, Student &out) {
    ifstream fin(FILE_NAME, ios::binary);
    Student s;
    while (fin.read((char*)&s, sizeof(s))) {
        if (s.roll == roll) { out = s; fin.close(); return true; }
    }
    fin.close();
    return false;
}

bool modifyRecord(int roll, float newMarks) {
    fstream file(FILE_NAME, ios::in | ios::out | ios::binary);
    Student s;
    while (true) {
        streampos pos = file.tellg();            // position of this record
        if (!file.read((char*)&s, sizeof(s))) break;
        if (s.roll == roll) {
            s.marks = newMarks;
            file.seekp(pos);                     // go back to the start of the record
            file.write((char*)&s, sizeof(s));    // overwrite it
            file.close();
            return true;
        }
    }
    file.close();
    return false;
}

void deleteRecord(int roll) {
    ifstream fin(FILE_NAME, ios::binary);
    ofstream fout("temp.dat", ios::binary);
    Student s;
    while (fin.read((char*)&s, sizeof(s)))
        if (s.roll != roll)
            fout.write((char*)&s, sizeof(s));    // copy all other records
    fin.close();
    fout.close();
    remove(FILE_NAME);
    rename("temp.dat", FILE_NAME);
}

bool readNth(int n, Student &out) {              // direct access to the n-th record
    ifstream fin(FILE_NAME, ios::binary);
    fin.seekg((n - 1) * sizeof(Student), ios::beg);
    bool ok = (bool)fin.read((char*)&out, sizeof(out));
    fin.close();
    return ok;
}
\`\`\``,
          keys: ["ios::app | ios::binary", "fin.read", "fout.write", "tellg", "seekp(pos)", "temp.dat", "remove", "rename", "seekg"]
        },
        {
          id: "u5-isam-ops",
          kind: "algo",
          q: "Write the algorithms for insert and update on an indexed sequential file.",
          a: `An indexed sequential file has a **data file** (records in key order) and an **index file** of (key, address) pairs.

\`\`\`
Algorithm ISAM_Insert(rec)
{
    search the index for rec.key
    if (key is already present) then { write "Duplicate key"; return }
    pos ← position of the end of the data file
    write rec in the data file at pos        // new record is added at the end (overflow area)
    insert the pair (rec.key, pos) in the index   // at its correct place, so the index stays sorted on the key
    write the index back to the index file
}

Algorithm ISAM_Update(key, newData)
{
    search the index for key (binary search)
    if (key is not found) then { write "Record not found"; return }
    pos ← address stored in the index entry
    seek to pos in the data file and read the record
    change the required fields (not the key) using newData
    seek to pos again and write the record back
}
\`\`\``,
          keys: ["search the index", "duplicate key", "end of data file", "(key, address)", "sorted", "binary search", "seek to pos"]
        },
        {
          id: "u5-direct-file-ops",
          kind: "algo",
          q: "How are insert and search done in a direct access file using hashing? Write the pseudocode of insert.",
          a: `For a direct access file, the file is first created with **m empty records (slots)**. Then:

1. **Insert**: compute h = roll mod m; move to slot h with seekg(h * sizeof(Student)) and read it. If the slot is empty, write the record there with seekp(). If it is occupied, try the next slots by **linear probing**.
2. **Search**: compute h = roll mod m; read slot h. If it holds the required roll number, the record is found. Otherwise examine the following slots until the record or an empty slot is found.

\`\`\`
Algorithm DirectFileInsert(rec)
{
    h ← rec.roll mod m
    for i ← 0 to m-1 do
    {
        pos ← (h + i) mod m
        seek to byte pos * RECORD_SIZE and read slot
        if (slot is empty) then
        {
            seek to byte pos * RECORD_SIZE and write rec
            return
        }
    }
    write "File is full"
}
\`\`\`

Only **one or two disk accesses** are needed for each record, whatever the size of the file. That is why hashed files are used where an immediate answer is required.`,
          keys: ["m empty slots", "h = roll mod m", "seekg", "seekp", "linear probing", "one or two disk accesses", "file is full"]
        }
      ]
    },
    {
      id: "u5-revision",
      title: "5. Quick Revision",
      cards: [
        {
          id: "u5-quick-revision",
          kind: "list",
          q: "Quick revision: summarise Unit V in one-liners.",
          a: `- **Hashing**: address = h(key); average O(1) search, insert, delete.
- **Hash functions**: division (k mod m), mid-square, folding (shift / boundary), digit extraction, multiplication.
- **Collision**: two keys, same address. **Synonyms**: the colliding keys. **Load factor**: λ = n / m.
- **Linear probing**: (h + i) mod m; simple; primary clustering.
- **Quadratic probing**: (h + i²) mod m; no primary clustering; secondary clustering; may miss free positions.
- **Separate chaining**: linked list per position; never full; easy deletion; extra pointers.
- **Chaining without replacement**: chain inside the table; keys never moved; chain may not start at home.
- **Chaining with replacement**: a key sitting at another key's home is moved; every chain starts at home.
- **File**: records on secondary storage. Organisations: sequential (O(n) search), indexed sequential (index + data), direct (hashing, O(1)).
- **C++ files**: ifstream, ofstream, fstream; modes in, out, app, ate, trunc, binary; seekg / seekp / tellg / tellp; binary I/O with read() and write().
- **Delete from a sequential file**: copy all other records to a temporary file, remove the original, rename the temporary file.`,
          keys: ["h(key)", "primary clustering", "secondary clustering", "never full", "never moved", "moved", "temporary file"]
        },
        {
          id: "u5-all-methods-table",
          kind: "trace",
          q: "Show the final tables of all five methods for keys 11, 32, 41, 54, 33, 22, 76 (h = k mod 10).",
          a: `In brackets is the chain field for the last two columns.

| Index | Linear probing | Quadratic probing | Separate chaining | Without replacement | With replacement |
|---|---|---|---|---|---|
| 0 | – | – | – | – | – |
| 1 | 11 | 11 | 11 → 41 | 11 (3) | 11 (5) |
| 2 | 32 | 32 | 32 → 22 | 32 (6) | 32 (7) |
| 3 | 41 | 33 | 33 | 41 (-1) | 33 (-1) |
| 4 | 54 | 54 | 54 | 54 (-1) | 54 (-1) |
| 5 | 33 | 41 | – | 33 (-1) | 41 (-1) |
| 6 | 22 | 22 | 76 | 22 (-1) | 76 (-1) |
| 7 | 76 | 76 | – | 76 (-1) | 22 (-1) |
| 8 | – | – | – | – | – |
| 9 | – | – | – | – | – |`,
          keys: ["11 → 41", "32 → 22", "41 (-1)", "33 (-1)", "76 (-1)", "22 (-1)"]
        }
      ]
    },
    {
      id: "u5-pyq",
      title: "Question bank (PYQs)",
      cards: [
        {
          id: "u5-pyq-1",
          kind: "pyq",
          q: "Q1. [5] Explain the basic concept of hashing. Define hash table and hash function, and write the characteristics of a good hash function. (End-sem Oct 2022 Q7(a); In-sem May 2023 Q1(c); End-sem May 2024 Q7(c))",
          a: `**Hashing**

Hashing is a searching technique in which a large domain of key values is placed into specific locations of a table called the hash table, and the location is calculated from the key value itself using a hash function. To search for the key, the same function is applied again and we go directly to that location. It gives O(1) search instead of O(n) for linear search and O(log n) for binary search.

**Hash table**: an array of some constant size in which a key value is placed at a specific location.

**Hash function**: a function that translates keys into array indices. Large keys are converted into small keys (indices).

**Idea**: distribute the entries uniformly across the array so that an element can be accessed in O(1) time using its key.

**Example**: h(k) = k mod 10: 23 goes to index 3, 45 to index 5, 18 to index 8.

**Characteristics of a good hash function**

- Easy and fast to compute.
- Distributes the keys uniformly over the whole table, so collisions are few.
- Uses all parts of the key (all digits or characters).
- Gives the same address for the same key (deterministic).
- The address lies within the table range 0 to m − 1.`,
          keys: ["searching technique", "hash table", "hash function", "o(1)", "uniformly", "deterministic", "0 to m − 1"]
        },
        {
          id: "u5-pyq-2",
          kind: "pyq",
          q: "Q2. [5] Explain any three hash functions with an example of each. (End-sem Oct 2021 Q7(a); Oct 2022 Q8(a); May 2022 Q8(b))",
          a: `**1. Division (modulo) method**: h(k) = k mod m. Divide the key by the table size m and take the remainder. m should be a prime number not close to a power of 2. Example: m = 97, k = 3205: 3205 mod 97 = 4, so index 4.

**2. Mid-square method**: square the key and take some digits from the middle of the square as the address. Example: k = 3205, table of 100 positions: k² = 10272025; middle two digits are 72, so h(k) = 72.

**3. Folding method**: break the key into equal-length parts, add the parts and ignore the final carry.

- Fold-shift: add the parts as they are.
- Fold-boundary: reverse the first and last parts, then add.

Example: k = 123456789, 3-digit address. Parts 123, 456, 789. Fold-shift: 123 + 456 + 789 = 1368, so h = 368. Fold-boundary: 321 + 456 + 987 = 1764, so h = 764.

(Others: digit extraction, e.g. k = 379452, digits 1st, 3rd, 5th give 395; multiplication h(k) = ⌊m × (k × A mod 1)⌋ with A = 0.618, e.g. k = 123, m = 100 gives 1.)`,
          keys: ["division", "k mod m", "mid-square", "middle digits", "folding", "fold-shift", "fold-boundary", "example"]
        },
        {
          id: "u5-pyq-3",
          kind: "pyq",
          q: "Q3. [5] Write a short note on closed hashing and open addressing. List the different techniques to resolve a collision in a hash table. (End-sem Oct 2021 Q7(b); May 2024 Q7(c))",
          a: `**Collision**: two different keys get the same hash value, h(k1) = h(k2). Collisions cannot be avoided completely because the number of possible keys is much larger than the table size.

**Closed hashing (open addressing)**: every key is stored inside the hash table itself. When a collision occurs, another empty position of the same table is found by probing in a fixed sequence until an empty one is found.

**Open hashing (separate chaining)**: the colliding keys are stored outside the table in a linked list attached to that position.

**Techniques to resolve collisions**

- Open addressing (without chaining): linear probing, quadratic probing, double hashing.
- Chaining: separate chaining, chaining without replacement, chaining with replacement.

**Linear probing**: hᵢ(k) = (h(k) + i) mod m. **Quadratic probing**: hᵢ(k) = (h(k) + i²) mod m. **Double hashing**: hᵢ(k) = (h₁(k) + i × h₂(k)) mod m.`,
          keys: ["closed hashing", "open addressing", "inside the table", "probing", "linear probing", "quadratic probing", "double hashing", "chaining"]
        },
        {
          id: "u5-pyq-4",
          kind: "pyq",
          q: "Q4. [5] Hash table of size 10, h(x) = x mod 10. Construct the table step by step using linear probing without replacement for 31, 3, 4, 21, 61, 6, 71, 8, 9, 25 and calculate the average number of comparisons to search the data. (In-sem May 2023 Q1(a))",
          a: `**Method**: linear probing with chaining, without replacement. Each slot has a key and a chain field (−1 = none). A key already in the table is never moved.

| Key | h(k) | What happens |
|---|---|---|
| 31 | 1 | free: store at 1 |
| 3 | 3 | free: store at 3 |
| 4 | 4 | free: store at 4 |
| 21 | 1 | 1 occupied by 31; next empty 2: store at 2; chain[1] = 2 |
| 61 | 1 | 1 occupied by 31; next empty 5: store at 5; last synonym at 2, so chain[2] = 5 |
| 6 | 6 | free: store at 6 |
| 71 | 1 | 1 occupied by 31; next empty 7: store at 7; last synonym at 5, so chain[5] = 7 |
| 8 | 8 | free: store at 8 |
| 9 | 9 | free: store at 9 |
| 25 | 5 | 5 occupied by 61 (not a synonym, not moved); next empty 0: store at 0; no link |

**Final table**

| Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| Key | 25 | 31 | 21 | 3 | 4 | 61 | 6 | 71 | 8 | 9 |
| Chain | -1 | 2 | 5 | -1 | -1 | 7 | -1 | -1 | -1 | -1 |

**Comparisons**: 31 = 1, 3 = 1, 4 = 1, 21 = 2, 61 = 3, 6 = 1, 71 = 4, 8 = 1, 9 = 1, 25 = 6. Total = 21.

**Average number of comparisons = 21 / 10 = 2.1**`,
          keys: ["chain[1] = 2", "chain[2] = 5", "chain[5] = 7", "25 at 0", "21", "2.1"]
        },
        {
          id: "u5-pyq-5",
          kind: "pyq",
          q: "Q5. [5] Explain the concept of quadratic probing using an example. What are the advantages and disadvantages of quadratic probing over linear probing? (In-sem May 2023 Q1(b))",
          a: `**Quadratic probing**: if the home position is occupied, examine the positions at distances 1², 2², 3², ... that is h + 1, h + 4, h + 9, ... (all mod m).

**hᵢ(k) = (h(k) + i²) mod m**, i = 0, 1, 2, ...

**Example** (size 10, h = k mod 10, keys 11, 32, 41, 54, 33, 22, 76):

- 11 → 1; 32 → 2; free.
- 41: h = 1, probes 1→2→5, stored at 5.
- 54 → 4; 33 → 3; free.
- 22: h = 2, probes 2→3→6, stored at 6.
- 76: h = 6, probes 6→7, stored at 7.

Final: index 1 = 11, 2 = 32, 3 = 33, 4 = 54, 5 = 41, 6 = 22, 7 = 76. Total probes = 12 (linear probing needs 16 for the same keys).

**Advantage over linear probing**: probes jump away from the home position, so long blocks do not form (no primary clustering).

**Disadvantages**

- Keys with the same home address follow the same probe sequence (secondary clustering).
- The probe sequence may not visit every position, so a free position can be missed.
- An empty position is guaranteed only if m is prime and λ < 0.5.`,
          keys: ["(h + i²) mod m", "h + 1", "h + 4", "no primary clustering", "secondary clustering", "may not visit", "λ < 0.5"]
        },
        {
          id: "u5-pyq-6",
          kind: "pyq",
          q: "Q6. [5] Create a hash table for the integers 29, 50, 28, 19, 17, 15, 18, 14, 38 taking h(k) = k % 10. Demonstrate chaining with replacement. (End-sem May 2022 Q7(b))",
          a: `**Rule**: if the home position is occupied by a synonym, store the new key at the next empty position and link it at the end of the chain; if it is occupied by a key that belongs elsewhere, move that key to an empty position, repair its chain, and put the new key at its home.

| Key | h(k) | What happens |
|---|---|---|
| 29 | 9 | free: store at 9 |
| 50 | 0 | free: store at 0 |
| 28 | 8 | free: store at 8 |
| 19 | 9 | 9 holds synonym 29; next empty 1: store at 1; chain[9] = 1 |
| 17 | 7 | free: store at 7 |
| 15 | 5 | free: store at 5 |
| 18 | 8 | 8 holds synonym 28; next empty 2: store at 2; chain[8] = 2 |
| 14 | 4 | free: store at 4 |
| 38 | 8 | 8 holds synonym 28; next empty 3: store at 3; chain[2] = 3 |

**Final table**

| Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| Key | 50 | 19 | 18 | 38 | 14 | 15 | – | 17 | 28 | 29 |
| Chain | -1 | -1 | 3 | -1 | -1 | -1 | -1 | -1 | 2 | 1 |

Chains: 8 → 2 → 3 (28, 18, 38) and 9 → 1 (29, 19). Comparisons = 1 + 1 + 1 + 2 + 1 + 1 + 2 + 1 + 3 = 13; average = 13/9 = 1.44.`,
          keys: ["chain[9] = 1", "chain[8] = 2", "chain[2] = 3", "synonym", "next empty", "13", "1.44"]
        },
        {
          id: "u5-pyq-7",
          kind: "pyq",
          q: "Q7. [5] Insert the keys 11, 33, 20, 88, 79, 98, 68, 44, 66, 24 in a hash table of size 10 using linear probing with chaining, with replacement. Calculate the average number of comparisons required to search the data. (In-sem May 2023 Q2(a); also Oct 2021 Q8(a), May 2024 Q8(b))",
          a: `h(k) = k mod 10, chaining with replacement.

| Key | h(k) | What happens |
|---|---|---|
| 11 | 1 | free: store at 1 |
| 33 | 3 | free: store at 3 |
| 20 | 0 | free: store at 0 |
| 88 | 8 | free: store at 8 |
| 79 | 9 | free: store at 9 |
| 98 | 8 | 8 holds synonym 88; next empty is 2: store at 2; chain[8] = 2 |
| 68 | 8 | 8 holds synonym 88; next empty is 4: store at 4; last synonym at 2, so chain[2] = 4 |
| 44 | 4 | 4 holds 68, which belongs to 8: move 68 to next empty 5 and set chain[2] = 5; store 44 at its home 4 |
| 66 | 6 | free: store at 6 |
| 24 | 4 | 4 holds synonym 44; next empty is 7: store at 7; chain[4] = 7 |

**Final table**

| Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| Key | 20 | 11 | 98 | 33 | 44 | 68 | 66 | 24 | 88 | 79 |
| Chain | -1 | -1 | 5 | -1 | 7 | -1 | -1 | -1 | 2 | -1 |

Chains: 8 → 2 → 5 (88, 98, 68) and 4 → 7 (44, 24).

**Comparisons**: 11 = 1, 33 = 1, 20 = 1, 88 = 1, 79 = 1, 98 = 2, 68 = 3, 44 = 1, 66 = 1, 24 = 2. Total = 14.

**Average = 14 / 10 = 1.4**`,
          keys: ["move 68", "chain[8] = 2", "chain[2] = 5", "chain[4] = 7", "14", "1.4"]
        },
        {
          id: "u5-pyq-8",
          kind: "pyq",
          q: "Q8. [5] Compare the sequential, index sequential and direct access file organisations. (End-sem Oct 2021 Q8(b); Oct 2022 Q7(b); May 2024 Q7(a))",
          a: `**File organisation** is the way the records are arranged on the storage device.

| Point | Sequential | Indexed sequential | Direct (hashed) |
|---|---|---|---|
| Arrangement | One after another | In key order + index | At address h(key) |
| Access to a record | Read all earlier records | Through the index | Calculated address |
| Search time | O(n) | O(log n) for the index | O(1) average |
| Insertion / deletion | Costly (rewrite file) | Moderate (update index) | Easy |
| Extra space | None | Index | Unused slots |
| Sequential processing | Very good | Good | Poor |
| Example use | Payroll, backups | Library catalogue | Bank accounts, reservations |

**Sequential**: simple, no wasted space, slow search. **Indexed sequential**: index of (key, address) pairs gives fast search and sequential processing, but needs extra space and reorganising. **Direct**: hash function gives O(1) access, but collisions must be handled and records are not in key order.`,
          keys: ["sequential", "indexed sequential", "direct", "index", "hash function", "o(n)", "o(1)"]
        },
        {
          id: "u5-pyq-9",
          kind: "pyq",
          q: "Q9. [5] Explain the prototypes of the following C++ functions with examples: (i) seekg (ii) seekp (iii) tellg (iv) tellp. (End-sem May 2022 Q7(a))",
          a: `Every file has a **get pointer** (next read position) and a **put pointer** (next write position). The "from" values are ios::beg, ios::cur, ios::end.

**(i) seekg**: moves the get (read) pointer.

- istream& seekg(streampos pos); e.g. fin.seekg(0); go to the beginning for reading.
- istream& seekg(streamoff off, ios::seekdir dir); e.g. fin.seekg(-10, ios::end); 10 bytes before the end.

**(ii) seekp**: moves the put (write) pointer.

- ostream& seekp(streampos pos);
- ostream& seekp(streamoff off, ios::seekdir dir); e.g. fout.seekp(20, ios::beg); next write at byte 20; file.seekp(-sizeof(s), ios::cur); go back one record to overwrite it.

**(iii) tellg**: streampos tellg(); returns the current read position in bytes from the beginning. e.g. long p = fin.tellg(); after fin.seekg(0, ios::end) it gives the size of the file in bytes.

**(iv) tellp**: streampos tellp(); returns the current write position. e.g. long p = fout.tellp(); the number of bytes written so far in a new file.

Direct access to the n-th record: file.seekg((n - 1) * sizeof(Student), ios::beg);`,
          keys: ["seekg", "seekp", "tellg", "tellp", "streampos", "streamoff", "ios::seekdir", "get pointer"]
        },
        {
          id: "u5-pyq-10",
          kind: "pyq",
          q: "Q10. [5] What is a file? Differentiate between a text file and a binary file. Write pseudocode to insert a record into and delete a record from a sequential file. (End-sem May 2024 Q7(b), Q8(c); Oct 2022 Q8(b))",
          a: `**File**: a named collection of related records stored on secondary storage. A record is a collection of related fields; a field is a single item of data. The key (e.g. roll number) identifies a record uniquely.

| Point | Text file | Binary file |
|---|---|---|
| Stores data as | Readable characters (ASCII) | The same bytes as in memory |
| Readable in an editor | Yes | No |
| Size and speed | Larger and slower | Compact and faster |
| Record length | Varies | Fixed |
| Read / write in C++ | >> , << , getline() | read() , write() |

**Insert (append) a record**

1. Read the details of the record.
2. Open the file in append + binary mode.
3. Write the record at the end of the file.
4. Close the file.

\`\`\`
Algorithm AddRecord(rec)
{
    open "student.dat" in append + binary mode
    write rec at the end of the file
    close file
}
\`\`\`

**Delete a record** (using a temporary file)

\`\`\`
Algorithm DeleteRecord(key)
{
    open "student.dat" for reading as fin
    open "temp.dat" for writing as fout
    while (read next record s from fin is successful) do
        if (s.roll ≠ key) then
            write s to fout          // copy all except the one to delete
    close fin;  close fout
    remove("student.dat")
    rename("temp.dat", "student.dat")
}
\`\`\`

Time complexity: O(1) for append, O(n) for delete (every record is read once).`,
          keys: ["named collection", "secondary storage", "text file", "binary file", "append", "temporary file", "remove", "rename"]
        }
      ]
    }
  ]
});
