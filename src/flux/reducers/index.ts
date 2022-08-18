import game from '@flux/reducers/game';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    game,
});

export default rootReducer;
