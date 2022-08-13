import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {Button, Grid, Paper} from '@mui/material';

import {styled} from '@mui/material/styles';

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function FormRow() {
    return (
        <React.Fragment>
            <Grid item xs={1}>
                <Button variant="outlined">🌫️</Button>
            </Grid>
            <Grid item xs={1}>
                <Button variant="outlined">🌫️</Button>
            </Grid>
            <Grid item xs={1}>
                <Button variant="outlined">🌫️</Button>
            </Grid>
            <Grid item xs={1}>
                <Button variant="outlined">🌫️</Button>
            </Grid>
            <Grid item xs={1}>
                <Button variant="outlined">🌫️</Button>
            </Grid>
            <Grid item xs={1}>
                <Button variant="outlined">🌫️</Button>
            </Grid>
            <Grid item xs={1}>
                <Button variant="outlined">🌫️</Button>
            </Grid>
            <Grid item xs={1}>
                <Button variant="outlined">🌫️</Button>
            </Grid>
            <Grid item xs={1}>
                <Button variant="outlined">🌫️</Button>
            </Grid>
            <Grid item xs={1}>
                <Button variant="outlined">🌫️</Button>
            </Grid>
        </React.Fragment>
    );
}


const Play = () => {
    const [playerId, setPlayerId] = useState('');
    const [playerJoined, setPlayerJoined] = useState(false);
    const router = useRouter();
    const {gameId} = router.query;

    const joinGame = () => {
        fetch(`/api/game/get-id/${gameId}`, {
            method: 'POST',
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if (data.error !== undefined) {
                console.log(data.error);
            } else {
                setPlayerId(data.data);
                setPlayerJoined(true);
                console.log('set player id', data.data);
            }
        });
    };

    return (
        <React.Fragment>
            <Button variant="contained" onClick={joinGame}>
            Join Game
            </Button>
            <Grid container spacing={1}>
                <Grid container item spacing={1}>
                    <FormRow />
                </Grid>
                <Grid container item spacing={1}>
                    <FormRow />
                </Grid>
                <Grid container item spacing={1}>
                    <FormRow />
                </Grid>

                <Grid container item spacing={1}>
                    <FormRow />
                </Grid>
                <Grid container item spacing={1}>
                    <FormRow />
                </Grid>
                <Grid container item spacing={1}>
                    <FormRow />
                </Grid>

                <Grid container item spacing={1}>
                    <FormRow />
                </Grid>
                <Grid container item spacing={1}>
                    <FormRow />
                </Grid>
                <Grid container item spacing={1}>
                    <FormRow />
                </Grid>

                <Grid container item spacing={1}>
                    <FormRow />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Play;
