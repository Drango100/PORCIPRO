import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = ({ activities = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const endDate = new Date(lastDay);
  endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));
  
  const days = [];
  const currentDay = new Date(startDate);
  
  while (currentDay <= endDate) {
    days.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }
  
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  const hasActivity = (date) => {
    return activities.some(activity => 
      activity.date.toDateString() === date.toDateString()
    );
  };
  
  const getActivitiesForDate = (date) => {
    return activities.filter(activity => 
      activity.date.toDateString() === date.toDateString()
    );
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'monta':
        return 'bg-blue-500';
      case 'nacimiento':
        return 'bg-green-500';
      case 'vacunacion':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900">
          {monthNames[month]} {year}
        </h2>
        
        <button 
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-4">
        {dayNames.map(day => (
          <div key={day} className="p-3 text-center font-semibold text-gray-600 bg-gray-50 rounded-lg">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isCurrentMonth = day.getMonth() === month;
          const isToday = day.toDateString() === today.toDateString();
          const hasActivities = hasActivity(day);
          const dayActivities = getActivitiesForDate(day);
          
          return (
            <div
              key={index}
              className={`
                p-3 min-h-[80px] border rounded-lg cursor-pointer transition-all duration-300
                ${!isCurrentMonth ? 'text-gray-400 bg-gray-50' : 'bg-white hover:bg-gray-50'}
                ${isToday ? 'bg-primary-500 text-white hover:bg-primary-600' : ''}
                ${hasActivities && !isToday ? 'bg-primary-50 border-primary-200' : 'border-gray-200'}
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`font-semibold ${isToday ? 'text-white' : 'text-gray-900'}`}>
                  {day.getDate()}
                </span>
                {hasActivities && !isToday && (
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                )}
              </div>
              
              {dayActivities.length > 0 && (
                <div className="space-y-1">
                  {dayActivities.slice(0, 2).map((activity, idx) => (
                    <div 
                      key={idx} 
                      className={`
                        text-xs px-2 py-1 rounded-md truncate
                        ${isToday ? 'bg-white text-primary-600' : `${getActivityColor(activity.type)} text-white`}
                      `}
                      title={activity.title}
                    >
                      {activity.title.substring(0, 12)}...
                    </div>
                  ))}
                  {dayActivities.length > 2 && (
                    <div className={`text-xs ${isToday ? 'text-white' : 'text-gray-500'}`}>
                      +{dayActivities.length - 2} más
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;