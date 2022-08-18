import * as gameActions from '@flux/actions/game';
import * as gameApi from '@flux/api/game';
import * as gameOutput from '@api/game/outputs';
import * as messageActions from '@flux/actions/message';
import {takeEvery, put, call} from 'redux-saga/effects';
import {GameStatus} from '@game/enums';
import {ErrorType} from '@flux/StoreInterfaces';
import {ActionType} from 'typesafe-actions';

function* createGame() {
    const data: gameOutput.GameCreated = yield call(gameApi.createGame);

    if (data.data) {
        yield put(gameActions.setGameId({gameId: data.data.gameId}));
        yield put(gameActions.setStatus({status: GameStatus.WAITING_FOR_PLAYERS}));
    }
    return data.data?.gameId;
}

function* requestId(action: ActionType<typeof gameActions.requestId>) {
    if (!action.payload.gameId) {
        return;
    }
    const data: gameOutput.RequestId = yield call(gameApi.requestId, action.payload.gameId);

    if (data.data) {
        yield put(messageActions.setErrorType({errorType: ErrorType.NoError}));
        yield put(gameActions.setPlayerId({playerId: data.data.playerId}));
    } else if (data.error) {
        yield put(messageActions.setErrorType({errorType: ErrorType.GameNotFound}));
    }
    return data.data?.playerId;
}

function* createGameAndRequestId() {
    const gameId: string = yield call(createGame);
    yield put(gameActions.requestId({gameId}));
}

const gameSagas = [
    takeEvery(gameActions.createGame, createGame),
    takeEvery([gameActions.requestId, gameActions.joinGame], requestId),
    takeEvery(gameActions.createGameAndRequestId, createGameAndRequestId),
];

export default gameSagas;
