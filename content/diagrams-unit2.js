window.DSA_DIAGRAMS = window.DSA_DIAGRAMS || {};
Object.assign(window.DSA_DIAGRAMS, {
  'u2-ll-def': [
    { type: 'list', nodes: [10, 20, 30], caption: 'Each node: data | next. head points to the first node; last next = NULL.' }
  ],
  'u2-ll-types': [
    { type: 'list', kind: 'single', nodes: [10, 20, 30], caption: 'Singly: one link (next), forward only.' },
    { type: 'list', kind: 'double', nodes: [10, 20, 30], caption: 'Doubly: prev and next links, both directions.' },
    { type: 'list', kind: 'circular', nodes: [10, 20, 30], caption: 'Circular: last node points back to the first.' }
  ],
  'u2-sll-insbeg': [
    { type: 'row', items: [
      { type: 'list', nodes: [10, 20], caption: 'before' },
      { type: 'list', nodes: [5, 10, 20], hl: [0], caption: 'after: newNode->next = head, then head = newNode' }
    ] }
  ],
  'u2-sll-insend': [
    { type: 'row', items: [
      { type: 'list', nodes: [10, 20, 30], ptr: { 2: 'temp' }, caption: 'temp stops at the last node' },
      { type: 'list', nodes: [10, 20, 30, 40], hl: [3], caption: 'temp->next = newNode (40, next = NULL)' }
    ] }
  ],
  'u2-sll-insafter': [
    { type: 'row', items: [
      { type: 'list', nodes: [10, 20, 30], ptr: { 1: 'temp' }, caption: 'before: temp at node 20 (pos = 2)' },
      { type: 'list', nodes: [10, 20, 25, 30], hl: [2], caption: 'after: 25 links to 30 first, then 20 links to 25' }
    ] }
  ],
  'u2-sll-delbeg': [
    { type: 'row', items: [
      { type: 'list', nodes: [10, 20, 30], ptr: { 0: 'temp' }, caption: 'before: temp = head' },
      { type: 'list', nodes: [20, 30], caption: 'after: head = head->next, free temp' }
    ] }
  ],
  'u2-sll-delend': [
    { type: 'row', items: [
      { type: 'list', nodes: [10, 20, 30], ptr: { 1: 'temp' }, caption: 'before: temp at second-last node' },
      { type: 'list', nodes: [10, 20], caption: 'after: free last node, temp->next = NULL' }
    ] }
  ],
  'u2-sll-delval': [
    { type: 'row', items: [
      { type: 'list', nodes: [10, 20, 30], ptr: { 0: 'prev', 1: 'cur' }, caption: 'before: delete key 20' },
      { type: 'list', nodes: [10, 30], caption: 'after: prev->next = cur->next (10 links straight to 30)' }
    ] }
  ],
  'u2-dll-def': [
    { type: 'list', kind: 'double', nodes: [10, 20, 30], caption: 'Node = prev | data | next. First prev and last next are NULL.' }
  ],
  'u2-dll-ins-beg-end': [
    { type: 'row', items: [
      { type: 'list', kind: 'double', nodes: [10, 20], caption: 'before' },
      { type: 'list', kind: 'double', nodes: [5, 10, 20], hl: [0], caption: 'insert 5 at beginning: head->prev = newNode' }
    ] }
  ],
  'u2-dll-ins-mid': [
    { type: 'row', items: [
      { type: 'list', kind: 'double', nodes: [10, 30], ptr: { 0: 'p' }, caption: 'before: insert 20 after p' },
      { type: 'list', kind: 'double', nodes: [10, 20, 30], hl: [1], caption: 'after: four links set (new prev/next, then 30.prev, 10.next)' }
    ] }
  ],
  'u2-dll-del': [
    { type: 'row', items: [
      { type: 'list', kind: 'double', nodes: [10, 20, 30], ptr: { 1: 'cur' }, caption: 'before: delete cur (20)' },
      { type: 'list', kind: 'double', nodes: [10, 30], caption: 'after: 10.next = 30 and 30.prev = 10' }
    ] }
  ],
  'u2-cll-def': [
    { type: 'list', kind: 'circular', nodes: [10, 20, 30], head: 'tail->next', ptr: { 2: 'tail' }, caption: 'No NULL: last node points to the first. tail->next is the first node.' }
  ],
  'u2-cll-insbeg': [
    { type: 'row', items: [
      { type: 'list', kind: 'circular', nodes: [10, 20], head: false, ptr: { 0: 'first', 1: 'tail' }, caption: 'before' },
      { type: 'list', kind: 'circular', nodes: [5, 10, 20], head: false, hl: [0], ptr: { 0: 'first', 2: 'tail' }, caption: 'insert 5 at beginning: tail does not move (at end, tail = newNode)' }
    ] }
  ],
  'u2-stack-def': [
    { type: 'stack', items: [10, 20, 30], size: 5, caption: 'Insert and delete only at the top: last in, first out.' }
  ],
  'u2-stack-arr-trace': [
    { type: 'row', items: [
      { type: 'stack', items: [10, 20, 30], size: 4, caption: 'push 10, 20, 30: top = 2' },
      { type: 'stack', items: [10, 20], size: 4, caption: 'pop() returns 30: top = 1' },
      { type: 'stack', items: [10, 20, 40, 50], size: 4, hl: [3], caption: 'push 40, 50: full (top = 3), push(60) = Overflow' }
    ] }
  ],
  'u2-stack-ll': [
    { type: 'list', nodes: [30, 20, 10], head: 'top', caption: 'After push 10, 20, 30: top points to the newest node. Push/pop at the head.' }
  ],
  'u2-eval-post-trace': [
    { type: 'row', items: [
      { type: 'stack', items: [6, 2, 3], caption: 'after 6 2 3' },
      { type: 'stack', items: [6, 5], caption: '+ : 2 + 3 = 5' },
      { type: 'stack', items: [1], caption: '- : 6 - 5 = 1' }
    ] },
    { type: 'row', items: [
      { type: 'stack', items: [1, 3, 8, 2], caption: 'after 3 8 2' },
      { type: 'stack', items: [1, 3, 4], caption: '/ : 8 / 2 = 4' },
      { type: 'stack', items: [1, 7], caption: '+ : 3 + 4 = 7; then * : 1 * 7 = 7 (result)' }
    ] }
  ],
  'u2-eval-pre-trace': [
    { type: 'row', items: [
      { type: 'stack', items: [5, 4, 3, 2], caption: 'push 5, 4, 3, 2 (right to left)' },
      { type: 'stack', items: [5, 4, 6], caption: '*: 2 * 3 = 6' },
      { type: 'stack', items: [5, 2], caption: '-: 6 - 4 = 2; then +: 2 + 5 = 7 (result)' }
    ] }
  ],
  'u2-rec-fact-trace': [
    { type: 'stack', items: ['fact(3)', 'fact(2)', 'fact(1)', 'fact(0)'], hl: [3], caption: 'Winding: calls pile up to the base case fact(0). Unwinding pops fact(0) first.' }
  ],
  'u2-queue-def': [
    { type: 'array', cells: [10, 20, 30, null, null], ptr: { 0: 'front', 2: 'rear' }, caption: 'Insert at rear, delete from front: first in, first out.' }
  ],
  'u2-queue-lin-drawback': [
    { type: 'array', cells: [null, null, null, 40, 50], dim: [0, 1, 2], ptr: { 3: 'front', 4: 'rear' }, caption: 'MAX = 5: rear = MAX - 1, so enqueue(60) overflows although cells 0-2 are free.' }
  ],
  'u2-cq-def': [
    { type: 'array', cells: ['B', 'C', null, null, 'A'], ptr: { 4: 'front', 1: 'rear' }, wrap: true, caption: 'Ring: after index MAX - 1, rear wraps to 0 via (rear + 1) % MAX.' }
  ],
  'u2-cq-trace': [
    { type: 'array', cells: [10, 20, 30, 40, 50], ptr: { 0: 'front', 4: 'rear' }, wrap: true, caption: 'full: (rear + 1) % 5 = front, enqueue(60) = Overflow' },
    { type: 'array', cells: [null, null, 30, 40, 50], dim: [0, 1], ptr: { 2: 'front', 4: 'rear' }, wrap: true, caption: 'after two dequeues (10, 20 leave)' },
    { type: 'array', cells: [60, 70, 30, 40, 50], hl: [0, 1], ptr: { 2: 'front', 1: 'rear' }, wrap: true, caption: 'enqueue 60, 70: rear wraps and reuses cells 0 and 1' }
  ],
  'u2-queue-ll': [
    { type: 'list', nodes: [10, 20, 30], head: 'front', ptr: { 2: 'rear' }, caption: 'Enqueue at rear (rear->next = n), dequeue at front: both O(1).' }
  ],
  'u2-pq-trace': [
    { type: 'row', items: [
      { type: 'list', nodes: ['B(1)', 'C(2)', 'A(3)'], head: 'front', caption: 'before insert(D, 1)' },
      { type: 'list', nodes: ['B(1)', 'D(1)', 'C(2)', 'A(3)'], head: 'front', hl: [1], caption: 'D goes after B (equal priority, B arrived first)' }
    ] }
  ],
  'u2-dq-trace': [
    { type: 'array', cells: [10, 20, null, null, null], ptr: { 0: 'front', 1: 'rear' }, caption: 'insertRear(10), insertRear(20)' },
    { type: 'array', cells: [10, 20, null, 3, 5], hl: [3, 4], ptr: { 3: 'front', 1: 'rear' }, caption: 'insertFront(5), insertFront(3): front moves backward and wraps to 4, then 3' },
    { type: 'array', cells: [10, 40, null, null, 5], ptr: { 4: 'front', 1: 'rear' }, caption: 'deleteRear (20), deleteFront (3), insertRear(40)' }
  ],
  'u2-pyq-q6': [
    { type: 'row', items: [
      { type: 'stack', items: [5, 4, 3, 2], caption: '(i) push 5, 4, 3, 2' },
      { type: 'stack', items: [5, 4, 6], caption: '2 * 3 = 6' },
      { type: 'stack', items: [5, 2], caption: '6 - 4 = 2; then 2 + 5 = 7 (result)' }
    ] },
    { type: 'row', items: [
      { type: 'stack', items: [5, 4, 3], caption: '(ii) push 5, 4, 3' },
      { type: 'stack', items: [5, 7], caption: '+: 3 + 4 = 7' },
      { type: 'stack', items: [5, 14], caption: 'push 2; *: 2 * 7 = 14; then -: 14 - 5 = 9 (result)' }
    ] }
  ],
  'u2-pyq-q7': [
    { type: 'array', cells: [null, null, null, 40, 50], dim: [0, 1, 2], ptr: { 3: 'front', 4: 'rear' }, caption: 'Linear queue waste: rear = MAX - 1 but cells 0-2 are free. A circular queue reuses them.' }
  ]
});
