import React from 'react';
import { useResourceStore } from '@/store/resourceStore';
import { addDays, format, startOfWeek, subWeeks } from 'date-fns';
import Chart from 'react-apexcharts';

const UtilizationChart: React.FC = () => {
  const { users, getUserUtilization } = useResourceStore();
  
  // Get current week and previous 5 weeks
  const today = new Date();
  const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
  
  const weeks = Array.from({ length: 6 }, (_, i) => {
    const weekStart = subWeeks(currentWeekStart, 5 - i);
    return {
      start: weekStart,
      end: addDays(weekStart, 6),
      label: `Week ${format(weekStart, 'MMM d')}`
    };
  });
  
  // Calculate department utilization
  const departments = [...new Set(users.map(user => user.department))];
  
  const departmentData = departments.map(department => {
    const departmentUsers = users.filter(user => user.department === department);
    
    const utilizationByWeek = weeks.map(week => {
      let totalUtilization = 0;
      let userCount = 0;
      
      departmentUsers.forEach(user => {
        totalUtilization += getUserUtilization(user.id, week.start, week.end);
        userCount++;
      });
      
      return userCount > 0 ? Math.round(totalUtilization / userCount) : 0;
    });
    
    return {
      name: department,
      data: utilizationByWeek
    };
  });
  
  const chartOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false
      }
    },
    colors: ['#4A89DC', '#37BC9B', '#967ADC', '#DA4453', '#F6BB42'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    xaxis: {
      categories: weeks.map(week => week.label)
    },
    yaxis: {
      min: 0,
      max: 100,
      title: {
        text: 'Utilization %'
      }
    },
    tooltip: {
      y: {
        formatter: function(value: number) {
          return value + '%';
        }
      }
    },
    legend: {
      position: 'top'
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-medium mb-4">Team Utilization Trends</h3>
      
      <Chart 
        options={chartOptions as any}
        series={departmentData}
        type="line"
        height={350}
      />
    </div>
  );
};

export default UtilizationChart;
