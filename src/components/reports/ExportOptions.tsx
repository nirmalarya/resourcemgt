import React from 'react';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useResourceStore } from '@/store/resourceStore';
import { downloadCSV } from '@/lib/utils';

const ExportOptions: React.FC = () => {
  const { users, projects, bookings } = useResourceStore();
  
  const handleExportCSV = (type: string) => {
    let data = [];
    let filename = '';
    
    switch (type) {
      case 'team-utilization':
        data = users.map(user => ({
          Name: user.name,
          Role: user.role,
          Department: user.department,
          Capacity: `${user.capacity}h/week`,
          // Add utilization data here
          Utilization: '75%' // This would be calculated dynamically
        }));
        filename = 'team-utilization.csv';
        break;
        
      case 'project-allocation':
        data = projects.map(project => ({
          Project: project.name,
          Client: project.client,
          Status: project.status,
          BudgetHours: project.budget.hours,
          UsedHours: project.budget.used,
          Utilization: `${Math.round((project.budget.used / project.budget.hours) * 100)}%`
        }));
        filename = 'project-allocation.csv';
        break;
        
      case 'bookings':
        data = bookings.map(booking => {
          const user = users.find(u => u.id === booking.userId);
          const project = projects.find(p => p.id === booking.projectId);
          
          return {
            User: user?.name || 'Unknown',
            Project: project?.name || 'Unknown',
            StartDate: booking.startDate.toLocaleDateString(),
            EndDate: booking.endDate.toLocaleDateString(),
            Hours: booking.hours,
            Notes: booking.notes || ''
          };
        });
        filename = 'resource-bookings.csv';
        break;
        
      default:
        return;
    }
    
    downloadCSV(data, filename);
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Export Reports</h3>
      
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <Select defaultValue="team-utilization">
            <SelectTrigger className="w-full md:w-[250px]">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="team-utilization">Team Utilization</SelectItem>
              <SelectItem value="project-allocation">Project Allocation</SelectItem>
              <SelectItem value="bookings">Resource Bookings</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={() => handleExportCSV('team-utilization')}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            
            <Button variant="outline" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          <p>Export your resource data for further analysis or reporting.</p>
          <p>CSV exports can be opened in Excel or Google Sheets.</p>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;
