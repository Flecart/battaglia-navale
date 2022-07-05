import { Game } from "./Game";
import { Position } from "./structs/Position";

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
    createGame(usernamePlayer1: string, usernamePlayer2: string): string {
        let game = new Game(usernamePlayer1, usernamePlayer2);
        this.games.set(game.id, game)
        return game.id
    }

    findGame(gameId: string): Game {
        let game = this.games.get(gameId);
        if (game === undefined) {
            throw new Error('game not found');
        }
        return game;
    }

    attack(gameId: string, playerId: string, position: Position): string {
        let game = this.games.get(gameId);
        if (game === undefined) {
            throw new Error('game not found');
        }

        return game.attack(playerId, position);
    }

    removeGame(gameId: string): boolean {
        return this.games.delete(gameId); // true if delete is successfull, false otherwise
    }
}