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
    <div className="">
      {/* Weekdays */}
      <div className="mb-2 grid grid-cols-7 gap-1 text-sm uppercase tracking-wide text-white/50">
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day, index) => (
          <div
            key={day}
            className={`flex h-8 w-8 items-center justify-center font-semibold
              ${index >= 5 ? "text-pink-400/80" : ""}
            `}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {calendar.map((week, i) => (
          <React.Fragment key={i}>
            {week.map((dayInfo, j) => (
              <DayCell
                key={`${i}-${j}`}
                dayInfo={dayInfo}
                onSelect={onDateSelect}
                hasAvailableSlots={hasSlotsOnDate(dayInfo.date)}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
