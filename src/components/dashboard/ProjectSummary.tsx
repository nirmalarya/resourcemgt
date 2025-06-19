import React from 'react';
import { useResourceStore } from '@/store/resourceStore';
import { format } from 'date-fns';

const ProjectSummary: React.FC = () => {
  const { projects, getProjectAssignments, users } = useResourceStore();
  
  // Get active projects
  const activeProjects = projects.filter(project => project.status === 'active');
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Active Projects</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timeline
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activeProjects.map(project => {
              const assignments = getProjectAssignments(project.id);
              const assignedUserIds = [...new Set(assignments.map(a => a.userId))];
              const assignedUsers = users.filter(user => assignedUserIds.includes(user.id));
              
              return (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: project.color }}></div>
                      <div className="text-sm font-medium text-gray-900">{project.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{project.client}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(project.startDate, 'MMM d, yyyy')} - {format(project.endDate, 'MMM d, yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex -space-x-2">
                      {assignedUsers.slice(0, 3).map(user => (
                        <img 
                          key={user.id}
                          className="w-8 h-8 rounded-full border-2 border-white"
                          src={user.avatar}
                          alt={user.name}
                          title={user.name}
                        />
                      ))}
                      {assignedUsers.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                          +{assignedUsers.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectSummary;
