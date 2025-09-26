import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import { CalendarProps } from "../../../types/calendar";

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  currentMonth,
  onMonthChange,
  dateSlots
}) => {
  return (
    <div className="bg-neutral-800/40 rounded-xl shadow-xl  p-4 sm:px-6 lg:px-8">
      <CalendarHeader
        currentMonth={currentMonth}
        onMonthChange={onMonthChange}
      />
      <CalendarGrid
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
        dateSlots={dateSlots}
      />
    </div>
  );
};

export default Calendar;
