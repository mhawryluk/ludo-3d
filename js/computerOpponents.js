class ComputerOpponent {
    constructor(game, player, playerIndex) {
        this.game = game;
        this.player = player;
        this.playerIndex = playerIndex;
    }

    makeMove() {
        game.rollDice().then(anyMoves => {
            if (anyMoves) {
                const possibleMoves = this.getPossibleMoves();
                if (possibleMoves.length == 0) return;

                const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                game.moveToken(this.player, randomMove);
            }
        });
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

    constructor(game, player, playerIndex) {
        super(game, player, playerIndex);

        this.positions = copyArray(game.tokenPositons);
    }

    makeMove() {
        game.rollDice().then(anyMoves => {
            if (anyMoves) {
                const possibleMoves = this.getPossibleMoves();
                if (possibleMoves.length == 0) return;
                if (possibleMoves.length == 1) {
                    game.moveToken(this.player, possibleMoves[0]);
                    return;
                }

                const bestMove = this.monteCarlo(possibleMoves);
                game.moveToken(this.player, bestMove);
            }
        });
    }

    monteCarlo(possibleMoves) {
        const scores = [];

        for (let move of possibleMoves) {

            let scoreSum = 0;
            for (let i = 0; i < this.RANDOM_GAMES_PER_MOVE; i++) {
                scoreSum += this.randomGame(this.player, this.playerIndex, copyArray(this.positions), move, this.game.lastRolledValue, 0);
            }

            scores.push([scoreSum, move]);
        }

        scores.sort((a, b) => b[0] - a[0]);
        console.log('scores: ', scores);
        return scores[0][1];
    }

    randomGame(player, playerIndex, positions, move, rolledValue, depth) {
        if (depth >= this.MOVES_PER_GAME) return 0;

        let score = 0;

        if (move) {
            positions[player][move] += rolledValue;
            const newTile = playerPaths[player][positions[player][move]];

            // update score

            // reaching safe spot
            if (safeTiles.findIndex(safeTile => arraysEqual(safeTile, newTile)) !== -1) {
                if (player === this.player) {
                    score = 10;
                }
            } else {
                // sending opponent home
                for (let otherPlayer of this.game.players) {
                    if (otherPlayer === player) continue;

                    const otherTilesFoundIndices = [];
                    for (let i = 0; i < 4; i++) {
                        const otherTokenTile = playerPaths[otherPlayer][positions[otherPlayer][i]];
                        if (arraysEqual(otherTokenTile, newTile)) {
                            otherTilesFoundIndices.push(i);
                        }
                    }

                    if (otherTilesFoundIndices.length === 1) {
                        if (player === this.player) {
                            score += 100 * (this.MOVES_PER_GAME - depth);
                        } else {
                            score -= 100 * (this.MOVES_PER_GAME - depth);
                        }
                    }
                }
            }
        }

        const nextPlayerIndex = rolledValue === 6 ? playerIndex : (playerIndex + 1) % this.game.numberOfPlayers;
        const nextPlayer = game.players[nextPlayerIndex];
        const nextRolledValue = Math.floor(Math.random() * 6) + 1;

        const possibleMoves = [];
        for (let i = 0; i < 4; i++) {
            const position = positions[nextPlayer][i];
            const newPosition = position + this.lastRolledValue;

            if (newPosition >= 0 && newPosition < playerPaths[nextPlayer].length) {
                possibleMoves.push(i);
            }
        }

        // if sends home, do it, else random

        let chosenMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

        for (let move of possibleMoves) {
            const newPosition = positions[nextPlayer][move] + nextRolledValue;
            const newTile = playerPaths[player][newPosition];

            if (safeTiles.findIndex(safeTile => arraysEqual(safeTile, newTile)) !== -1) {

            } else {
                for (let otherPlayer of this.game.players) {
                    if (otherPlayer === nextPlayer) continue;

                    const otherTilesFoundIndices = [];
                    for (let i = 0; i < 4; i++) {
                        const otherTokenTile = playerPaths[otherPlayer][positions[otherPlayer][i]];
                        if (arraysEqual(otherTokenTile, newTile)) {
                            otherTilesFoundIndices.push(i);
                        }
                    }

                    if (otherTilesFoundIndices.length === 1) {
                        chosenMove = move;
                        break;
                    }
                }
            }
        }

        return score + this.randomGame(nextPlayer, nextPlayerIndex, positions, chosenMove, nextRolledValue, depth + 1);
    }
}

