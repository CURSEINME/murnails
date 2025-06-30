import { useState, useEffect } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import TimeSlotsList from "./TimeSlotsList";
import {
  createTimeSlot,
  deleteTimeSlot,
  getTimeSlots,
} from "../../../../actions/timeSlots";

interface TimeSlotsAdminProps {
  selectedDate: Date | null;
  onSlotsUpdate: (slots: string[]) => void;
}

const TimeSlotsAdmin: React.FC<TimeSlotsAdminProps> = ({
  selectedDate,
  onSlotsUpdate,
}) => {
  const [newTime, setNewTime] = useState("");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (selectedDate) {
        const savedSlots = await getTimeSlots(selectedDate);
        setTimeSlots(savedSlots.sort());
      }
    };
    fetchTimeSlots();
  }, [selectedDate]);

  const addTimeSlot = async () => {
    if (!newTime || !selectedDate) return;

    // setIsLoading(true);
    // setError(null);

    try {
      // Создаем новый слот через action
      await createTimeSlot({
        date: selectedDate,
        time: newTime,
      });

      // Обновляем локальное состояние
      const updatedSlots = [...timeSlots, newTime].sort();
      setTimeSlots(updatedSlots);
      onSlotsUpdate(updatedSlots);
      setNewTime("");
    } catch (err) {
      // setError("Не удалось добавить временной слот");
      console.error("Error creating time slot:", err);
    } finally {
      // setIsLoading(false);
    }
  };

  const removeTimeSlot = async (time: string) => {
    if (!selectedDate) return;
    // setIsLoading(true);
    // setError(null);

    try {
      // Удаляем слот через action
      await deleteTimeSlot({
        date: selectedDate,
        time,
      });

      // Обновляем локальное состояние
      const updatedSlots = timeSlots.filter((t) => t !== time);
      setTimeSlots(updatedSlots);
      onSlotsUpdate(updatedSlots);
    } catch (err) {
      // setError("Не удалось удалить временной слот");
      console.error("Error deleting time slot:", err);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">
        Управление временными слотами
      </h3>

      <div className="mb-4 p-3 bg-gray-100 rounded">
        <div className="flex space-x-2 items-end">
          <Input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            label="Новое время"
          />
          <Button onClick={addTimeSlot} variant="primary">
            Добавить
          </Button>
        </div>
      </div>

      <TimeSlotsList timeSlots={timeSlots} onRemove={removeTimeSlot} />
    </div>
  );
};

export default TimeSlotsAdmin;
