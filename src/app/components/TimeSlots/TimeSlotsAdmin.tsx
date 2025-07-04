import { useState, useEffect } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import TimeSlotsList from "./TimeSlotsList";
import {
  createTimeSlot,
  deleteTimeSlot,
  getTimeSlots,
} from "../../../../actions/timeSlots";
import { useSession } from "next-auth/react";

interface TimeSlotsAdminProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
}

const TimeSlotsAdmin: React.FC<TimeSlotsAdminProps> = ({
  selectedDate,
  selectedTime,
  setSelectedTime,
}) => {
  const [newTime, setNewTime] = useState("");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  const { data: session } = useSession();

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
      await createTimeSlot({
        date: selectedDate,
        time: newTime,
      });

      const updatedSlots = [...timeSlots, newTime].sort();
      setTimeSlots(updatedSlots);
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
      await deleteTimeSlot({
        date: selectedDate,
        time,
      });

      const updatedSlots = timeSlots.filter((t) => t !== time);
      setTimeSlots(updatedSlots);
    } catch (err) {
      console.error("Error deleting time slot:", err);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className="mt-6">
      {session?.user && (
        <>
          <h3 className="text-lg font-semibold mb-2 text-pink-400">
            Управление временными слотами
          </h3>

          <div className="mb-4 p-3 bg-neutral-900/70 rounded-lg border border-gray-700">
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
        </>
      )}

      <TimeSlotsList
        timeSlots={timeSlots}
        onRemove={removeTimeSlot}
        selectedTime={selectedTime}
        onTimeSelect={setSelectedTime}
      />
    </div>
  );
};

export default TimeSlotsAdmin;
