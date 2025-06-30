import { getMonthName } from "../../../lib/calendarUtils";
import Button from "../UI/Button";

interface CalendarHeaderProps {
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  onMonthChange,
}) => {
  const handlePrevMonth = () => {
    onMonthChange(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    onMonthChange(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">{getMonthName(currentMonth)}</h2>
      <div className="flex space-x-2">
        <Button onClick={handlePrevMonth} variant="secondary">
          &lt;
        </Button>
        <Button onClick={handleNextMonth} variant="secondary">
          &gt;
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
