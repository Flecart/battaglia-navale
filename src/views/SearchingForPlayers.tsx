import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import * as gameSelectors from '@flux/selectors/game';
import {Typography} from '@mui/material';
import {useSelector} from 'react-redux';
import {useCallback, useState} from 'react';
import {styled} from '@mui/material/styles';

const CenteredBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const RootContainer = styled(CenteredBox)`
    height: 100vh;
`;

export default function SearchingForPlayers() {
    const gameId = useSelector(gameSelectors.getGameId);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

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
