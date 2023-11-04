const infoDiv = document.getElementById('info');
const currentPlayerDiv = document.getElementById('current-player');
const rollDiceButton = document.getElementById('roll-button');
const tokens = {};

class Game {

    constructor(numberOfPlayers = 4) {
        this.numberOfPlayers = numberOfPlayers;
        this.currentPlayer = 0;
        this.currentPossibleMoves = [];
        this.lastRolledValue = 0;

        this.tokenPositons = {};
        for (let player of players) {
            this.tokenPositons[player] = [-6, -6, -6, -6];
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
            const player = players[this.currentPlayer];
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
        this.currentPlayer++;
        this.currentPlayer %= this.numberOfPlayers;

        currentPlayerDiv.innerText = `Now playing: ${players[this.currentPlayer]}`;
    }

    moveToken(token, player, i) {
        if (player != players[this.currentPlayer] || this.lastRolledValue == 0) return false;

        const newPosition = this.tokenPositons[player][i] += this.lastRolledValue;

        if (newPosition < 0) return false;

        const newTile = playerPaths[player][newPosition];
        token.setAttribute('translation', `${newTile[1]} 1 ${newTile[0]}`);

        if (this.lastRolledValue !== 6) {
            this.nextPlayer();
        }

        this.resetRolledValue();
        this.clearPossibleMoves();
        return true;
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
}

const game = new Game();

rollDiceButton.addEventListener('click', () => {
    game.rollDice();
});

setTimeout(() => {
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
}, 1000);

