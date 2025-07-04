import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface AdjacentNumber {
  id1: number;
  number1: number;
  id2: number;
  number2: number;
  sum: number;
}

interface NumberTableProps {
  adjacentNumbers: AdjacentNumber[];
}

export default function NumberTable({ adjacentNumbers }: NumberTableProps) {
  if (adjacentNumbers.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary">
        No adjacent pairs available. Add at least 2 numbers to see pairs.
      </Typography>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>ID 1</strong></TableCell>
            <TableCell><strong>Number 1</strong></TableCell>
            <TableCell><strong>ID 2</strong></TableCell>
            <TableCell><strong>Number 2</strong></TableCell>
            <TableCell><strong>Sum</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adjacentNumbers.map((pair, index) => (
            <TableRow key={index}>
              <TableCell>{pair.id1}</TableCell>
              <TableCell>{pair.number1}</TableCell>
              <TableCell>{pair.id2}</TableCell>
              <TableCell>{pair.number2}</TableCell>
              <TableCell><strong>{pair.sum}</strong></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
