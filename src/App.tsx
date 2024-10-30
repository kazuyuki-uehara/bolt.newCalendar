import React, { useState, useEffect } from 'react';
import { Calendar, Home } from 'lucide-react';
import CalendarScreen from './components/CalendarScreen';
import HomeScreen from './components/HomeScreen';
import { Event } from './types';

const STORAGE_KEY = 'calendar_events';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [events, setEvents] = useState<Event[]>(() => {
    const savedEvents = localStorage.getItem(STORAGE_KEY);
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const handleAddEvent = (event: Event) => {
    setEvents([...events, event]);
  };

  return (
    <div className="min-h-screen bg-[#FFF8E1]">
      {activeTab === 'home' && <HomeScreen events={events} onAddEvent={handleAddEvent} />}
      {activeTab === 'calendar' && <CalendarScreen events={events} onAddEvent={handleAddEvent} />}

      <div className="fixed bottom-0 left-0 right-0 bg-[#FFE082] border-t border-[#FFD54F]">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-around py-3">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center space-y-1 ${
                activeTab === 'home' ? 'text-[#5D4037]' : 'text-[#8D6E63]'
              }`}
            >
              <Home className="h-6 w-6" />
              <span className="text-xs">ホーム</span>
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex flex-col items-center space-y-1 ${
                activeTab === 'calendar' ? 'text-[#5D4037]' : 'text-[#8D6E63]'
              }`}
            >
              <Calendar className="h-6 w-6" />
              <span className="text-xs">カレンダー</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;