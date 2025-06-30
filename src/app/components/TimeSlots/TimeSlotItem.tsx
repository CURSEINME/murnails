interface TimeSlotItemProps {
  time: string;
  onRemove: (time: string) => void;
}

const TimeSlotItem: React.FC<TimeSlotItemProps> = ({ time, onRemove }) => {
  return (
    <div className="border rounded p-2 flex justify-between items-center">
      <span>{time}</span>
      <button
        onClick={() => onRemove(time)}
        className="text-red-500 hover:text-red-700"
        title="Удалить"
      >
        ×
      </button>
    </div>
  );
};

export default TimeSlotItem;
