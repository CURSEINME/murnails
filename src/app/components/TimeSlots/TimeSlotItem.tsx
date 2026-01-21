'use client';

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

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
  const isSelected = time === selectedTime;

  const handleSelect = () => onTimeSelect(time);
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(time);
  };

  return (
    <motion.div
      onClick={handleSelect}
      whileTap={{ scale: 0.97 }}
      className={`
        group relative flex cursor-pointer items-center justify-between
        rounded-2xl border px-4 py-3 backdrop-blur-xl transition-all
        ${
          isSelected
            ? 'border-pink-500/60 bg-pink-500/20 shadow-[0_0_25px_rgba(236,72,153,0.45)]'
            : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
        }
      `}
    >
      {/* glow for selected */}
      {isSelected && (
        <div className="pointer-events-none absolute -inset-2 rounded-2xl bg-pink-500/30 blur-xl" />
      )}

      <span
        className={`
          relative z-10 text-sm font-medium tracking-wide
          ${isSelected ? 'text-white' : 'text-white/80'}
        `}
      >
        {time}
      </span>

      {session?.user && (
        <button
          onClick={handleRemove}
          className="
            relative z-10 ml-3 flex h-6 w-6 items-center justify-center
            rounded-full text-white/50 transition
            hover:bg-pink-500/20 hover:text-pink-400
          "
          title="Удалить"
        >
          ×
        </button>
      )}
    </motion.div>
  );
};

export default TimeSlotItem;
