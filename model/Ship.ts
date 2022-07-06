import { ShipType } from "./Enums";
class Ship {
    type: ShipType;
    health: number;
    id: number; // serve per identificare la nave solo per il singolo giocatore.

    constructor(type: ShipType, id: number) {
        
        this.type = type;
        this.health = Number(type); // è anche la lunghezza della nave
        this.id = id; 
    }

    getType() : ShipType {
        return this.type;
    }

    getHealth() : number {
        return this.health;
    }

    reduceHealth() : void {
        this.health -= 1; 
    }

    // NOTA(ang): la creazione di ship non è un passo che è dipendente dall'user, non credo abbia 
    // tanto senso, quindi la cancello. 
    // public static createShip(type : ShipType) : Ship | null { ...
}

export {Ship}