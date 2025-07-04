import { NextRequest, NextResponse } from 'next/server';
import { insertNumber, getAdjacentNumbers, initializeDatabase } from '../../../lib/database';

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
    const adjacentNumbers = await getAdjacentNumbers();
    return NextResponse.json({ data: adjacentNumbers });
  } catch (error) {
    console.error('Error fetching adjacent numbers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch adjacent numbers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureInitialized();
    const { value } = await request.json();

    if (typeof value !== 'number' || !Number.isInteger(value)) {
      return NextResponse.json(
        { error: 'Value must be an integer' },
        { status: 400 }
      );
    }

    const result = await insertNumber(value);
    return NextResponse.json({ data: result[0] }, { status: 201 });
  } catch (error) {
    console.error('Error inserting number:', error);
    return NextResponse.json(
      { error: 'Failed to insert number' },
      { status: 500 }
    );
  }
}
