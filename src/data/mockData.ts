import { User, Project, Booking, Task, TimeOff } from '@/lib/types';
import { addDays, subDays } from 'date-fns';

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 11);

// Current date for reference
const today = new Date();

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex@bolt.new',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    role: 'Frontend Developer',
    department: 'Engineering',
    capacity: 40, // 40 hours per week
    timeOff: []
  },
  {
    id: 'user-2',
    name: 'Jamie Smith',
    email: 'jamie@bolt.new',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    role: 'Backend Developer',
    department: 'Engineering',
    capacity: 40,
    timeOff: []
  },
  {
    id: 'user-3',
    name: 'Morgan Lee',
    email: 'morgan@bolt.new',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
    role: 'UX Designer',
    department: 'Design',
    capacity: 32, // Part-time (32 hours per week)
    timeOff: []
  },
  {
    id: 'user-4',
    name: 'Taylor Kim',
    email: 'taylor@bolt.new',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
    role: 'Product Manager',
    department: 'Product',
    capacity: 40,
    timeOff: []
  },
  {
    id: 'user-5',
    name: 'Jordan Patel',
    email: 'jordan@bolt.new',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
    role: 'DevOps Engineer',
    department: 'Engineering',
    capacity: 40,
    timeOff: []
  },
  {
    id: 'user-6',
    name: 'Casey Rivera',
    email: 'casey@bolt.new',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    role: 'UI Designer',
    department: 'Design',
    capacity: 40,
    timeOff: []
  }
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: 'project-1',
    name: 'Website Redesign',
    color: 'project-blue',
    client: 'Acme Corp',
    startDate: subDays(today, 30),
    endDate: addDays(today, 60),
    status: 'active',
    budget: {
      hours: 400,
      used: 180
    }
  },
  {
    id: 'project-2',
    name: 'Mobile App Development',
    color: 'project-green',
    client: 'TechStart',
    startDate: subDays(today, 15),
    endDate: addDays(today, 75),
    status: 'active',
    budget: {
      hours: 600,
      used: 120
    }
  },
  {
    id: 'project-3',
    name: 'E-commerce Platform',
    color: 'project-purple',
    client: 'ShopEasy',
    startDate: addDays(today, 10),
    endDate: addDays(today, 100),
    status: 'upcoming',
    budget: {
      hours: 800,
      used: 0
    }
  },
  {
    id: 'project-4',
    name: 'Internal Dashboard',
    color: 'project-orange',
    client: 'Bolt.new',
    startDate: subDays(today, 60),
    endDate: subDays(today, 5),
    status: 'completed',
    budget: {
      hours: 300,
      used: 320
    }
  },
  {
    id: 'project-5',
    name: 'API Integration',
    color: 'project-red',
    client: 'DataSync',
    startDate: subDays(today, 10),
    endDate: addDays(today, 20),
    status: 'active',
    budget: {
      hours: 160,
      used: 60
    }
  }
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: 'task-1',
    name: 'Homepage Design',
    projectId: 'project-1',
    startDate: subDays(today, 20),
    endDate: subDays(today, 10),
    status: 'completed'
  },
  {
    id: 'task-2',
    name: 'Frontend Implementation',
    projectId: 'project-1',
    startDate: subDays(today, 8),
    endDate: addDays(today, 5),
    status: 'in-progress'
  },
  {
    id: 'task-3',
    name: 'Backend API Development',
    projectId: 'project-1',
    startDate: subDays(today, 5),
    endDate: addDays(today, 10),
    status: 'in-progress'
  },
  {
    id: 'task-4',
    name: 'App Wireframes',
    projectId: 'project-2',
    startDate: subDays(today, 15),
    endDate: subDays(today, 5),
    status: 'completed'
  },
  {
    id: 'task-5',
    name: 'UI Design',
    projectId: 'project-2',
    startDate: subDays(today, 5),
    endDate: addDays(today, 10),
    status: 'in-progress'
  },
  {
    id: 'task-6',
    name: 'React Native Development',
    projectId: 'project-2',
    startDate: addDays(today, 5),
    endDate: addDays(today, 25),
    status: 'todo'
  },
  {
    id: 'task-7',
    name: 'API Integration',
    projectId: 'project-5',
    startDate: subDays(today, 10),
    endDate: addDays(today, 5),
    status: 'in-progress'
  },
  {
    id: 'task-8',
    name: 'Testing & QA',
    projectId: 'project-5',
    startDate: addDays(today, 5),
    endDate: addDays(today, 20),
    status: 'todo'
  }
];

