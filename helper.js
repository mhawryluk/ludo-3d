let tileCode = '';

for (let row = 0; row < 15; row++) {
    tileCode += `<!-- row #${row} -->\n`;

    for (let col = 0; col < 15; col++) {
        tileCode += `
        <transform translation='${col - 7.5} 0 ${row - 7.5}'>
        <shape>
            <appearance>
                <material id="tile-${row}-${col}" diffuseColor='0.8 0.8 0.8'></material>
            </appearance>
            <box height="50px" size="1 1 1"></box>
        </shape>
        </transform>
        `;
    }
}

const scene = document.getElementsByTagName('scene')[0]
scene.innerHTML += tileCode;

