const allPossiblePlayers = ['blue', 'yellow', 'green', 'red'];

const playerPaths = {
    'red': [
        [13, 6],
        [12, 6],
        [11, 6],
        [10, 6],
        [9, 6],
        [8, 5],
        [8, 4],
        [8, 3],
        [8, 2],
        [8, 1],
        [8, 0],
        [7, 0],
        [6, 0],
        [6, 1],
        [6, 2],
        [6, 3],
        [6, 4],
        [6, 5],
        [5, 6],
        [4, 6],
        [3, 6],
        [2, 6],
        [1, 6],
        [0, 6],
        [0, 7],
        [0, 8],
        [1, 8],
        [2, 8],
        [3, 8],
        [4, 8],
        [5, 8],
        [6, 9],
        [6, 10],
        [6, 11],
        [6, 12],
        [6, 13],
        [6, 14],
        [7, 14],
        [8, 14],
        [8, 13],
        [8, 12],
        [8, 11],
        [8, 10],
        [8, 9],
        [9, 8],
        [10, 8],
        [11, 8],
        [12, 8],
        [13, 8],
        [14, 8],
        [14, 7],
        [13, 7],
        [12, 7],
        [11, 7],
        [10, 7],
        [9, 7],
        [8, 7],
    ],
    'blue': [
        [6, 1],
        [6, 2],
        [6, 3],
        [6, 4],
        [6, 5],
        [5, 6],
        [4, 6],
        [3, 6],
        [2, 6],
        [1, 6],
        [0, 6],
        [0, 7],
        [0, 8],
        [1, 8],
        [2, 8],
        [3, 8],
        [4, 8],
        [5, 8],
        [6, 9],
        [6, 10],
        [6, 11],
        [6, 12],
        [6, 13],
        [6, 14],
        [7, 14],
        [8, 14],
        [8, 13],
        [8, 12],
        [8, 11],
        [8, 10],
        [8, 9],
        [9, 8],
        [10, 8],
        [11, 8],
        [12, 8],
        [13, 8],
        [14, 8],
        [14, 7],
        [14, 6],
        [14, 6],
        [13, 6],
        [12, 6],
        [11, 6],
        [10, 6],
        [9, 6],
        [8, 5],
        [8, 4],
        [8, 3],
        [8, 2],
        [8, 1],
        [8, 0],
        [7, 0],
        [7, 1],
        [7, 2],
        [7, 3],
        [7, 4],
        [7, 5],
        [7, 6],
    ],
    'yellow': [
        [1, 8],
        [2, 8],
        [3, 8],
        [4, 8],
        [5, 8],
        [6, 9],
        [6, 10],
        [6, 11],
        [6, 12],
        [6, 13],
        [6, 14],
        [7, 14],
        [8, 14],
        [8, 13],
        [8, 12],
        [8, 11],
        [8, 10],
        [8, 9],
        [9, 8],
        [10, 8],
        [11, 8],
        [12, 8],
        [13, 8],
        [14, 8],
        [14, 7],
        [14, 6],
        [13, 6],
        [12, 6],
        [11, 6],
        [10, 6],
        [9, 6],
        [8, 5],
        [8, 4],
        [8, 3],
        [8, 2],
        [8, 1],
        [8, 0],
        [7, 0],
        [6, 0],
        [6, 1],
        [6, 2],
        [6, 3],
        [6, 4],
        [6, 5],
        [5, 6],
        [4, 6],
        [3, 6],
        [2, 6],
        [1, 6],
        [0, 6],
        [0, 7],
        [1, 7],
        [2, 7],
        [3, 7],
        [4, 7],
        [5, 7],
        [6, 7],
    ],
    'green': [
        [8, 13],
        [8, 12],
        [8, 11],
        [8, 10],
        [8, 9],
        [9, 8],
        [10, 8],
        [11, 8],
        [12, 8],
        [13, 8],
        [14, 8],
        [14, 7],
        [14, 6],
        [13, 6],
        [12, 6],
        [11, 6],
        [10, 6],
        [9, 6],
        [8, 5],
        [8, 4],
        [8, 3],
        [8, 2],
        [8, 1],
        [8, 0],
        [7, 0],
        [6, 0],
        [6, 1],
        [6, 2],
        [6, 3],
        [6, 4],
        [6, 5],
        [5, 6],
        [4, 6],
        [3, 6],
        [2, 6],
        [1, 6],
        [0, 6],
        [0, 7],
        [0, 8],
        [1, 8],
        [2, 8],
        [3, 8],
        [4, 8],
        [5, 8],
        [6, 9],
        [6, 10],
        [6, 11],
        [6, 12],
        [6, 13],
        [6, 14],
        [7, 14],
        [7, 13],
        [7, 12],
        [7, 11],
        [7, 10],
        [7, 9],
        [7, 8],
    ],
};

const startPositions = {
    "red": [
        [12, 2],
        [12, 3],
        [11, 2],
        [11, 3],
    ],

    "blue": [
        [2, 2],
        [2, 3],
        [3, 2],
        [3, 3],
    ],

    "yellow": [
        [2, 12],
        [2, 11],
        [3, 12],
        [3, 11],
    ],

    "green": [
        [12, 12],
        [12, 11],
        [11, 12],
        [11, 11],
    ],
};

const safeTiles = [
    [2, 6],
    [8, 2],
    [6, 12],
    [12, 8],
]