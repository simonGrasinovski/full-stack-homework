import sql from './db';

export async function initializeDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS numbers (
        id SERIAL PRIMARY KEY,
        value INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS grades (
        id SERIAL PRIMARY KEY,
        class VARCHAR(50) NOT NULL CHECK (class IN ('Math', 'Science', 'History')),
        grade INTEGER NOT NULL CHECK (grade >= 0 AND grade <= 100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

export async function insertNumber(value: number) {
  return await sql`
    INSERT INTO numbers (value)
    VALUES (${value})
    RETURNING *
  `;
}

export async function getAdjacentNumbers() {
  return await sql`
    SELECT 
      n1.id as id1,
      n1.value as number1,
      n2.id as id2,
      n2.value as number2,
      (n1.value + n2.value) as sum
    FROM numbers n1
    JOIN numbers n2 ON n2.id = n1.id + 1
    ORDER BY n1.id
  `;
}

export async function insertGrade(className: string, grade: number) {
  return await sql`
    INSERT INTO grades (class, grade)
    VALUES (${className}, ${grade})
    RETURNING *
  `;
}

export async function getAllGrades() {
  return await sql`
    SELECT * FROM grades
    ORDER BY created_at DESC
  `;
}
