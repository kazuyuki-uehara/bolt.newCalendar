import React, { useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { ja } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Sun, Moon, Waves } from 'lucide-react';
import { getLunarDate, formatLunarDate } from '../utils/lunarDate';
import { formatJapaneseEra } from '../utils/dateUtils';
import { getRokuyo } from '../utils/rokuyo';
import { getMoonPhase, getMoonPhaseEmoji } from '../utils/moonPhase';
import EventModal from './EventModal';
import { Event } from '../types';

interface HomeScreenProps {
  events?: Event[];
  onAddEvent?: (event: Event) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ events = [], onAddEvent = () => {} }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handlePrevDay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };

  const handleNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleAddEventLocal = (event: Event) => {
    onAddEvent(event);
    setIsModalOpen(false);
  };

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i - 3);
    return {
      date,
      lunarDate: getLunarDate(date),
      rokuyo: getRokuyo(date),
      moonPhase: getMoonPhase(date),
    };
  });

  // イベントを日付でグループ化
  const groupedEvents = events.reduce((acc: { [key: string]: Event[] }, event) => {
    const dateKey = format(new Date(event.date), 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#FFF8E1]">
      <div className="bg-[#FFE082] py-4">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold text-[#5D4037]">沖縄手帳</h1>
        </div>
        
        <div className="max-w-2xl mx-auto px-4 mt-2">
          <div className="text-center">
            <div className="text-sm text-[#8D6E63] mb-1">
              {formatJapaneseEra(currentDate)}
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevDay}
                className="p-2 hover:bg-[#FFD54F]/20 rounded-full transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-[#5D4037]" />
              </button>
              <div>
                <div className="text-2xl font-bold text-[#5D4037]">
                  {format(currentDate, 'yyyy年 M月 d日', { locale: ja })}
                </div>
                <div className="text-lg text-[#5D4037]">
                  ({format(currentDate, 'EEEE', { locale: ja })})
                </div>
              </div>
              <button
                onClick={handleNextDay}
                className="p-2 hover:bg-[#FFD54F]/20 rounded-full transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-[#5D4037]" />
              </button>
            </div>
          </div>

          <div className="flex justify-center space-x-4 text-[#5D4037] mt-2">
            <div className="flex items-center">
              <Sun className="h-5 w-5 mr-1 text-[#FFB74D]" />
              出: 7:00 / 没: 18:49
            </div>
            <div className="flex items-center">
              <Moon className="h-5 w-5 mr-1 text-[#FFB74D]" />
              出: 18:00 / 没: 6:00
            </div>
            <div className="flex items-center">
              <Waves className="h-5 w-5 mr-1 text-[#FFB74D]" />
              大潮
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-7 gap-1 p-4">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDayClick(day.date)}
                className={`text-center p-2 rounded-lg ${
                  index === 3
                    ? 'bg-[#FFF3E0] border-2 border-[#FFB74D]'
                    : 'hover:bg-[#FFF8E1]'
                }`}
              >
                <div className={`text-sm ${
                  format(day.date, 'E', { locale: ja }) === '日'
                    ? 'text-red-600'
                    : format(day.date, 'E', { locale: ja }) === '土'
                    ? 'text-blue-600'
                    : 'text-[#8D6E63]'
                }`}>
                  {format(day.date, 'E', { locale: ja })}
                </div>
                <div className={`text-lg font-bold ${
                  index === 3 ? 'text-[#FFB74D]' : 'text-[#5D4037]'
                }`}>
                  {format(day.date, 'd')}
                </div>
                <div className="text-xs text-[#8D6E63]">
                  {formatLunarDate(day.lunarDate)}
                </div>
                <div className="text-xs text-[#8D6E63]">
                  {day.rokuyo}
                </div>
                <div className="text-xs">
                  {getMoonPhaseEmoji(day.moonPhase)}
                </div>
              </button>
            ))}
          </div>

          <div className="border-t border-[#FFE082] p-4">
            <h2 className="text-lg font-bold text-[#5D4037] mb-3 text-center">
              今週の予定
            </h2>
            {Object.keys(groupedEvents).length > 0 ? (
              <div className="space-y-4">
                {days.map((day, index) => {
                  const dateKey = format(day.date, 'yyyy-MM-dd');
                  const dayEvents = groupedEvents[dateKey] || [];
                  
                  if (dayEvents.length === 0) return null;

                  return (
                    <div key={dateKey} className="border-b border-[#FFE082] last:border-b-0">
                      <div className="text-base font-medium text-[#5D4037] mb-2">
                        {format(day.date, 'M月d日(E)', { locale: ja })}
                      </div>
                      <div className="space-y-2 pb-3">
                        {dayEvents.map((event, eventIndex) => (
                          <div
                            key={eventIndex}
                            className="bg-[#FFF8E1] p-3 rounded-lg"
                          >
                            <div className="font-medium text-[#5D4037]">
                              {event.title}
                            </div>
                            {event.description && (
                              <div className="text-sm text-[#8D6E63] mt-1">
                                {event.description}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-4 text-[#8D6E63]">
                予定はありません
              </div>
            )}
          </div>
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

export default HomeScreen;