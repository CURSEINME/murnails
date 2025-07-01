import { DateInfo } from "../../../types/calendar";
interface DayCellProps {
  dayInfo: DateInfo;
  onSelect: (date: Date) => void;
}

const DayCell: React.FC<DayCellProps> = ({ dayInfo, onSelect }) => {
  if (!dayInfo.date) {
    return <div className="invisible p-2 h-12"></div>;
  }

  const handleClick = () => {
    if (dayInfo.date) {
      onSelect(dayInfo.date);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`p-2 h-12 text-center border border-gray-700 rounded-lg cursor-pointer transition-colors
        ${dayInfo.isToday ? "bg-pink-500 text-white" : ""}
        ${dayInfo.isSelected ? "bg-pink-700 text-white font-bold" : ""}
        ${!dayInfo.isCurrentMonth ? "text-gray-500" : "text-gray-200"}
        hover:bg-gray-800 active:bg-gray-700`}
    >
      {dayInfo.date.getDate()}
    </div>
  );
};

export default DayCell;
