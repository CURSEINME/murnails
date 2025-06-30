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
      className={`p-2 h-12 text-center border rounded cursor-pointer
        ${dayInfo.isToday ? "bg-purple-400" : ""}
        ${dayInfo.isSelected ? "bg-purple-700 font-bold" : ""}
        ${!dayInfo.isCurrentMonth ? "text-gray-400" : ""}`}
    >
      {dayInfo.date.getDate()}
    </div>
  );
};

export default DayCell;
