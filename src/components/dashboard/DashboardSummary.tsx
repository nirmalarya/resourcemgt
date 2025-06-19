import React from 'react';
import { useResourceStore } from '@/store/resourceStore';
import { Users, Briefcase, Calendar, AlertCircle } from 'lucide-react';

const DashboardSummary: React.FC = () => {
  const { users, projects, assignments } = useResourceStore();
  
  // Calculate active projects
  const activeProjects = projects.filter(project => project.status === 'active').length;
  
  // Calculate total team members
  const totalTeamMembers = users.length;
  
  // Calculate upcoming deadlines (projects ending in the next 30 days)
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  
  const upcomingDeadlines = projects.filter(project => {
    return project.endDate >= today && project.endDate <= thirtyDaysFromNow;
  }).length;
  
  // Calculate resource conflicts (users assigned more than 40 hours per week)
  const resourceConflicts = users.filter(user => {
    const userAssignments = assignments.filter(a => a.userId === user.id);
    
    // Simple check: if a user has multiple active assignments that overlap
    let hasConflict = false;
    
    for (let i = 0; i < userAssignments.length; i++) {
      for (let j = i + 1; j < userAssignments.length; j++) {
        const a1 = userAssignments[i];
        const a2 = userAssignments[j];
        
        // Check if assignments overlap
        if ((a1.startDate <= a2.endDate) && (a1.endDate >= a2.startDate)) {
          // Check if total hours exceed capacity
          if (a1.hoursPerDay + a2.hoursPerDay > 8) {
            hasConflict = true;
            break;
          }
        }
      }
      if (hasConflict) break;
    }
    
    return hasConflict;
  }).length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow flex items-center">
        <div className="rounded-full bg-blue-100 p-3 mr-4">
          <Users className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Team Members</p>
          <h3 className="text-2xl font-bold">{totalTeamMembers}</h3>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow flex items-center">
        <div className="rounded-full bg-green-100 p-3 mr-4">
          <Briefcase className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Active Projects</p>
          <h3 className="text-2xl font-bold">{activeProjects}</h3>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow flex items-center">
        <div className="rounded-full bg-purple-100 p-3 mr-4">
          <Calendar className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Upcoming Deadlines</p>
          <h3 className="text-2xl font-bold">{upcomingDeadlines}</h3>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow flex items-center">
        <div className="rounded-full bg-red-100 p-3 mr-4">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Resource Conflicts</p>
          <h3 className="text-2xl font-bold">{resourceConflicts}</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
