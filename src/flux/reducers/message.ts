import * as messageActions from '@flux/actions/message';
import {MessageStore, ErrorType} from '@flux/StoreInterfaces';
import {ActionType, getType} from 'typesafe-actions';

export type GameAction = ActionType<typeof messageActions>;

// Considerazioni su questo file:
// credo sia una cosa alla fine inutile, anche se ci ho messo poco scriverla...
// non credo ci possano essere dei messaggi che possono esistere per tutto
// il game...
// forse l'unica cosa che abbia senso è l'error type
const defaultState: MessageStore = {
    info: '',
    error: '',
    warning: '',
    success: '',
    type: ErrorType.NoError,
};

const gameReducer = (state = defaultState, action: GameAction) => {
    switch (action.type) {
    case getType(messageActions.setError):
        return {...state, error: action.payload.error};
    case getType(messageActions.setWarning):
        return {...state, warning: action.payload.warning};
    case getType(messageActions.setSuccess):
        return {...state, success: action.payload.success};
    case getType(messageActions.setInfo):
        return {...state, info: action.payload.info};
    case getType(messageActions.resetError):
        return {...state, error: ''};
    case getType(messageActions.resetWarning):
        return {...state, warning: ''};
    case getType(messageActions.resetSuccess):
        return {...state, success: ''};
    case getType(messageActions.resetInfo):
        return {...state, info: ''};
    case getType(messageActions.setErrorType):
        return {...state, type: action.payload.errorType};
    default:
        return state;
    }
};

export default gameReducer;
