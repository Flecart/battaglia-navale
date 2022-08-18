import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Head from 'next/head';
import SimpleTextForm from '@components/SimpleTextForm';
import Router from 'next/router';
import * as gameActions from '@flux/actions/game';
import {useDispatch} from 'react-redux';
import {styled} from '@mui/material/styles';
import {Typography} from '@mui/material';
import {useCallback} from 'react';

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

    const createGame = useCallback(() => {
        dispatch(gameActions.createGameAndRequestId());
        Router.push('/game');
    }, [dispatch]);


    const handleGameJoin = useCallback((value: string) => {
        console.log(value);
        // dispatch(gameActions.joinGame());
        // Router.push('/game');
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
                <Filler/>
            </RootContainer>
        </>
    );
};

export default Home;
