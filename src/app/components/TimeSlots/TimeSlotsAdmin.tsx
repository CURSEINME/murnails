'use client';

import { useState, useEffect } from 'react';
import Button from '../UI/Button';
import TimeSlotsList from './TimeSlotsList';
import { createTimeSlot, deleteTimeSlot, getTimeSlots } from '../../../../actions/timeSlots';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import Modal from '../UI/Modal';

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
  const [newTime, setNewTime] = useState('');
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [showSheet, setShowSheet] = useState(false);
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    try {
      setIsLoading(true)
      const fetchTimeSlots = async () => {
        if (selectedDate) {
          const savedSlots = await getTimeSlots(selectedDate);
          setTimeSlots(savedSlots.sort());
        }
      };
      fetchTimeSlots();
    } catch(err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }, [selectedDate]);

  const addTimeSlot = async () => {
    if (!newTime || !selectedDate) return;
    try {
      await createTimeSlot({ date: selectedDate, time: newTime });
      setTimeSlots((prev) => [...prev, newTime].sort());
      setNewTime('');
      setShowSheet(false);
    } catch (err) {
      console.error('Error creating time slot:', err);
    }
  };

  const removeTimeSlot = async (time: string) => {
    if (!selectedDate) return;
    try {
      await deleteTimeSlot({ date: selectedDate, time });
      setTimeSlots((prev) => prev.filter((t) => t !== time));
    } catch (err) {
      console.error('Error deleting time slot:', err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="my-8">
      <TimeSlotsList
        timeSlots={timeSlots}
        onRemove={removeTimeSlot}
        selectedTime={selectedTime}
        onTimeSelect={setSelectedTime}
      />

        <>
          <motion.button
            onClick={() => setShowSheet(true)}
            whileTap={{ scale: 0.9 }}
            className="fixed right-6 bottom-20 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-pink-500/40 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-pink-500/60"
          >
            <Plus size={28} />
          </motion.button>

          <AnimatePresence>
            {showSheet && (
              <>
                <motion.div
                  className="absolute inset-0 z-40 bg-black/40 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  onClick={() => setShowSheet(false)}
                />

                <Modal overlayClassName="max-w-md w-full" onClose={() => setShowSheet(false)}>
                  <div className="backdrop-blur-md flex flex-col items-center justify-center rounded-3xl border border-white/20 bg-white/10 p-6 pb-8 text-center">
                    <button
                      onClick={() => setShowSheet(false)}
                      className="absolute top-4 right-6 text-gray-400 transition-colors hover:text-pink-400"
                    >
                      <X size={26} />
                    </button>

                    <h3 className="mb-2 text-lg font-semibold text-pink-400">Добавить слот</h3>

                    {selectedDate && (
                      <p className="mb-6 text-sm text-gray-400">
                        {selectedDate.toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    )}

                    <div className="mb-6 w-full max-w-sm">
                      <label className="mb-2 block text-sm text-gray-400">Выберите время</label>
                      <div className="relative">
                        <input
                          type="time"
                          value={newTime}
                          onChange={(e) => setNewTime(e.target.value)}
                          className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-center text-xl text-white transition-all duration-200 outline-none focus:border-pink-400 focus:bg-white/20"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 blur-sm"></div>
                      </div>
                    </div>

                    <Button onClick={addTimeSlot} variant="primary" className="w-full max-w-sm">
                      Добавить
                    </Button>
                  </div>
                </Modal>
              </>
            )}
          </AnimatePresence>
        </>
    </div>
  );
};

export default TimeSlotsAdmin;
