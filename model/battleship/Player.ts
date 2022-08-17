import {v4 as uuidv4} from 'uuid';

import {Ship} from '@game/ship';
import {Board} from '@game/board';
import {Fleet} from '@game/fleet';
import {kCellOffset, ShipNumbers} from '@game/enums';
import {Segment, Position} from '@game/structs';
export class Player {
    id: string;
    fleet: Fleet; // raggiude le fleet da piazzare
    ownBoard: Board; // this board reprehesents own board, where the player has placed his ships
    hitBoard: Board; // this board reprehesents the place to shoot

    constructor(boardSize: number) {
        this.id = uuidv4();
        this.ownBoard = new Board(boardSize);
        this.hitBoard = new Board(boardSize);
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

    placeShip(shipId: number, posSegment: Segment): void {
        if (this.fleet.isFleetPlaced()) {
            throw new Error('fleet already placed, cannot place more ships');
        }
        const currShip = this.fleet.getShipById(shipId);
        if (currShip === null) {
            throw new Error('ship not found when trying to place ship');
        }

        // -1 perché se i punti sono ad es. (0, 0), (0, 2), viene 2, ma prende 3 blocchi
        if (posSegment.length() + 1 !== currShip.length) {
            throw new Error('ship length does not match when trying to place it');
        }

        const err = this.ownBoard.placeShip(shipId, posSegment);
        if (err !== null) {
            throw err;
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
