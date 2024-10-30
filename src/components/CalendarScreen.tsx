import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { ja } from 'date-fns/locale';
import EventModal from './EventModal';
import CalendarDay from './CalendarDay';
import { Event } from '../types';
import { formatJapaneseEra } from '../utils/dateUtils';

interface CalendarScreenProps {
  events: Event[];
  onAddEvent: (event: Event) => void;
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({ events, onAddEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleAddEventLocal = (event: Event) => {
    onAddEvent(event);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 pb-20">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#FFE082]">
        <div className="p-4 bg-[#FFE082]">
          <div className="flex items-center justify-center mb-6">
            <Calendar className="h-8 w-8 text-[#5D4037] mr-2" />
            <h1 className="text-2xl font-bold text-[#5D4037]">沖縄手帳</h1>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-[#FFD54F] rounded-lg transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-[#5D4037]" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-[#5D4037] text-center">
                {format(currentDate, 'yyyy年 M月', { locale: ja })}
              </h2>
              <p className="text-[#8D6E63] text-center">{formatJapaneseEra(currentDate)}</p>
            </div>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-[#FFD54F] rounded-lg transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-[#5D4037]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 bg-[#FFF3E0]">
          {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
            <div
              key={day}
              className={`py-2 text-center text-sm font-semibold ${
                index === 0 ? 'text-red-600' : 
                index === 6 ? 'text-blue-600' : 
                'text-[#5D4037]'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-[1px] bg-[#FFE0B2]">
          {Array.from({ length: startOfMonth(currentDate).getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="bg-white h-24" />
          ))}
          {days.map((day) => (
            <CalendarDay
              key={day.toISOString()}
              date={day}
              events={events.filter(
                (event) =>
                  format(new Date(event.date), 'yyyy-MM-dd') ===
                  format(day, 'yyyy-MM-dd')
              )}
              onAddEvent={() => {
                setSelectedDate(day);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddEventLocal}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default CalendarScreen;