import * as gameActions from '@flux/actions/game';
import {GameStore} from '@flux/store';
import {ActionType, getType} from 'typesafe-actions';
import {GameStatus} from '@game/enums';
import {CellType} from '@game/enums';

export type GameAction = ActionType<typeof gameActions>;

const kBoardGameSize = 10;

const defaultState: GameStore = {
    playerId: '',
    gameId: '',
    status: GameStatus.WAITING_FOR_PLAYERS,
    ownBoard: Array(kBoardGameSize).fill(Array(kBoardGameSize).fill(CellType.UNKNOWN)),
    enemyBoard: Array(kBoardGameSize).fill(Array(kBoardGameSize).fill(CellType.UNKNOWN)),
};

const gameReducer = (state = defaultState, action: GameAction) => {
    switch (action.type) {
    case getType(gameActions.setGameId):
        return {...state, id: action.payload.gameId};
    case getType(gameActions.setPlayerId):
        return {...state, playerId: action.payload.playerId};
    case getType(gameActions.setStatus):
        return {...state, status: action.payload.status};
    case getType(gameActions.setOwnBoard):
        return {...state, ownBoard: action.payload.ownBoard};
    case getType(gameActions.setEnemyBoard):
        return {...state, enemyBoard: action.payload.enemyBoard};
    case getType(gameActions.setOwnBoardCell):
        return {...state, ownBoard: state.ownBoard.map((row, x) => {
            return row.map((cell, y) => {
                if (x === action.payload.x && y === action.payload.y) {
                    return action.payload.cellType;
                }
                return cell;
            });
        })};
    case getType(gameActions.setEnemyBoardCell):
        return {...state, enemyBoard: state.enemyBoard.map((row, x) => {
            return row.map((cell, y) => {
                if (x === action.payload.x && y === action.payload.y) {
                    return action.payload.cellType;
                }
                return cell;
            });
        })};
    default:
        return state;
    }
};

export default gameReducer;
