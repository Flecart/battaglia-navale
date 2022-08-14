import {GameStatus} from '@game/Enums';
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from '@flux/reducers';
import { CellType } from '@game/Enums';
export interface GameStore {
    playerId: string;
    gameId: string;
    status: GameStatus;
    ownBoard: Array<Array<CellType>>; 
    enemyBoard: Array<Array<CellType>>;
};

const sagaMiddleware = createSagaMiddleware();
export const Store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware),
);

export type IStore = ReturnType<typeof rootReducer>;
