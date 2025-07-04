"use client";

import { useSession } from "next-auth/react";

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
      className={`border border-neutral-700 rounded-lg p-3 flex justify-between items-center bg-neutral-700/70 hover:bg-gray-700 transition-colors
        ${time === selectedTime ? "bg-pink-500" : ""}`}
    >
      <span className="text-gray-200">{time}</span>
      {session?.user && (
        <button
          onClick={handleRemoveTime}
          className="text-pink-500 hover:text-pink-400 text-xl font-bold transition-colors"
          title="Удалить"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default TimeSlotItem;
