import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import { CalendarProps } from '../../../types/calendar';

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  currentMonth,
  onMonthChange,
  dateSlots,
}) => {
  return (
    <div className="relative h-full">
      {/* Основной контейнер календаря */}
      <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200/20 bg-white/10 p-6 sm:p-8">
        {/* Декоративный градиентный фон */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/5 to-purple-500/5"></div>

        {/* Контент */}
        <div className="relative z-10 flex h-full flex-col">
          <CalendarHeader currentMonth={currentMonth} onMonthChange={onMonthChange} />
          <div className="flex flex-1 items-center justify-center">
            <CalendarGrid
              currentMonth={currentMonth}
              selectedDate={selectedDate}
              onDateSelect={onDateSelect}
              dateSlots={dateSlots}
            />
          </div>
        </div>

        {/* Декоративные элементы */}
        <div className="absolute top-4 right-4 h-20 w-20 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-400/20 blur-2xl"></div>
        <div className="absolute bottom-4 left-4 h-16 w-16 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-xl"></div>
      </div>
    </div>
  );
};

export default Calendar;
