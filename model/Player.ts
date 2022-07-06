import { v4 as uuidv4 } from 'uuid';

import { Ship } from "./Ship";
import { Board } from "./Board";
import { Fleet } from './Fleet';
import {kCellOffset, ShipNumbers} from './Enums';
import { Position } from './Structs';
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

    placeShip(shipId: number, startPos: Position, endPos: Position): void {
        this.fleet.placeShip(shipId);
        this.ownBoard.placeShip(shipId, startPos, endPos);

        
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
    private finalizeBoard(): void {
        this.ownBoard.setUnknownToSea();
    }


}