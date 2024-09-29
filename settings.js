export const FIGURES = {
    'I': [
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]
    ],
    'J': [
    [1,0,0],
    [1,1,1],
    [0,0,0],
    ],
    'L': [
    [0,0,1],
    [1,1,1],
    [0,0,0],
    ],
    'O': [
    [1,1],
    [1,1],
    ],
    'S': [
    [0,1,1],
    [1,1,0],
    [0,0,0],
    ],
    'Z': [
    [1,1,0],
    [0,1,1],
    [0,0,0],
    ],
    'T': [
    [0,1,0],
    [1,1,1],
    [0,0,0],
    ]
};

export const COLORS = {
    'I': 'cyan',
    'O': 'yellow',
    'T': 'purple',
    'S': 'green',
    'Z': 'red',
    'J': 'blue',
    'L': 'orange'
};

export const SQUARE_SIZE = 40;
export const COLS = 10;
export const ROWS = 20;


export const SCORING = {
    0: 0,
    1: 100,
    2: 300,
    3: 700,
    4: 1500
}


export const LEVELS = [
    {"score": 0, "speed": 35},
    {"score": 500, "speed": 30},
    {"score": 1000, "speed": 25},
    {"score": 2000, "speed": 20},
    {"score": 2100, "speed": 15},
    {"score": 2500, "speed": 10}
] 