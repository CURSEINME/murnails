import { DayCellProps } from "@/types/calendar";

const DayCell: React.FC<DayCellProps> = ({
  dayInfo,
  onSelect,
  hasAvailableSlots,
}) => {
  if (!dayInfo.date) {
    return <div className="invisible h-10 w-10"></div>;
  }

  const handleClick = () => {
    if (dayInfo.date) {
      onSelect(dayInfo.date);
    }
  };

  return (
    <div className="flex justify-center items-center h-10 w-10">
      <div
        onClick={handleClick}
        className={`h-10 w-10 flex items-center justify-center rounded-full cursor-pointer transition-colors
          ${dayInfo.isToday ? "bg-pink-700 text-white" : ""}
          ${dayInfo.isSelected ? "bg-pink-400 text-white font-bold" : ""}
          ${!dayInfo.isCurrentMonth ? "text-gray-500" : "text-gray-200"}
          ${
            hasAvailableSlots && !dayInfo.isSelected
              ? "ring-2 ring-pink-400"
              : ""
          }
          hover:bg-gray-800 active:bg-gray-700 relative`}
      >
        {dayInfo.date.getDate()}
      </div>
    </div>
  );
};

export default DayCell;
