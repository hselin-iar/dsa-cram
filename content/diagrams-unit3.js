(function () {
  const L = (v, o) => Object.assign({ v }, o || {});
  const N = (v, l, r, o) => Object.assign({ v, c: [l || null, r || null] }, o || {});

  const fig1 = { v: 'A', c: [{ v: 'B', c: [{ v: 'D' }, { v: 'E', c: [{ v: 'I' }, { v: 'J' }] }, { v: 'F' }] }, { v: 'C', c: [{ v: 'G', c: [{ v: 'K' }] }, { v: 'H' }] }] };
  const fig1Leaves = { v: 'A', c: [{ v: 'B', c: [{ v: 'D', hl: true }, { v: 'E', c: [{ v: 'I', hl: true }, { v: 'J', hl: true }] }, { v: 'F', hl: true }] }, { v: 'C', c: [{ v: 'G', c: [{ v: 'K', hl: true }] }, { v: 'H', hl: true }] }] };
  const fig1Bin = N('A', N('B', N('D', null, N('E', N('I', null, L('J')), L('F'))), L('C', { c: [L('G', { c: [L('K'), L('H')] }), null] })), null);
  const convertRow = { type: 'row', arrow: '→', items: [
    { type: 'tree', general: true, root: fig1, caption: 'general tree' },
    { type: 'tree', root: fig1Bin, caption: 'binary tree: left = first child, right = next sibling' }] };

  const bst = N(12, N(7, L(5), N(9, null, L(10))), L(19));
  const abc = N('A', N('B', L('D'), L('E')), L('C'));
  const heapIns = N(30, N(21, L(10), L(18)), N(19, L(15)));
  const heapBuildStart = N(82, N(90, N(12, L(23)), L(15)), N(10, L(77), L(55)));
  const heapBuildEnd = N(90, N(82, N(23, L(12)), L(15)), N(77, L(10), L(55)));

  const avlRowLR = { type: 'row', items: [
    { type: 'tree', root: N(55, N(15, L(10), N(50, L(40))), L(60), { note: '+2' }), caption: 'insert 40: LR imbalance at 55' },
    { type: 'tree', root: N(50, N(15, L(10), L(40)), N(55, null, L(60))), caption: 'after left rot. at 15, right rot. at 55' }] };
  const avlRowRL = { type: 'row', items: [
    { type: 'tree', root: N(50, N(15, L(10), N(40, N(20, null, L(30, { hl: true })), L(45))), N(55, null, L(60))), caption: 'insert 30: RL imbalance at 15' },
    { type: 'tree', root: N(50, N(20, N(15, L(10)), N(40, L(30), L(45))), N(55, null, L(60))), caption: 'after right rot. at 40, left rot. at 15' }] };
  const avlFinal = N(50, N(20, N(15, L(10)), N(40, L(30), L(45))), N(60, L(55), N(70, null, L(80))));

  const bstTree2 = N('G', N('C', N('B', L('A')), N('D', null, N('E', null, L('F')))), N('I', L('H')));
  const bstArr = [
    { type: 'array', cells: ['G', 'C', 'I', 'B', 'D', 'H', null, 'A', null, null, 'E', null], caption: 'array indices 0-11 (left = 2i+1, right = 2i+2)' },
    { type: 'array', start: 12, cells: [null, null, null, null, null, null, null, null, null, null, 'F'], caption: 'indices 12-22: F sits at index 22' },
  ];

  const constructTree = N('G', N('B', L('Q'), N('A', N('C', L('K'), L('F')))), N('P', null, N('D', L('E'), N('R', L('H')))));

  const heapDelRow = { type: 'row', items: [
    { type: 'tree', root: N(9, N(6, L(2), L(4)), L(3)), caption: 'max heap' },
    { type: 'tree', root: N(4, N(6, L(2)), L(3)), caption: 'last element 4 moved to root' },
    { type: 'tree', root: N(6, N(4, L(2)), L(3)), caption: '4 swapped with larger child 6' }] };
  const heapInsRows = [
    { type: 'row', items: [
      { type: 'tree', root: N(21, N(10, L(30, { hl: true })), L(15)), caption: 'insert 30 at the end' },
      { type: 'tree', root: N(30, N(21, L(10)), L(15)), caption: '30 swapped up twice' }] },
    { type: 'row', items: [
      { type: 'tree', root: N(30, N(21, L(10), L(18)), N(15, L(19, { hl: true }))), caption: 'insert 19 at the end' },
      { type: 'tree', root: heapIns, caption: '19 swapped with 15: final 30 21 19 10 18 15' }] },
  ];

  const hsArrays = [
    { type: 'array', cells: [90, 82, 77, 23, 15, 10, 55, 12], hl: [0, 7], caption: 'max heap: swap root 90 with last (12)' },
    { type: 'array', cells: [82, 23, 77, 12, 15, 10, 55, 90], hl: [7], dim: [7], caption: '90 is in final place; heapify the first 7' },
    { type: 'array', cells: [10, 12, 15, 23, 55, 77, 82, 90], hl: [0, 1, 2, 3, 4, 5, 6, 7], caption: 'sorted result' },
  ];

  window.DSA_DIAGRAMS = window.DSA_DIAGRAMS || {};
  Object.assign(window.DSA_DIAGRAMS, {
    'u3-tree-terms-1': [{ type: 'tree', general: true, root: fig1, caption: 'Fig. 1: A is the root; B, C are children of A; D, E, F are siblings under B.' }],
    'u3-tree-terms-2': [{ type: 'tree', general: true, root: fig1Leaves, caption: 'Highlighted nodes are leaves (D, I, J, F, K, H); the rest are internal.' }],
    'u3-tree-lcrs': [convertRow],
    'u3-pyq-1': [{ type: 'tree', general: true, root: fig1, caption: 'Example tree: root A, leaves D I J F K H, degree of tree = 3 (node B).' }],
    'u3-pyq-5': [convertRow],

    'u3-bt-types': [
      { type: 'row', arrow: '|', items: [
        { type: 'tree', root: N(1, N(2, L(4), N(5, L(6), L(7))), L(3)), caption: 'full: every node has 0 or 2 children' },
        { type: 'tree', root: N(1, N(2, L(4), L(5)), N(3, L(6))), caption: 'complete: last level filled left to right' },
        { type: 'tree', root: N(1, N(2, L(4), L(5)), N(3, L(6), L(7))), caption: 'perfect: all leaves on one level' }] },
      { type: 'row', arrow: '|', items: [
        { type: 'tree', root: N(1, N(2, N(3, N(4)))), caption: 'left skewed' },
        { type: 'tree', root: N(1, null, N(2, null, N(3, null, L(4)))), caption: 'right skewed' }] },
    ],
    'u3-bt-array': [
      { type: 'tree', root: N('A', N('B', L('D'), L('E')), N('C', L('F'), L('G')), {}), caption: 'Number the nodes level by level, left to right.' },
      { type: 'array', cells: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], caption: 'Index 0..6. Node i: children at 2i+1, 2i+2.' },
    ],
    'u3-bt-array-ex': [
      { type: 'tree', root: N('A', N('B', L('D'), L('E')), N('C', null, L('F'))), caption: 'C has only a right child F.' },
      { type: 'array', cells: ['A', 'B', 'C', 'D', 'E', null, 'F'], hl: [2, 6], caption: 'C at index 2, F at 2×2+2 = 6; index 5 is empty.' },
    ],
    'u3-pyq-2': [
      { type: 'tree', root: N('A', N('B', L('D'), L('E')), N('C', null, L('F'))), caption: 'Example tree (linked form: C has left = NULL, right = F).' },
      { type: 'array', cells: ['A', 'B', 'C', 'D', 'E', null, 'F'], hl: [2, 6], caption: 'Array form: index 5 is wasted.' },
    ],

    'u3-tr-example': [{ type: 'tree', root: N(1, N(2, N(4, L(8)), L(5)), N(3, N(6, L(9), L(10)), L(7))), caption: 'Inorder 8 4 2 5 1 9 6 10 3 7; preorder 1 2 4 8 5 3 6 9 10 7.' }],
    'u3-tr-inorder-nr-trace': [{ type: 'tree', root: abc, caption: 'Inorder: D B E A C.' }],
    'u3-tr-preorder-nr-trace': [{ type: 'tree', root: abc, caption: 'Preorder: A B D E C.' }],
    'u3-tr-postorder-nr-trace': [{ type: 'tree', root: abc, caption: 'Postorder: D E B C A.' }],
    'u3-tr-construct-ex': [{ type: 'tree', root: constructTree, caption: 'Root G (first in preorder) splits inorder into Q B K C F A | P E D H R.' }],
    'u3-pyq-3': [{ type: 'tree', root: constructTree, caption: 'Constructed tree; its postorder is Q K F C A B E H R D P G.' }],
    'u3-pyq-4': [{ type: 'tree', root: abc, caption: 'Non-recursive inorder gives D B E A C.' }],

    'u3-bst-def': [{ type: 'tree', root: bst, caption: 'Left keys < node < right keys; inorder 5 7 9 10 12 19 is sorted.' }],
    'u3-bst-search-trace': [{ type: 'tree', root: N(12, N(7, L(5), N(9, null, L(10, { hl: true })), { hl: true }), L(19), { hl: true }), caption: 'Path 12 → 7 → 9 → 10: 4 comparisons, the right subtree is never visited.' }],
    'u3-bst-insert-ex1': [{ type: 'tree', root: bst, caption: 'Result of inserting 12, 7, 9, 19, 5, 10; each new key is a leaf.' }],
    'u3-bst-insert-ex2': [{ type: 'tree', root: bstTree2, caption: 'BST after inserting G C B A D E F I H.' }, ...bstArr],
    'u3-pyq-6': [{ type: 'tree', root: bstTree2, caption: 'BST after inserting G C B A D E F I H.' }, ...bstArr],
    'u3-bst-delete-ex': [
      { type: 'row', arrow: '|', items: [
        { type: 'tree', root: bst, caption: 'original' },
        { type: 'tree', root: N(12, N(7, L(5), N(9, null, L(10)))), caption: 'delete 19 (leaf): removed' },
        { type: 'tree', root: N(12, N(7, L(5), L(10)), L(19)), caption: 'delete 9 (one child): 10 takes its place' }] },
      { type: 'row', arrow: '|', items: [
        { type: 'tree', root: N(10, N(7, L(5), L(9)), L(19)), caption: 'delete 12, predecessor 10 replaces it' },
        { type: 'tree', root: N(19, N(7, L(5), N(9, null, L(10)))), caption: 'delete 12, successor 19 replaces it' }] },
    ],
    'u3-bst-analysis': [{ type: 'tree', root: N(10, null, N(20, null, N(30, null, L(40)))), caption: 'Sorted insertion 10, 20, 30, 40 gives a right-skewed BST: height n, search O(n).' }],

    'u3-avl-bf': [{ type: 'row', arrow: '|', items: [
      { type: 'tree', root: N(50, N(30, L(20, { note: '0' }), L(40, { note: '0' }), { note: '0' }), N(70, null, L(80, { note: '0' }), { note: '−1' }), { note: '0' }), caption: 'Height balanced: every BF is −1, 0 or +1' },
      { type: 'tree', root: N(50, N(30, N(20, L(10, { note: '0' }), null, { note: '+1' }), null, { note: '+2', hl: true }), L(70, { note: '0' }), { note: '+2' }), caption: 'Not balanced: node 30 has BF = +2 (BF = h(left) − h(right))' }] }],
    'u3-avl-rot-table': [
      { type: 'row', items: [
        { type: 'tree', root: N(30, N(20, L(10)), null, { note: '+2' }), caption: 'LL: left-left chain' },
        { type: 'tree', root: N(20, L(10), L(30)), caption: 'single right rotation at 30' }] },
      { type: 'row', items: [
        { type: 'tree', root: N(10, null, N(20, null, L(30)), { note: '−2' }), caption: 'RR: right-right chain' },
        { type: 'tree', root: N(20, L(10), L(30)), caption: 'single left rotation at 10' }] },
    ],
    'u3-avl-rot-ex': [
      { type: 'row', items: [
        { type: 'tree', root: N(30, N(10, null, L(20)), null, { note: '+2' }), caption: 'LR: insert 30, 10, 20' },
        { type: 'tree', root: N(30, N(20, L(10)), null), caption: 'left rotation at 10' },
        { type: 'tree', root: N(20, L(10), L(30)), caption: 'right rotation at 30' }] },
      { type: 'row', items: [
        { type: 'tree', root: N(10, null, N(30, L(20)), { note: '−2' }), caption: 'RL: insert 10, 30, 20' },
        { type: 'tree', root: N(10, null, N(20, null, L(30))), caption: 'right rotation at 30' },
        { type: 'tree', root: N(20, L(10), L(30)), caption: 'left rotation at 10' }] },
    ],
    'u3-avl-trace': [avlRowLR, avlRowRL, { type: 'tree', root: avlFinal, caption: 'Final AVL tree after inserting 70 (RR at 55) and 80.' }],
    'u3-pyq-8': [avlRowLR, avlRowRL, { type: 'tree', root: avlFinal, caption: 'Final AVL tree after inserting 70 (RR at 55) and 80.' }],
    'u3-wbt-ex': [{ type: 'tree', root: N(50, N(30, L(20), L(40)), N(70, L(60), L(80))), caption: 'Root: L = 3 nodes, R = 3 nodes, so R/2 ≤ L ≤ 2R holds.' }],

    'u3-heap-def': [{ type: 'row', arrow: '|', items: [
      { type: 'tree', root: N(50, N(30, L(15), L(10)), N(20, L(8), L(5))), caption: 'max heap: parent ≥ children, max at root' },
      { type: 'tree', root: N(5, N(10, L(30), L(20)), N(15, L(50), L(40))), caption: 'min heap: parent ≤ children, min at root' }] }],
    'u3-heap-array': [
      { type: 'tree', root: N(50, N(30, L(15), L(10)), N(20, L(8), L(5))), caption: 'Complete tree, filled left to right.' },
      { type: 'array', cells: [50, 30, 20, 15, 10, 8, 5], hl: [1, 3, 4], caption: 'Node 30 (i = 1): children at 3, 4 (15, 10); parent at 0.' },
    ],
    'u3-heap-insert-trace': heapInsRows,
    'u3-heap-delete-trace': [heapDelRow],
    'u3-heap-build-trace': [{ type: 'row', arrow: '→', items: [
      { type: 'tree', root: heapBuildStart, caption: 'start: 82 90 10 12 15 77 55 23' },
      { type: 'tree', root: heapBuildEnd, caption: 'after heapify at i = 3, 2, 1, 0: 90 82 77 23 15 10 55 12' }] }],
    'u3-hs-trace': hsArrays,
    'u3-pyq-9': [...heapInsRows, heapDelRow],
    'u3-pyq-10': [{ type: 'row', arrow: '→', items: [
      { type: 'tree', root: N(5, N(3, L(10), L(84)), N(17, L(19), L(22))), caption: 'given: 5 3 17 10 84 19 22' },
      { type: 'tree', root: N(84, N(10, L(5), L(3)), N(22, L(19), L(17))), caption: 'max heap: 84 10 22 5 3 19 17' }] }],
  });
})();
