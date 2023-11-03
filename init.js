for (let row = 0; row < 15; row++) {
    for (let col = 0; col < 15; col++) {
        document.getElementById(`tile-${row}-${col}`).setAttribute('diffuseColor', tileColors[row][col]);
    }
}

