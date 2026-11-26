window.DSA_DIAGRAMS = window.DSA_DIAGRAMS || {};
Object.assign(window.DSA_DIAGRAMS, {
 "u1-adt-stack": [
  {
   "type": "stack",
   "items": [
    10,
    20,
    30
   ],
   "size": 5,
   "caption": "LIFO: push and pop work only at the top (30 here)."
  }
 ],
 "u1-ds-classification": [
  {
   "type": "tree",
   "general": true,
   "caption": "Classification tree of data structures.",
   "root": {
    "v": "Data Structure",
    "c": [
     {
      "v": "Primitive",
      "c": [
       {
        "v": "int"
       },
       {
        "v": "float"
       },
       {
        "v": "char"
       },
       {
        "v": "pointer"
       }
      ]
     },
     {
      "v": "Non-primitive",
      "c": [
       {
        "v": "Linear",
        "c": [
         {
          "v": "Array"
         },
         {
          "v": "Linked list"
         },
         {
          "v": "Stack"
         },
         {
          "v": "Queue"
         }
        ]
       },
       {
        "v": "Non-linear",
        "c": [
         {
          "v": "Tree"
         },
         {
          "v": "Graph"
         }
        ]
       }
      ]
     }
    ]
   }
  }
 ],
 "u1-linear-trace": [
  {
   "type": "array",
   "cells": [
    10,
    14,
    19,
    26,
    27,
    31,
    33,
    35,
    42,
    44
   ],
   "ptr": {
    "6": "i"
   },
   "hl": [
    6
   ],
   "dim": [
    0,
    1,
    2,
    3,
    4,
    5
   ],
   "caption": "key = 33: 6 mismatches (grey), found at index 6 on the 7th comparison."
  }
 ],
 "u1-binary-trace": [
  {
   "type": "array",
   "cells": [
    0,
    4,
    7,
    10,
    14,
    23,
    45,
    47,
    53
   ],
   "ptr": {
    "0": "low",
    "4": "mid",
    "8": "high"
   },
   "hl": [
    4
   ],
   "caption": "Step 1: A[4]=14 < 47, go right: low = 5."
  },
  {
   "type": "array",
   "cells": [
    0,
    4,
    7,
    10,
    14,
    23,
    45,
    47,
    53
   ],
   "ptr": {
    "5": "low",
    "6": "mid",
    "8": "high"
   },
   "hl": [
    6
   ],
   "dim": [
    0,
    1,
    2,
    3,
    4
   ],
   "caption": "Step 2: A[6]=45 < 47, go right: low = 7 (grey = discarded)."
  },
  {
   "type": "array",
   "cells": [
    0,
    4,
    7,
    10,
    14,
    23,
    45,
    47,
    53
   ],
   "ptr": {
    "7": [
     "low",
     "mid"
    ],
    "8": "high"
   },
   "hl": [
    7
   ],
   "dim": [
    0,
    1,
    2,
    3,
    4,
    5,
    6
   ],
   "caption": "Step 3: A[7]=47 = key, found at index 7 (3 comparisons)."
  }
 ],
 "u1-pyq-5": [
  {
   "type": "array",
   "cells": [
    10,
    14,
    19,
    26,
    27,
    31,
    33,
    35,
    42,
    44
   ],
   "ptr": {
    "6": "i"
   },
   "hl": [
    6
   ],
   "dim": [
    0,
    1,
    2,
    3,
    4,
    5
   ],
   "caption": "Linear: key 33 found at index 6 after 7 comparisons."
  },
  {
   "type": "array",
   "cells": [
    0,
    4,
    7,
    10,
    14,
    23,
    45,
    47,
    53
   ],
   "ptr": {
    "0": "low",
    "4": "mid",
    "8": "high"
   },
   "hl": [
    4
   ],
   "caption": "Binary, step 1: low=0, mid=4, high=8; 47 > 14, so low = 5. Step 2: mid = 6 (45), low = 7."
  },
  {
   "type": "array",
   "cells": [
    0,
    4,
    7,
    10,
    14,
    23,
    45,
    47,
    53
   ],
   "ptr": {
    "7": [
     "low",
     "mid"
    ],
    "8": "high"
   },
   "hl": [
    7
   ],
   "dim": [
    0,
    1,
    2,
    3,
    4,
    5,
    6
   ],
   "caption": "Binary, step 3: low=7, mid=7, high=8; A[7] = 47, found at index 7."
  }
 ],
 "u1-bubble-trace": [
  {
   "type": "array",
   "cells": [
    5,
    3,
    8,
    4,
    6
   ],
   "name": "Given",
   "caption": "Compare neighbours, swap if left > right."
  },
  {
   "type": "array",
   "cells": [
    3,
    5,
    4,
    6,
    8
   ],
   "name": "Pass 1",
   "hl": [
    4
   ],
   "caption": "8 bubbled to the end (green = in final place)."
  },
  {
   "type": "array",
   "cells": [
    3,
    4,
    5,
    6,
    8
   ],
   "name": "Pass 2",
   "hl": [
    3,
    4
   ],
   "caption": "Pass 3 makes no swap, so the sort stops."
  }
 ],
 "u1-pyq-6": [
  {
   "type": "matrix",
   "rows": [
    "Given",
    "Pass 1",
    "Pass 2",
    "Pass 3",
    "Pass 4",
    "Pass 5"
   ],
   "cols": [
    0,
    1,
    2,
    3,
    4,
    5,
    6
   ],
   "cells": [
    [
     10,
     5,
     4,
     18,
     17,
     1,
     2
    ],
    [
     5,
     4,
     10,
     17,
     1,
     2,
     18
    ],
    [
     4,
     5,
     10,
     1,
     2,
     17,
     18
    ],
    [
     4,
     5,
     1,
     2,
     10,
     17,
     18
    ],
    [
     4,
     1,
     2,
     5,
     10,
     17,
     18
    ],
    [
     1,
     2,
     4,
     5,
     10,
     17,
     18
    ]
   ],
   "hl": [
    [
     1,
     6
    ],
    [
     2,
     5
    ],
    [
     2,
     6
    ],
    [
     3,
     4
    ],
    [
     3,
     5
    ],
    [
     3,
     6
    ],
    [
     4,
     3
    ],
    [
     4,
     4
    ],
    [
     4,
     5
    ],
    [
     4,
     6
    ],
    [
     5,
     2
    ],
    [
     5,
     3
    ],
    [
     5,
     4
    ],
    [
     5,
     5
    ],
    [
     5,
     6
    ]
   ],
   "caption": "Columns are indexes 0 to 6; highlighted = largest values settled at the end after each pass."
  }
 ],
 "u1-selection-trace": [
  {
   "type": "array",
   "cells": [
    20,
    12,
    10,
    15,
    2
   ],
   "name": "Given",
   "ptr": {
    "0": "i",
    "4": "min"
   },
   "caption": "Pass 1: minimum 2 swaps with the first element 20."
  },
  {
   "type": "array",
   "cells": [
    2,
    12,
    10,
    15,
    20
   ],
   "name": "Pass 1",
   "hl": [
    0
   ],
   "ptr": {
    "1": "i",
    "2": "min"
   },
   "caption": "Pass 2: minimum of 12 10 15 20 is 10; swap with 12."
  },
  {
   "type": "array",
   "cells": [
    2,
    10,
    12,
    15,
    20
   ],
   "name": "Pass 2",
   "hl": [
    0,
    1
   ],
   "caption": "Passes 3 and 4: 12 and 15 already in place, no swap."
  }
 ],
 "u1-selection-analysis": [
  {
   "type": "row",
   "items": [
    {
     "type": "array",
     "cells": [
      "5a",
      "5b",
      2
     ],
     "caption": "before"
    },
    {
     "type": "array",
     "cells": [
      2,
      "5b",
      "5a"
     ],
     "caption": "after: 5a jumped over 5b (not stable)"
    }
   ]
  }
 ],
 "u1-insertion-trace": [
  {
   "type": "matrix",
   "rows": [
    "Given",
    "Pass 1",
    "Pass 2",
    "Pass 3",
    "Pass 4"
   ],
   "cols": [
    0,
    1,
    2,
    3,
    4
   ],
   "cells": [
    [
     23,
     1,
     10,
     5,
     2
    ],
    [
     1,
     23,
     10,
     5,
     2
    ],
    [
     1,
     10,
     23,
     5,
     2
    ],
    [
     1,
     5,
     10,
     23,
     2
    ],
    [
     1,
     2,
     5,
     10,
     23
    ]
   ],
   "hl": [
    [
     0,
     0
    ],
    [
     1,
     0
    ],
    [
     1,
     1
    ],
    [
     2,
     0
    ],
    [
     2,
     1
    ],
    [
     2,
     2
    ],
    [
     3,
     0
    ],
    [
     3,
     1
    ],
    [
     3,
     2
    ],
    [
     3,
     3
    ],
    [
     4,
     0
    ],
    [
     4,
     1
    ],
    [
     4,
     2
    ],
    [
     4,
     3
    ],
    [
     4,
     4
    ]
   ],
   "caption": "Highlighted = sorted left part. Each pass shifts bigger elements right and inserts the key."
  }
 ],
 "u1-merge-trace": [
  {
   "type": "tree",
   "caption": "Divide: split at the middle until single elements.",
   "root": {
    "v": "38 27 43 3 9 82 10",
    "c": [
     {
      "v": "38 27 43 3",
      "c": [
       {
        "v": "38 27",
        "c": [
         {
          "v": 38
         },
         {
          "v": 27
         }
        ]
       },
       {
        "v": "43 3",
        "c": [
         {
          "v": 43
         },
         {
          "v": 3
         }
        ]
       }
      ]
     },
     {
      "v": "9 82 10",
      "c": [
       {
        "v": "9 82",
        "c": [
         {
          "v": 9
         },
         {
          "v": 82
         }
        ]
       },
       {
        "v": 10
       }
      ]
     }
    ]
   }
  },
  {
   "type": "tree",
   "caption": "Combine: merge sorted halves back up.",
   "root": {
    "v": "3 9 10 27 38 43 82",
    "c": [
     {
      "v": "3 27 38 43",
      "c": [
       {
        "v": "27 38",
        "c": [
         {
          "v": 38
         },
         {
          "v": 27
         }
        ]
       },
       {
        "v": "3 43",
        "c": [
         {
          "v": 43
         },
         {
          "v": 3
         }
        ]
       }
      ]
     },
     {
      "v": "9 10 82",
      "c": [
       {
        "v": "9 82",
        "c": [
         {
          "v": 9
         },
         {
          "v": 82
         }
        ]
       },
       {
        "v": 10
       }
      ]
     }
    ]
   }
  }
 ],
 "u1-pyq-9": [
  {
   "type": "tree",
   "caption": "Divide at mid = (low + high)/2; pairs split once more into single elements.",
   "root": {
    "v": "10 5 7 6 1 4 8 3 2 9",
    "c": [
     {
      "v": "10 5 7 6 1",
      "c": [
       {
        "v": "10 5 7",
        "c": [
         {
          "v": "10 5"
         },
         {
          "v": 7
         }
        ]
       },
       {
        "v": "6 1"
       }
      ]
     },
     {
      "v": "4 8 3 2 9",
      "c": [
       {
        "v": "4 8 3",
        "c": [
         {
          "v": "4 8"
         },
         {
          "v": 3
         }
        ]
       },
       {
        "v": "2 9"
       }
      ]
     }
    ]
   }
  },
  {
   "type": "tree",
   "caption": "Merge back up: each node is the sorted result (10+5 -> 5 10, then +7 -> 5 7 10, ...).",
   "root": {
    "v": "1 2 3 4 5 6 7 8 9 10",
    "c": [
     {
      "v": "1 5 6 7 10",
      "c": [
       {
        "v": "5 7 10",
        "c": [
         {
          "v": "5 10"
         },
         {
          "v": 7
         }
        ]
       },
       {
        "v": "1 6"
       }
      ]
     },
     {
      "v": "2 3 4 8 9",
      "c": [
       {
        "v": "3 4 8",
        "c": [
         {
          "v": "4 8"
         },
         {
          "v": 3
         }
        ]
       },
       {
        "v": "2 9"
       }
      ]
     }
    ]
   }
  }
 ],
 "u1-merge-one-merge": [
  {
   "type": "array",
   "cells": [
    3,
    27,
    38,
    43
   ],
   "name": "Left",
   "dim": [
    0
   ],
   "ptr": {
    "1": "i"
   },
   "caption": "3 already copied; now compare 27 (i) with 10 (j)."
  },
  {
   "type": "array",
   "cells": [
    9,
    10,
    82
   ],
   "name": "Right",
   "dim": [
    0
   ],
   "ptr": {
    "1": "j"
   },
   "caption": "9 already copied; 10 is smaller, so it goes next."
  },
  {
   "type": "array",
   "cells": [
    3,
    9,
    null,
    null,
    null,
    null,
    null
   ],
   "name": "B",
   "hl": [
    0,
    1
   ],
   "caption": "Temp array B so far: 3 9; final B = 3 9 10 27 38 43 82."
  }
 ],
 "u1-quick-partition-idea": [
  {
   "type": "array",
   "cells": [
    4,
    3,
    8,
    9,
    7,
    1,
    6,
    2,
    5
   ],
   "ptr": {
    "1": "i",
    "5": "j",
    "8": "pivot"
   },
   "hl": [
    0,
    1
   ],
   "caption": "Example mid-partition (pivot 5): cells up to i are < pivot; j scans ahead; pivot finally swaps with A[i+1]."
  }
 ],
 "u1-quick-trace-partition": [
  {
   "type": "array",
   "cells": [
    9,
    4,
    8,
    3,
    7,
    1,
    6,
    2,
    5
   ],
   "ptr": {
    "0": "j",
    "8": "pivot"
   },
   "name": "Start",
   "caption": "i = -1, pivot = 5 (last element), j scans 0 to 7."
  },
  {
   "type": "array",
   "cells": [
    4,
    3,
    1,
    2,
    7,
    8,
    6,
    9,
    5
   ],
   "ptr": {
    "3": "i",
    "8": "pivot"
   },
   "hl": [
    0,
    1,
    2,
    3
   ],
   "name": "j=7 done",
   "caption": "After the scan: first four are all < 5 (i = 3)."
  },
  {
   "type": "array",
   "cells": [
    4,
    3,
    1,
    2,
    5,
    8,
    6,
    9,
    7
   ],
   "hl": [
    4
   ],
   "name": "Final",
   "caption": "Swap pivot with A[i+1] = A[4] (7): 5 is fixed at index 4."
  }
 ],
 "u1-quick-trace-calls": [
  {
   "type": "tree",
   "caption": "Each node = pivot placed by one call; left subtree = smaller part, right = larger part.",
   "root": {
    "v": 5,
    "c": [
     {
      "v": 2,
      "c": [
       {
        "v": 1,
        "c": [
         null,
         null
        ]
       },
       {
        "v": 3,
        "c": [
         null,
         {
          "v": 4,
          "c": [
           null,
           null
          ]
         }
        ]
       }
      ]
     },
     {
      "v": 7,
      "c": [
       {
        "v": 6,
        "c": [
         null,
         null
        ]
       },
       {
        "v": 8,
        "c": [
         null,
         {
          "v": 9,
          "c": [
           null,
           null
          ]
         }
        ]
       }
      ]
     }
    ]
   }
  }
 ],
 "u1-pyq-8": [
  {
   "type": "array",
   "cells": [
    25,
    12,
    33,
    37,
    57,
    92,
    86,
    48
   ],
   "hl": [
    2
   ],
   "caption": "After first partition (pivot 33): 33 fixed at index 2."
  },
  {
   "type": "tree",
   "caption": "Pivot tree of all partitions: left = smaller part, right = larger part.",
   "root": {
    "v": 33,
    "c": [
     {
      "v": 12,
      "c": [
       null,
       {
        "v": 25,
        "c": [
         null,
         null
        ]
       }
      ]
     },
     {
      "v": 48,
      "c": [
       {
        "v": 37,
        "c": [
         null,
         null
        ]
       },
       {
        "v": 57,
        "c": [
         null,
         {
          "v": 92,
          "c": [
           {
            "v": 86,
            "c": [
             null,
             null
            ]
           },
           null
          ]
         }
        ]
       }
      ]
     }
    ]
   }
  }
 ]
});
