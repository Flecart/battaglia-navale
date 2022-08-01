import * as game_actions from '@flux/actions/game';
import {ActionType, getType} from 'typesafe-actions'; 

export type GameAction = ActionType<typeof game_actions>; 

const defaultState = {
    id: '',
}

const gameReducer = (state = defaultState, action: GameAction) => {
    switch (action.type) {
        case getType(game_actions.setGameId):
            return {
                ...state,
                id: action.payload.gameId,
            }
        default:
            return state;
    }
}

export default gameReducer;