import React, { useState } from 'react';
import { format } from 'date-fns';
import { Event } from '../types';
import { getLunarDate, formatLunarDate } from '../utils/lunarDate';
import { getRokuyo } from '../utils/rokuyo';
import { getMoonPhase, getMoonPhaseEmoji } from '../utils/moonPhase';
import { Calendar as CalendarIcon, X } from 'lucide-react';

interface CalendarDayProps {
  date: Date;
  events: Event[];
  onAddEvent: () => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ date, events, onAddEvent }) => {
  const [showModal, setShowModal] = useState(false);
  const isToday = format(new Date(), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
  const dayOfWeek = date.getDay();
  const isSunday = dayOfWeek === 0;
  const isSaturday = dayOfWeek === 6;
  const lunarDate = getLunarDate(date);
  const rokuyo = getRokuyo(date);
  const moonPhase = getMoonPhase(date);

  const handleDayClick = (e: React.MouseEvent) => {
    if (events.length > 0) {
      e.stopPropagation();
      setShowModal(true);
    } else {
      onAddEvent();
    }
  };

  return (
    <>
      <div 
        onClick={handleDayClick}
        className={`bg-white p-2 h-28 relative hover:bg-[#FFF8E1] transition-colors cursor-pointer
          ${isSunday ? 'bg-red-50' : isSaturday ? 'bg-blue-50' : ''}`}
      >
        <div className="flex flex-col items-start">
          <span
            className={`text-sm font-semibold mb-0.5 ${
              isToday
                ? 'bg-[#FFB74D] text-white w-6 h-6 flex items-center justify-center rounded-full'
                : isSunday
                ? 'text-red-600'
                : isSaturday
                ? 'text-blue-600'
                : 'text-[#5D4037]'
            }`}
          >
            {format(date, 'd')}
          </span>
          <div className="flex flex-col items-start space-y-0.5">
            <span className="text-[10px] text-[#8D6E63]">
              {formatLunarDate(lunarDate)}
            </span>
            <span className="text-[10px] text-[#8D6E63]">
              {rokuyo}
            </span>
            <span className="text-[10px]">
              {getMoonPhaseEmoji(moonPhase)}
            </span>
          </div>
        </div>

        {events.length > 0 && (
          <div className="absolute bottom-1 left-1 right-1 flex justify-center">
            <div className={`
              w-5 h-5 rounded-full flex items-center justify-center
              ${events.length > 2 
                ? 'bg-[#EF5350] text-white' 
                : events.length > 1 
                  ? 'bg-[#FFB74D] text-white'
                  : 'bg-[#FFF3E0] text-[#FFB74D]'
              } 
              text-xs font-medium shadow-sm
            `}>
              {events.length}
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-[#FFE082]">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 text-[#FFB74D] mr-2" />
                <h3 className="text-lg font-semibold text-[#5D4037]">
                  {format(date, 'M月d日')}の予定
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-[#FFF8E1] rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-[#8D6E63]" />
              </button>
            </div>
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-3">
                {events.map((event, index) => (
                  <div
                    key={index}
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
            <div className="p-4 border-t border-[#FFE082]">
              <button
                onClick={() => {
                  setShowModal(false);
                  onAddEvent();
                }}
                className="w-full py-2 bg-[#FFB74D] text-white rounded-lg hover:bg-[#FFA726] transition-colors"
              >
                新しい予定を追加
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarDay;