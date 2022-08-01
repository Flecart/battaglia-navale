import {GameStatus} from '@game/Enums';
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from '@flux/reducers';

interface Player {
    id: string;
    gameId: string;
    status: GameStatus;
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);