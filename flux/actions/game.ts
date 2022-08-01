import {createAction} from 'typesafe-actions'; 

export const setGameId = createAction('game/set_game_id')<{gameId: string}>();
