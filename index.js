const B = 'blue';
const G = 'green';
const Y = 'yellow';
const R = 'red';
const X = '0.8 0.8 0.8';
const W = '0.9 0.9 0.9';

const tileColors = [
    [B, B, B, B, B, B, X, X, X, Y, Y, Y, Y, Y, Y],
    [B, X, X, X, X, B, X, Y, Y, Y, X, X, X, X, Y],
    [B, X, B, B, X, B, X, Y, X, Y, X, Y, Y, X, Y],
    [B, X, B, B, X, B, X, Y, X, Y, X, Y, Y, X, Y],
    [B, X, X, X, X, B, X, Y, X, Y, X, X, X, X, Y],
    [B, B, B, B, B, B, X, Y, X, Y, Y, Y, Y, Y, Y],
    [X, B, X, X, X, X, X, X, X, X, X, X, X, X, X],
    [X, B, B, B, B, B, X, W, X, G, G, G, G, G, X],
    [X, X, X, X, X, X, X, X, X, X, X, X, X, G, X],
    [R, R, R, R, R, R, X, R, X, G, G, G, G, G, G],
    [R, X, X, X, X, R, X, R, X, G, X, X, X, X, G],
    [R, X, R, R, X, R, X, R, X, G, X, G, G, X, G],
    [R, X, R, R, X, R, X, R, X, G, X, G, G, X, G],
    [R, X, X, X, X, R, R, R, X, G, X, X, X, X, G],
    [R, R, R, R, R, R, X, X, X, G, G, G, G, G, G],
];

for (let row = 0; row < 15; row++) {
    for (let col = 0; col < 15; col++) {
        document.getElementById(`tile-${row}-${col}`).setAttribute('diffuseColor', tileColors[row][col]);
    }
}
