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

    // this assumes the object is well formed
    static fromObject(obj: any): Position | Error {
        try {
            return new Position(Number(obj.x), Number(obj.y));
        } catch (e) {
            // ts-ignore: no e cant be of any type, its only error, because isvalid failed
            return new Error(`Position is not well formed: ${e.message}`);
        }
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

    static fromObject(obj: any): Segment | Error {
        
        const start = Position.fromObject(obj.start);
        const end = Position.fromObject(obj.end);
        return this.fromObjects(start, end);
    }

    static fromObjects(obj1: any, obj2: any): Segment | Error {
        try {
            const start = Position.fromObject(obj1);
            const end = Position.fromObject(obj2);
            if (start instanceof Error || end instanceof Error) {
                return new Error(`Segment is not well formed: ${obj1}, ${obj2}`);
            }
            return new Segment(start, end);
        } catch (e) {
            // ts-ignore: no e cant be of any type, its only error, because isvalid failed
            return new Error(`Segment is not well formed: ${e.message}`);
        }
    }
}