window.DSA_DIAGRAMS = window.DSA_DIAGRAMS || {};
Object.assign(window.DSA_DIAGRAMS, {
 "u4-graph-types-fig": [
  {
   "type": "row",
   "arrow": " ",
   "items": [
    {
     "type": "graph",
     "nodes": [
      {
       "id": "A",
       "x": 0,
       "y": 1
      },
      {
       "id": "B",
       "x": 2,
       "y": 0
      },
      {
       "id": "C",
       "x": 2,
       "y": 2
      },
      {
       "id": "D",
       "x": 4,
       "y": 0
      },
      {
       "id": "E",
       "x": 4,
       "y": 2
      }
     ],
     "edges": [
      [
       "A",
       "B"
      ],
      [
       "A",
       "C"
      ],
      [
       "B",
       "C"
      ],
      [
       "B",
       "D"
      ],
      [
       "C",
       "E"
      ],
      [
       "D",
       "E"
      ]
     ],
     "caption": "G1: undirected"
    },
    {
     "type": "graph",
     "directed": true,
     "nodes": [
      {
       "id": "A",
       "x": 0,
       "y": 1
      },
      {
       "id": "B",
       "x": 2,
       "y": 0
      },
      {
       "id": "C",
       "x": 2,
       "y": 2
      },
      {
       "id": "D",
       "x": 4,
       "y": 0
      },
      {
       "id": "E",
       "x": 4,
       "y": 2
      }
     ],
     "edges": [
      [
       "A",
       "B"
      ],
      [
       "A",
       "C"
      ],
      [
       "B",
       "D"
      ],
      [
       "C",
       "B"
      ],
      [
       "D",
       "E"
      ],
      [
       "E",
       "C"
      ]
     ],
     "caption": "G2: directed (arrows)"
    },
    {
     "type": "graph",
     "nodes": [
      {
       "id": "A",
       "x": 0,
       "y": 1
      },
      {
       "id": "B",
       "x": 2,
       "y": 0
      },
      {
       "id": "C",
       "x": 2,
       "y": 2
      },
      {
       "id": "D",
       "x": 4,
       "y": 0
      },
      {
       "id": "E",
       "x": 4,
       "y": 2
      }
     ],
     "edges": [
      [
       "A",
       "B",
       4
      ],
      [
       "A",
       "C",
       2
      ],
      [
       "B",
       "C",
       5
      ],
      [
       "B",
       "D",
       10
      ],
      [
       "C",
       "E",
       3
      ],
      [
       "D",
       "E",
       4
      ]
     ],
     "caption": "G3: weighted"
    }
   ]
  }
 ],
 "u4-term-degree": [
  {
   "type": "graph",
   "nodes": [
    {
     "id": "A",
     "x": 0,
     "y": 1
    },
    {
     "id": "B",
     "x": 2,
     "y": 0
    },
    {
     "id": "C",
     "x": 2,
     "y": 2
    },
    {
     "id": "D",
     "x": 4,
     "y": 0
    },
    {
     "id": "E",
     "x": 4,
     "y": 2
    }
   ],
   "edges": [
    [
     "A",
     "B"
    ],
    [
     "A",
     "C"
    ],
    [
     "B",
     "C"
    ],
    [
     "B",
     "D"
    ],
    [
     "C",
     "E"
    ],
    [
     "D",
     "E"
    ]
   ],
   "hl": [
    [
     "B",
     "A"
    ],
    [
     "B",
     "C"
    ],
    [
     "B",
     "D"
    ]
   ],
   "caption": "degree(B) = 3: edges BA, BC, BD"
  }
 ],
 "u4-term-path": [
  {
   "type": "graph",
   "nodes": [
    {
     "id": "A",
     "x": 0,
     "y": 1
    },
    {
     "id": "B",
     "x": 2,
     "y": 0
    },
    {
     "id": "C",
     "x": 2,
     "y": 2
    },
    {
     "id": "D",
     "x": 4,
     "y": 0
    },
    {
     "id": "E",
     "x": 4,
     "y": 2
    }
   ],
   "edges": [
    [
     "A",
     "B"
    ],
    [
     "A",
     "C"
    ],
    [
     "B",
     "C"
    ],
    [
     "B",
     "D"
    ],
    [
     "C",
     "E"
    ],
    [
     "D",
     "E"
    ]
   ],
   "hl": [
    [
     "A",
     "B"
    ],
    [
     "B",
     "D"
    ],
    [
     "D",
     "E"
    ]
   ],
   "caption": "Path A-B-D-E: length 3 (3 edges)"
  }
 ],
 "u4-term-cycle": [
  {
   "type": "graph",
   "nodes": [
    {
     "id": "A",
     "x": 0,
     "y": 1
    },
    {
     "id": "B",
     "x": 2,
     "y": 0
    },
    {
     "id": "C",
     "x": 2,
     "y": 2
    },
    {
     "id": "D",
     "x": 4,
     "y": 0
    },
    {
     "id": "E",
     "x": 4,
     "y": 2
    }
   ],
   "edges": [
    [
     "A",
     "B"
    ],
    [
     "A",
     "C"
    ],
    [
     "B",
     "C"
    ],
    [
     "B",
     "D"
    ],
    [
     "C",
     "E"
    ],
    [
     "D",
     "E"
    ]
   ],
   "hl": [
    [
     "A",
     "B"
    ],
    [
     "B",
     "C"
    ],
    [
     "A",
     "C"
    ]
   ],
   "caption": "Cycle A-B-C-A: starts and ends at A"
  }
 ],
 "u4-term-connected": [
  {
   "type": "row",
   "arrow": " ",
   "items": [
    {
     "type": "graph",
     "nodes": [
      {
       "id": "A",
       "x": 0,
       "y": 1
      },
      {
       "id": "B",
       "x": 2,
       "y": 0
      },
      {
       "id": "C",
       "x": 2,
       "y": 2
      },
      {
       "id": "D",
       "x": 4,
       "y": 1
      }
     ],
     "edges": [
      [
       "A",
       "B"
      ],
      [
       "A",
       "C"
      ],
      [
       "B",
       "C"
      ],
      [
       "C",
       "D"
      ]
     ],
     "caption": "Connected: a path between every pair"
    },
    {
     "type": "graph",
     "nodes": [
      {
       "id": "A",
       "x": 0,
       "y": 1
      },
      {
       "id": "B",
       "x": 2,
       "y": 0
      },
      {
       "id": "C",
       "x": 2,
       "y": 2
      },
      {
       "id": "D",
       "x": 5,
       "y": 0
      },
      {
       "id": "E",
       "x": 5,
       "y": 2
      }
     ],
     "edges": [
      [
       "A",
       "B"
      ],
      [
       "A",
       "C"
      ],
      [
       "B",
       "C"
      ],
      [
       "D",
       "E"
      ]
     ],
     "caption": "Disconnected: 2 components"
    }
   ]
  }
 ],
 "u4-term-strong-weak": [
  {
   "type": "row",
   "arrow": " ",
   "items": [
    {
     "type": "graph",
     "directed": true,
     "nodes": [
      {
       "id": "A",
       "x": 1,
       "y": 0
      },
      {
       "id": "B",
       "x": 3,
       "y": 2
      },
      {
       "id": "C",
       "x": 0,
       "y": 2
      }
     ],
     "edges": [
      [
       "A",
       "B"
      ],
      [
       "B",
       "C"
      ],
      [
       "C",
       "A"
      ]
     ],
     "caption": "Strongly connected: a path from every vertex to every other"
    },
    {
     "type": "graph",
     "directed": true,
     "nodes": [
      {
       "id": "A",
       "x": 1,
       "y": 0
      },
      {
       "id": "B",
       "x": 3,
       "y": 2
      },
      {
       "id": "C",
       "x": 0,
       "y": 2
      }
     ],
     "edges": [
      [
       "A",
       "B"
      ],
      [
       "B",
       "C"
      ],
      [
       "A",
       "C"
      ]
     ],
     "caption": "Weakly connected: no path back from C"
    }
   ]
  }
 ],
 "u4-term-complete": [
  {
   "type": "graph",
   "nodes": [
    {
     "id": "A",
     "x": 3,
     "y": 0
    },
    {
     "id": "B",
     "x": 0,
     "y": 4
    },
    {
     "id": "C",
     "x": 6,
     "y": 4
    },
    {
     "id": "D",
     "x": 3,
     "y": 2.5
    }
   ],
   "edges": [
    [
     "A",
     "B"
    ],
    [
     "A",
     "C"
    ],
    [
     "A",
     "D"
    ],
    [
     "B",
     "C"
    ],
    [
     "B",
     "D"
    ],
    [
     "C",
     "D"
    ]
   ],
   "caption": "K4: every vertex has degree 3; 4 x 3 / 2 = 6 edges"
  }
 ],
 "u4-adjmat-g1": [
  {
   "type": "row",
   "items": [
    {
     "type": "graph",
     "nodes": [
      {
       "id": "A",
       "x": 0,
       "y": 1
      },
      {
       "id": "B",
       "x": 2,
       "y": 0
      },
      {
       "id": "C",
       "x": 2,
       "y": 2
      },
      {
       "id": "D",
       "x": 4,
       "y": 0
      },
      {
       "id": "E",
       "x": 4,
       "y": 2
      }
     ],
     "edges": [
      [
       "A",
       "B"
      ],
      [
       "A",
       "C"
      ],
      [
       "B",
       "C"
      ],
      [
       "B",
       "D"
      ],
      [
       "C",
       "E"
      ],
      [
       "D",
       "E"
      ]
     ],
     "caption": "G1"
    },
    {
     "type": "matrix",
     "rows": [
      "A",
      "B",
      "C",
      "D",
      "E"
     ],
     "cols": [
      "A",
      "B",
      "C",
      "D",
      "E"
     ],
     "cells": [
      [
       0,
       1,
       1,
       0,
       0
      ],
      [
       1,
       0,
       1,
       1,
       0
      ],
      [
       1,
       1,
       0,
       0,
       1
      ],
      [
       0,
       1,
       0,
       0,
       1
      ],
      [
       0,
       0,
       1,
       1,
       0
      ]
     ],
     "caption": "Matrix of G1: symmetric"
    }
   ]
  },
  {
   "type": "row",
   "items": [
    {
     "type": "graph",
     "directed": true,
     "nodes": [
      {
       "id": "A",
       "x": 0,
       "y": 1
      },
      {
       "id": "B",
       "x": 2,
       "y": 0
      },
      {
       "id": "C",
       "x": 2,
       "y": 2
      },
      {
       "id": "D",
       "x": 4,
       "y": 0
      },
      {
       "id": "E",
       "x": 4,
       "y": 2
      }
     ],
     "edges": [
      [
       "A",
       "B"
      ],
      [
       "A",
       "C"
      ],
      [
       "B",
       "D"
      ],
      [
       "C",
       "B"
      ],
      [
       "D",
       "E"
      ],
      [
       "E",
       "C"
      ]
     ],
     "caption": "G2: directed (arrows)"
    },
    {
     "type": "matrix",
     "rows": [
      "A",
      "B",
      "C",
      "D",
      "E"
     ],
     "cols": [
      "A",
      "B",
      "C",
      "D",
      "E"
     ],
     "cells": [
      [
       0,
       1,
       1,
       0,
       0
      ],
      [
       0,
       0,
       0,
       1,
       0
      ],
      [
       0,
       1,
       0,
       0,
       0
      ],
      [
       0,
       0,
       0,
       0,
       1
      ],
      [
       0,
       0,
       1,
       0,
       0
      ]
     ],
     "caption": "Matrix of G2: not symmetric"
    }
   ]
  }
 ],
 "u4-adjlist-def": [
  {
   "type": "graph",
   "nodes": [
    {
     "id": "A",
     "x": 0,
     "y": 1
    },
    {
     "id": "B",
     "x": 2,
     "y": 0
    },
    {
     "id": "C",
     "x": 2,
     "y": 2
    },
    {
     "id": "D",
     "x": 4,
     "y": 0
    },
    {
     "id": "E",
     "x": 4,
     "y": 2
    }
   ],
   "edges": [
    [
     "A",
     "B"
    ],
    [
     "A",
     "C"
    ],
    [
     "B",
     "C"
    ],
    [
     "B",
     "D"
    ],
    [
     "C",
     "E"
    ],
    [
     "D",
     "E"
    ]
   ],
   "caption": "G1"
  },
  {
   "type": "hash",
   "slots": [
    "A",
    "B",
    "C",
    "D",
    "E"
   ],
   "chains": {
    "0": [
     "B",
     "C"
    ],
    "1": [
     "A",
     "C",
     "D"
    ],
    "2": [
     "A",
     "B",
     "E"
    ],
    "3": [
     "B",
     "E"
    ],
    "4": [
     "C",
     "D"
    ]
   },
   "caption": "Adjacency list of G1: 12 list nodes"
  }
 ],
 "u4-bfs-trace": [
  {
   "type": "graph",
   "nodes": [
    {
     "id": "A",
     "x": 0,
     "y": 0
    },
    {
     "id": "B",
     "x": 1.6,
     "y": 0
    },
    {
     "id": "C",
     "x": 3.2,
     "y": 0
    },
    {
     "id": "D",
     "x": 0,
     "y": 1.6
    },
    {
     "id": "E",
     "x": 1.6,
     "y": 1.6
    },
    {
     "id": "F",
     "x": 3.2,
     "y": 1.6
    },
    {
     "id": "G",
     "x": 4.4,
     "y": 0.8
    }
   ],
   "edges": [
    [
     "A",
     "B"
    ],
    [
     "A",
     "D"
    ],
    [
     "A",
     "E"
    ],
    [
     "B",
     "C"
    ],
    [
     "B",
     "E"
    ],
    [
     "C",
     "E"
    ],
    [
     "C",
     "F"
    ],
    [
     "C",
     "G"
    ],
    [
     "D",
     "E"
    ],
    [
     "E",
     "F"
    ],
    [
     "F",
     "G"
    ]
   ],
   "hl": [
    [
     "A",
     "B"
    ],
    [
     "A",
     "D"
    ],
    [
     "A",
     "E"
    ],
    [
     "B",
     "C"
    ],
    [
     "E",
     "F"
    ],
    [
     "C",
     "G"
    ]
   ],
   "caption": "Highlighted edges = BFS spanning tree (the edges that reached new vertices)"
  },
  {
   "type": "array",
   "cells": [
    "A",
    "B",
    "D",
    "E",
    "C",
    "F",
    "G"
   ],
   "index": false,
   "hl": [
    0
   ],
   "caption": "BFS order. Level 0: A | level 1: B, D, E | level 2: C, F | level 3: G"
  }
 ],
 "u4-dfs-trace": [
  {
   "type": "graph",
   "nodes": [
    {
     "id": "A",
     "x": 0,
     "y": 0
    },
    {
     "id": "B",
     "x": 1.6,
     "y": 0
    },
    {
     "id": "C",
     "x": 3.2,
     "y": 0
    },
    {
     "id": "D",
     "x": 0,
     "y": 1.6
    },
    {
     "id": "E",
     "x": 1.6,
     "y": 1.6
    },
    {
     "id": "F",
     "x": 3.2,
     "y": 1.6
    },
    {
     "id": "G",
     "x": 4.4,
     "y": 0.8
    }
   ],
   "edges": [
    [
     "A",
     "B"
    ],
    [
     "A",
     "D"
    ],
    [
     "A",
     "E"
    ],
    [
     "B",
     "C"
    ],
    [
     "B",
     "E"
    ],
    [
     "C",
     "E"
    ],
    [
     "C",
     "F"
    ],
    [
     "C",
     "G"
    ],
    [
     "D",
     "E"
    ],
    [
     "E",
     "F"
    ],
    [
     "F",
     "G"
    ]
   ],
   "hl": [
    [
     "A",
     "B"
    ],
    [
     "B",
     "C"
    ],
    [
     "C",
     "E"
    ],
    [
     "E",
     "D"
    ],
    [
     "E",
     "F"
    ],
    [
     "F",
     "G"
    ]
   ],
   "caption": "Highlighted edges = DFS tree (goes deep: A, B, C, E, D, then backtrack to E, F, G)"
  },
  {
   "type": "stack",
   "items": [
    "A",
    "B",
    "C",
    "E",
    "F",
    "G"
   ],
   "caption": "Stack at step 8 (bottom to top): the current path A-B-C-E-F-G"
  }
 ],
 "u4-trav-disconnected": [
  {
   "type": "graph",
   "nodes": [
    {
     "id": "A",
     "x": 0,
     "y": 1
    },
    {
     "id": "B",
     "x": 2,
     "y": 0
    },
    {
     "id": "C",
     "x": 2,
     "y": 2
    },
    {
     "id": "D",
     "x": 5,
     "y": 0
    },
    {
     "id": "E",
     "x": 5,
     "y": 2
    },
    {
     "id": "F",
     "x": 8,
     "y": 1
    }
   ],
   "edges": [
    [
     "A",
     "B"
    ],
    [
     "A",
     "C"
    ],
    [
     "B",
     "C"
    ],
    [
     "D",
     "E"
    ]
   ],
   "caption": "3 components {A,B,C} {D,E} {F}: one traversal call per component"
  }
 ],
 "u4-topo-trace": [
  {
   "type": "graph",
   "directed": true,
   "nodes": [
    {
     "id": "V1",
     "x": 2,
     "y": 0
    },
    {
     "id": "V2",
     "x": 6,
     "y": 0
    },
    {
     "id": "V3",
     "x": 1,
     "y": 2
    },
    {
     "id": "V4",
     "x": 4,
     "y": 2
    },
    {
     "id": "V5",
     "x": 7,
     "y": 2
    },
    {
     "id": "V6",
     "x": 2,
     "y": 4
    },
    {
     "id": "V7",
     "x": 6,
     "y": 4
    }
   ],
   "edges": [
    [
     "V1",
     "V2"
    ],
    [
     "V1",
     "V3"
    ],
    [
     "V1",
     "V4"
    ],
    [
     "V2",
     "V4"
    ],
    [
     "V2",
     "V5"
    ],
    [
     "V5",
     "V4"
    ],
    [
     "V5",
     "V7"
    ],
    [
     "V4",
     "V3"
    ],
    [
     "V4",
     "V6"
    ],
    [
     "V4",
     "V7"
    ],
    [
     "V3",
     "V6"
    ],
    [
     "V7",
     "V6"
    ]
   ],
   "caption": "DAG: V1 has in-degree 0, so it goes first"
  },
  {
   "type": "array",
   "cells": [
    "V1",
    "V2",
    "V5",
    "V4",
    "V3",
    "V7",
    "V6"
   ],
   "index": false,
   "caption": "Topological order: every arrow points to the right"
  }
 ],
 "u4-bicon-def": [
  {
   "type": "row",
   "arrow": " ",
   "items": [
    {
     "type": "graph",
     "nodes": [
      {
       "id": "A",
       "x": 0,
       "y": 0
      },
      {
       "id": "B",
       "x": 3,
       "y": 0
      },
      {
       "id": "C",
       "x": 3,
       "y": 3
      },
      {
       "id": "D",
       "x": 0,
       "y": 3
      }
     ],
     "edges": [
      [
       "A",
       "B"
      ],
      [
       "B",
       "C"
      ],
      [
       "C",
       "D"
      ],
      [
       "D",
       "A"
      ]
     ],
     "caption": "Biconnected: removing any one vertex leaves it connected"
    },
    {
     "type": "graph",
     "nodes": [
      {
       "id": "A",
       "x": 0,
       "y": 0
      },
      {
       "id": "B",
       "x": 0,
       "y": 4
      },
      {
       "id": "C",
       "x": 3,
       "y": 2,
       "hl": true
      },
      {
       "id": "D",
       "x": 6,
       "y": 0
      },
      {
       "id": "E",
       "x": 6,
       "y": 4
      }
     ],
     "edges": [
      [
       "A",
       "B"
      ],
      [
       "A",
       "C"
      ],
      [
       "B",
       "C"
      ],
      [
       "C",
       "D"
      ],
      [
       "C",
       "E"
      ],
      [
       "D",
       "E"
      ]
     ],
     "caption": "C is an articulation point: removing it splits the graph"
    }
   ]
  }
 ],
 "u4-st-def": [
  {
   "type": "graph",
   "nodes": [
    {
     "id": "A",
     "x": 0,
     "y": 1
    },
    {
     "id": "B",
     "x": 2,
     "y": 0
    },
    {
     "id": "C",
     "x": 2,
     "y": 2
    },
    {
     "id": "D",
     "x": 4,
     "y": 0
    },
    {
     "id": "E",
     "x": 4,
     "y": 2
    }
   ],
   "edges": [
    [
     "A",
     "B"
    ],
    [
     "A",
     "C"
    ],
    [
     "B",
     "C"
    ],
    [
     "B",
     "D"
    ],
    [
     "C",
     "E"
    ],
    [
     "D",
     "E"
    ]
   ],
   "hl": [
    [
     "A",
     "B"
    ],
    [
     "A",
     "C"
    ],
    [
     "B",
     "D"
    ],
    [
     "C",
     "E"
    ]
   ],
   "caption": "A spanning tree of G1: all 5 vertices, 4 edges, no cycle"
  }
 ],
 "u4-mst-def": [
  {
   "type": "row",
   "arrow": "|",
   "items": [
    {
     "type": "graph",
     "nodes": [
      {
       "id": "A",
       "x": 4,
       "y": 0
      },
      {
       "id": "B",
       "x": 1,
       "y": 2
      },
      {
       "id": "C",
       "x": 4,
       "y": 2
      },
      {
       "id": "D",
       "x": 7,
       "y": 2
      },
      {
       "id": "E",
       "x": 1,
       "y": 5
      },
      {
       "id": "F",
       "x": 6,
       "y": 5
      }
     ],
     "edges": [
      [
       "A",
       "B",
       6
      ],
      [
       "A",
       "C",
       1
      ],
      [
       "A",
       "D",
       5
      ],
      [
       "B",
       "C",
       5
      ],
      [
       "B",
       "E",
       3
      ],
      [
       "C",
       "D",
       5
      ],
      [
       "C",
       "E",
       6
      ],
      [
       "C",
       "F",
       4
      ],
      [
       "D",
       "F",
       2
      ],
      [
       "E",
       "F",
       6
      ]
     ],
     "hl": [
      [
       "A",
       "B"
      ],
      [
       "A",
       "D"
      ],
      [
       "C",
       "D"
      ],
      [
       "C",
       "E"
      ],
      [
       "E",
       "F"
      ]
     ],
     "caption": "A spanning tree (cost 6 + 5 + 5 + 6 + 6 = 28)"
    },
    {
     "type": "graph",
     "nodes": [
      {
       "id": "A",
       "x": 4,
       "y": 0
      },
      {
       "id": "B",
       "x": 1,
       "y": 2
      },
      {
       "id": "C",
       "x": 4,
       "y": 2
      },
      {
       "id": "D",
       "x": 7,
       "y": 2
      },
      {
       "id": "E",
       "x": 1,
       "y": 5
      },
      {
       "id": "F",
       "x": 6,
       "y": 5
      }
     ],
     "edges": [
      [
       "A",
       "B",
       6
      ],
      [
       "A",
       "C",
       1
      ],
      [
       "A",
       "D",
       5
      ],
      [
       "B",
       "C",
       5
      ],
      [
       "B",
       "E",
       3
      ],
      [
       "C",
       "D",
       5
      ],
      [
       "C",
       "E",
       6
      ],
      [
       "C",
       "F",
       4
      ],
      [
       "D",
       "F",
       2
      ],
      [
       "E",
       "F",
       6
      ]
     ],
     "hl": [
      [
       "A",
       "C"
      ],
      [
       "C",
       "F"
      ],
      [
       "F",
       "D"
      ],
      [
       "C",
       "B"
      ],
      [
       "B",
       "E"
      ]
     ],
     "caption": "The minimum spanning tree (cost 1 + 4 + 2 + 5 + 3 = 15)"
    }
   ]
  }
 ],
 "u4-prim-trace": [
  {
   "type": "graph",
   "nodes": [
    {
     "id": "A",
     "x": 4,
     "y": 0
    },
    {
     "id": "B",
     "x": 1,
     "y": 2
    },
    {
     "id": "C",
     "x": 4,
     "y": 2
    },
    {
     "id": "D",
     "x": 7,
     "y": 2
    },
    {
     "id": "E",
     "x": 1,
     "y": 5
    },
    {
     "id": "F",
     "x": 6,
     "y": 5
    }
   ],
   "edges": [
    [
     "A",
     "B",
     6
    ],
    [
     "A",
     "C",
     1
    ],
    [
     "A",
     "D",
     5
    ],
    [
     "B",
     "C",
     5
    ],
    [
     "B",
     "E",
     3
    ],
    [
     "C",
     "D",
     5
    ],
    [
     "C",
     "E",
     6
    ],
    [
     "C",
     "F",
     4
    ],
    [
     "D",
     "F",
     2
    ],
    [
     "E",
     "F",
     6
    ]
   ],
   "hl": [
    [
     "A",
     "C"
    ],
    [
     "C",
     "F"
    ]
   ],
   "caption": "After steps 1-2: tree {A, C, F} with edges A-C (1), C-F (4)"
  },
  {
   "type": "graph",
   "nodes": [
    {
     "id": "A",
     "x": 4,
     "y": 0
    },
    {
     "id": "B",
     "x": 1,
     "y": 2
    },
    {
     "id": "C",
     "x": 4,
     "y": 2
    },
    {
     "id": "D",
     "x": 7,
     "y": 2
    },
    {
     "id": "E",
     "x": 1,
     "y": 5
    },
    {
     "id": "F",
     "x": 6,
     "y": 5
    }
   ],
   "edges": [
    [
     "A",
     "B",
     6
    ],
    [
     "A",
     "C",
     1
    ],
    [
     "A",
     "D",
     5
    ],
    [
     "B",
     "C",
     5
    ],
    [
     "B",
     "E",
     3
    ],
    [
     "C",
     "D",
     5
    ],
    [
     "C",
     "E",
     6
    ],
    [
     "C",
     "F",
     4
    ],
    [
     "D",
     "F",
     2
    ],
    [
     "E",
     "F",
     6
    ]
   ],
   "hl": [
    [
     "A",
     "C"
    ],
    [
     "C",
     "F"
    ],
    [
     "F",
     "D"
    ],
    [
     "C",
     "B"
    ]
   ],
   "caption": "After step 4: added F-D (2) and C-B (5); A-D, C-D would form cycles"
  },
  {
   "type": "graph",
   "nodes": [
    {
     "id": "A",
     "x": 4,
     "y": 0
    },
    {
     "id": "B",
     "x": 1,
     "y": 2
    },
    {
     "id": "C",
     "x": 4,
     "y": 2
    },
    {
     "id": "D",
     "x": 7,
     "y": 2
    },
    {
     "id": "E",
     "x": 1,
     "y": 5
    },
    {
     "id": "F",
     "x": 6,
     "y": 5
    }
   ],
   "edges": [
    [
     "A",
     "B",
     6
    ],
    [
     "A",
     "C",
     1
    ],
    [
     "A",
     "D",
     5
    ],
    [
     "B",
     "C",
     5
    ],
    [
     "B",
     "E",
     3
    ],
    [
     "C",
     "D",
     5
    ],
    [
     "C",
     "E",
     6
    ],
    [
     "C",
     "F",
     4
    ],
    [
     "D",
     "F",
     2
    ],
    [
     "E",
     "F",
     6
    ]
   ],
   "hl": [
    [
     "A",
     "C"
    ],
    [
     "C",
     "F"
    ],
    [
     "F",
     "D"
    ],
    [
     "C",
     "B"
    ],
    [
     "B",
     "E"
    ]
   ],
   "caption": "Step 5: B-E (3) added. MST cost 15"
  }
 ],
 "u4-kruskal-trace": [
  {
   "type": "graph",
   "nodes": [
    {
     "id": "A",
     "x": 4,
     "y": 0
    },
    {
     "id": "B",
     "x": 1,
     "y": 2
    },
    {
     "id": "C",
     "x": 4,
     "y": 2
    },
    {
     "id": "D",
     "x": 7,
     "y": 2
    },
    {
     "id": "E",
     "x": 1,
     "y": 5
    },
    {
     "id": "F",
     "x": 6,
     "y": 5
    }
   ],
   "edges": [
    [
     "A",
     "B",
     6
    ],
    [
     "A",
     "C",
     1
    ],
    [
     "A",
     "D",
     5
    ],
    [
     "B",
     "C",
     5
    ],
    [
     "B",
     "E",
     3
    ],
    [
     "C",
     "D",
     5
    ],
    [
     "C",
     "E",
     6
    ],
    [
     "C",
     "F",
     4
    ],
    [
     "D",
     "F",
     2
    ],
    [
     "E",
     "F",
     6
    ]
   ],
   "hl": [
    [
     "A",
     "C"
    ],
    [
     "D",
     "F"
    ],
    [
     "B",
     "E"
    ]
   ],
   "caption": "After 3 accepts: forest {A,C} {D,F} {B,E}"
  },
  {
   "type": "graph",
   "nodes": [
    {
     "id": "A",
     "x": 4,
     "y": 0
    },
    {
     "id": "B",
     "x": 1,
     "y": 2
    },
    {
     "id": "C",
     "x": 4,
     "y": 2
    },
    {
     "id": "D",
     "x": 7,
     "y": 2
    },
    {
     "id": "E",
     "x": 1,
     "y": 5
    },
    {
     "id": "F",
     "x": 6,
     "y": 5
    }
   ],
   "edges": [
    [
     "A",
     "B",
     6
    ],
    [
     "A",
     "C",
     1
    ],
    [
     "A",
     "D",
     5
    ],
    [
     "B",
     "C",
     5
    ],
    [
     "B",
     "E",
     3
    ],
    [
     "C",
     "D",
     5
    ],
    [
     "C",
     "E",
     6
    ],
    [
     "C",
     "F",
     4
    ],
    [
     "D",
     "F",
     2
    ],
    [
     "E",
     "F",
     6
    ]
   ],
   "hl": [
    [
     "A",
     "C"
    ],
    [
     "D",
     "F"
    ],
    [
     "B",
     "E"
    ],
    [
     "C",
     "F"
    ]
   ],
   "caption": "C-F (4) joins {A,C} and {D,F}. A-D (5) is then rejected: A and D already connected (cycle)"
  },
  {
   "type": "graph",
   "nodes": [
    {
     "id": "A",
     "x": 4,
     "y": 0
    },
    {
     "id": "B",
     "x": 1,
     "y": 2
    },
    {
     "id": "C",
     "x": 4,
     "y": 2
    },
    {
     "id": "D",
     "x": 7,
     "y": 2
    },
    {
     "id": "E",
     "x": 1,
     "y": 5
    },
    {
     "id": "F",
     "x": 6,
     "y": 5
    }
   ],
   "edges": [
    [
     "A",
     "B",
     6
    ],
    [
     "A",
     "C",
     1
    ],
    [
     "A",
     "D",
     5
    ],
    [
     "B",
     "C",
     5
    ],
    [
     "B",
     "E",
     3
    ],
    [
     "C",
     "D",
     5
    ],
    [
     "C",
     "E",
     6
    ],
    [
     "C",
     "F",
     4
    ],
    [
     "D",
     "F",
     2
    ],
    [
     "E",
     "F",
     6
    ]
   ],
   "hl": [
    [
     "A",
     "C"
    ],
    [
     "D",
     "F"
    ],
    [
     "B",
     "E"
    ],
    [
     "C",
     "F"
    ],
    [
     "B",
     "C"
    ]
   ],
   "caption": "B-C (5) joins the last two sets: one tree, 5 edges, cost 15"
  }
 ],
 "u4-dij-trace": [
  {
   "type": "graph",
   "nodes": [
    {
     "id": "A",
     "x": 0,
     "y": 2
    },
    {
     "id": "B",
     "x": 2,
     "y": 0
    },
    {
     "id": "C",
     "x": 2,
     "y": 4
    },
    {
     "id": "D",
     "x": 5,
     "y": 0
    },
    {
     "id": "E",
     "x": 5,
     "y": 4
    },
    {
     "id": "F",
     "x": 7,
     "y": 2
    }
   ],
   "edges": [
    [
     "A",
     "B",
     4
    ],
    [
     "A",
     "C",
     2
    ],
    [
     "C",
     "B",
     1
    ],
    [
     "B",
     "D",
     5
    ],
    [
     "C",
     "D",
     8
    ],
    [
     "C",
     "E",
     10
    ],
    [
     "D",
     "E",
     2
    ],
    [
     "D",
     "F",
     6
    ],
    [
     "E",
     "F",
     3
    ]
   ],
   "hl": [
    [
     "A",
     "C"
    ],
    [
     "C",
     "B"
    ],
    [
     "B",
     "D"
    ],
    [
     "D",
     "E"
    ],
    [
     "E",
     "F"
    ]
   ],
   "caption": "Shortest-path tree from A. dist: A=0, C=2, B=3, D=8, E=10, F=13"
  }
 ],
 "u4-pyq-1": [
  {
   "type": "row",
   "arrow": " ",
   "items": [
    {
     "type": "graph",
     "nodes": [
      {
       "id": "A",
       "x": 0,
       "y": 1
      },
      {
       "id": "B",
       "x": 2,
       "y": 0
      },
      {
       "id": "C",
       "x": 2,
       "y": 2
      },
      {
       "id": "D",
       "x": 4,
       "y": 0
      },
      {
       "id": "E",
       "x": 4,
       "y": 2
      }
     ],
     "edges": [
      [
       "A",
       "B"
      ],
      [
       "A",
       "C"
      ],
      [
       "B",
       "C"
      ],
      [
       "B",
       "D"
      ],
      [
       "C",
       "E"
      ],
      [
       "D",
       "E"
      ]
     ],
     "caption": "G1: V = {A..E}, 6 edges; degree(B) = 3"
    },
    {
     "type": "graph",
     "directed": true,
     "nodes": [
      {
       "id": "A",
       "x": 0,
       "y": 1
      },
      {
       "id": "B",
       "x": 2,
       "y": 0
      },
      {
       "id": "C",
       "x": 2,
       "y": 2
      },
      {
       "id": "D",
       "x": 4,
       "y": 0
      },
      {
       "id": "E",
       "x": 4,
       "y": 2
      }
     ],
     "edges": [
      [
       "A",
       "B"
      ],
      [
       "A",
       "C"
      ],
      [
       "B",
       "D"
      ],
      [
       "C",
       "B"
      ],
      [
       "D",
       "E"
      ],
      [
       "E",
       "C"
      ]
     ],
     "caption": "G2: directed (arrows)"
    }
   ]
  }
 ],
 "u4-pyq-2": [
  {
   "type": "graph",
   "nodes": [
    {
     "id": "A",
     "x": 0,
     "y": 1
    },
    {
     "id": "B",
     "x": 2,
     "y": 0
    },
    {
     "id": "C",
     "x": 2,
     "y": 2
    },
    {
     "id": "D",
     "x": 4,
     "y": 0
    },
    {
     "id": "E",
     "x": 4,
     "y": 2
    }
   ],
   "edges": [
    [
     "A",
     "B"
    ],
    [
     "A",
     "C"
    ],
    [
     "B",
     "C"
    ],
    [
     "B",
     "D"
    ],
    [
     "C",
     "E"
    ],
    [
     "D",
     "E"
    ]
   ],
   "caption": "G1"
  },
  {
   "type": "matrix",
   "rows": [
    "A",
    "B",
    "C",
    "D",
    "E"
   ],
   "cols": [
    "A",
    "B",
    "C",
    "D",
    "E"
   ],
   "cells": [
    [
     0,
     1,
     1,
     0,
     0
    ],
    [
     1,
     0,
     1,
     1,
     0
    ],
    [
     1,
     1,
     0,
     0,
     1
    ],
    [
     0,
     1,
     0,
     0,
     1
    ],
    [
     0,
     0,
     1,
     1,
     0
    ]
   ],
   "caption": "Matrix of G1: symmetric"
  },
  {
   "type": "hash",
   "slots": [
    "A",
    "B",
    "C",
    "D",
    "E"
   ],
   "chains": {
    "0": [
     "B",
     "C"
    ],
    "1": [
     "A",
     "C",
     "D"
    ],
    "2": [
     "A",
     "B",
     "E"
    ],
    "3": [
     "B",
     "E"
    ],
    "4": [
     "C",
     "D"
    ]
   },
   "caption": "Adjacency list of G1: 12 list nodes"
  }
 ],
 "u4-pyq-3": [
  {
   "type": "graph",
   "nodes": [
    {
     "id": "B",
     "x": 0,
     "y": 0
    },
    {
     "id": "C",
     "x": 7,
     "y": 0
    },
    {
     "id": "D",
     "x": 7,
     "y": 5
    },
    {
     "id": "F",
     "x": 0,
     "y": 5
    },
    {
     "id": "A",
     "x": 4,
     "y": 2
    },
    {
     "id": "E",
     "x": 3,
     "y": 4
    }
   ],
   "edges": [
    [
     "A",
     "B",
     3
    ],
    [
     "A",
     "C",
     7
    ],
    [
     "A",
     "D",
     2
    ],
    [
     "A",
     "E",
     4
    ],
    [
     "B",
     "C",
     9
    ],
    [
     "B",
     "F",
     10
    ],
    [
     "C",
     "D",
     1
    ],
    [
     "D",
     "E",
     5
    ],
    [
     "D",
     "F",
     8
    ],
    [
     "E",
     "F",
     6
    ]
   ],
   "hl": [
    [
     "F",
     "B"
    ],
    [
     "F",
     "D"
    ],
    [
     "F",
     "E"
    ],
    [
     "B",
     "A"
    ],
    [
     "B",
     "C"
    ]
   ],
   "caption": "Graph with BFS tree from F highlighted (weights ignored)"
  },
  {
   "type": "array",
   "cells": [
    "F",
    "B",
    "D",
    "E",
    "A",
    "C"
   ],
   "index": false,
   "hl": [
    0
   ],
   "caption": "BFS order from F: F, then B D E (alphabetical), then A, C"
  }
 ],
 "u4-pyq-4": [
  {
   "type": "graph",
   "nodes": [
    {
     "id": "A",
     "x": 0,
     "y": 0
    },
    {
     "id": "B",
     "x": 1.6,
     "y": 0
    },
    {
     "id": "C",
     "x": 3.2,
     "y": 0
    },
    {
     "id": "D",
     "x": 0,
     "y": 1.6
    },
    {
     "id": "E",
     "x": 1.6,
     "y": 1.6
    },
    {
     "id": "F",
     "x": 3.2,
     "y": 1.6
    },
    {
     "id": "G",
     "x": 4.4,
     "y": 0.8
    }
   ],
   "edges": [
    [
     "A",
     "B"
    ],
    [
     "A",
     "D"
    ],
    [
     "A",
     "E"
    ],
    [
     "B",
     "C"
    ],
    [
     "B",
     "E"
    ],
    [
     "C",
     "E"
    ],
    [
     "C",
     "F"
    ],
    [
     "C",
     "G"
    ],
    [
     "D",
     "E"
    ],
    [
     "E",
     "F"
    ],
    [
     "F",
     "G"
    ]
   ],
   "hl": [
    [
     "A",
     "B"
    ],
    [
     "B",
     "C"
    ],
    [
     "C",
     "E"
    ],
    [
     "E",
     "D"
    ],
    [
     "E",
     "F"
    ],
    [
     "F",
     "G"
    ]
   ],
   "caption": "Highlighted edges = DFS tree from A (order A B C E D F G)"
  },
  {
   "type": "stack",
   "items": [
    "A",
    "B",
    "C",
    "E",
    "F",
    "G"
   ],
   "caption": "Stack at step 8 (bottom to top)"
  }
 ],
 "u4-pyq-6": [
  {
   "type": "graph",
   "nodes": [
    {
     "id": "B",
     "x": 0,
     "y": 0
    },
    {
     "id": "C",
     "x": 7,
     "y": 0
    },
    {
     "id": "D",
     "x": 7,
     "y": 5
    },
    {
     "id": "F",
     "x": 0,
     "y": 5
    },
    {
     "id": "A",
     "x": 4,
     "y": 2
    },
    {
     "id": "E",
     "x": 3,
     "y": 4
    }
   ],
   "edges": [
    [
     "A",
     "B",
     3
    ],
    [
     "A",
     "C",
     7
    ],
    [
     "A",
     "D",
     2
    ],
    [
     "A",
     "E",
     4
    ],
    [
     "B",
     "C",
     9
    ],
    [
     "B",
     "F",
     10
    ],
    [
     "C",
     "D",
     1
    ],
    [
     "D",
     "E",
     5
    ],
    [
     "D",
     "F",
     8
    ],
    [
     "E",
     "F",
     6
    ]
   ],
   "hl": [
    [
     "C",
     "D"
    ],
    [
     "A",
     "D"
    ],
    [
     "A",
     "B"
    ],
    [
     "A",
     "E"
    ],
    [
     "E",
     "F"
    ]
   ],
   "caption": "MST (highlighted): 1 + 2 + 3 + 4 + 6 = 16. D-E (5) rejected: cycle"
  }
 ],
 "u4-pyq-7": [
  {
   "type": "graph",
   "nodes": [
    {
     "id": "A",
     "x": 4,
     "y": 0
    },
    {
     "id": "B",
     "x": 1,
     "y": 2
    },
    {
     "id": "C",
     "x": 4,
     "y": 2
    },
    {
     "id": "D",
     "x": 7,
     "y": 2
    },
    {
     "id": "E",
     "x": 1,
     "y": 5
    },
    {
     "id": "F",
     "x": 6,
     "y": 5
    }
   ],
   "edges": [
    [
     "A",
     "B",
     6
    ],
    [
     "A",
     "C",
     1
    ],
    [
     "A",
     "D",
     5
    ],
    [
     "B",
     "C",
     5
    ],
    [
     "B",
     "E",
     3
    ],
    [
     "C",
     "D",
     5
    ],
    [
     "C",
     "E",
     6
    ],
    [
     "C",
     "F",
     4
    ],
    [
     "D",
     "F",
     2
    ],
    [
     "E",
     "F",
     6
    ]
   ],
   "hl": [
    [
     "A",
     "C"
    ],
    [
     "C",
     "F"
    ],
    [
     "F",
     "D"
    ],
    [
     "C",
     "B"
    ],
    [
     "B",
     "E"
    ]
   ],
   "caption": "MST from A (highlighted): A-C, C-F, F-D, C-B, B-E; cost 15"
  }
 ],
 "u4-pyq-8": [
  {
   "type": "graph",
   "nodes": [
    {
     "id": "B",
     "x": 0,
     "y": 0
    },
    {
     "id": "C",
     "x": 7,
     "y": 0
    },
    {
     "id": "D",
     "x": 7,
     "y": 5
    },
    {
     "id": "F",
     "x": 0,
     "y": 5
    },
    {
     "id": "A",
     "x": 4,
     "y": 2
    },
    {
     "id": "E",
     "x": 3,
     "y": 4
    }
   ],
   "edges": [
    [
     "A",
     "B",
     3
    ],
    [
     "A",
     "C",
     7
    ],
    [
     "A",
     "D",
     2
    ],
    [
     "A",
     "E",
     4
    ],
    [
     "B",
     "C",
     9
    ],
    [
     "B",
     "F",
     10
    ],
    [
     "C",
     "D",
     1
    ],
    [
     "D",
     "E",
     5
    ],
    [
     "D",
     "F",
     8
    ],
    [
     "E",
     "F",
     6
    ]
   ],
   "hl": [
    [
     "A",
     "B"
    ],
    [
     "A",
     "D"
    ],
    [
     "D",
     "C"
    ],
    [
     "A",
     "E"
    ],
    [
     "D",
     "F"
    ]
   ],
   "caption": "Shortest-path tree from A. dist: A=0, D=2, B=3, C=3, E=4, F=10"
  }
 ],
 "u4-pyq-9": [
  {
   "type": "graph",
   "directed": true,
   "nodes": [
    {
     "id": "V1",
     "x": 2,
     "y": 0
    },
    {
     "id": "V2",
     "x": 6,
     "y": 0
    },
    {
     "id": "V3",
     "x": 1,
     "y": 2
    },
    {
     "id": "V4",
     "x": 4,
     "y": 2
    },
    {
     "id": "V5",
     "x": 7,
     "y": 2
    },
    {
     "id": "V6",
     "x": 2,
     "y": 4
    },
    {
     "id": "V7",
     "x": 6,
     "y": 4
    }
   ],
   "edges": [
    [
     "V1",
     "V2"
    ],
    [
     "V1",
     "V3"
    ],
    [
     "V1",
     "V4"
    ],
    [
     "V2",
     "V4"
    ],
    [
     "V2",
     "V5"
    ],
    [
     "V5",
     "V4"
    ],
    [
     "V5",
     "V7"
    ],
    [
     "V4",
     "V3"
    ],
    [
     "V4",
     "V6"
    ],
    [
     "V4",
     "V7"
    ],
    [
     "V3",
     "V6"
    ],
    [
     "V7",
     "V6"
    ]
   ],
   "caption": "DAG: V1 has in-degree 0, so it goes first"
  },
  {
   "type": "array",
   "cells": [
    "V1",
    "V2",
    "V5",
    "V4",
    "V3",
    "V7",
    "V6"
   ],
   "index": false,
   "caption": "Topological order: every arrow points to the right"
  }
 ]
});
