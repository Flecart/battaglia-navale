import {ShipType} from '@game/enums';
class Ship {
    type: ShipType;
    health: number;
    length: number;
    id: number; // serve per identificare la nave solo per il singolo giocatore.

    constructor(type: ShipType, id: number) {
        this.type = type;
        this.health = Number(type);
        this.length = this.health;
        this.id = id;
    }

    getType(): ShipType {
        return this.type;
    }

    getHealth(): number {
        return this.health;
    }

    reduceHealth(): void {
        this.health -= 1;
    }
}

export {Ship};
