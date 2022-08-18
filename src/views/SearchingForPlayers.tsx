import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import * as gameSelectors from '@flux/selectors/game';
import * as gameActions from '@flux/actions/game';
import {GameStatus} from '@game/enums';
import {Typography} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {getGameStatus} from '@flux/api/game';

const CenteredBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const RootContainer = styled(CenteredBox)`
    height: 100vh;
`;

export default function SearchingForPlayers() {
    const dispatch = useDispatch();
    const gameId = useSelector(gameSelectors.getGameId);

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        // retry until game is on
        const interval = setInterval(() => {
            getGameStatus(gameId).then((data) => {
                if (data.data && data.data.status !== GameStatus.WAITING_FOR_PLAYERS) {
                    clearInterval(interval);
                    dispatch(gameActions.setStatus({status: data.data.status}));
                }
            });
        }, 3000);
    }, []);

    const handleCopyId = useCallback(() => {
        setSnackbarOpen(true);
        navigator.clipboard.writeText(gameId);
    }, [gameId]);

    return (
        <RootContainer>
            <Box mt={4}>
                <Typography variant="h4" component="h1">
                    Aspettando che il giocatore entri
                </Typography>
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
                        <CenteredBox>
                            <Typography variant="subtitle2">
                                Condividilo con i tuoi amici!
                            </Typography>
                        </CenteredBox>
                    </Box>
                )
            }
            <Box mt={4}>
                <CenteredBox mb={4}>
                    <CircularProgress/>
                </CenteredBox>
                <Typography variant="body1">
                    Sto aspettando che l&apos;altro giocatore entri
                </Typography>
            </Box>
            <Snackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                autoHideDuration={2000}
                message="Game id copiato!"
            />
        </RootContainer>
    );
}
