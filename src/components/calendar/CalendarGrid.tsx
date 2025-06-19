import React from 'react';
import { format, isSameDay, isWeekend } from 'date-fns';
import { useDrop } from 'react-dnd';
import { useResourceStore } from '@/store/resourceStore';
import { getWeekDays } from '@/lib/utils';
import ResourceBar from './ResourceBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const CalendarGrid: React.FC = () => {
  const { 
    users, 
    calendarView, 
    viewMode,
    getUserBookings,
    getUserAvailability,
    moveBooking
  } = useResourceStore();
  
  const weekDays = getWeekDays(calendarView.date);
  
  // Handle booking drop
  const handleDrop = (userId: string, date: Date, bookingId: string) => {
    const booking = useResourceStore.getState().getBookingById(bookingId);
    if (!booking) return;
    
    // Calculate the difference in days between the original start date and the drop date
    const diffDays = Math.floor((date.getTime() - booking.startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate new start and end dates
    const newStartDate = new Date(booking.startDate);
    newStartDate.setDate(newStartDate.getDate() + diffDays);
    
    const newEndDate = new Date(booking.endDate);
    newEndDate.setDate(newEndDate.getDate() + diffDays);
    
    // Update the booking
    moveBooking(bookingId, newStartDate, newEndDate);
  };
  
  return (
    <div className="overflow-auto">
      <div className="calendar-grid min-w-[800px]">
        {/* Header row with dates */}
        <div className="calendar-sidebar bg-gray-100 p-4 font-medium">
          Team Members
        </div>
        {weekDays.map((day) => (
          <div 
            key={day.date.toISOString()} 
            className={`calendar-header p-2 text-center border-l ${
              day.isWeekend ? 'bg-gray-50' : 'bg-gray-100'
            } ${day.isToday ? 'font-bold text-blue-600' : ''}`}
          >
            <div>{day.dayName}</div>
            <div className={`text-lg ${day.isToday ? 'bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto' : ''}`}>
              {day.dayNumber}
            </div>
          </div>
        ))}
        
        {/* User rows */}
        {users.map((user) => (
          <React.Fragment key={user.id}>
            {/* User name cell */}
            <div className="calendar-sidebar p-2 border-t flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm">{user.name}</div>
                <div className="text-xs text-gray-500">{user.role}</div>
              </div>
            </div>
            
            {/* Day cells for this user */}
            {weekDays.map((day) => {
              // Get user's bookings for this day
              const bookings = getUserBookings(
                user.id, 
                day.date, 
                day.date
              ).filter(booking => 
                isSameDay(new Date(booking.startDate), day.date) || 
                isSameDay(new Date(booking.endDate), day.date) ||
                (new Date(booking.startDate) <= day.date && new Date(booking.endDate) >= day.date)
              );
              
              // Get availability for this day
              const availability = getUserAvailability(user.id, day.date);
              const isOverallocated = availability.booked > availability.available;
              
              // Set up drop target
              const [{ isOver }, drop] = useDrop(() => ({
                accept: 'BOOKING',
                drop: (item: { id: string }) => handleDrop(user.id, day.date, item.id),
                collect: (monitor) => ({
                  isOver: !!monitor.isOver(),
                }),
              }));
              
              return (
                <div 
                  ref={drop}
                  key={day.date.toISOString()} 
                  className={`p-1 border-t border-l min-h-[80px] ${
                    day.isWeekend ? 'bg-gray-50' : 'bg-white'
                  } ${isOver ? 'drop-target-active' : ''} ${
                    isOverallocated ? 'bg-red-50' : ''
                  }`}
                >
                  {/* Availability indicator */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className={`text-xs mb-1 px-1 rounded ${
                          isOverallocated 
                            ? 'bg-red-100 text-red-800' 
                            : availability.remaining < 2
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {availability.booked}/{availability.available}h
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Booked: {availability.booked}h</p>
                        <p>Available: {availability.available}h</p>
                        <p>Remaining: {availability.remaining}h</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  {/* Bookings */}
                  {bookings.map(booking => (
                    <ResourceBar key={booking.id} booking={booking} />
                  ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
