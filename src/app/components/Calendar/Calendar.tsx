import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import { CalendarProps } from "../../../types/calendar";

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  currentMonth,
  onMonthChange,
}) => {
  return (
    <div className="">
      <CalendarHeader
        currentMonth={currentMonth}
        onMonthChange={onMonthChange}
      />
      <CalendarGrid
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
      />
    </div>
  );
};

export default Calendar;
