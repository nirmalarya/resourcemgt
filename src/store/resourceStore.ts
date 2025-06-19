import { create } from 'zustand';
import { addDays, differenceInDays, eachDayOfInterval, isSameDay } from 'date-fns';

// Define types
export interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  capacity: number;
  assignments: string[]; // IDs of assignments
}

export interface Project {
  id: string;
  name: string;
  client: string;
  startDate: Date;
  endDate: Date;
  status: 'planned' | 'active' | 'completed';
  color: string;
}

export interface Assignment {
  id: string;
  userId: string;
  projectId: string;
  startDate: Date;
  endDate: Date;
  hoursPerDay: number;
}

interface ResourceState {
  users: User[];
  projects: Project[];
  assignments: Assignment[];
  
  // User actions
  addUser: (user: User) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  removeUser: (id: string) => void;
  
  // Project actions
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  
  // Assignment actions
  addAssignment: (assignment: Assignment) => void;
  updateAssignment: (id: string, assignment: Partial<Assignment>) => void;
  removeAssignment: (id: string) => void;
  
  // Utility functions
  getUserUtilization: (userId: string, startDate: Date, endDate: Date) => number;
  getProjectUtilization: (projectId: string) => number;
}

// Sample data
const sampleUsers: User[] = [
  {
    id: 'user-1',
    name: 'Alex Johnson',
    role: 'UX Designer',
    department: 'Design',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    capacity: 40,
    assignments: ['assignment-1']
  },
  {
    id: 'user-2',
    name: 'Sarah Miller',
    role: 'Frontend Developer',
    department: 'Engineering',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    capacity: 40,
    assignments: ['assignment-2']
  },
  {
    id: 'user-3',
    name: 'Michael Chen',
    role: 'Product Manager',
    department: 'Product',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
    capacity: 40,
    assignments: ['assignment-3']
  },
  {
    id: 'user-4',
    name: 'Emily Rodriguez',
    role: 'Backend Developer',
    department: 'Engineering',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    capacity: 40,
    assignments: []
  }
];

const sampleProjects: Project[] = [
  {
    id: 'project-1',
    name: 'Website Redesign',
    client: 'Acme Corp',
    startDate: new Date(2023, 10, 1),
    endDate: new Date(2023, 11, 15),
    status: 'active',
    color: '#4A89DC'
  },
  {
    id: 'project-2',
    name: 'Mobile App Development',
    client: 'TechStart',
    startDate: new Date(2023, 9, 15),
    endDate: new Date(2024, 1, 28),
    status: 'active',
    color: '#37BC9B'
  },
  {
    id: 'project-3',
    name: 'Brand Refresh',
    client: 'Global Retail',
    startDate: new Date(2023, 11, 1),
    endDate: new Date(2024, 0, 31),
    status: 'planned',
    color: '#967ADC'
  }
];

const sampleAssignments: Assignment[] = [
  {
    id: 'assignment-1',
    userId: 'user-1',
    projectId: 'project-1',
    startDate: new Date(2023, 10, 1),
    endDate: new Date(2023, 10, 15),
    hoursPerDay: 6
  },
  {
    id: 'assignment-2',
    userId: 'user-2',
    projectId: 'project-2',
    startDate: new Date(2023, 10, 1),
    endDate: new Date(2023, 10, 30),
    hoursPerDay: 8
  },
  {
    id: 'assignment-3',
    userId: 'user-3',
    projectId: 'project-1',
    startDate: new Date(2023, 10, 15),
    endDate: new Date(2023, 11, 15),
    hoursPerDay: 4
  }
];

