let code = '';

// board tiles
for (let row = 0; row < 15; row++) {
    code += `<!-- row #${row} -->\n`;

    for (let col = 0; col < 15; col++) {
        code += `
        <transform translation='${col} 0 ${row}'>
        <shape>
            <appearance>
                <material id="tile-${row}-${col}" diffuseColor='0.8 0.8 0.8'></material>
                <ImageTexture USE='WOOD'></imagetexture>
            </appearance>
            <box height="50px" size="1 1 1"></box>
        </shape>
        </transform>
        `;
    }
}

// token animations
for (let player of ['blue', 'green', 'red', 'yellow']) {
    for (let i = 1; i <= 4; i++) {
        code += `
        <PositionInterpolator id="move-${player}-${i}" DEF="move-${player}-${i}" key="0 0.5 1" keyValue="1 1 0  0 3 0  0 1 0">
        </PositionInterpolator>
        <timeSensor id="time-${player}-${i}" DEF="time-${player}-${i}"></timeSensor>
        <Route fromNode="time-${player}-${i}" fromField="fraction_changed" toNode="move-${player}-${i}" toField="set_fraction">
        </Route>
        <Route fromNode="move-${player}-${i}" fromField="value_changed" toNode="${player}-token-${i}" toField="translation">
        </Route>
        `
    }
}

const scene = document.getElementsByTagName('scene')[0];
scene.innerHTML += code;

