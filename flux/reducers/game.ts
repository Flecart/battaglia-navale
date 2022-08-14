import * as game_actions from '@flux/actions/game';
import { GameStore } from '@flux/store';
import {ActionType, getType} from 'typesafe-actions'; 
import { GameStatus } from '@game/Enums';
import { CellType } from '@game/Enums';

export type GameAction = ActionType<typeof game_actions>;

const kBoardGameSize = 10;

const defaultState: GameStore = {
    playerId: '',
    gameId: '',
    status: GameStatus.WAITING_FOR_PLAYERS,
    ownBoard: Array(kBoardGameSize).fill(Array(kBoardGameSize).fill(CellType.UNKNOWN)),
    enemyBoard: Array(kBoardGameSize).fill(Array(kBoardGameSize).fill(CellType.UNKNOWN)),
}

const gameReducer = (state = defaultState, action: GameAction) => {
    switch (action.type) {
        case getType(game_actions.setGameId):
            return {...state, id: action.payload.gameId};
        case getType(game_actions.setPlayerId):
            return {...state, playerId: action.payload.playerId};
        case getType(game_actions.setStatus):
            return {...state, status: action.payload.status};
        case getType(game_actions.setOwnBoard):
            return {...state, ownBoard: action.payload.ownBoard};
        case getType(game_actions.setEnemyBoard):
            return {...state, enemyBoard: action.payload.enemyBoard};
        default:
            return state;
    }
};

export default gameReducer;
