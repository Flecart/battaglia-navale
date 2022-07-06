import { Ship } from "./Ship";
import { ShipType } from "./Enums";
import { toUnicode } from "punycode";

export class Fleet {
    ships: Ship[];
    // corrisponde all'index corrispondente in ships, sa se 
    // la nave è stata piazzata o meno 
    placed: boolean[]; 
    nShipsPlaced: number;
    nShipsSunk: number;

    constructor(ships: Ship[]) {
        this.ships = ships;
        this.placed = new Array<boolean>(ships.length).fill(false);
        this.nShipsPlaced = 0;
        this.nShipsSunk = 0;
    }

    getShipById(shipId: number): Ship | null {
        let index = this.getShipIndex(shipId);
        if (index === -1) {
            return null;
        }
        return this.ships[index];
    }

    addShip(ship: Ship) {
        this.ships.push(ship);
    }

    placeShip(shipId: number) {
        let index = this.getShipIndex(shipId);
        if (index >= this.ships.length) {
            // TODO(team): è meglio ritornare così o lanciare un errore?
            return;
        }

        this.placed[index] = true;
        this.nShipsPlaced += 1;
    }

    isShipPlaced(shipId: number): boolean {
        let index = this.getShipIndex(shipId);
        if (index >= this.ships.length) {
            return false;
        } else {
            return this.placed[index];
        }
    }

    applyDamage(shipId: number) {
        let index = this.getShipIndex(shipId);
        if (index === -1) {
            return;
        }

        this.ships[index].reduceHealth();
        if (this.ships[index].health == 0) {
            this.nShipsSunk += 1;
        }
    }

    removeShip(shipId: number) {
        this.ships = this.ships.filter(s => s.id !== shipId);
    }

    // checks if all ships sank down
    isFleetEmpty(): boolean {
        return this.ships.length === this.nShipsSunk;
    }

    isFleetPlaced(): boolean { 
        return this.nShipsPlaced === this.ships.length;
    }

    private getShipIndex(shipId: number): number {
        return this.ships.findIndex(s => s.id === shipId);
    }
}