// Create the store
export const useResourceStore = create<ResourceState>((set, get) => ({
  users: sampleUsers,
  projects: sampleProjects,
  assignments: sampleAssignments,
  
  // User actions
  addUser: (user) => set((state) => ({
    users: [...state.users, user]
  })),
  
  updateUser: (id, updatedUser) => set((state) => ({
    users: state.users.map(user => 
      user.id === id ? { ...user, ...updatedUser } : user
    )
  })),
  
  removeUser: (id) => set((state) => ({
    users: state.users.filter(user => user.id !== id),
    assignments: state.assignments.filter(assignment => assignment.userId !== id)
  })),
  
  // Project actions
  addProject: (project) => set((state) => ({
    projects: [...state.projects, project]
  })),
  
  updateProject: (id, updatedProject) => set((state) => ({
    projects: state.projects.map(project => 
      project.id === id ? { ...project, ...updatedProject } : project
    )
  })),
  
  removeProject: (id) => set((state) => ({
    projects: state.projects.filter(project => project.id !== id),
    assignments: state.assignments.filter(assignment => assignment.projectId !== id)
  })),
  
  // Assignment actions
  addAssignment: (assignment) => set((state) => {
    // Add assignment ID to user's assignments array
    const updatedUsers = state.users.map(user => 
      user.id === assignment.userId 
        ? { ...user, assignments: [...user.assignments, assignment.id] } 
        : user
    );
    
    return {
      assignments: [...state.assignments, assignment],
      users: updatedUsers
    };
  }),
  
  updateAssignment: (id, updatedAssignment) => set((state) => {
    // If user is changed, update assignments arrays for both old and new users
    const oldAssignment = state.assignments.find(a => a.id === id);
    let updatedUsers = [...state.users];
    
    if (oldAssignment && updatedAssignment.userId && oldAssignment.userId !== updatedAssignment.userId) {
      // Remove from old user
      updatedUsers = updatedUsers.map(user => 
        user.id === oldAssignment.userId 
          ? { ...user, assignments: user.assignments.filter(aId => aId !== id) } 
          : user
      );
      
      // Add to new user
      updatedUsers = updatedUsers.map(user => 
        user.id === updatedAssignment.userId 
          ? { ...user, assignments: [...user.assignments, id] } 
          : user
      );
    }
    
    return {
      assignments: state.assignments.map(assignment => 
        assignment.id === id ? { ...assignment, ...updatedAssignment } : assignment
      ),
      users: updatedUsers
    };
  }),
  
  removeAssignment: (id) => set((state) => {
    const assignment = state.assignments.find(a => a.id === id);
    
    // Remove assignment ID from user's assignments array
    const updatedUsers = assignment 
      ? state.users.map(user => 
          user.id === assignment.userId 
            ? { ...user, assignments: user.assignments.filter(aId => aId !== id) } 
            : user
        )
      : state.users;
    
    return {
      assignments: state.assignments.filter(a => a.id !== id),
      users: updatedUsers
    };
  }),
  
  // Utility functions
  getUserUtilization: (userId, startDate, endDate) => {
    const { assignments, users } = get();
    const user = users.find(u => u.id === userId);
    
    if (!user) return 0;
    
    // Get all days in the date range
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const workingDays = days.filter(day => {
      const dayOfWeek = day.getDay();
      return dayOfWeek !== 0 && dayOfWeek !== 6; // Exclude weekends (0 = Sunday, 6 = Saturday)
    });
    
    if (workingDays.length === 0) return 0;
    
    // Calculate total capacity for the period (8 hours per working day)
    const totalCapacity = workingDays.length * 8;
    
    // Calculate allocated hours for the user in this period
    let allocatedHours = 0;
    
    user.assignments.forEach(assignmentId => {
      const assignment = assignments.find(a => a.id === assignmentId);
      if (!assignment) return;
      
      // Check if assignment overlaps with the date range
      const assignmentStart = assignment.startDate;
      const assignmentEnd = assignment.endDate;
      
      // For each working day, check if it falls within the assignment period
      workingDays.forEach(day => {
        if (day >= assignmentStart && day <= assignmentEnd) {
          allocatedHours += assignment.hoursPerDay;
        }
      });
    });
    
    // Calculate utilization percentage
    const utilization = (allocatedHours / totalCapacity) * 100;
    return Math.min(100, Math.round(utilization)); // Cap at 100%
  },
  
  getProjectUtilization: (projectId) => {
    const { assignments, projects } = get();
    const project = projects.find(p => p.id === projectId);
    
    if (!project) return 0;
    
    // Calculate total days in project
    const totalDays = differenceInDays(project.endDate, project.startDate) + 1;
    if (totalDays <= 0) return 0;
    
    // Calculate days with assignments
    const projectAssignments = assignments.filter(a => a.projectId === projectId);
    let assignedDaysCount = 0;
    
    // For each day in the project, check if there's at least one assignment
    for (let d = 0; d < totalDays; d++) {
      const currentDate = addDays(project.startDate, d);
      const hasAssignment = projectAssignments.some(assignment => 
        currentDate >= assignment.startDate && currentDate <= assignment.endDate
      );
      
      if (hasAssignment) {
        assignedDaysCount++;
      }
    }
    
    // Calculate utilization percentage
    return Math.round((assignedDaysCount / totalDays) * 100);
  }
}));
