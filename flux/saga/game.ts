import * as gameActions from '@flux/actions/game';
import * as gameSelectors from '@flux/selectors/game';
import {put, takeEvery, select} from 'redux-saga/effects';
import {ActionType, getType} from 'typesafe-actions';
import {CellType} from '@game/Enums';

function* setOwnBoardCell(action: ActionType<typeof gameActions.setOwnBoardCell>) {
    const newOwnBoard: Array<Array<CellType>> = yield select(gameSelectors.getOwnboard);
    const {x, y, cellType} = action.payload;
    newOwnBoard[x][y] = cellType;

    yield put(gameActions.setOwnBoard({ownBoard: newOwnBoard}));
}

function* setEnemyBoardCell(action: ActionType<typeof gameActions.setEnemyBoardCell>) {
    const newEnemyBoard: Array<Array<CellType>> = yield select(gameSelectors.getEnemyboard);
    const {x, y, cellType} = action.payload;
    newEnemyBoard[x][y] = cellType;

    yield put(gameActions.setEnemyBoard({enemyBoard: newEnemyBoard}));
}

const gameSagas = [
    takeEvery(getType(gameActions.setOwnBoardCell), setOwnBoardCell),
    takeEvery(getType(gameActions.setEnemyBoardCell), setEnemyBoardCell),
]

export default gameSagas;