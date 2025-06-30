export interface DateInfo {
  date: Date | null;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
}

export interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}
