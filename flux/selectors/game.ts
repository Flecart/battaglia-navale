import { createSelector } from 'reselect'
import {IStore} from '@flux/store'

export const selectGameStore = (state: IStore) => state.game; 
export const getPlayerId = createSelector(selectGameStore, (game) => game.playerId);
export const getGameId = createSelector(selectGameStore, (game) => game.gameId);
export const getStatus = createSelector(selectGameStore, (game) => game.status); 
export const getOwnboard = createSelector(selectGameStore, (game) => game.ownBoard);
export const getEnemyboard = createSelector(selectGameStore, (game) => game.enemyBoard);