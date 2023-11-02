const infoDiv = document.getElementById('info');
const currentPlayerDiv = document.getElementById('current-player');
const rollDiceButton = document.getElementById('roll-button');

class Game {
    players = ['Blue', 'Yellow', 'Red', 'Green'];

    constructor(numberOfPlayers = 4) {
        this.numberOfPlayers = numberOfPlayers;
        this.currentPlayer = 0;
        this.currentPossibleMoves = [];
    }

    rollDice(value) {
        const rolledValue = value ?? Math.floor(Math.random() * 6) + 1;
        infoDiv.innerText = `Rolled: ${rolledValue}`;

        if (rolledValue === 6) {
            // TODO
            this.nextPlayer();
        } else {
            // TODO
            this.nextPlayer();
        }
    }

    nextPlayer() {
        this.currentPlayer++;
        this.currentPlayer %= this.numberOfPlayers;

        currentPlayerDiv.innerText = `Now playing: ${this.players[this.currentPlayer]}`;
    }

    moveToken() {
        // TODO
    }
}

const game = new Game();

rollDiceButton.addEventListener('click', () => {
    game.rollDice();
    nextPlayer();
});

