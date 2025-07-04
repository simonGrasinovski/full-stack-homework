## Development Decisions & Assumptions

### Architecture Decisions

1. **Next.js App Router**: Chose the modern App Router over Pages Router for better developer experience and performance with React Server Components.

2. **API Routes vs Server Components**: Implemented API routes (`/api/numbers` and `/api/grades`) for clear separation between client and server logic, making the application more maintainable and testable.

3. **Database Connection**: Used the `postgres` library for raw SQL operations as required, with connection pooling configured for performance (max: 20 connections, idle timeout: 20s).

4. **Database Initialization**: Implemented lazy database initialization that runs on the first API call to ensure tables exist before any operations.

### Technical Decisions

1. **Input Validation**: 
   - Implemented both client-side and server-side validation
   - Server-side validation includes type checking and constraint enforcement
   - Database constraints provide additional data integrity

2. **Error Handling**: 
   - Comprehensive error handling in API routes with appropriate HTTP status codes
   - Client-side error boundaries for graceful failure handling
   - Detailed error logging for debugging

3. **Data Fetching Strategy**: 
   - Used Next.js API routes with client-side fetching for dynamic data
   - Implemented automatic table refresh after form submissions
   - Added loading states and error handling for better UX

4. **SQL Query Design**: 
   - Adjacent numbers query uses self-join on sequential IDs for efficient pairing
   - Grades are ordered by creation date (newest first) for better user experience
   - Used parameterized queries to prevent SQL injection

### Assumptions Made

1. **Adjacent Numbers Logic**: 
   - "Adjacent" means consecutive entries by ID (n and n+1)
   - The join condition `n2.id = n1.id + 1` assumes sequential ID assignment
   - Empty tables or single entries will show no adjacent pairs

2. **Grade Management**: 
   - No requirement for grade updates or deletions, only creation and viewing
   - Grade history is maintained (all entries are kept)
   - Class names are case-sensitive and must match exactly

3. **Database Setup**: 
   - PostgreSQL runs on localhost:5432 with default credentials
   - Database name is 'postgres' (default)
   - Tables are created automatically on first application use

4. **Environment Configuration**: 
   - Development environment uses `.env.local` for database credentials
   - Production deployment would use environment-specific configuration

5. **Data Persistence**: 
   - All data persists between application restarts
   - No data cleanup or archival mechanisms implemented
   - Created timestamps use server timezone

### Performance Considerations

1. **Database Connection**: Connection pooling prevents connection exhaustion
2. **Query Optimization**: Indexes on primary keys provide efficient lookups
3. **Client-Side Optimization**: Minimal re-renders with proper state management

### Security Measures

1. **Input Sanitization**: All inputs are validated and sanitized
2. **SQL Injection Prevention**: Parameterized queries used throughout
3. **Type Safety**: TypeScript ensures type consistency across the application
4. **Database Constraints**: CHECK constraints prevent invalid data at the database level