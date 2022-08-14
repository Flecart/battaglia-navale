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

    const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handleClick = (row: number, column: number) => {
        // TODO(handle backend call)
        console.log(`CLICKED -> row: ${row}, column: ${column}`);
    }

    return (
        <Container maxWidth='md'>
            <Box py={2}>
                <Typography variant="h3" component="h1">
                    Game
                </Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <CustomTableCell/>
                        {rows.map(row => (
                            <CustomTableCell align="center">{row}</CustomTableCell>
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
