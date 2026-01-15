'use client';

import { useState, useEffect, useRef } from 'react';
import Button from '../UI/Button';
import TimeSlotsList from './TimeSlotsList';
import { createTimeSlot, deleteTimeSlot, getTimeSlots } from '../../../../actions/timeSlots';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Clock, Calendar } from 'lucide-react';
import Modal from '../UI/Modal';
import { set } from 'zod';

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
  const slotRefs = useRef(null)

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

  // useEffect(() => {
  //   console.log(selectedDate)
  //   if (!selectedDate) return;

  //   const el = slotRefs.current;
  //   el?.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'nearest',
  //     inline: 'center',
  //   });
  // }, [selectedDate]);

  return (
    <div className="relative">
      {/* Заголовок с информацией */}
      <div className="mb-6 rounded-2xl border border-white/10 bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-4">
        <div className="mb-2 flex items-center gap-3">
          <Calendar size={18} className="text-pink-400" />
          <h3 className="text-lg font-semibold text-white">
            {selectedDate?.toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock size={14} />
          <span>{timeSlots.length} доступных слотов</span>
        </div>
      </div>

      {/* Список временных слотов */}
      <div className="mb-6" ref={slotRefs}>
        <TimeSlotsList
          timeSlots={timeSlots}
          onRemove={removeTimeSlot}
          selectedTime={selectedTime}
          onTimeSelect={setSelectedTime}
        />
      </div>

      {/* Кнопка добавления слота для админа */}
      {session?.user && (
        <>
          {/* Floating Action Button */}
          <button
            onClick={() => setShowSheet(true)}
            className="fixed right-6 bottom-6 z-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-pink-400 p-3 shadow-[0_0_10px_rgba(236,72,153,0.8)] transition hover:shadow-[0_0_20px_rgba(236,72,153,1)] lg:hidden"
          >
            <Plus className="h-6 w-6 text-white" />
          </button>

          {/* Модальное окно добавления слота */}
          <AnimatePresence>
            {showSheet && (
              <Modal overlayClassName="w-full max-w-sm mx-4" onClose={() => setShowSheet(false)}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative w-full rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-xl"
                >
                  {/* Декоративный фон */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10"></div>

                  <div className="relative z-10">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500">
                        <Clock size={14} className="text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Добавить слот</h3>
                    </div>

                    {selectedDate && (
                      <div className="mb-4 rounded-lg border border-white/10 bg-white/5 p-2">
                        <p className="text-xs text-gray-300">
                          {selectedDate.toLocaleDateString('ru-RU', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'long',
                          })}
                        </p>
                      </div>
                    )}

                    {/* Поле ввода времени */}
                    <div className="mb-4">
                      <label className="mb-2 block text-xs font-medium text-gray-300">Время</label>
                      <input
                        type="time"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                        className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-center text-base text-white backdrop-blur-md transition-all duration-200 outline-none focus:border-pink-400 focus:bg-white/20"
                      />
                    </div>

                    {/* Кнопки действий */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setShowSheet(false)}
                        variant="ghost"
                        className="flex-1 py-2"
                      >
                        Отмена
                      </Button>
                      <Button
                        onClick={addTimeSlot}
                        variant="primary"
                        className="flex-1 py-2"
                        // disabled={!newTime}
                      >
                        Добавить
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </Modal>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default TimeSlotsAdmin;
