import { CellType } from "@game/Enums";
import { Position, Segment } from "@game/Structs";

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

    placeShip(shipId: number, posSegment: Segment): null | Error {
        const startPosition = posSegment.start;
        const endPosition = posSegment.end; 
        if (!(this.isValidPosition(startPosition) && this.isValidPosition(endPosition))) {
            return new Error("invalid start or end position when placing ship");
        }

        if (startPosition.x !== endPosition.x && startPosition.y !== endPosition.y) {
            return new Error("ship is not parallel to the board axis");
        }

        let err: Error | null = null; 
        if (startPosition.x === endPosition.x) {
            const min = Math.min(startPosition.y, endPosition.y);
            const max = Math.max(startPosition.y, endPosition.y);
            for (let i = min; i <= max; i++) {
                if (this.board[startPosition.x][i] !== CellType.UNKNOWN) {
                    err = new Error("ship cannot be placed on top of another ship");
                    break;
                }
                this.setCellAt(new Position(startPosition.x, i), shipId);
            }

            // reset the table if there is a error!
            if (err !== null) {
                for (let i = min; i <= max; i++) {
                    if (this.board[startPosition.x][i] === shipId) {
                        this.setCellAt(new Position(startPosition.x, i), CellType.UNKNOWN);
                    }
                }
            }
        } else if (startPosition.y === endPosition.y) {
            const min = Math.min(startPosition.x, endPosition.x);
            const max = Math.max(startPosition.x, endPosition.x);
            for (let i = min; i <= max; i++) {
                if (this.board[i][startPosition.y] !== CellType.UNKNOWN) {
                    err = new Error("ship cannot be placed on top of another ship");
                    break;
                }
                this.setCellAt(new Position(i, startPosition.y), shipId);
            }

            if (err !== null) {
                for (let i = min; i <= max; i++) {
                    if (this.board[i][startPosition.y] === shipId) {
                        this.setCellAt(new Position(i, startPosition.y), CellType.UNKNOWN);
                    }
                }
            }
        }
        return err;
    }

    private isValidPosition(position: Position): boolean {
        return position.x >= 0 && position.x < this.size && position.y >= 0 && position.y < this.size;
    }
}