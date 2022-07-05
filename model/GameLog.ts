import { Player } from "./Player";
import { Position } from "./structs/Position";
import { CellType } from "./CellType";
export class GameLog{
    log : string;

    constructor(){
        this.log = "";
    }

    //TO DO (alb) definire il risultato di un azione del player
    add(player : Player , position : Position , result : CellType) : void {
        this.log+= "Giocatore " + player.username + "ha bersagliato la cella " + position.x + " : " + position.y + "risultato : " + CellType[result];
    }
}