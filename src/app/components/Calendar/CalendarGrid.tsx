import { generateCalendar } from "../../../lib/calendarUtils";
import DayCell from "./DayCell";
import React from "react";

interface CalendarGridProps {
  currentMonth: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  dateSlots: Date[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  selectedDate,
  onDateSelect,
  dateSlots,
}) => {
  const calendar = generateCalendar(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    selectedDate
  );

  const hasSlotsOnDate = (date: Date | null) => {
    if (!date) return false;
    return dateSlots.some(
      (slotDate) =>
        slotDate.getDate() === date.getDate() &&
        slotDate.getMonth() === date.getMonth() &&
        slotDate.getFullYear() === date.getFullYear()
    );
  };

  return (
    <div className="grid grid-cols-7 gap-1 mb-4">
      {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
        <div
          key={day}
          className="text-center font-semibold p-2 h-10 w-10 flex items-center justify-center"
        >
          {day}
        </div>
      ))}

      {calendar.map((week, i) => (
        <React.Fragment key={i}>
          {week.map((dayInfo, j) => {
            const hasSlots = hasSlotsOnDate(dayInfo.date);
            return (
              <DayCell
                key={j}
                dayInfo={dayInfo}
                onSelect={onDateSelect}
                hasAvailableSlots={hasSlots}
              />
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CalendarGrid;
