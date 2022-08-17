import {Game} from '@game/game';

class GameHandler {
    games: Map<string, Game>;

    constructor() {
        this.games = new Map<string, Game>();
    }

    // TODO(team): informazioni necessari per creare un nuovo gioco?

    // returns the gameId
    createGame(): string {
        const game = new Game();
        this.games.set(game.id, game);
        return game.id;
    }

    findGame(gameId: string): Game {
        const game = this.games.get(gameId);
        if (game === undefined) {
            throw new Error('game not found');
        }
        return game;
    }

    removeGame(gameId: string): boolean {
        return this.games.delete(gameId); // true if delete is successfull, false otherwise
    }
}

const game = new GameHandler();
export default game;
