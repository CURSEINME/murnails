import { motion } from 'framer-motion';
import { Clock, X } from 'lucide-react';

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
  const isSelected = time === selectedTime;

  return (
    <motion.div
      onClick={() => onTimeSelect(time)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative cursor-pointer rounded-2xl p-2 transition-all duration-300 ${
        isSelected
          ? 'border-2 border-pink-400/50 bg-gradient-to-r from-pink-500/30 to-purple-500/30 shadow-lg shadow-pink-500/20'
          : 'border-2 border-white/20 bg-white/10 hover:border-pink-400/30 hover:bg-white/15'
      }`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Clock size={16} className={`${isSelected ? 'text-pink-300' : 'text-gray-400'}`} />
          <span className={`font-medium ${isSelected ? 'text-white' : 'text-gray-200'}`}>
            {time}
          </span>
        </div>

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(time);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="rounded-lg p-1 transition-opacity duration-200 hover:bg-red-500/20"
          title="Удалить слот"
        >
          <X size={16} className="text-red-400 hover:text-red-300" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TimeSlotItem;
