const infoDiv = document.getElementById('info');
const currentPlayerDiv = document.getElementById('current-player');
const rollDiceButton = document.getElementById('roll-button');
const popup = document.querySelector('.popup');
const root = document.querySelector(':root');
const side = document.querySelector('side');
const tokens = {};

let game;

class Game {

    constructor(numberOfPlayers = 4) {
        this.numberOfPlayers = numberOfPlayers;
        this.currentPlayerIndex = 0;
        this.currentPossibleMoves = [];
        this.lastRolledValue = 0;

        this.tokenPositons = {};
        for (let player of players) {
            this.tokenPositons[player] = [-6, -6, -6, -6];
        }

        for (let player of players) {
            tokens[player] = [];
            for (let i = 0; i < 4; i++) {
                const id = `${player}-token-${i + 1}`;
                const token = document.getElementById(id);
                tokens[player].push(token);

                token.querySelector('shape').addEventListener('click', () => {
                    game.moveToken(token, player, i);
                })
            }
        }
    }

    rollDice(value) {
        const rolledValue = value ?? Math.floor(Math.random() * 6) + 1;
        infoDiv.innerText = `Rolled: ${rolledValue}`;
        this.lastRolledValue = rolledValue;

        if (!this.checkPossibleMoves()) {
            this.nextPlayer();
        }
    }

    checkPossibleMoves() {
        this.clearPossibleMoves();
        let isAnyPossible = false;

        for (let i = 0; i < 4; i++) {
            const player = players[this.currentPlayerIndex];
            const position = this.tokenPositons[player][i];
            const newPosition = position + this.lastRolledValue;

            if (newPosition >= 0 && newPosition < playerPaths[player].length) {
                isAnyPossible = true;

                tokens[player][i].querySelector('material').setAttribute('emissiveColor', '0.5 0.5 0.5');
            }
        }

        return isAnyPossible;
    }

    nextPlayer() {
        this.currentPlayerIndex++;
        this.currentPlayerIndex %= this.numberOfPlayers;
        this.lastRolledValue = 0;

        currentPlayerDiv.innerText = `Now playing: ${players[this.currentPlayerIndex]}`;

        root.style.setProperty('--background-color', `var(--${players[this.currentPlayerIndex]}-bg)`);
        root.style.setProperty('--text-color', `var(--${players[this.currentPlayerIndex]}-text)`);
    }

    moveToken(token, player, i) {
        if (player != players[this.currentPlayerIndex] || this.lastRolledValue == 0) return false;

        const oldTile = playerPaths[player][this.tokenPositons[player][i]];
        const newPosition = this.tokenPositons[player][i] += this.lastRolledValue;

        if (newPosition < 0) return false;

        const newTile = playerPaths[player][newPosition];

        if (safeTiles.findIndex(safeTile => arraysEqual(safeTile, newTile)) === -1) {
            for (let otherPlayer of players) {
                if (otherPlayer === player) continue;

                const otherTilesFoundIndices = [];

                for (let i = 0; i < 4; i++) {
                    const otherTokenTile = playerPaths[otherPlayer][this.tokenPositons[otherPlayer][i]];

                    if (arraysEqual(otherTokenTile, newTile)) {
                        otherTilesFoundIndices.push(i);
                    }
                }

                if (otherTilesFoundIndices.length === 1) {
                    const otherTileIndex = otherTilesFoundIndices[0];
                    this.tokenPositons[otherPlayer][otherTileIndex] = -6;

                    const startPosition = this.getFreeStartPosition(otherPlayer);
                    tokens[otherPlayer][otherTileIndex].setAttribute('translation', `${startPosition[0]} 1 ${startPosition[1]}`);
                }
            }
        }

        token.setAttribute('translation', `${newTile[1]} 1 ${newTile[0]}`);

        if (oldTile) this.distributeTokensOnOneTile(oldTile);
        this.distributeTokensOnOneTile(newTile);

        if (!this.checkForGameOver(player) && this.lastRolledValue !== 6) {
            this.nextPlayer();
        }

        this.resetRolledValue();
        this.clearPossibleMoves();

        return true;
    }

    getFreeStartPosition(player) {
        const takenStartPositions = tokens[player].map(token => {
            const translation = token.getAttribute('translation').split(' ');
            return [translation[1], translation[0]];
        });

        for (let position of startPositions[player]) {
            if (takenStartPositions.findIndex(takenPosition => arraysEqual(takenPosition, position)) === -1) {
                return position;
            }
        }
    }

    resetRolledValue() {
        this.lastRolledValue = 0;
        infoDiv.innerText = `Roll the dice!`;
    }

    clearPossibleMoves() {
        for (let player of players) {
            for (let i = 0; i < 4; i++) {
                tokens[player][i].querySelector('material').setAttribute('emissiveColor', '0 0 0');
            }
        }
    }

    distributeTokensOnOneTile(tile) {
        const allTokensOnTile = [];

        for (let player of players) {
            for (let i = 0; i < 4; i++) {
                const tokenTile = playerPaths[player][this.tokenPositons[player][i]];
                if (!tokenTile) continue;
                if (arraysEqual(tokenTile, tile)) allTokensOnTile.push(tokens[player][i]);
            }
        }

        const tokenCount = allTokensOnTile.length;
        const r = 0.35;

        for (let i = 0; i < tokenCount; i++) {
            const xOffset = tokenCount == 1 ? 0 : r * Math.cos(Math.PI / 180 * i * (360 / tokenCount));
            const yOffset = tokenCount == 1 ? 0 : r * Math.sin(Math.PI / 180 * i * (360 / tokenCount));

            allTokensOnTile[i].setAttribute('translation', `${tile[1] + yOffset} 1 ${tile[0] + xOffset}`);
        }
    }

    checkForGameOver(player) {
        for (let i = 0; i < 4; i++) {
            if (this.tokenPositons[player][i] !== playerPaths[player].length - 1) {
                return false;
            }
        }

        popup.innerHTML = `<div>${player} won!</div>`;
        popup.style.display = 'flex';
        side.style.opacity = 0;
        return true;
    }
}

rollDiceButton.addEventListener('click', () => {
    if (game.lastRolledValue == 0) {
        game.rollDice();
    } else {
        alert('Aready rolled, make a move!');
    }
});

document.getElementById('4-players-button').addEventListener('click', () => {
    game = new Game(numberOfPlayers = 4);
    popup.style.display = 'none';
    side.style.opacity = 1;
});

