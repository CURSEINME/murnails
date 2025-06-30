import TimeSlotItem from "./TimeSlotItem";

interface TimeSlotsListProps {
  timeSlots: string[];
  onRemove: (time: string) => void;
}

const TimeSlotsList: React.FC<TimeSlotsListProps> = ({
  timeSlots,
  onRemove,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {timeSlots.length > 0 ? (
        timeSlots.map((time) => (
          <TimeSlotItem key={time} time={time} onRemove={onRemove} />
        ))
      ) : (
        <p className="text-gray-500">Нет доступных временных слотов</p>
      )}
    </div>
  );
};

export default TimeSlotsList;
