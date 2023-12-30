const infoDiv = document.getElementById('info');
const currentPlayerDiv = document.getElementById('current-player');
const rollDiceButton = document.getElementById('roll-button');
const popup = document.querySelector('.popup');
const root = document.querySelector(':root');
const side = document.querySelector('side');
const tokens = {};

let game;

class Game {

    constructor(players, computerOpponentIndices = []) {
        this.players = players;
        this.numberOfPlayers = players.length;
        this.computerOpponentIndices = computerOpponentIndices; // which of the indices of players are robots
        this.currentPlayerIndex = 0;
        this.currentPossibleMoves = [];
        this.lastRolledValue = 0;

        this.tokenPositons = {};
        for (let player of this.players) {
            this.tokenPositons[player] = [-6, -6, -6, -6];
        }

        // get references to tokens and set their callbacks
        for (let player of this.players) {
            tokens[player] = [];
            for (let i = 0; i < 4; i++) {
                const id = `${player}-token-${i + 1}`;
                const token = document.getElementById(id);
                tokens[player].push(token);

                token.querySelector('shape').addEventListener('click', () => {
                    if (game.isCurrentPlayerComputerOpponent()) return;
                    game.moveToken(player, i);
                });

                const startPosition = startPositions[player][i];
                token.setAttribute('translation', `${startPosition[1]} 1 ${startPosition[0]}`);
            }
        }

        // hide tokens of colors that are not used because of the set number of players
        for (let player of allPossiblePlayers) {
            if (this.players.findIndex(possiblePlayer => possiblePlayer === player) !== -1) {
                for (let i = 0; i < 4; i++) {
                    const id = `${player}-token-${i + 1}`;
                    const token = document.getElementById(id);
                    token.setAttribute('visible', 'true');
                }
            }
        }

        // create computer components
        this.computerOpponents = {};
        for (let index of this.computerOpponentIndices) {
            this.computerOpponents[index] = new ComputerOpponent(this, this.players[index]);
        }
    }

    /**
    *  @return true if any move is possible after the roll, false otherwise
    * */;
    rollDice(value) {
        const rolledValue = value ?? Math.floor(Math.random() * 6) + 1;
        infoDiv.innerText = `Rolled: ${rolledValue}`;
        this.lastRolledValue = rolledValue;

        if (!this.checkPossibleMoves()) {
            this.nextPlayer();
            return false;
        }

        return true;
    }

    /**
    *  @return true if any move is possible, false otherwise
    * */;
    checkPossibleMoves() {
        this.clearPossibleMoves();
        let isAnyPossible = false;

        for (let i = 0; i < 4; i++) {
            const player = this.players[this.currentPlayerIndex];
            const position = this.tokenPositons[player][i];
            const newPosition = position + this.lastRolledValue;

            if (newPosition >= 0 && newPosition < playerPaths[player].length) {
                isAnyPossible = true;

                tokens[player][i].querySelector('material').setAttribute('emissiveColor', '0.5 0.5 0.5');
            }
        }

        return isAnyPossible;
    }

    isCurrentPlayerComputerOpponent() {
        return this.computerOpponentIndices.includes(this.currentPlayerIndex);
    }

    nextPlayer() {
        this.currentPlayerIndex++;
        this.currentPlayerIndex %= this.numberOfPlayers;
        this.lastRolledValue = 0;

        currentPlayerDiv.innerText = `Now playing: ${this.players[this.currentPlayerIndex]}`;

        root.style.setProperty('--background-color', `var(--${this.players[this.currentPlayerIndex]}-bg)`);
        root.style.setProperty('--text-color', `var(--${this.players[this.currentPlayerIndex]}-text)`);

        if (this.isCurrentPlayerComputerOpponent()) {
            this.moveComputerOpponent(this.currentPlayerIndex);
        }
    }

    /**
    *  @return true if the token was moved successfully, false otherwise
    * */;
    moveToken(player, i) {
        const token = tokens[player][i];

        if (player != this.players[this.currentPlayerIndex] || this.lastRolledValue == 0) return false;

        let oldTile = playerPaths[player][this.tokenPositons[player][i]];
        if (oldTile === undefined) {
            const position = token.getAttribute('translation').split(' ');
            oldTile = [parseFloat(position[2]), parseFloat(position[0])];
        }

        const oldPosition = this.tokenPositons[player][i];
        const newPosition = this.tokenPositons[player][i] += this.lastRolledValue;

        if (newPosition < 0) return false;

        const newTile = playerPaths[player][newPosition];

        // check for sending opponent players home
        if (safeTiles.findIndex(safeTile => arraysEqual(safeTile, newTile)) === -1) {
            for (let otherPlayer of this.players) {
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
                    tokens[otherPlayer][otherTileIndex].setAttribute('translation', `${startPosition[1]} 1 ${startPosition[0]}`);
                }
            }
        }

