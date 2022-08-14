/* eslint-disable react/jsx-key */
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import {useState } from 'react';
import * as gameSelectors from '@flux/selectors/game';


const CustomTableCell = styled(TableCell)<{ hoverable?: boolean }>`
    border: 1px solid rgba(224, 224, 224, 1);
    text-align: center;
    padding: 16px 5px;
    &:hover {
        background-color: ${props => props.hoverable ? 'rgba(224, 224, 224, 0.5)' : 'transparent'};
        cursor: ${props => props.hoverable ? 'pointer' : 'default'};
    }
`;

function Game() {
    const playerId = useSelector(gameSelectors.getPlayerId);
    const gameId = useSelector(gameSelectors.getGameId);
    const ownBoard = useSelector(gameSelectors.getOwnboard);
    const enemyBoard = useSelector(gameSelectors.getEnemyboard);

    const [showOwnBoard, setShowOwnBoard] = useState(true);

    const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handleClick = (row: number, column: number) => {
        // TODO(handle backend call)
        console.log(`CLICKED -> row: ${row}, column: ${column}`);
        console.log(ownBoard);
    }

    return (
        <Container maxWidth='md'>
            <Box py={2}>
                <Typography variant="h3" component="h1">
                    {showOwnBoard ? 'Your Board' : 'Enemy Board'}
                </Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <CustomTableCell/>
                        {rows.map(rowId => (
                            <CustomTableCell align="center">{rowId}</CustomTableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row}>
                            <CustomTableCell component="th" scope="row">
                                {row}
                            </CustomTableCell>
                            {rows.map(column => (
                                    <CustomTableCell 
                                        align="center" 
                                        hoverable
                                        onClick={() => handleClick(row, column)}
                                    />
                            ))}
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Game;
