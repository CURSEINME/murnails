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
  onTimeSelect,
  selectedTime,
}) => {
  const { data: session } = useSession();
  const handleSelect = () => onTimeSelect(time);
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(time);
  };

  const isSelected = time === selectedTime;

  return (
    <div
      onClick={handleSelect}
      className={`flex cursor-pointer items-center justify-between rounded-xl border border-white/20 p-3 backdrop-blur-xl transition-all ${isSelected ? 'bg-pink-500/40 shadow-[0_0_15px_rgba(236,72,153,0.5)]' : 'bg-white/10 hover:bg-white/20'} `}
    >
      <span className="font-medium text-gray-100">{time}</span>
      {session?.user && (
        <button
          onClick={handleRemove}
          className="text-lg font-bold text-pink-400 transition hover:text-pink-300"
          title="Удалить"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default TimeSlotItem;
