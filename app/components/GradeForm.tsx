import { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
} from '@mui/material';
import StatusAlert from './ui/StatusAlert';
import useApiState from '../hooks/useApiState';
import ErrorBoundary from './ErrorBoundary';
import FormErrorFallback from './FormErrorFallback';

interface GradeFormProps {
  onSubmit: (className: string, grade: number) => Promise<void>;
}

const CLASS_OPTIONS = ['Math', 'Science', 'History'];

export default function GradeForm({ onSubmit }: GradeFormProps) {
  const [selectedClass, setSelectedClass] = useState('');
  const [grade, setGrade] = useState('');
  
  const { loading, error, success, handleApiCall } = useApiState({
    onSuccess: () => {
      setSelectedClass('');
      setGrade('');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const gradeValue = parseFloat(grade);
    
    if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 100) {
      return;
    }

    if (!selectedClass) {
      return;
    }

    await handleApiCall(
      () => onSubmit(selectedClass, gradeValue),
      `Grade ${gradeValue} for ${selectedClass} added successfully!`
    );
  };

  return (
    <ErrorBoundary fallback={FormErrorFallback}>
      <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <FormControl size='small' sx={{ minWidth: 150 }}>
          <InputLabel>Class</InputLabel>
          <Select
            value={selectedClass}
            label='Class'
            onChange={(e) => setSelectedClass(e.target.value)}
            required
          >
            {CLASS_OPTIONS.map((className) => (
              <MenuItem key={className} value={className}>
                {className}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label='Grade'
          type='number'
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          required
          size='small'
          inputProps={{ min: 0, max: 100, step: 0.1 }}
          helperText='Enter a grade between 0 and 100'
        />
        <Button
          type='submit'
          variant='contained'
          disabled={loading}
          sx={{ minWidth: 120, height: 40 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Add Grade'}
        </Button>
      </Box>
      <StatusAlert error={error} success={success} />
    </ErrorBoundary>
  );
}