// Mock Bookings
export const mockBookings: Booking[] = [
  // Alex's bookings
  {
    id: 'booking-1',
    userId: 'user-1',
    projectId: 'project-1',
    taskId: 'task-2',
    startDate: subDays(today, 8),
    endDate: addDays(today, 5),
    hours: 30,
    notes: 'Implementing homepage components'
  },
  {
    id: 'booking-2',
    userId: 'user-1',
    projectId: 'project-5',
    taskId: 'task-7',
    startDate: subDays(today, 3),
    endDate: addDays(today, 2),
    hours: 16,
    notes: 'Working on API integration'
  },
  
  // Jamie's bookings
  {
    id: 'booking-3',
    userId: 'user-2',
    projectId: 'project-1',
    taskId: 'task-3',
    startDate: subDays(today, 5),
    endDate: addDays(today, 10),
    hours: 40,
    notes: 'Building backend APIs'
  },
  {
    id: 'booking-4',
    userId: 'user-2',
    projectId: 'project-5',
    taskId: 'task-7',
    startDate: subDays(today, 2),
    endDate: addDays(today, 3),
    hours: 20,
    notes: 'API integration support'
  },
  
  // Morgan's bookings
  {
    id: 'booking-5',
    userId: 'user-3',
    projectId: 'project-1',
    taskId: 'task-1',
    startDate: subDays(today, 20),
    endDate: subDays(today, 10),
    hours: 32,
    notes: 'Creating homepage designs'
  },
  {
    id: 'booking-6',
    userId: 'user-3',
    projectId: 'project-2',
    taskId: 'task-4',
    startDate: subDays(today, 15),
    endDate: subDays(today, 5),
    hours: 40,
    notes: 'Mobile app wireframes'
  },
  {
    id: 'booking-7',
    userId: 'user-3',
    projectId: 'project-2',
    taskId: 'task-5',
    startDate: subDays(today, 5),
    endDate: addDays(today, 10),
    hours: 32,
    notes: 'Mobile app UI design'
  },
  
  // Taylor's bookings
  {
    id: 'booking-8',
    userId: 'user-4',
    projectId: 'project-1',
    startDate: subDays(today, 30),
    endDate: addDays(today, 60),
    hours: 80,
    notes: 'Project management'
  },
  {
    id: 'booking-9',
    userId: 'user-4',
    projectId: 'project-2',
    startDate: subDays(today, 15),
    endDate: addDays(today, 75),
    hours: 120,
    notes: 'Product management'
  },
  
  // Jordan's bookings
  {
    id: 'booking-10',
    userId: 'user-5',
    projectId: 'project-1',
    startDate: addDays(today, 10),
    endDate: addDays(today, 20),
    hours: 20,
    notes: 'Deployment setup'
  },
  {
    id: 'booking-11',
    userId: 'user-5',
    projectId: 'project-5',
    startDate: subDays(today, 10),
    endDate: addDays(today, 20),
    hours: 60,
    notes: 'API infrastructure'
  },
  
  // Casey's bookings
  {
    id: 'booking-12',
    userId: 'user-6',
    projectId: 'project-2',
    taskId: 'task-5',
    startDate: subDays(today, 5),
    endDate: addDays(today, 10),
    hours: 40,
    notes: 'UI design support'
  },
  {
    id: 'booking-13',
    userId: 'user-6',
    projectId: 'project-3',
    startDate: addDays(today, 10),
    endDate: addDays(today, 30),
    hours: 80,
    notes: 'E-commerce UI design'
  }
];

// Mock Time Offs
export const mockTimeOffs: TimeOff[] = [
  {
    id: 'timeoff-1',
    userId: 'user-1',
    startDate: addDays(today, 20),
    endDate: addDays(today, 24),
    type: 'vacation',
    approved: true
  },
  {
    id: 'timeoff-2',
    userId: 'user-3',
    startDate: addDays(today, 15),
    endDate: addDays(today, 19),
    type: 'vacation',
    approved: true
  },
  {
    id: 'timeoff-3',
    userId: 'user-5',
    startDate: addDays(today, 5),
    endDate: addDays(today, 5),
    type: 'sick',
    approved: true
  },
  {
    id: 'timeoff-4',
    userId: 'user-2',
    startDate: addDays(today, 25),
    endDate: addDays(today, 35),
    type: 'vacation',
    approved: false
  },
  // Holiday for everyone
  ...mockUsers.map(user => ({
    id: `holiday-${user.id}`,
    userId: user.id,
    startDate: addDays(today, 40),
    endDate: addDays(today, 40),
    type: 'holiday',
    approved: true
  }))
];
