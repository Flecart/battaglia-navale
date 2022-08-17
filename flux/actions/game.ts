import {createAction} from 'typesafe-actions';
import {GameStatus} from '@game/enums';
import {CellType} from '@game/enums';

export const setGameId = createAction('game/set_game_id')<{gameId: string}>();
export const setPlayerId = createAction('game/set_player_id')<{playerId: string}>();
export const setStatus = createAction('game/set_status')<{status: GameStatus}>();
export const setOwnBoard = createAction('game/set_own_board')<{ownBoard: Array<Array<CellType>>}>();
export const setEnemyBoard = createAction('game/set_enemy_board')<{enemyBoard: Array<Array<CellType>>}>();
export const setOwnBoardCell = createAction('game/set_own_board_cell')<{x: number, y: number, cellType: CellType}>();
export const setEnemyBoardCell = createAction('game/set_enemy_board_cell')<{x: number, y: number, cellType: CellType}>();

export const createGame = createAction('game/create_game')<void>();
export const requestId = createAction('game/request_id')<{gameId: string}>();
export const createGameAndRequestId = createAction('game/create_game_and_request_id')<void>();
