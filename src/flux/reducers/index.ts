import game from '@flux/reducers/game';
import message from '@flux/reducers/message';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    game,
    message,
});

export default rootReducer;
