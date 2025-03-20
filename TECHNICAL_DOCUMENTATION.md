
# Technical Documentation - School Attendance Management System

## Project Architecture

This project is built using React with TypeScript and follows a component-based architecture. It uses various modern web development libraries and tools to create a responsive and interactive user interface.

## Directory Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/             # Base UI components from shadcn/ui
│   └── ...             # Custom components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and data handling
├── pages/              # Main application pages
└── ...                 # Configuration files
```

## Key Technologies

1. **React**: Frontend library for building user interfaces
2. **TypeScript**: Typed superset of JavaScript
3. **Tailwind CSS**: Utility-first CSS framework
4. **shadcn/ui**: Component library built on Radix UI
5. **React Router**: For handling navigation
6. **Framer Motion**: Animation library
7. **React Query**: For data fetching and state management
8. **Recharts**: For data visualization

## Data Management

The application currently uses a mock database system implemented in `src/lib/data.ts`. This file contains:

- Data models (interfaces)
- Sample data
- CRUD operations

In a production environment, this would be replaced with actual API calls to a backend server.

## Adding New Features

### Adding a New Page

1. Create a new file in the `src/pages` directory
2. Add the page component with proper structure
3. Add the route in `src/App.tsx`
4. Add navigation links to the new page

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
        {/* Page content */}
      </PageTransition>
    </div>
  );
};

export default NewPage;
```

### Adding a New Component

1. Create a new file in the `src/components` directory
2. Define the component interface
3. Implement the component
4. Export the component

Example:
```tsx
// src/components/NewComponent.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface NewComponentProps {
  title: string;
  className?: string;
}

const NewComponent = ({ title, className }: NewComponentProps) => {
  return (
    <div className={cn("p-4 border rounded", className)}>
      <h2 className="text-lg font-medium">{title}</h2>
    </div>
  );
};

export default NewComponent;
```

### Adding New Data Models

1. Define the interface in `src/lib/data.ts`
2. Add sample data if needed
3. Implement CRUD operations for the new model

Example:
```typescript
// Add to src/lib/data.ts
export interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
}

// Sample data
export const sampleTeachers: Teacher[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@school.edu",
    subject: "Math"
  },
  // ...
];

// Implement CRUD operations
let teachers = [...sampleTeachers];

export const getTeachers = () => teachers;

export const addTeacher = (teacher: Omit<Teacher, "id">) => {
  const id = Math.max(...teachers.map(t => parseInt(t.id))) + 1 + '';
  const newTeacher = { ...teacher, id };
  teachers = [...teachers, newTeacher];
  return newTeacher;
};

// ...
```

## Animation System

The application uses Framer Motion for animations. The primary page transition is implemented in the `PageTransition` component.

To use animations in your components:

1. Import motion from framer-motion
2. Use motion components with animation properties
3. Customize transitions as needed

Example:
```tsx
import { motion } from 'framer-motion';

const AnimatedComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Content
    </motion.div>
  );
};
```

## Form Handling

Forms are handled using `react-hook-form` with `zod` for validation.

Example form setup:
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

// Define schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type FormValues = z.infer<typeof formSchema>;

const MyForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* More fields */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
```

## Best Practices

1. **Component Organization**: Keep components small and focused on a single responsibility
2. **TypeScript**: Use proper typing for all components and functions
3. **CSS**: Use Tailwind's utility classes for styling
4. **State Management**: Use React's built-in state management for local state, React Query for server state
5. **Error Handling**: Implement proper error handling in data operations
6. **Comments**: Use JSDoc comments for documenting code
7. **Folder Structure**: Organize related files together

## Common Tasks

### Adding a New Student

```typescript
import { addStudent } from '@/lib/data';

const newStudent = {
  name: "New Student",
  studentId: "ST100",
  email: "student@school.edu",
  class: "Computer Science 101",
};

const result = addStudent(newStudent);
console.log(result);
```

### Taking Attendance

```typescript
import { recordAttendance } from '@/lib/data';

const studentId = "1";
const classId = "1";
const present = true;

const result = recordAttendance(studentId, classId, present);
console.log(result);
```

### Viewing Attendance Records

```typescript
import { getAttendanceByClassId, getAttendanceSummary } from '@/lib/data';

const classId = "1";
const records = getAttendanceByClassId(classId);
const summary = getAttendanceSummary(records);

console.log(records);
console.log(summary);
```

## Extending the Application

Here are some suggestions for extending the application:

1. **Authentication**: Add user authentication and authorization
2. **Real Database**: Replace mock database with a real backend
3. **Email Notifications**: Send notifications for absent students
4. **Mobile Responsiveness**: Enhance mobile experience
5. **Dark Mode**: Implement theme switching
6. **Analytics**: Add more detailed reporting and analytics
7. **Calendar View**: Add a calendar view for attendance tracking
8. **Mobile App**: Create a mobile version of the application

## Debugging Tips

1. Use browser developer tools to inspect elements and check console logs
2. Add console.log statements to debug data flow
3. Use React Developer Tools to inspect component hierarchy and props
4. Check network requests if connecting to a backend
5. Validate form data using the form's built-in validation
