
# School Attendance Management System - Code Guide

This guide will help you understand the codebase structure and how to work with it effectively.

## Quick Start

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd school-attendance-system
   npm install
   npm run dev
   ```

2. **Project Structure**
   - `/src/components`: UI components
   - `/src/pages`: Application pages
   - `/src/lib`: Utilities and data

## Key Files

### Core Files

- `src/App.tsx`: Main application component with routing
- `src/lib/data.ts`: Mock database and data models
- `src/index.css`: Global styles and Tailwind configuration

### Pages

- `src/pages/Dashboard.tsx`: Main dashboard with statistics
- `src/pages/Students.tsx`: Student management
- `src/pages/Classes.tsx`: Class management
- `src/pages/QRScanner.tsx`: QR code scanner for attendance
- `src/pages/AttendanceHistory.tsx`: Attendance records and reports
- `src/pages/Teachers.tsx`: Teacher management
- `src/pages/Index.tsx`: Landing page
- `src/pages/NotFound.tsx`: 404 page

### Components

- `src/components/Navbar.tsx`: Navigation bar
- `src/components/AttendanceStats.tsx`: Attendance statistics cards
- `src/components/ClassCard.tsx`: Card component for classes
- `src/components/StudentCard.tsx`: Card component for students
- `src/components/Scanner.tsx`: QR code scanner component
- `src/components/PageTransition.tsx`: Animation wrapper for pages

## How to Modify the Code

### Adding a New Student

Navigate to the Students page and use the "Add Student" form, or programmatically:

```typescript
import { addStudent } from '@/lib/data';

const newStudent = {
  name: "John Doe",
  studentId: "ST123",
  email: "john@example.com",
  class: "Computer Science 101",
};

addStudent(newStudent);
```

### Adding a New Class

Navigate to the Classes page and use the "Add Class" form, or programmatically:

```typescript
import { addClass } from '@/lib/data';

const newClass = {
  name: "Physics 101",
  description: "Introduction to Physics",
  schedule: "Mon, Wed 2:00 PM - 3:30 PM",
  totalStudents: 25,
};

addClass(newClass);
```

### Taking Attendance

Navigate to the QR Scanner page, select a class, and scan student QR codes, or programmatically:

```typescript
import { recordAttendance } from '@/lib/data';

// Mark student as present
recordAttendance("1", "1", true);

// Mark student as absent
recordAttendance("2", "1", false);
```

### Viewing Attendance Records

Navigate to the Attendance History page to view and filter records, or programmatically:

```typescript
import { getAttendanceRecords, getAttendanceSummary } from '@/lib/data';

const records = getAttendanceRecords();
const summary = getAttendanceSummary(records);

console.log(`Total: ${summary.total}, Present: ${summary.present}, Absent: ${summary.absent}`);
```

## Customization

### Changing Colors

The application uses Tailwind CSS for styling. To change the primary color, modify the `--primary` variable in `src/index.css`:

```css
:root {
  --primary: 210 100% 50%; /* Change this to your preferred color */
  /* Other variables */
}
```

### Adding New Pages

1. Create a new file in `src/pages/`
2. Import and use the `PageTransition` component
3. Add the route in `src/App.tsx`

Example:
```tsx
// src/pages/NewPage.tsx
import React from 'react';
import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';

const NewPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageTransition className="page-container">
        <h1 className="page-title">New Page</h1>
        {/* Content */}
      </PageTransition>
    </div>
  );
};

export default NewPage;

// Then in App.tsx, add:
// <Route path="/new-page" element={<NewPage />} />
```

### Adding New Components

1. Create a new file in `src/components/`
2. Define the component with proper TypeScript interfaces
3. Import and use in your pages

Example:
```tsx
// src/components/InfoCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InfoCardProps {
  title: string;
  value: string | number;
}

const InfoCard = ({ title, value }: InfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
```

## Extending the Application

### Connecting to a Real Database

To connect to a real database, you would need to:

1. Set up a backend server (Node.js, Express, etc.)
2. Create API endpoints for CRUD operations
3. Replace the functions in `src/lib/data.ts` with API calls

Example with fetch API:
```typescript
export const getStudents = async () => {
  const response = await fetch('/api/students');
  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }
  return response.json();
};

export const addStudent = async (student) => {
  const response = await fetch('/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    throw new Error('Failed to add student');
  }
  return response.json();
};
```

### Adding Authentication

To add authentication:

1. Create login/register pages
2. Set up authentication context
3. Add protected routes
4. Add login/logout functionality

## Common Issues and Solutions

### QR Scanner Not Working

- Ensure the browser has permission to access the camera
- Make sure you're using HTTPS if running on a server
- Check browser compatibility (works best in Chrome, Firefox)

### Form Validation Errors

- Check the validation schema in the form
- Ensure all required fields are filled
- Check console for specific error messages

### Data Not Updating

- Verify you're using the correct functions from `data.ts`
- Check console for error messages
- Ensure state is updated correctly in React components
