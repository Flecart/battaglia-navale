import game from '@flux/reducers/game';
import {combineReducers} from 'redux';

const root_reducer = combineReducers({
    game,
});

export default root_reducer;