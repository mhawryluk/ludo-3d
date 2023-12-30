function copyArray(array) {
    return JSON.parse(JSON.stringify(array));
}

class ComputerOpponent {
    constructor(game, player) {
        this.game = game;
        this.player = player;
    }

    makeMove() {
        console.log('comp')
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

class MonteCarloOpponent extends ComputerOpponent {
    RANDOM_GAMES_PER_MOVE = 20;
    MOVES_PER_GAME = 20;

    constructor(game, player) {
        super(game, player);

        this.positions = copyArray(game.tokenPositons);
    }

    makeMove() {
        if (game.rollDice()) {
            const possibleMoves = this.getPossibleMoves();
            if (possibleMoves.length == 0) return;
            if (possibleMoves.length == 1) {
                game.moveToken(this.player, possibleMoves[0]);
                return;
            }

            const bestMove = this.monteCarlo(possibleMoves);
            game.moveToken(this.player, bestMove);
        }
    }

    monteCarlo(possibleMoves) {
        const scores = [];

        for (let move of possibleMoves) {

            let scoreSum = 0;
            for (let i = 0; i < this.RANDOM_GAMES_PER_MOVE; i++) {
                scoreSum += this.randomGame(copyArray(this.positions), move);
            }

            scores.push([scoreSum, move]);
        }

        scores.sort((a, b) => a[0] - b[0]);
        return scores[0][1];
    }

    randomGame(positions, firstMove) {
        let score = 0;

        // TODO: implement random game simulation and scoring

        return score;
    }
}

