import Head from 'next/head';
import * as gameSelectors from '@flux/selectors/game';
import GameEnded from 'src/views/GameEnded';
import GamePlaying from 'src/views/GamePlaying';
import PlacingShips from 'src/views/PlacingShips';
import SearchingForPlayers from 'src/views/SearchingForPlayers';
import Router from 'next/router';
import {GameStatus} from '@game/enums';
import {useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';

function Game() {
    // TODO: fare una view che cambia a seconda dello stato del gioco (quindi ci saranno molte views)
    // devo cercare di differenziare le views, e portarli da una cartella sì.
    // quindi avrò tipo una cartella views che per ogni view avrà un file, e questo file in cui sto scrivendo ora
    // farà un display delle view, a seconda dello stato del gioco.
    // ok ottima idea.

    const gameStatus = useSelector(gameSelectors.getStatus);
    const gameId = useSelector(gameSelectors.getGameId);

    useEffect(() => {
        // don't want to be in the game if there is no game associated
        if (!gameId) {
            Router.replace('/');
        }
    }, [gameId]);

    const renderSwitch = useCallback(() => {
        switch (gameStatus) {
        case GameStatus.WAITING_FOR_PLAYERS:
            return <SearchingForPlayers />;
        case GameStatus.SETTING_SHIPS:
            return <PlacingShips />;
        case GameStatus.PLAYING:
            return <GamePlaying />;
        case GameStatus.FINISHED:
            return <GameEnded />;
        }
    }, [gameStatus]);

    return (
        <>
            <Head>
                <title>Battaglia navale</title>
                <meta name="description" content="Gioca a battaglia navale" />
            </Head>
            {renderSwitch()}
        </>
    );
}

export default Game;
