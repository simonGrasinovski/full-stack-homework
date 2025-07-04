import { useState, useEffect, useCallback } from 'react';

interface AdjacentNumber {
  id1: number;
  number1: number;
  id2: number;
  number2: number;
  sum: number;
}

export default function useNumbers() {
  const [adjacentNumbers, setAdjacentNumbers] = useState<AdjacentNumber[]>([]);

  const fetchAdjacentNumbers = useCallback(async () => {
    const response = await fetch('/api/numbers');
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch data');
    }
    
    setAdjacentNumbers(result.data);
    return result.data;
  }, []);

  const addNumber = useCallback(async (value: number) => {
    const response = await fetch('/api/numbers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to add number');
    }

    await fetchAdjacentNumbers();
    return result;
  }, [fetchAdjacentNumbers]);

  useEffect(() => {
    fetchAdjacentNumbers().catch(console.error);
  }, [fetchAdjacentNumbers]);

  return {
    adjacentNumbers,
    fetchAdjacentNumbers,
    addNumber,
  };
}
