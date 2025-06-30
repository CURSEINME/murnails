import { generateCalendar } from "../../../lib/calendarUtils";
import DayCell from "./DayCell";
import React from "react";

interface CalendarGridProps {
  currentMonth: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  selectedDate,
  onDateSelect,
}) => {
  const calendar = generateCalendar(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    selectedDate
  );

  return (
    <div className="grid grid-cols-7 gap-1 mb-4">
      {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
        <div key={day} className="text-center font-semibold p-2">
          {day}
        </div>
      ))}

      {calendar.map((week, i) => (
        <React.Fragment key={i}>
          {week.map((dayInfo, j) => (
            <DayCell key={j} dayInfo={dayInfo} onSelect={onDateSelect} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CalendarGrid;
