import * as gameActions from '@flux/actions/game';
import {takeEvery} from 'redux-saga/effects';


// temporaneo, solamente per vedere se il saga viene chiamato al click
function* provaOwnClick() {
    console.log('saga clicked own board');
}

function* provaEnemyClick() {
    console.log('saga clicked enemy board');
}

const gameSagas = [
    takeEvery(gameActions.setOwnBoardCell, provaOwnClick),
    takeEvery(gameActions.setEnemyBoardCell, provaEnemyClick),
];

export default gameSagas;
