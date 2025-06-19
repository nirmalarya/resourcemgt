export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  capacity: number; // Hours per week
  timeOff: TimeOff[];
}

export interface Project {
  id: string;
  name: string;
  color: string;
  client: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'upcoming';
  budget: {
    hours: number;
    used: number;
  };
}

export interface Task {
  id: string;
  name: string;
  projectId: string;
  startDate: Date;
  endDate: Date;
  status: 'todo' | 'in-progress' | 'completed';
}

export interface Booking {
  id: string;
  userId: string;
  projectId: string;
  taskId?: string;
  startDate: Date;
  endDate: Date;
  hours: number;
  notes?: string;
}

export interface TimeOff {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  type: 'vacation' | 'sick' | 'holiday' | 'other';
  approved: boolean;
}

export interface DayAvailability {
  date: Date;
  available: number;
  booked: number;
  remaining: number;
}

export interface WeeklyUtilization {
  week: string;
  utilization: number;
}

export interface DepartmentUtilization {
  department: string;
  utilization: number;
}

export interface ViewMode {
  type: 'team' | 'individual' | 'project';
  id?: string;
}

export interface CalendarView {
  mode: 'day' | 'week' | 'month';
  date: Date;
}

export interface FilterOptions {
  departments: string[];
  projects: string[];
  users: string[];
  dateRange: {
    start: Date;
    end: Date;
  };
}
