import { AnimatePresence, motion } from 'framer-motion';
import TimeSlotItem from './TimeSlotItem';
import { use, useEffect, useRef } from 'react';

interface TimeSlotsListProps {
  timeSlots: string[];
  onRemove: (time: string) => void;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

const TimeSlotsList: React.FC<TimeSlotsListProps> = ({
  timeSlots,
  onRemove,
  selectedTime,
  onTimeSelect,
}) => {
  return (
    <div className="md:grid-cols- grid grid-cols-3 gap-2">
      <AnimatePresence mode="popLayout">
        {timeSlots.length > 0 ? (
          timeSlots.map((time) => (
            <motion.div
              key={time}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <TimeSlotItem
                time={time}
                onRemove={onRemove}
                onTimeSelect={onTimeSelect}
                selectedTime={selectedTime}
              />
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">Нет доступных временных слотов</p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimeSlotsList;
