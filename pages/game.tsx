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
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import {useSelector, useDispatch} from 'react-redux';
import {useCallback, useState} from 'react';
import * as gameSelectors from '@flux/selectors/game';
import * as gameActions from '@flux/actions/game';
import {CellType} from '@game/enums';


const CustomTableCell = styled(TableCell)<{ hoverable?: boolean }>`
    border: 1px solid rgba(224, 224, 224, 1);
    text-align: center;
    padding: 16px 5px;
    &:hover {
        background-color: ${(props) => props.hoverable ? 'rgba(224, 224, 224, 0.5)' : 'transparent'};
        cursor: ${(props) => props.hoverable ? 'pointer' : 'default'};
    }
`;

function Game() {
    const dispatch = useDispatch();
    const ownBoard = useSelector(gameSelectors.getOwnboard);
    const enemyBoard = useSelector(gameSelectors.getEnemyboard);

    const [showOwnBoard, setShowOwnBoard] = useState(true);

    const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handleClick = useCallback((row: number, column: number) => {
        // TODO(ang): fare la richiesta fetch col dispatch
        // Quanto sotto è temporaneo per testare il click
        if (showOwnBoard) {
            dispatch(gameActions.setOwnBoardCell({x: row, y: column, cellType: CellType.HIT}));
        } else {
            dispatch(gameActions.setEnemyBoardCell({x: row, y: column, cellType: CellType.HIT}));
        }
    }, [dispatch, showOwnBoard]);

    const renderCell = useCallback((row: number, column: number) => {
        const cell = showOwnBoard ? ownBoard[row][column] : enemyBoard[row][column];

        switch (cell) {
        case CellType.UNKNOWN:
            return <CustomTableCell align="center" hoverable onClick={() => handleClick(row, column)}>☁️</CustomTableCell>;
        case CellType.SEA:
            return <CustomTableCell align="center">🌊</CustomTableCell>;
        case CellType.HIT:
            return <CustomTableCell align="center">🔥</CustomTableCell>;
        }
    }, [ownBoard, enemyBoard, showOwnBoard]);

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
                            {rows.map((rowId) => (
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
                                {rows.map((column) => (renderCell(row, column)))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" sx={{mt: '1rem'}} onClick={() => setShowOwnBoard(!showOwnBoard)}>
                To {showOwnBoard ? 'Enemy Board' : 'Own Board'}
            </Button>
        </Container>
    );
}

export default Game;
