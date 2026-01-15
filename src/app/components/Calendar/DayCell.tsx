import { DayCellProps } from '@/types/calendar';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const DayCell: React.FC<DayCellProps> = ({ dayInfo, onSelect, hasAvailableSlots }) => {
  if (!dayInfo.date) {
    return <div className="h-10 w-10"></div>;
  }

  const handleClick = () => {
    if (dayInfo.date) {
      onSelect(dayInfo.date);
    }
  };

  const isWeekend = dayInfo.date.getDay() === 0 || dayInfo.date.getDay() === 6;

  return (
    <div className="flex h-10 w-10 items-center justify-center">
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex w-full h-full cursor-pointer items-center justify-center rounded-2xl text-sm font-medium transition-all duration-300 ${
          dayInfo.isToday
            ? 'bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/25'
            : dayInfo.isSelected
              ? 'bg-gradient-to-br from-pink-400/80 to-purple-400/80 text-white shadow-lg shadow-pink-400/25'
              : dayInfo.isCurrentMonth
                ? 'border border-white/10 bg-white/10 text-gray-200 hover:bg-white/20'
                : 'text-gray-500 opacity-40'
        } ${hasAvailableSlots && !dayInfo.isSelected ? 'ring-2 ring-pink-400/50 ring-offset-1 ring-offset-transparent' : ''} ${isWeekend && dayInfo.isCurrentMonth && !dayInfo.isSelected ? 'text-pink-300/80' : ''} hover:shadow-lg hover:shadow-pink-500/10`}
      >
        {dayInfo.date.getDate()}

        {/* Индикатор доступных слотов */}
        {hasAvailableSlots && !dayInfo.isSelected && (
          <div className="absolute -top-1 -right-1 h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-pink-400 to-purple-400"></div>
        )}

        {/* Галочка для выбранной даты */}
        {dayInfo.isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-white"
          >
            <Check size={10} className="text-pink-500" />
          </motion.div>
        )}

        {/* Декоративный блеск для сегодняшнего дня */}
        {dayInfo.isToday && (
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent"></div>
        )}
      </motion.div>
    </div>
  );
};

export default DayCell;
