import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import {styled} from '@mui/material/styles';
import Head from 'next/head';
import {useSelector, useDispatch} from 'react-redux';
import * as gameSelectors from '@flux/selectors/game';
import * as gameActions from '@flux/actions/game';
import {Typography} from '@mui/material';
import {useCallback, useState} from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SimpleTextForm from '@components/SimpleTextForm';

const RootContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
`;

const Filler = styled(Box)`
    flex: 1;
`;

function Home() {
    const dispatch = useDispatch();

    const gameId = useSelector(gameSelectors.getGameId);

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const createGame = useCallback(() => {
        dispatch(gameActions.createGameAndRequestId());
    }, [dispatch]);

    const handleCopyId = useCallback(() => {
        setSnackbarOpen(true);
        navigator.clipboard.writeText(gameId);
    }, [gameId]);

    const handleGameJoin = useCallback((value: string) => {
        console.log(value);
        // dispatch(gameActions.joinGame());
    }, [dispatch]);

    return (
        <>
            <Head>
                <title>Search for game</title>
                <meta name="description" content="Search for battleship game" />
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
                    gameId && (
                        <Box mt={4}>
                            <Container sx={{display: 'flex', alignItems: 'center'}}>
                                <Typography variant="body1">
                                    Game-id: {gameId}
                                </Typography>
                                <IconButton aria-label="copy-to-clipboard" onClick={handleCopyId}>
                                    <ContentCopyIcon/>
                                </IconButton>
                            </Container>
                            <Container>
                                <Typography variant="subtitle2">
                                    Condividilo con i tuoi amici!
                                </Typography>
                            </Container>
                        </Box>
                    )
                }
                <Filler/>
                <Snackbar
                    open={snackbarOpen}
                    onClose={() => setSnackbarOpen(false)}
                    autoHideDuration={2000}
                    message="Game id copiato!"
                />
            </RootContainer>
        </>
    );
};

export default Home;
