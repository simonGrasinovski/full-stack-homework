'use client';

import PageLayout from '../components/ui/PageLayout';
import FormSection from '../components/ui/FormSection';
import DataSection from '../components/ui/DataSection';
import GradeForm from '../components/GradeForm';
import GradeTable from '../components/GradeTable';
import useGrades from '../hooks/useGrades';
import ErrorBoundary from '../components/ErrorBoundary';
import PageErrorFallback from '../components/PageErrorFallback';

export default function GradesPage() {
  const { grades, addGrade } = useGrades();

  return (
    <ErrorBoundary fallback={PageErrorFallback}>
      <PageLayout title='Grades Management'>
        <FormSection title='Add a Grade'>
          <GradeForm onSubmit={addGrade} />
        </FormSection>

        <DataSection title='All Grades'>
          <GradeTable grades={grades} />
        </DataSection>
      </PageLayout>
    </ErrorBoundary>
  );
}
