import { DateInfo } from "@/types/calendar";

export const generateCalendar = (
  year: number,
  month: number,
  selectedDate: Date | null
): DateInfo[][] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Теперь правильно для Пн-Вс

  const daysInMonth = lastDay.getDate();

  const today = new Date();
  const calendar: DateInfo[][] = [];
  let day = 1;

  for (let i = 0; i < 6; i++) {
    const week: DateInfo[] = [];

    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < startDay) || day > daysInMonth) {
        week.push({
          date: null,
          isCurrentMonth: false,
          isToday: false,
          isSelected: false,
        });
      } else {
        const date = new Date(year, month, day);
        week.push({
          date,
          isCurrentMonth: true,
          isToday: date.toDateString() === today.toDateString(),
          isSelected: selectedDate
            ? date.toDateString() === selectedDate.toDateString()
            : false,
        });
        day++;
      }
    }

    calendar.push(week);
    if (day > daysInMonth) break;
  }

  return calendar;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
};

export const getMonthName = (date: Date): string => {
  return date.toLocaleDateString("ru-RU", { month: "long", year: "numeric" });
};
