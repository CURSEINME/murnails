import { DayCellProps } from "@/types/calendar";
import { motion } from "framer-motion";

const DayCell: React.FC<DayCellProps> = ({
  dayInfo,
  onSelect,
  hasAvailableSlots,
}) => {
  if (!dayInfo.date) {
    return <div className="h-10 w-10" />;
  }

  const handleClick = () => {
    if (dayInfo.date) {
      onSelect(dayInfo.date);
    }
  };

  const isDisabled = !dayInfo.isCurrentMonth;

  return (
    <div className="flex h-10 w-10 items-center justify-center">
      <motion.button
        type="button"
        onClick={handleClick}
        disabled={isDisabled}
        whileTap={!isDisabled ? { scale: 0.9 } : undefined}
        className={`
          relative flex h-9 w-9 items-center justify-center rounded-full
          text-sm font-medium transition-all outline-none
          ${
            dayInfo.isSelected
              ? 'bg-pink-500 text-white shadow-[0_0_18px_rgba(236,72,153,0.55)]'
              : dayInfo.isToday
              ? 'border border-pink-500/50 text-pink-400'
              : 'text-white/70'
          }
          ${
            isDisabled
              ? 'cursor-default text-white/25'
              : 'cursor-pointer hover:bg-white/10'
          }
        `}
      >
        {/* availability dot */}
        {hasAvailableSlots && !dayInfo.isSelected && !isDisabled && (
          <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-pink-400" />
        )}

        {dayInfo.date.getDate()}
      </motion.button>
    </div>
  );
};

export default DayCell;
