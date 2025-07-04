import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface Grade {
  id: number;
  class: string;
  grade: number;
  created_at: string;
}

interface GradeTableProps {
  grades: Grade[];
}

export default function GradeTable({ grades }: GradeTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (grades.length === 0) {
    return (
      <Typography variant='body1' color='text.secondary'>
        No grades recorded yet. Add your first grade above.
      </Typography>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Class</strong></TableCell>
            <TableCell><strong>Grade</strong></TableCell>
            <TableCell><strong>Date Added</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {grades.map((gradeEntry) => (
            <TableRow key={gradeEntry.id}>
              <TableCell>{gradeEntry.id}</TableCell>
              <TableCell>{gradeEntry.class}</TableCell>
              <TableCell>
                <Typography 
                  variant='body2' 
                  sx={{ 
                    fontWeight: 'bold',
                    color: gradeEntry.grade >= 70 ? 'success.main' : 
                           gradeEntry.grade >= 60 ? 'warning.main' : 'error.main'
                  }}
                >
                  {gradeEntry.grade}
                </Typography>
              </TableCell>
              <TableCell>{formatDate(gradeEntry.created_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
