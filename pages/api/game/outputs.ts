import {CellType} from '@game/enums';
import {GameStatus as Status} from '@game/enums';
interface Error {
    error?: {
        message: string
        code: number
    }
}

export interface GameCreated extends Error {
    data?: {
        gameId: string
    }
}

export interface Restart extends Error {
    data?: {
        message: string
    }
}

export interface Attack extends Error {
    data?: {
        cellType: CellType
    }
}

export interface PlaceShip extends Error {
    data?: {
        message: string
    }
}

export interface RequestId extends Error {
    data?: {
        playerId: string
    }
}

export interface GameStatus extends Error {
    data?: {
        status: Status
    }
}
