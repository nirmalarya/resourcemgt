import React from 'react';
import { useResourceStore } from '@/store/resourceStore';
import { addWeeks, format, startOfWeek } from 'date-fns';

const CapacityOverview: React.FC = () => {
  const { users, getUserUtilization } = useResourceStore();
  
  // Get current week and next 3 weeks
  const today = new Date();
  const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
  
  const weeks = [
    {
      start: currentWeekStart,
      end: addWeeks(currentWeekStart, 1),
      label: `This Week (${format(currentWeekStart, 'MMM d')})`
    },
    {
      start: addWeeks(currentWeekStart, 1),
      end: addWeeks(currentWeekStart, 2),
      label: `Next Week (${format(addWeeks(currentWeekStart, 1), 'MMM d')})`
    },
    {
      start: addWeeks(currentWeekStart, 2),
      end: addWeeks(currentWeekStart, 3),
      label: `In 2 Weeks (${format(addWeeks(currentWeekStart, 2), 'MMM d')})`
    },
    {
      start: addWeeks(currentWeekStart, 3),
      end: addWeeks(currentWeekStart, 4),
      label: `In 3 Weeks (${format(addWeeks(currentWeekStart, 3), 'MMM d')})`
    }
  ];
  
  // Get utilization color based on percentage
  const getUtilizationColor = (percentage: number) => {
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Team Capacity Overview</h3>
      
      <div className="space-y-6">
        {users.map(user => (
          <div key={user.id} className="space-y-2">
            <div className="flex items-center">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <h4 className="font-medium">{user.name}</h4>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              {weeks.map((week, index) => {
                const utilization = getUserUtilization(user.id, week.start, week.end);
                return (
                  <div key={index} className="flex items-center text-sm">
                    <span className="w-24 text-gray-500">{week.label}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getUtilizationColor(utilization)}`}
                        style={{ width: `${utilization}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 w-10 text-right">{utilization}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CapacityOverview;
