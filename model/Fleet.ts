import { Ship } from "./Ship";
import { ShipType } from "./ShipType";

export class Fleet {
    ships: Ship[];

    constructor(ships: Ship[]) {
        this.ships = ships;
    }

    getShips(): Ship[] {
        return this.ships;
    }

    getShip(id: number): Ship | null {
        // return this.ships.find(ship => ship.getId() === id);
        return Ship.createShip(ShipType.DESTROYER); // temporaneo!
    }

    removeShip(ship: Ship) {
        this.ships = this.ships.filter(s => s !== ship);
    }

    isFleetEmpty(): boolean {
        return this.ships.length === 0;
    }
}