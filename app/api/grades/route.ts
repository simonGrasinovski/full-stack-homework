import { NextRequest, NextResponse } from 'next/server';
import { insertGrade, getAllGrades, initializeDatabase } from '../../../lib/database';

let isInitialized = false;

async function ensureInitialized() {
  if (!isInitialized) {
    await initializeDatabase();
    isInitialized = true;
  }
}

export async function GET() {
  try {
    await ensureInitialized();
    const grades = await getAllGrades();
    return NextResponse.json({ data: grades });
  } catch (error) {
    console.error('Error fetching grades:', error);
    return NextResponse.json(
      { error: 'Failed to fetch grades' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureInitialized();
    const { className, grade } = await request.json();

    if (!className || !['Math', 'Science', 'History'].includes(className)) {
      return NextResponse.json(
        { error: 'Class must be one of: Math, Science, History' },
        { status: 400 }
      );
    }

    if (typeof grade !== 'number' || grade < 0 || grade > 100) {
      return NextResponse.json(
        { error: 'Grade must be a number between 0 and 100' },
        { status: 400 }
      );
    }

    const result = await insertGrade(className, grade);
    return NextResponse.json({ data: result[0] }, { status: 201 });
  } catch (error) {
    console.error('Error inserting grade:', error);
    return NextResponse.json(
      { error: 'Failed to insert grade' },
      { status: 500 }
    );
  }
}
