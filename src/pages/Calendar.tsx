import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const events = [
  { date: '2024-03-10', title: 'Math Exam', time: '10:00 AM - 12:00 PM' },
  { date: '2024-03-15', title: 'Project Presentation', time: '1:00 PM - 2:30 PM' },
  { date: '2024-03-20', title: 'Chemistry Lab', time: '9:00 AM - 11:00 AM' },
  { date: '2024-03-25', title: 'Group Study Session', time: '3:00 PM - 5:00 PM' },
];

function getEventsForDate(date:string) {
  return events.filter(event => event.date === date);
}

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderDays = () => {
    const days = [];
    // Fill in blanks for days from the previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }
    // Populate days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayEvents = getEventsForDate(date);
      days.push(
        <div key={i} className="p-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <div className="text-center font-medium">{i}</div>
          {dayEvents.map((event, index) => (
            <div key={index} className="mt-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded p-1">
              {event.title}
            </div>
          ))}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h1>
        <CalendarIcon className="text-blue-600" size={24} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-semibold">{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
          <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {renderDays()}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex-1">
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{event.time}</p>
              </div>
              <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/40 rounded-full">
                {new Date(event.date).toLocaleDateString('default', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
