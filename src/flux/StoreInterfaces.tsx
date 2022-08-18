/* eslint-disable no-unused-vars */
import {CellType} from '@game/enums';
import {GameStatus} from '@game/enums';

export interface GameStore {
    playerId: string;
    gameId: string;
    status: GameStatus;
    ownBoard: Array<Array<CellType>>;
    enemyBoard: Array<Array<CellType>>;
};

export interface MessageStore {
    info: string;
    error: string;
    warning: string;
    success: string;
    type: ErrorType;
}

export enum ErrorType {
    NoError,
    GameNotFound,
    GameAlreadyExists,
    GameAlreadyStarted,
    GameAlreadyFinished,
    GameAlreadyJoined,
    GameAlreadyCreated,
}
