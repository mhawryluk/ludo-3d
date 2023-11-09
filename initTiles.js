const B = 'blue';
const G = 'green';
const Y = 'yellow';
const R = 'red';
const X = '#f6e7db';
const W = '#e4cab9';
const Z = '#fff5ec';
const S = '#ffc181';

const tileColors = [
    [B, B, B, B, B, B, X, Z, X, Y, Y, Y, Y, Y, Y],
    [B, X, X, X, X, B, Z, Y, Y, Y, X, X, X, X, Y],
    [B, X, B, B, X, B, S, Y, X, Y, X, Y, Y, X, Y],
    [B, X, B, B, X, B, Z, Y, Z, Y, X, Y, Y, X, Y],
    [B, X, X, X, X, B, X, Y, X, Y, X, X, X, X, Y],
    [B, B, B, B, B, B, Z, Y, Z, Y, Y, Y, Y, Y, Y],
    [X, B, X, Z, X, Z, W, W, W, Z, X, Z, S, Z, X],
    [Z, B, B, B, B, B, W, W, W, G, G, G, G, G, Z],
    [X, Z, S, Z, X, Z, W, W, W, Z, X, Z, X, G, X],
    [R, R, R, R, R, R, Z, R, Z, G, G, G, G, G, G],
    [R, X, X, X, X, R, X, R, X, G, X, X, X, X, G],
    [R, X, R, R, X, R, Z, R, Z, G, X, G, G, X, G],
    [R, X, R, R, X, R, X, R, S, G, X, G, G, X, G],
    [R, X, X, X, X, R, R, R, Z, G, X, X, X, X, G],
    [R, R, R, R, R, R, X, Z, X, G, G, G, G, G, G],
];


for (let row = 0; row < 15; row++) {
    for (let col = 0; col < 15; col++) {
        document.getElementById(`tile-${row}-${col}`).setAttribute('diffuseColor', tileColors[row][col]);
    }
}

