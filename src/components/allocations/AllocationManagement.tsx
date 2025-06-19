import React, { useState } from 'react';
import { useResourceStore } from '@/store/resourceStore';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import AllocationForm from './AllocationForm';
import { Assignment } from '@/store/resourceStore';
import { format } from 'date-fns';

const AllocationManagement: React.FC = () => {
  const { assignments, users, projects, addAssignment, updateAssignment, removeAssignment } = useResourceStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  
  const handleAddAssignment = (assignment: Assignment) => {
    if (editingAssignment) {
      updateAssignment(editingAssignment.id, assignment);
    } else {
      addAssignment(assignment);
    }
    setIsFormOpen(false);
    setEditingAssignment(null);
  };
  
  const handleEditClick = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setIsFormOpen(true);
  };
  
  const handleDeleteClick = (id: string) => {
    removeAssignment(id);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Resource Allocation</h2>
        <button
          onClick={() => {
            setEditingAssignment(null);
            setIsFormOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Add Allocation
        </button>
      </div>
      
      {isFormOpen && (
        <div className="mb-6 bg-white p-6 rounded-lg shadow">
          <AllocationForm 
            initialData={editingAssignment} 
            onSubmit={handleAddAssignment} 
            onCancel={() => setIsFormOpen(false)} 
            users={users}
            projects={projects}
          />
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
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
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assignments.map((assignment) => {
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
                        <div className="text-xs text-gray-500">{user.role}</div>
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
                      {format(assignment.startDate, 'MMM d, yyyy')} - {format(assignment.endDate, 'MMM d, yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {assignment.hoursPerDay} hours
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleEditClick(assignment)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(assignment.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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

export default AllocationManagement;
