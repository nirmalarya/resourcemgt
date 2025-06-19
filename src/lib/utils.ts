import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { addDays, format, startOfWeek, endOfWeek, eachDayOfInterval, isWeekend, isSameDay } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getWeekDays(date: Date) {
  const start = startOfWeek(date, { weekStartsOn: 1 })
  const end = endOfWeek(date, { weekStartsOn: 1 })
  
  return eachDayOfInterval({ start, end }).map(day => ({
    date: day,
    dayName: format(day, 'EEE'),
    dayNumber: format(day, 'd'),
    isWeekend: isWeekend(day),
    isToday: isSameDay(day, new Date())
  }))
}

export function getNextWeek(date: Date) {
  return addDays(date, 7)
}

export function getPreviousWeek(date: Date) {
  return addDays(date, -7)
}

export function formatDateRange(startDate: Date, endDate: Date) {
  const sameMonth = startDate.getMonth() === endDate.getMonth()
  const sameYear = startDate.getFullYear() === endDate.getFullYear()
  
  if (sameMonth && sameYear) {
    return `${format(startDate, 'd')} - ${format(endDate, 'd MMM yyyy')}`
  } else if (sameYear) {
    return `${format(startDate, 'd MMM')} - ${format(endDate, 'd MMM yyyy')}`
  } else {
    return `${format(startDate, 'd MMM yyyy')} - ${format(endDate, 'd MMM yyyy')}`
  }
}

export function calculateUtilization(bookedHours: number, availableHours: number) {
  if (availableHours === 0) return 0
  return Math.round((bookedHours / availableHours) * 100)
}

export function getRandomColor() {
  const colors = [
    'project-blue',
    'project-green',
    'project-purple',
    'project-red',
    'project-orange',
    'project-yellow',
    'project-teal',
    'project-pink'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export function downloadCSV(data: any[], filename: string) {
  if (!data.length) return
  
  const headers = Object.keys(data[0])
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const cell = row[header]
        return typeof cell === 'string' ? `"${cell.replace(/"/g, '""')}"` : cell
      }).join(',')
    )
  ]
  
  const csvContent = csvRows.join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
