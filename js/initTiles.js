const B = 'blue';
const G = 'green';
const Y = 'yellow';
const R = 'red';
const W = '#e4cab9'; // center
const X = '#ffd6b1'; // regular tile, alternating - darker
const Z = '#faf1eb'; // regular tile, alternating - lighter
const S = '#b1b3ff'; // safe spaces

const tileColors = [
    [B, B, B, B, B, B, X, Z, X, Y, Y, Y, Y, Y, Y],
    [B, Z, Z, Z, Z, B, Z, Y, Y, Y, Z, Z, Z, Z, Y],
    [B, Z, B, B, Z, B, S, Y, X, Y, Z, Y, Y, Z, Y],
    [B, Z, B, B, Z, B, Z, Y, Z, Y, Z, Y, Y, Z, Y],
    [B, Z, Z, Z, Z, B, X, Y, X, Y, Z, Z, Z, Z, Y],
    [B, B, B, B, B, B, Z, Y, Z, Y, Y, Y, Y, Y, Y],
    [X, B, X, Z, X, Z, W, W, W, Z, X, Z, S, Z, X],
    [Z, B, B, B, B, B, W, W, W, G, G, G, G, G, Z],
    [X, Z, S, Z, X, Z, W, W, W, Z, X, Z, X, G, X],
    [R, R, R, R, R, R, Z, R, Z, G, G, G, G, G, G],
    [R, Z, Z, Z, Z, R, X, R, X, G, Z, Z, Z, Z, G],
    [R, Z, R, R, Z, R, Z, R, Z, G, Z, G, G, Z, G],
    [R, Z, R, R, Z, R, X, R, S, G, Z, G, G, Z, G],
    [R, Z, Z, Z, Z, R, R, R, Z, G, Z, Z, Z, Z, G],
    [R, R, R, R, R, R, X, Z, X, G, G, G, G, G, G],
];


for (let row = 0; row < 15; row++) {
    for (let col = 0; col < 15; col++) {
        document.getElementById(`tile-${row}-${col}`).setAttribute('diffuseColor', tileColors[row][col]);
    }
}

