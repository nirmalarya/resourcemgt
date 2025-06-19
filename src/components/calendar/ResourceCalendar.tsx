import React, { useState } from 'react';
import { useResourceStore } from '@/store/resourceStore';
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ResourceCalendar: React.FC = () => {
  const { users, projects, assignments } = useResourceStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Calculate week start (Monday) and days of the week
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  // Navigation functions
  const goToPreviousWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const goToNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());
  
  // Get assignments for a specific user and day
  const getUserAssignmentsForDay = (userId: string, day: Date) => {
    return assignments.filter(assignment => 
      assignment.userId === userId &&
      day >= assignment.startDate &&
      day <= assignment.endDate
    );
  };
  
  // Format date for display
  const formatDay = (date: Date) => {
    const today = new Date();
    const isToday = isSameDay(date, today);
    
    return (
      <div className={`text-center ${isToday ? 'bg-blue-100 rounded-md' : ''}`}>
        <p className="text-xs text-gray-500">{format(date, 'EEE')}</p>
        <p className={`text-sm font-medium ${isToday ? 'text-blue-700' : ''}`}>{format(date, 'd')}</p>
      </div>
    );
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Resource Calendar</h2>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={goToPreviousWeek}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={goToToday}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Today
          </button>
          
          <button 
            onClick={goToNextWeek}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
          
          <span className="text-lg font-medium ml-2">
            {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
          </span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-[200px_repeat(7,1fr)] border-b">
          <div className="p-3 border-r"></div>
          {days.map((day, index) => (
            <div key={index} className="p-3 text-center border-r last:border-r-0">
              {formatDay(day)}
            </div>
          ))}
        </div>
        
        {users.map((user) => (
          <div key={user.id} className="grid grid-cols-[200px_repeat(7,1fr)] border-b last:border-b-0">
            <div className="p-3 border-r flex items-center">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <p className="font-medium text-sm">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            </div>
            
            {days.map((day, dayIndex) => {
              const dayAssignments = getUserAssignmentsForDay(user.id, day);
              
              return (
                <div key={dayIndex} className="p-2 border-r last:border-r-0 min-h-[80px]">
                  {dayAssignments.map((assignment) => {
                    const project = projects.find(p => p.id === assignment.projectId);
                    if (!project) return null;
                    
                    return (
                      <div 
                        key={assignment.id}
                        className="text-xs p-1 mb-1 rounded"
                        style={{ 
                          backgroundColor: `${project.color}20`, // 20% opacity
                          borderLeft: `3px solid ${project.color}`
                        }}
                      >
                        <div className="font-medium">{project.name}</div>
                        <div>{assignment.hoursPerDay}h</div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceCalendar;
