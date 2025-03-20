
# School Attendance Management System

This project is a web application for managing student attendance using QR codes. It allows teachers to track attendance, manage students and classes, and view attendance history.

## Features

- **Dashboard**: Overview of attendance statistics and quick access to common tasks
- **Student Management**: Add, edit, and delete student records
- **Class Management**: Create and manage classes, including schedules
- **QR Code Attendance**: Scan QR codes to mark student attendance
- **Attendance History**: View and filter attendance records with export functionality
- **Teacher Management**: Track teacher performance and attendance records

## Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query
- **Routing**: React Router
- **Animations**: Framer Motion

## Project Structure

- `/src/components`: Reusable UI components
- `/src/pages`: Main application pages
- `/src/lib`: Utilities and data management
- `/src/hooks`: Custom React hooks

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser and navigate to `http://localhost:3000`

## How to Use

### Taking Attendance
1. Navigate to the Scanner page
2. Select a class from the dropdown
3. Scan student QR codes to mark attendance

### Managing Students
1. Go to the Students page
2. Add new students or edit existing ones
3. Generate QR codes for students

### Viewing Attendance History
1. Visit the History page
2. Use filters to find specific attendance records
3. Export reports as needed

## Future Enhancements

- Database integration
- Authentication system
- Mobile app version
- Email notifications
