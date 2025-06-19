import React from 'react';
import { format, addDays, subDays } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useResourceStore } from '@/store/resourceStore';
import { formatDateRange, getWeekDays } from '@/lib/utils';

const CalendarHeader: React.FC = () => {
  const { calendarView, setCalendarView } = useResourceStore();
  const { viewMode, setViewMode } = useResourceStore();
  
  const handlePrevious = () => {
    const newDate = subDays(calendarView.date, calendarView.mode === 'day' ? 1 : calendarView.mode === 'week' ? 7 : 30);
    setCalendarView({ ...calendarView, date: newDate });
  };
  
  const handleNext = () => {
    const newDate = addDays(calendarView.date, calendarView.mode === 'day' ? 1 : calendarView.mode === 'week' ? 7 : 30);
    setCalendarView({ ...calendarView, date: newDate });
  };
  
  const handleToday = () => {
    setCalendarView({ ...calendarView, date: new Date() });
  };
  
  const handleViewModeChange = (value: string) => {
    setViewMode({ type: value as 'team' | 'individual' | 'project' });
  };
  
  const handleCalendarModeChange = (value: string) => {
    setCalendarView({ ...calendarView, mode: value as 'day' | 'week' | 'month' });
  };
  
  const getDateDisplay = () => {
    if (calendarView.mode === 'day') {
      return format(calendarView.date, 'EEEE, MMMM d, yyyy');
    } else if (calendarView.mode === 'week') {
      const weekDays = getWeekDays(calendarView.date);
      return formatDateRange(weekDays[0].date, weekDays[6].date);
    } else {
      // Month view
      return format(calendarView.date, 'MMMM yyyy');
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b bg-white">
      <div className="flex items-center space-x-2 mb-4 md:mb-0">
        <Button variant="outline" size="icon" onClick={handlePrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={handleToday}>
          Today
        </Button>
        <div className="flex items-center ml-2">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span className="font-medium">{getDateDisplay()}</span>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
        <Select value={viewMode.type} onValueChange={handleViewModeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="team">Team View</SelectItem>
            <SelectItem value="individual">Individual View</SelectItem>
            <SelectItem value="project">Project View</SelectItem>
          </SelectContent>
        </Select>
        
        <Tabs value={calendarView.mode} onValueChange={handleCalendarModeChange} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default CalendarHeader;
