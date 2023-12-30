class ComputerOpponent {
    constructor(game, player, level = 'random') {
        this.game = game;
        this.player = player;
        this.level = level;
    }

    makeMove() {
        if (game.rollDice()) {
            const possibleMoves = this.getPossibleMoves();
            if (possibleMoves.length == 0) return;

            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            game.moveToken(this.player, randomMove);
        }
    }

    getPossibleMoves() {
        const possibleMoves = [];

        for (let i = 0; i < 4; i++) {
            const position = game.tokenPositons[this.player][i];
            const newPosition = position + game.lastRolledValue;

            if (newPosition >= 0 && newPosition < playerPaths[this.player].length) {
                possibleMoves.push(i);
            }
        }

        return possibleMoves;
    }
}
