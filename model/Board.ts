import { Position } from "./structs/Position";

export class Board {
    board: number[][];
    size: number;

    constructor(size: number) {
        this.size = size; 
        this.board = Array.from(Array(size), () => new Array(size)); // TODO(checka se è tutto a zero)
    }

    getCellAt(position: Position): number {
        return this.board[position.x][position.y];
    }
}