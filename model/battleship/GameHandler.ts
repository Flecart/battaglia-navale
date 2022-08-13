import {Game} from '@game/Game';
import {Position, Segment} from '@game/Structs';

// TODO(team): rimuovere questi commenti dopo
// Vantaggi di questa soluzione
// 1. Avere tutto in un singolo posto

export class gameHandler {
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

    findGame(gameId: string): Game | Error {
        const game = this.games.get(gameId);
        if (game === undefined) {
            return new Error('game not found');
        }
        return game;
    }

    removeGame(gameId: string): boolean {
        return this.games.delete(gameId); // true if delete is successfull, false otherwise
    }
}
