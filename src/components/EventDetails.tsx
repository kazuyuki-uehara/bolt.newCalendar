import React, { useState, useRef, useEffect } from 'react';
import { Event } from '../types';
import { Clock, AlignLeft, X } from 'lucide-react';

interface EventDetailsProps {
  event: Event;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsDetailsOpen(false);
      }
    };

    if (isDetailsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDetailsOpen]);

  const toggleDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDetailsOpen(!isDetailsOpen);
  };

  return (
    <div className="relative">
      <div
        onClick={toggleDetails}
        className="text-xs p-1 rounded-lg bg-[#FFF3E0] text-[#5D4037] 
          shadow-sm hover:bg-[#FFE0B2] transition-colors cursor-pointer truncate"
      >
        {event.title}
      </div>
      
      {isDetailsOpen && (
        <div 
          ref={popupRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
            <div className="flex items-center justify-between p-4 border-b border-[#FFE0B2]">
              <h3 className="text-lg font-semibold text-[#5D4037]">予定の詳細</h3>
              <button
                onClick={toggleDetails}
                className="p-1 hover:bg-[#FFF8E1] rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-[#8D6E63]" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-[#8D6E63] mb-1">タイトル</h4>
                <p className="text-[#5D4037] font-medium">{event.title}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-[#8D6E63] mb-1">日時</h4>
                <div className="flex items-center space-x-2 text-[#5D4037]">
                  <Clock className="h-4 w-4 text-[#FFB74D]" />
                  <span>
                    {new Date(event.date).toLocaleString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'long',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
              {event.description && (
                <div>
                  <h4 className="text-sm font-medium text-[#8D6E63] mb-1">詳細</h4>
                  <div className="flex items-start space-x-2">
                    <AlignLeft className="h-4 w-4 text-[#FFB74D] mt-0.5" />
                    <p className="text-[#5D4037] whitespace-pre-wrap">{event.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;