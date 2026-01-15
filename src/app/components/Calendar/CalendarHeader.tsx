import { getMonthName } from '../../../lib/calendarUtils';
import Button from '../UI/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentMonth, onMonthChange }) => {
  const handlePrevMonth = () => {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex flex-col">
        <h2 className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent">
          {getMonthName(currentMonth)}
        </h2>
        <p className="mt-1 text-sm text-gray-400">{currentMonth.getFullYear()}</p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={handlePrevMonth}
          variant="ghost"
          className="flex h-10 w-10 flex-col items-center justify-center rounded-full p-0 transition-all duration-300 hover:bg-white/10"
        >
          <ChevronLeft size={20} className="text-gray-300" />
        </Button>
        <Button
          onClick={handleNextMonth}
          variant="ghost"
          className="flex h-10 w-10 flex-col items-center justify-center rounded-full p-0 transition-all duration-300 hover:bg-white/10"
        >
          <ChevronRight size={20} className="text-gray-300" />
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
