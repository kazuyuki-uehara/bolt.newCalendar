import React, { useState } from 'react';
import { format } from 'date-fns';
import { X, Calendar as CalendarIcon, Type, AlignLeft } from 'lucide-react';
import { Event } from '../types';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: Event) => void;
  selectedDate: Date | null;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  selectedDate,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen || !selectedDate) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      title,
      description,
      date: selectedDate.toISOString(),
    });
    setTitle('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center p-4 border-b border-[#FFE0B2]">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-[#FFB74D]" />
            <h3 className="text-lg font-semibold text-[#5D4037]">
              予定を追加 - {format(selectedDate, 'yyyy年MM月dd日')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#FFF8E1] rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-[#8D6E63]" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="title" className="flex items-center text-sm font-medium text-[#8D6E63] mb-1">
              <Type className="h-4 w-4 mr-2" />
              タイトル
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#FFE0B2] focus:ring-2 focus:ring-[#FFB74D] focus:border-[#FFB74D] transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="flex items-center text-sm font-medium text-[#8D6E63] mb-1">
              <AlignLeft className="h-4 w-4 mr-2" />
              詳細
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-[#FFE0B2] focus:ring-2 focus:ring-[#FFB74D] focus:border-[#FFB74D] transition-colors"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[#8D6E63] hover:bg-[#FFF8E1] rounded-lg transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#FFB74D] 
                rounded-lg transition-all hover:shadow-lg hover:bg-[#FFA726]"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;