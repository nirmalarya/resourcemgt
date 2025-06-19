import React from 'react';
import { useResourceStore } from '@/store/resourceStore';
import { format, addDays } from 'date-fns';
import { BarChart3, Users, FolderKanban, Calendar } from 'lucide-react';
import UtilizationChart from './UtilizationChart';

const Dashboard: React.FC = () => {
  const { users, projects, assignments, getUserUtilization } = useResourceStore();
  
  // Calculate overall team utilization for the current week
  const today = new Date();
  const weekEnd = addDays(today, 6);
  
  const teamUtilization = users.length > 0
    ? users.reduce((sum, user) => sum + getUserUtilization(user.id, today, weekEnd), 0) / users.length
    : 0;
  
  // Get active projects
  const activeProjects = projects.filter(project => project.status === 'active');
  
  // Get upcoming assignments (next 7 days)
  const nextWeek = addDays(today, 7);
  const upcomingAssignments = assignments.filter(
    assignment => assignment.startDate <= nextWeek && assignment.endDate >= today
  );
  
  const getUtilizationColor = (utilization: number) => {
    if (utilization < 50) return 'text-yellow-500';
    if (utilization < 80) return 'text-green-500';
    return 'text-red-500';
  };
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Resource Dashboard</h2>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Team Members</h3>
            <Users className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold">{users.length}</p>
          <p className="text-sm text-gray-500 mt-2">Across {new Set(users.map(u => u.department)).size} departments</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Active Projects</h3>
            <FolderKanban className="text-green-500" />
          </div>
          <p className="text-3xl font-bold">{activeProjects.length}</p>
          <p className="text-sm text-gray-500 mt-2">Out of {projects.length} total projects</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Team Utilization</h3>
            <BarChart3 className="text-purple-500" />
          </div>
          <p className={`text-3xl font-bold ${getUtilizationColor(teamUtilization)}`}>
            {Math.round(teamUtilization)}%
          </p>
          <p className="text-sm text-gray-500 mt-2">Current week average</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Upcoming Allocations</h3>
            <Calendar className="text-orange-500" />
          </div>
          <p className="text-3xl font-bold">{upcomingAssignments.length}</p>
          <p className="text-sm text-gray-500 mt-2">Next 7 days</p>
        </div>
      </div>
      
      {/* Utilization Chart */}
      <UtilizationChart />
      
      {/* Recent Allocations */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Recent Allocations</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Member
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours/Day
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assignments.slice(0, 5).map((assignment) => {
                const user = users.find(u => u.id === assignment.userId);
                const project = projects.find(p => p.id === assignment.projectId);
                
                if (!user || !project) return null;
                
                return (
                  <tr key={assignment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <img className="h-8 w-8 rounded-full" src={user.avatar} alt={user.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: project.color }}
                        ></div>
                        <div className="text-sm text-gray-900">{project.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {format(assignment.startDate, 'MMM d')} - {format(assignment.endDate, 'MMM d, yyyy')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {assignment.hoursPerDay} hours
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
