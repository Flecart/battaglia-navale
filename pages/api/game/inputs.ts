import {
    IsInt,
    IsUUID,
    Min,
    Max,
    IsBoolean,
    ValidateNested,
    IsNotEmpty,
    IsArray,
    ArrayMinSize,
} from 'class-validator';
import {Type} from 'class-transformer';

class Position {
    @IsInt()
    @Min(0)
    @Max(10)
    x: number;

    @IsInt()
    @Min(0)
    @Max(10)
    y: number;
};

class Ship {
    @IsInt()
    shipId: number;

    @IsNotEmpty()
    @ValidateNested()
    start: Position;

    @IsNotEmpty()
    @ValidateNested()
    end: Position;
}

export class Attack {
    @IsUUID()
    gameId: string;

    @IsUUID()
    playerId: string;

    @IsNotEmpty()
    @ValidateNested()
    position: Position;
};

export class Restart {
    @IsUUID()
    gameId: string;

    @IsBoolean()
    forceRestart: boolean;
}

export class PlaceShip {
    @IsUUID()
    gameId: string;

    @IsUUID()
    playerId: string;

    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @Type(() => Ship)
    fleet: Ship[];
}

export class RequestId {
    @IsUUID()
    gameId: string;
}
