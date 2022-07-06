import { Ship } from "./Ship";
import { ShipType } from "./Enums";
import { toUnicode } from "punycode";

export class Fleet {
    ships: Ship[];
    // corrisponde all'index corrispondente in ships, sa se 
    // la nave è stata piazzata o meno 
    placed: boolean[]; 
    nShipsPlaced: number; 

    constructor(ships: Ship[]) {
        this.ships = ships;
        this.placed = new Array<boolean>(ships.length).fill(false);
        this.nShipsPlaced = 0;
    }

    getShip(id: number): Ship | undefined {
        return this.ships.find(ship => ship.id === id);
    }

    addShip(ship: Ship) {
        this.ships.push(ship);
    }

    placeShip(index: number) {
        if (index >= this.ships.length) {
            // TODO(team): è meglio ritornare così o lanciare un errore?
            return;
        }

        this.placed[index] = true;
        this.nShipsPlaced += 1;
    }

    isShipPlaced(index: number): boolean {
        if (index >= this.ships.length) {
            return false;
        } else {
            return this.placed[index];
        }
    }

    removeShip(shipId: number) {
        this.ships = this.ships.filter(s => s.id !== shipId);
    }

    isFleetEmpty(): boolean {
        return this.ships.length === 0;
    }
}