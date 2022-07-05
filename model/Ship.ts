import { ShipType } from "./ShipType"
import { uuid } from "uuidv4";
class Ship {
    type: ShipType;
    health: number;
    id: string;

    private constructor(type: ShipType){
        
        this.type = type;
        this.health = Number(ShipType[type]);
        this.id = uuid();

    }


    public getType() : ShipType {
        return this.type;
    }

    public getHealth() : number {
        return this.health;
    }

    public getId() : string {
        return this.id;
    }

    private reduceHealth() : void {
        this.health -= 1; 
    }

    //Check if the type is correct, in case is incorrect returns null
    public static createShip(type : ShipType) : Ship | null {
        
        if(ShipType[type]){
            return new Ship(type);
        }
        
        return null;
        
    }


}

export {Ship}