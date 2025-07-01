interface TimeSlotItemProps {
  time: string;
  onRemove: (time: string) => void;
}

const TimeSlotItem: React.FC<TimeSlotItemProps> = ({ time, onRemove }) => {
  return (
    <div className="border border-gray-700 rounded-lg p-3 flex justify-between items-center bg-gray-800 hover:bg-gray-700 transition-colors">
      <span className="text-gray-200">{time}</span>
      <button
        onClick={() => onRemove(time)}
        className="text-pink-500 hover:text-pink-400 text-xl font-bold transition-colors"
        title="Удалить"
      >
        ×
      </button>
    </div>
  );
};

export default TimeSlotItem;
