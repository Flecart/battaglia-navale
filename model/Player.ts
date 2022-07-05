import { uuid } from 'uuidv4';

import { Ship } from "./Ship";
import { Board } from "./Board";

export class Player {
    id: string 
    username : string
    ownBoard: Board
    hitBoard: Board

    constructor(boardSize: number, username : string ) {
        this.id = uuid();
        this.ownBoard = new Board(boardSize);
        this.hitBoard = new Board(boardSize);
        this.username = username;
    }
}