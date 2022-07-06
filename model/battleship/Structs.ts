// reprehesents a position in the model 
export class Position {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    distanceFrom(pos: Position): number {
        return Math.abs(this.x - pos.x) + Math.abs(this.y - pos.y);
    }
}

// represents a straight line in the plane
export class Segment {
    start: Position;
    end: Position;

    constructor(start: Position, end: Position) {
        this.start = start;
        this.end = end;
    }

    length(): number { 
        return this.start.distanceFrom(this.end);
    }
}