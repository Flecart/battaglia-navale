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

    attack(gameId: string, playerId: string, position: Position): string {
        let game = this.games.get(gameId);
        if (game === undefined) {
            throw new Error('game not found');
        }

        let result: string; 
        try {
            result = game.attack(playerId, position);
        } catch (e) {
            throw new Error(e.message);
        }

        return 

        if (game.getPlayerId() !== playerId) {
            throw new Error('wrong player');
        }

        const currPlayer = game.turn === 1 ? game.player1 : game.player2;
        const otherPlayer = game.turn === 1 ? game.player2 : game.player1;
        const cellValue = otherPlayer.ownBoard.getCellAt(position);

        if (cellValue === CellType.UNKNOWN) { // TODO(team): cambia questo valore hardcoded 0 in una costante (o enums)
            return "miss";
        }

        const ship = game.fleet.getShip(cellValue)
        if (ship === null) {
            throw new Error('ship not found');
        }
        // ship.reduceHealth();

        if (ship.getHealth() === 0) {
            game.fleet.removeShip(ship);
        }

        game.nextTurn();
        return "hit";
    }

    removeGame(gameId: string): boolean {
        return this.games.delete(gameId); // true if delete is successfull, false otherwise
    }
    
}