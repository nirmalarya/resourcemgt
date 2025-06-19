import React from 'react';
import { useDrag } from 'react-dnd';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useResourceStore } from '@/store/resourceStore';
import { Booking, Project } from '@/lib/types';
import { format } from 'date-fns';

interface ResourceBarProps {
  booking: Booking;
}

const ResourceBar: React.FC<ResourceBarProps> = ({ booking }) => {
  const { getProjectById, getUserById, getTaskById } = useResourceStore();
  
  const project = getProjectById(booking.projectId);
  const user = getUserById(booking.userId);
  const task = booking.taskId ? getTaskById(booking.taskId) : undefined;
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BOOKING',
    item: { id: booking.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  
  if (!project || !user) return null;
  
  // Calculate width based on booking duration
  const startDate = new Date(booking.startDate);
  const endDate = new Date(booking.endDate);
  
  // Format dates for display
  const formattedStartDate = format(startDate, 'MMM d');
  const formattedEndDate = format(endDate, 'MMM d');
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          ref={drag}
          className={`resource-bar cursor-grab ${isDragging ? 'dragging' : ''} bg-${project.color}`}
          style={{ 
            opacity: isDragging ? 0.5 : 1,
          }}
        >
          <div className="px-2 text-xs text-white truncate">
            {task ? task.name : project.name}
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <div className="flex justify-between">
            <h4 className="font-medium">{task ? task.name : 'No specific task'}</h4>
            <span className={`px-2 py-0.5 rounded text-xs bg-${project.color} text-white`}>
              {project.name}
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Assigned to:</span>
              <span className="font-medium">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span>{formattedStartDate} - {formattedEndDate}</span>
            </div>
            <div className="flex justify-between">
              <span>Hours:</span>
              <span>{booking.hours}h</span>
            </div>
            {booking.notes && (
              <div className="mt-2 pt-2 border-t">
                <p className="text-xs">{booking.notes}</p>
              </div>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ResourceBar;
