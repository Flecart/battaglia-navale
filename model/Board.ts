import { CellType } from "./Enums";
import { Position } from "./Structs";

export class Board {
    board: number[][];
    size: number;

    constructor(size: number) {
        this.size = size; 
        this.board = Array.from(Array(size), () => new Array(size));

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                this.board[i][j] = CellType.UNKNOWN;
            }
        }
    }

    getCellAt(position: Position): number {
        try {
            return this.board[position.x][position.y];
        } catch (error) {
            throw new Error(`invalid position: ${position.x}, ${position.y} when accessing board of size ${this.size}`);
        }
    }

    setCellAt(position: Position, value: number): void {
        try {
            this.board[position.x][position.y] = value;
        } catch (error) {
            throw new Error(`invalid position: ${position.x}, ${position.y} when accessing board of size ${this.size}`);
        }
    }

    // set all unknown cells to sea value 
    // used for the ownBoard 
    setUnknownToSea(): void {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] === CellType.UNKNOWN) {
                    this.board[i][j] = CellType.SEA;
                }
            }
        }
    }
}