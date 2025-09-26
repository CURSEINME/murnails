'use client';

import { useSession } from 'next-auth/react';

interface TimeSlotItemProps {
  time: string;
  onRemove: (time: string) => void;
  onTimeSelect: (time: string) => void;
  selectedTime: string | null;
}

const TimeSlotItem: React.FC<TimeSlotItemProps> = ({
  time,
  onRemove,
  selectedTime,
  onTimeSelect,
}) => {
  const { data: session } = useSession();

  const handleSelectTime = () => {
    onTimeSelect(time);
  };
  const handleRemoveTime = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(time);
  };
  return (
    <div
      onClick={handleSelectTime}
      className={`flex items-center justify-between rounded-lg border border-neutral-700 bg-neutral-700/70 p-3 transition-colors hover:bg-gray-700 ${time === selectedTime ? 'bg-pink-500' : ''}`}
    >
      <span className="text-gray-200">{time}</span>
      {session?.user && (
        <button
          onClick={handleRemoveTime}
          className="text-xl font-bold text-pink-500 transition-colors hover:text-pink-400"
          title="Удалить"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default TimeSlotItem;
