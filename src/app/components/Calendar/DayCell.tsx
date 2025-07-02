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
      className={`p-2 h-10 w-10 text-center rounded-full cursor-pointer transition-colors
        ${dayInfo.isToday ? "border border-gray-500 text-white" : ""}
        ${dayInfo.isSelected ? "bg-pink-500 text-white font-bold" : ""}
        hover:bg-gray-800`}
    >
      {dayInfo.date.getDate()}
    </div>
  );
};

export default DayCell;
