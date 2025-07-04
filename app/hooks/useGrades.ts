import { useState, useEffect, useCallback } from 'react';

interface Grade {
  id: number;
  class: string;
  grade: number;
  created_at: string;
}

export default function useGrades() {
  const [grades, setGrades] = useState<Grade[]>([]);

  const fetchGrades = useCallback(async () => {
    const response = await fetch('/api/grades');
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch grades');
    }
    
    setGrades(result.data);
    return result.data;
  }, []);

  const addGrade = useCallback(async (className: string, grade: number) => {
    const response = await fetch('/api/grades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        className, 
        grade 
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to add grade');
    }

    await fetchGrades();
    return result;
  }, [fetchGrades]);

  useEffect(() => {
    fetchGrades().catch(console.error);
  }, [fetchGrades]);

  return {
    grades,
    fetchGrades,
    addGrade,
  };
}
