import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Head from 'next/head';
import SimpleTextForm from '@components/SimpleTextForm';
import Router from 'next/router';
import * as gameActions from '@flux/actions/game';
import * as gameSelectors from '@flux/selectors/game';
import * as messageSelectors from '@flux/selectors/message';
import {useDispatch} from 'react-redux';
import {ErrorType} from '@flux/StoreInterfaces';
import {styled} from '@mui/material/styles';
import {Typography} from '@mui/material';
import {useSelector} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';

const RootContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
`;

const Filler = styled('div')`
    flex: 1;
`;

function Home() {
    const dispatch = useDispatch();
    const playerId = useSelector(gameSelectors.getPlayerId);
    const errorType = useSelector(messageSelectors.getErrorType);
    const [lastSearched, setLastSearched] = useState('');

    useEffect(() => {
        if (playerId) {
            Router.replace('/game');
        }
    }, [playerId]);

    const createGame = useCallback(() => {
        dispatch(gameActions.createGameAndRequestId());
    }, [dispatch]);


    const handleGameJoin = useCallback((gameId: string) => {
        setLastSearched(gameId);
        dispatch(gameActions.joinGame({gameId}));
    }, [dispatch]);

    return (
        <>
            <Head>
                <title>Battaglia navale 🚢</title>
                <meta name="description" content="pagina iniziale trovare il gioco" />
            </Head>
            <RootContainer>
                <Box mt={4}>
                    <Typography variant="h3" component="h1">
                        Battaglia navale 🚢
                    </Typography>
                </Box>
                <Filler/>
                <Button variant="contained" onClick={createGame}>Crea un gioco</Button>
                <Box mt={4}>
                    <SimpleTextForm label='Entra in gioco' helperText="Immettere il game-id" onSubmit={handleGameJoin}/>
                </Box>
                {
                    errorType === ErrorType.GameNotFound && (
                        <Box mt={4}>
                            <Alert severity="error">Il game &quot;{lastSearched}&quot; non esiste proprio, sei sicuro di aver copiato bene?!</Alert>
                        </Box>
                    )
                }
                <Filler/>
            </RootContainer>
        </>
    );
};

export default Home;
