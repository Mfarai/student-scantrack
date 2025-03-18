
export interface Student {
  id: string;
  name: string;
  studentId: string;
  qrCode: string;
  email: string;
  class: string;
  avatar?: string;
}

export interface Class {
  id: string;
  name: string;
  description: string;
  schedule: string;
  totalStudents: number;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  classId: string;
  date: Date;
  present: boolean;
  timeIn?: Date;
}

export interface AttendanceSummary {
  total: number;
  present: number;
  absent: number;
  percentage: number;
}

// Sample data for demo purposes
export const sampleStudents: Student[] = [
  {
    id: "1",
    name: "Emma Thompson",
    studentId: "ST001",
    qrCode: "ST001-QR",
    email: "emma@school.edu",
    class: "Computer Science 101",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Alex Johnson",
    studentId: "ST002",
    qrCode: "ST002-QR",
    email: "alex@school.edu",
    class: "Computer Science 101",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    name: "Michael Chen",
    studentId: "ST003",
    qrCode: "ST003-QR",
    email: "michael@school.edu",
    class: "Physics 202",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "4",
    name: "Sarah Williams",
    studentId: "ST004",
    qrCode: "ST004-QR",
    email: "sarah@school.edu",
    class: "Physics 202",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: "5",
    name: "James Wilson",
    studentId: "ST005",
    qrCode: "ST005-QR",
    email: "james@school.edu",
    class: "English Literature",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
];

export const sampleClasses: Class[] = [
  {
    id: "1",
    name: "Computer Science 101",
    description: "Introduction to Computer Science",
    schedule: "Mon, Wed 10:00 AM - 11:30 AM",
    totalStudents: 25,
  },
  {
    id: "2",
    name: "Physics 202",
    description: "Advanced Physics Concepts",
    schedule: "Tue, Thu 1:00 PM - 2:30 PM",
    totalStudents: 18,
  },
  {
    id: "3",
    name: "English Literature",
    description: "Classic and Modern Literature Analysis",
    schedule: "Wed, Fri 3:00 PM - 4:30 PM",
    totalStudents: 22,
  },
];

export const sampleAttendanceRecords: AttendanceRecord[] = [
  {
    id: "1",
    studentId: "1",
    studentName: "Emma Thompson",
    className: "Computer Science 101",
    classId: "1",
    date: new Date(2023, 9, 15),
    present: true,
    timeIn: new Date(2023, 9, 15, 10, 5),
  },
  {
    id: "2",
    studentId: "2",
    studentName: "Alex Johnson",
    className: "Computer Science 101",
    classId: "1",
    date: new Date(2023, 9, 15),
    present: true,
    timeIn: new Date(2023, 9, 15, 9, 58),
  },
  {
    id: "3",
    studentId: "3",
    studentName: "Michael Chen",
    className: "Physics 202",
    classId: "2",
    date: new Date(2023, 9, 16),
    present: false,
  },
  {
    id: "4",
    studentId: "4",
    studentName: "Sarah Williams",
    className: "Physics 202",
    classId: "2",
    date: new Date(2023, 9, 16),
    present: true,
    timeIn: new Date(2023, 9, 16, 1, 2),
  },
  {
    id: "5",
    studentId: "5",
    studentName: "James Wilson",
    className: "English Literature",
    classId: "3",
    date: new Date(2023, 9, 17),
    present: true,
    timeIn: new Date(2023, 9, 17, 2, 55),
  },
];

// Today's attendance (for demo)
export const todayAttendance: AttendanceSummary = {
  total: 45,
  present: 38,
  absent: 7,
  percentage: Math.round((38 / 45) * 100),
};

// Weekly attendance (for demo)
export const weeklyAttendance: AttendanceSummary = {
  total: 225,
  present: 195,
  absent: 30,
  percentage: Math.round((195 / 225) * 100),
};

// Monthly attendance (for demo)
export const monthlyAttendance: AttendanceSummary = {
  total: 900,
  present: 810,
  absent: 90,
  percentage: Math.round((810 / 900) * 100),
};

// Simple store implementation (to be replaced with proper state management in a real app)
let students = [...sampleStudents];
let classes = [...sampleClasses];
let attendanceRecords = [...sampleAttendanceRecords];

export const getStudents = () => students;
export const getClasses = () => classes;
export const getAttendanceRecords = () => attendanceRecords;

export const addStudent = (student: Omit<Student, "id" | "qrCode">) => {
  const id = Math.max(...students.map(s => parseInt(s.id))) + 1 + '';
  const qrCode = student.studentId + "-QR";
  const newStudent = { ...student, id, qrCode };
  students = [...students, newStudent as Student];
  return newStudent;
};

export const updateStudent = (student: Student) => {
  students = students.map(s => s.id === student.id ? student : s);
  return student;
};

export const deleteStudent = (id: string) => {
  students = students.filter(s => s.id !== id);
  return id;
};

export const addClass = (classItem: Omit<Class, "id">) => {
  const id = Math.max(...classes.map(c => parseInt(c.id))) + 1 + '';
  const newClass = { ...classItem, id };
  classes = [...classes, newClass as Class];
  return newClass;
};

export const updateClass = (classItem: Class) => {
  classes = classes.map(c => c.id === classItem.id ? classItem : c);
  return classItem;
};

export const deleteClass = (id: string) => {
  classes = classes.filter(c => c.id !== id);
  return id;
};

export const recordAttendance = (studentId: string, classId: string, present: boolean) => {
  const student = students.find(s => s.id === studentId);
  const classItem = classes.find(c => c.id === classId);
  
  if (!student || !classItem) {
    throw new Error("Student or class not found");
  }
  
  const id = Math.max(...attendanceRecords.map(a => parseInt(a.id))) + 1 + '';
  const record: AttendanceRecord = {
    id,
    studentId,
    studentName: student.name,
    classId,
    className: classItem.name,
    date: new Date(),
    present,
    timeIn: present ? new Date() : undefined,
  };
  
  attendanceRecords = [...attendanceRecords, record];
  return record;
};

export const getStudentById = (id: string) => {
  return students.find(s => s.id === id);
};

export const getClassById = (id: string) => {
  return classes.find(c => c.id === id);
};

export const getAttendanceByStudentId = (studentId: string) => {
  return attendanceRecords.filter(record => record.studentId === studentId);
};

export const getAttendanceByClassId = (classId: string) => {
  return attendanceRecords.filter(record => record.classId === classId);
};

export const getAttendanceByDate = (date: Date) => {
  return attendanceRecords.filter(record => 
    record.date.getFullYear() === date.getFullYear() &&
    record.date.getMonth() === date.getMonth() &&
    record.date.getDate() === date.getDate()
  );
};

export const getAttendanceSummary = (records: AttendanceRecord[]): AttendanceSummary => {
  const total = records.length;
  const present = records.filter(r => r.present).length;
  const absent = total - present;
  const percentage = total ? Math.round((present / total) * 100) : 0;
  
  return {
    total,
    present,
    absent,
    percentage
  };
};
