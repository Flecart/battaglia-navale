import { uuid } from 'uuidv4';

import { Ship } from "./Ship";
import { Player } from "./Player";
import { Fleet } from "./Fleet";
import { Position } from './structs/Position';
import { CellType } from './CellType';

export class Game {
    id: string;
    player1: Player;
    player2: Player;
    turn: number;
    fleet: Fleet;
    
    ships: Ship[]; // TODO(team): cambia sto array di ship nel gestore di ship, la FLOTTA

    constructor(boardSize: number = 10, usernamePlayer1 : string, usernamePlayer2 : string) {
        this.id = uuid();
        this.player1 = new Player(boardSize, usernamePlayer1);
        this.player2 = new Player(boardSize, usernamePlayer2);
        this.turn = 1;
        this.ships = []; // TODO(team): cambia sto array di ship nel gestore di ship, la FLOTTA
        this.fleet = new Fleet(this.ships);
    }
    
    nextTurn() {
        this.turn = this.turn === 1 ? 2 : 1;
    }
    
    getPlayerId() {
        return this.turn === 1 ? this.player1.id : this.player2.id;
    }

    // TODO(ang): non so se ritornare la stringa ha senso, ma per ora lo faccio
    // pensavo come log di quello che sta facendo...
    attack(playerId: string, position: Position): string {
        if (this.getPlayerId() !== playerId) {
            throw new Error('wrong player');
        }

        const currPlayer = this.turn === 1 ? this.player1 : this.player2;
        const otherPlayer = this.turn === 1 ? this.player2 : this.player1;
        const cellValue = otherPlayer.ownBoard.getCellAt(position);

        if (cellValue === CellType.UNKNOWN) { // TODO(team): cambia questo valore hardcoded 0 in una costante (o enums)
            return "miss";
        }

        const ship = this.fleet.getShip(cellValue)
        if (ship === null) {
            throw new Error('ship not found');
        }
        // ship.reduceHealth();

        if (ship.getHealth() === 0) {
            this.fleet.removeShip(ship);
        }

        this.nextTurn();
        return "hit"; // TODO(team): cambia questo messaggio
    }

    isGameOver(): boolean {
        return this.fleet.isFleetEmpty();
    }
}