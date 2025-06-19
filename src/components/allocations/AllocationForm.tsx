import React, { useState } from 'react';
import { Assignment, User, Project } from '@/store/resourceStore';
import { format } from 'date-fns';

interface AllocationFormProps {
  initialData: Assignment | null;
  onSubmit: (assignment: Assignment) => void;
  onCancel: () => void;
  users: User[];
  projects: Project[];
}

const AllocationForm: React.FC<AllocationFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel,
  users,
  projects
}) => {
  const [formData, setFormData] = useState<Omit<Assignment, 'id'>>({
    userId: initialData?.userId || '',
    projectId: initialData?.projectId || '',
    startDate: initialData?.startDate || new Date(),
    endDate: initialData?.endDate || new Date(),
    hoursPerDay: initialData?.hoursPerDay || 8,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'hoursPerDay' ? parseInt(value) : value
    }));
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: new Date(value)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAssignment: Assignment = {
      id: initialData?.id || `assignment-${Date.now()}`,
      ...formData
    };
    
    onSubmit(newAssignment);
  };
  
  const formatDateForInput = (date: Date) => {
    return format(date, 'yyyy-MM-dd');
  };
  
  // Get selected user's capacity
  const selectedUser = users.find(user => user.id === formData.userId);
  const maxHoursPerDay = selectedUser ? Math.min(8, selectedUser.capacity / 5) : 8; // Assuming 5 working days per week
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-medium mb-4">
        {initialData ? 'Edit Allocation' : 'Add New Allocation'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Team Member
          </label>
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Team Member</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name} - {user.role}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project
          </label>
          <select
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Project</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name} - {project.client}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formatDateForInput(formData.startDate)}
            onChange={handleDateChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formatDateForInput(formData.endDate)}
            onChange={handleDateChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hours Per Day
          </label>
          <input
            type="number"
            name="hoursPerDay"
            value={formData.hoursPerDay}
            onChange={handleChange}
            min="1"
            max={maxHoursPerDay}
            step="0.5"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {selectedUser && (
            <p className="text-xs text-gray-500 mt-1">
              Max: {maxHoursPerDay} hours/day (based on {selectedUser.name}'s capacity)
            </p>
          )}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
        >
          {initialData ? 'Update' : 'Add'} Allocation
        </button>
      </div>
    </form>
  );
};

export default AllocationForm;
