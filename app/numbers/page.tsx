'use client';

import PageLayout from '../components/ui/PageLayout';
import FormSection from '../components/ui/FormSection';
import DataSection from '../components/ui/DataSection';
import NumberForm from '../components/NumberForm';
import NumberTable from '../components/NumberTable';
import useNumbers from '../hooks/useNumbers';
import ErrorBoundary from '../components/ErrorBoundary';
import PageErrorFallback from '../components/PageErrorFallback';

export default function NumbersPage() {
  const { adjacentNumbers, addNumber } = useNumbers();

  return (
    <ErrorBoundary fallback={PageErrorFallback}>
      <PageLayout title='Numbers Management'>
        <FormSection title='Add a Number'>
          <NumberForm onSubmit={addNumber} />
        </FormSection>

        <DataSection title='Adjacent Number Pairs'>
          <NumberTable adjacentNumbers={adjacentNumbers} />
        </DataSection>
      </PageLayout>
    </ErrorBoundary>
  );
}
