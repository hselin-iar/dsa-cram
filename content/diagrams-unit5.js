window.DSA_DIAGRAMS = window.DSA_DIAGRAMS || {};
Object.assign(window.DSA_DIAGRAMS, {
  'u5-hash-example': [
    { type: 'hash', slots: [null, null, null, 23, null, 45, null, null, 18, null], hl: [3, 5, 8], caption: 'h(k) = k mod 10 sends 23 to 3, 45 to 5, 18 to 8. Search 45: compute 5, go straight there.' }
  ],
  'u5-hf-midsquare': [
    { type: 'array', cells: [1, 0, 2, 7, 2, 0, 2, 5], index: false, hl: [3, 4], caption: 'k² = 10272025: the middle two digits 7 2 give h(k) = 72.' }
  ],
  'u5-hf-folding': [
    { type: 'row', arrow: '', items: [
      { type: 'array', cells: [123, 456, 789], index: false, caption: 'Fold-shift: 123 + 456 + 789 = 1368, drop carry, h = 368' },
      { type: 'array', cells: [321, 456, 987], index: false, hl: [0, 2], caption: 'Fold-boundary: first and last parts reversed, 321 + 456 + 987 = 1764, h = 764' }
    ] }
  ],
  'u5-hf-digit-extraction': [
    { type: 'array', cells: [3, 7, 9, 4, 5, 2], index: [1, 2, 3, 4, 5, 6], hl: [0, 2, 4], caption: 'Digits 1, 3, 5 of 379452 picked: h(k) = 395.' }
  ],
  'u5-closed-open-hashing': [
    { type: 'row', arrow: '', items: [
      { type: 'hash', slots: [null, 11, 41, null], hl: [2], caption: 'Closed hashing: colliding 41 goes to another free slot inside the table' },
      { type: 'hash', slots: [null, null, null, null], chains: { 1: [11, 41] }, caption: 'Open hashing: 41 hangs in a list outside the table' }
    ] }
  ],
  'u5-lp-trace': [
    { type: 'hash', slots: [null, 11, 32, 41, 54, 33, 22, 76, null, null], hl: [3, 5, 6, 7], caption: 'Final table. Highlighted keys were displaced from their home: 41 (home 1), 33 (home 3), 22 (home 2), 76 (home 6). Total probes = 16.' }
  ],
  'u5-lp-deletion': [
    { type: 'row', arrow: '', items: [
      { type: 'array', cells: [null, 11, null, 41], ptr: { 1: 'search 41 starts' }, hl: [2], caption: 'Wrong: slot 2 made empty (32 deleted), search for 41 stops here: "not found"' },
      { type: 'array', cells: [null, 11, 'DEL', 41], ptr: { 1: 'search 41 starts' }, hl: [3], caption: 'Right: slot 2 marked DELETED, search walks past it and finds 41' }
    ] }
  ],
  'u5-lp-adv-dis': [
    { type: 'array', cells: [null, 11, 32, 41, 54, 33, 22, 76, null, null], hl: [1, 2, 3, 4, 5, 6, 7], caption: 'Primary clustering: one long continuous block (indices 1 to 7). A key hashing anywhere in it must walk to index 8.' }
  ],
  'u5-qp-def': [
    { type: 'array', cells: [null, null, null, null, null, null, null, null, null, null], ptr: { 1: 'h', 2: 'h+1', 5: 'h+4', 0: 'h+9' }, hl: [1, 2, 5, 0], caption: 'Probe sequence for home h = 1, m = 10: 1, 2, 5, then (1 + 9) mod 10 = 0. The jumps grow.' }
  ],
  'u5-qp-trace': [
    { type: 'hash', slots: [null, 11, 32, 33, 54, 41, 22, 76, null, null], hl: [5, 6], caption: 'Final table. 41 probed 1→2→5, 22 probed 2→3→6; 33 now sits at its own home 3. Total probes = 12.' }
  ],
  'u5-sc-trace': [
    { type: 'hash', slots: [null, null, null, null, null, null, null, null, null, null], chains: { 1: [11, 41], 2: [32, 22], 3: [33], 4: [54], 6: [76] }, caption: 'Each index points to a list outside the table; synonyms 11, 41 and 32, 22 share a list.' }
  ],
  'u5-cwor-trace': [
    { type: 'hash', slots: [null, 11, 32, 41, 54, 33, 22, 76, null, null], extra: { title: 'Chain', vals: [-1, 3, 6, -1, -1, -1, -1, -1, -1, -1] }, links: [[1, 3], [2, 6]], hl: [3, 5, 6, 7], caption: 'Final table. Chain 1 → 3 links 11, 41; chain 2 → 6 links 32, 22. Keys are never moved.' }
  ],
  'u5-cwor-solved': [
    { type: 'hash', slots: [25, 31, 21, 3, 4, 61, 6, 71, 8, 9], extra: { title: 'Chain', vals: [-1, 2, 5, -1, -1, 7, -1, -1, -1, -1] }, links: [[1, 2], [2, 5], [5, 7]], caption: 'Final table. Chain of home 1: 31 → 21 → 61 → 71. 25 (home 5) was pushed to index 0 and is not linked.' }
  ],
  'u5-cwor-drawback': [
    { type: 'hash', slots: [null, 11, 32, 41, 54], extra: { title: 'Chain', vals: [-1, 3, -1, -1, -1] }, hl: [3], caption: '41 sits at index 3, the home of 33. When 33 arrives it cannot use index 3, so it goes to the next empty slot and its chain does not start at home.' }
  ],
  'u5-cwr-def': [
    { type: 'row', items: [
      { type: 'hash', slots: [null, 11, 32, 41, 54], extra: { title: 'Chain', vals: [-1, 3, -1, -1, -1] }, hl: [3], caption: 'Before 33: 41 (home 1) sits at index 3, 33\'s home' },
      { type: 'hash', slots: [null, 11, 32, 33, 54, 41], extra: { title: 'Chain', vals: [-1, 5, -1, -1, -1, -1] }, hl: [3, 5], caption: 'After: 41 moved to 5, chain[1] = 5, 33 stored at its home 3' }
    ] }
  ],
  'u5-cwr-trace': [
    { type: 'hash', slots: [null, 11, 32, 33, 54, 41, 76, 22, null, null], extra: { title: 'Chain', vals: [-1, 5, 7, -1, -1, -1, -1, -1, -1, -1] }, links: [[1, 5], [2, 7]], hl: [3, 5, 6, 7], caption: 'Final table. 41 and 22 were moved away so 33 and 76 sit at their homes. Chains: 1 → 5 (11, 41) and 2 → 7 (32, 22).' }
  ],
  'u5-cwr-solved': [
    { type: 'hash', slots: [50, 19, 18, 38, 14, 15, null, 17, 28, 29], extra: { title: 'Chain', vals: [-1, -1, 3, -1, -1, -1, -1, -1, 2, 1] }, links: [[8, 2], [2, 3], [9, 1]], caption: 'Final table. Chains: 8 → 2 → 3 (28, 18, 38) and 9 → 1 (29, 19).' }
  ],
  'u5-isam-ops': [
    { type: 'row', arrow: '', items: [
      { type: 'matrix', rows: ['', '', ''], cols: ['key', 'addr'], cells: [[101, 0], [102, 1], [105, 2]], caption: 'Index: sorted (key, address) pairs (illustrative)' },
      { type: 'array', cells: ['R101', 'R102', 'R105'], name: 'data', caption: 'Data file: the index address points into it' }
    ] }
  ],
  'u5-indexed-file': [
    { type: 'row', arrow: '', items: [
      { type: 'matrix', rows: ['', '', ''], cols: ['key', 'addr'], cells: [[101, 0], [102, 1], [105, 2]], hl: [[2, 0], [2, 1]], caption: 'Search index for key 105: address 2' },
      { type: 'array', cells: ['R101', 'R102', 'R105'], name: 'data', hl: [2], ptr: { 2: 'addr 2' }, caption: 'Jump straight to that record in the data file (illustrative values)' }
    ] }
  ],
  'u5-file-def': [
    { type: 'matrix', rows: ['Record 1', 'Record 2', 'Record 3'], cols: ['Roll no.', 'Name', 'Marks'], cells: [[1, 'Asha', 78], [2, 'Ravi', 64], [3, 'Meena', 91]], hl: [[0, 0], [1, 0], [2, 0]], caption: 'File = 3 records; each record has 3 fields. Roll no. (highlighted) is the key. Values illustrative.' }
  ],
  'u5-file-pointers': [
    { type: 'array', cells: ['Rec 1', 'Rec 2', 'Rec 3', 'Rec 4'], index: [0, 'sz', '2·sz', '3·sz'], hl: [2], ptr: { 2: 'get ptr' }, caption: 'seekg((n - 1) * sizeof(Student), ios::beg) with n = 3 jumps over 2 records straight to Rec 3. Under each record: its byte offset.' }
  ],
  'u5-delete-record-algo': [
    { type: 'row', items: [
      { type: 'array', cells: ['R1', 'R2', 'R3', 'R4'], name: 'student.dat', hl: [2], index: false, caption: 'Delete R3' },
      { type: 'array', cells: ['R1', 'R2', 'R4'], name: 'temp.dat', index: false, caption: 'Copy every record except R3, then remove the original and rename temp.dat' }
    ] }
  ],
  'u5-pyq-4': [
    { type: 'hash', slots: [25, 31, 21, 3, 4, 61, 6, 71, 8, 9], extra: { title: 'Chain', vals: [-1, 2, 5, -1, -1, 7, -1, -1, -1, -1] }, links: [[1, 2], [2, 5], [5, 7]], caption: 'Final table. Chain of home 1: 31 → 21 → 61 → 71. 25 (home 5) sits at 0 with no link.' }
  ],
  'u5-pyq-5': [
    { type: 'hash', slots: [null, 11, 32, 33, 54, 41, 22, 76, null, null], hl: [5, 6], caption: 'Quadratic probing final table. 41: 1→2→5; 22: 2→3→6. Total probes = 12.' }
  ],
  'u5-pyq-6': [
    { type: 'hash', slots: [50, 19, 18, 38, 14, 15, null, 17, 28, 29], extra: { title: 'Chain', vals: [-1, -1, 3, -1, -1, -1, -1, -1, 2, 1] }, links: [[8, 2], [2, 3], [9, 1]], caption: 'Final table. Chains: 8 → 2 → 3 (28, 18, 38) and 9 → 1 (29, 19).' }
  ],
  'u5-pyq-7': [
    { type: 'hash', slots: [20, 11, 98, 33, 44, 68, 66, 24, 88, 79], extra: { title: 'Chain', vals: [-1, -1, 5, -1, 7, -1, -1, -1, 2, -1] }, links: [[8, 2], [2, 5], [4, 7]], hl: [4, 5], caption: 'Final table. Chains: 8 → 2 → 5 (88, 98, 68) and 4 → 7 (44, 24). 68 was moved from 4 to 5 when 44 claimed its home.' }
  ]
});
