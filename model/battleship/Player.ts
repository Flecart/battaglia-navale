import { v4 as uuidv4 } from 'uuid';

import { Ship } from "@game/Ship";
import { Board } from "@game/Board";
import { Fleet } from '@game/Fleet';
import {kCellOffset, ShipNumbers} from '@game/Enums';
import { Segment, Position } from '@game/Structs';
export class Player {
    id: string;
    username: string;
    fleet: Fleet; // raggiude le fleet da piazzare
    ownBoard: Board
    hitBoard: Board

    constructor(boardSize: number, username: string) {
        this.id = uuidv4();
        this.ownBoard = new Board(boardSize);
        this.hitBoard = new Board(boardSize);
        this.username = username;
        this.fleet = new Fleet(this.getInitialFleet()); 
    }

    hasLost(): boolean {
        return this.fleet.isFleetEmpty();
    } 

    hasFinishedPlacingShips(): boolean {
        return this.fleet.isFleetPlaced();
    }

    // applies damage to ship at posizion. Needs to be certain that at position there is a ship
    applyDamage(position: Position) {
        const shipId: number = this.ownBoard.getCellAt(position);
        this.fleet.applyDamage(shipId);
    }

    placeShip(shipId: number, posSegment: Segment): void | Error {
        if (this.fleet.isFleetPlaced()) {
            return new Error("fleet already placed, cannot place more ships");
        }
        const currShip = this.fleet.getShipById(shipId);
        if (currShip === null) {
            return new Error("ship not found when trying to place ship");
        }

        // -1 perché se i punti sono ad es. (0, 0), (0, 2), viene 2, ma prende 3 blocchi
        if (posSegment.length() + 1 !== currShip.length) {
            return new Error("ship length does not match when trying to place it");
        }

        const err = this.ownBoard.placeShip(shipId, posSegment);
        if (err !== null) {
            return err;
        }
        
        this.fleet.placeShip(shipId);

        if (this.fleet.isFleetPlaced()) {
            this.finalizeBoard();
        }
    }

    // reset every internal variable to defaults
    reset() {
        this.ownBoard = new Board(this.ownBoard.size);
        this.hitBoard = new Board(this.hitBoard.size);
        this.fleet = new Fleet(this.getInitialFleet()); 
    }

    private getInitialFleet(): Ship[] {
        let initialId = kCellOffset;
        const ships: Ship[] = [];
        Object.entries(ShipNumbers).forEach(([key, value]) => {
            for (let i = 0; i < value; i++) {
                // @ts-ignore key è un numero di SHIP necessariamente, non una stringa!
                ships.push(new Ship(key, initialId));
                initialId++;
            }
        });
        return ships;
    }

    // This function should be called when a player finishes to place ships
    // It will set the ownBoard to all visible sea, if there is no ship onto it
    private finalizeBoard(): void {
        this.ownBoard.setUnknownToSea();
    }
}