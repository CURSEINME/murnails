import { generateCalendar } from '../../../lib/calendarUtils';
import DayCell from './DayCell';
import React from 'react';

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
    selectedDate,
  );

  const hasSlotsOnDate = (date: Date | null) => {
    if (!date) return false;
    return dateSlots.some(
      (slotDate) =>
        slotDate.getDate() === date.getDate() &&
        slotDate.getMonth() === date.getMonth() &&
        slotDate.getFullYear() === date.getFullYear(),
    );
  };

  const weekDays = [
    { short: 'Пн', full: 'Понедельник' },
    { short: 'Вт', full: 'Вторник' },
    { short: 'Ср', full: 'Среда' },
    { short: 'Чт', full: 'Четверг' },
    { short: 'Пт', full: 'Пятница' },
    { short: 'Сб', full: 'Суббота' },
    { short: 'Вс', full: 'Воскресенье' },
  ];

  return (
    <div className="relative mx-auto w-full">
      {/* Дни недели */}
      <div className="mb-4 grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => (
          <div
            key={day.short}
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-center text-xs font-semibold ${
              index >= 5 ? 'bg-pink-500/10 text-pink-400/70' : 'bg-white/5 text-gray-400'
            }`}
            title={day.full}
          >
            {day.short}
          </div>
        ))}
      </div>

      {/* Сетка дней */}
      <div className="grid grid-cols-7 gap-2">
        {calendar.map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {week.map((dayInfo, dayIndex) => {
              const hasSlots = hasSlotsOnDate(dayInfo.date);
              return (
                <DayCell
                  key={`${weekIndex}-${dayIndex}`}
                  dayInfo={dayInfo}
                  onSelect={onDateSelect}
                  hasAvailableSlots={hasSlots}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Декоративный элемент */}
      <div className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-xl"></div>
    </div>
  );
};

export default CalendarGrid;
