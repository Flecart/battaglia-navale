import { Position } from "./structs/Position";

export class Board {
    board: number[][];
    size: number;

    constructor(size: number) {
        this.size = size; 
        this.board = Array.from(Array(size), () => new Array(size));
    }

    getValue(position: Position): number {
        return this.board[position.x][position.y];
    }
}