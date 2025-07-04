## Database Schema

### Numbers Table

- `id`: Auto-incrementing primary key
- `value`: The integer value (accepts positive and negative integers)
- `created_at`: Automatic timestamp when record is created

### Grades Table

- `id`: Auto-incrementing primary key
- `class`: Class name (constrained to 'Math', 'Science', or 'History')
- `grade`: Grade value (constrained between 0 and 100)
- `created_at`: Automatic timestamp when record is created