        // set up and run move animation
        let movesCount = 0;
        let keyValue = `${oldTile[1]} 1 ${oldTile[0]}`;

        for (let positionIndex = Math.max(oldPosition, -1); positionIndex < newPosition; positionIndex++) {
            const position = (positionIndex == -1) ? oldTile : playerPaths[player][positionIndex];
            const nextPosition = playerPaths[player][positionIndex + 1];

            keyValue += `  ${(position[1] + nextPosition[1]) / 2} 2 ${(position[0] + nextPosition[0]) / 2}  ${nextPosition[1]} 1 ${nextPosition[0]}  `;
            movesCount += 2;
        }

        let key = '0';
        for (let j = 1; j <= movesCount; j++) {
            key += ` ${j / movesCount}`;
        }

        const timeSensor = document.getElementById(`time-${player}-${i + 1}`);
        const positionInterpolator = document.getElementById(`move-${player}-${i + 1}`);

        const time = `${new Date().getTime() / 1000}`;

        positionInterpolator.setAttribute('keyValue', keyValue);
        positionInterpolator.setAttribute('key', key);
        timeSensor.setAttribute('cycleInterval', `${movesCount / 4}`);
        timeSensor.setAttribute('starttime', time);

        setTimeout(() => {
            if (oldTile) this.distributeTokensOnOneTile(oldTile);
            this.distributeTokensOnOneTile(newTile);

            if (!this.checkForGameOver(player) && this.lastRolledValue !== 6) {
                this.nextPlayer();
            }

            if (this.lastRolledValue === 6 && this.isCurrentPlayerComputerOpponent()) {
                this.moveComputerOpponent(this.currentPlayerIndex);
            }

            this.resetRolledValue();

        }, movesCount * 250 + 500);

        this.clearPossibleMoves();

        return true;
    }

    getFreeStartPosition(player) {
        const takenStartPositions = tokens[player].map(token => {
            // TODO: make it not dependent on the translation attribute in the visualization ;_;
            const translation = token.getAttribute('translation').split(' ');
            return [translation[1], translation[0]];
        });

        for (let position of startPositions[player]) {
            if (takenStartPositions.findIndex(takenPosition => arraysEqual(takenPosition, position)) === -1) {
                return position;
            }
        }
    }

    moveComputerOpponent(index) {
        setTimeout(
            () => infoDiv.innerText = 'Computer\'s turn',
            1000,
        );

        setTimeout(
            () => this.computerOpponents[index].makeMove(),
            2000,
        );
    }

    resetRolledValue() {
        this.lastRolledValue = 0;
        infoDiv.innerText = this.isCurrentPlayerComputerOpponent() ? 'Computer\'s turn' : 'Roll the dice!';
    }

    clearPossibleMoves() {
        for (let player of this.players) {
            for (let i = 0; i < 4; i++) {
                tokens[player][i].querySelector('material').setAttribute('emissiveColor', '0 0 0');
            }
        }
    }

    distributeTokensOnOneTile(tile) {
        const allTokensOnTile = [];

        for (let player of this.players) {
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

function onRollButtonClick() {
    if (game.isCurrentPlayerComputerOpponent()) return;

    if (game.lastRolledValue == 0) {
        game.rollDice();
    } else {
        alert('Already rolled, make a move!');
    }
}

rollDiceButton.addEventListener('click', onRollButtonClick);
window.addEventListener('keypress', event => {
    if (event.key === '.') {
        onRollButtonClick();
    }
});

function setPlayers(players, computerOpponentIndices) {
    game = new Game(players, computerOpponentIndices);
    popup.style.display = 'none';
    side.style.opacity = 1;
}

document.getElementById('2-players-button').addEventListener('click', () => setPlayers([allPossiblePlayers[0], allPossiblePlayers[2]]));
document.getElementById('3-players-button').addEventListener('click', () => setPlayers(allPossiblePlayers.slice(0, 3)));
document.getElementById('4-players-button').addEventListener('click', () => setPlayers(allPossiblePlayers));

document.getElementById('easy-mode').addEventListener('click', () => setPlayers([allPossiblePlayers[0], allPossiblePlayers[2]], [1]));
