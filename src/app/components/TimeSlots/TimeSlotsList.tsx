'use client';

import { FC, useRef, useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import TimeSlotItem from './TimeSlotItem';

interface TimeSlotsSliderProps {
  timeSlots: string[];
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  onRemove: (time: string) => void;
}

const TimeSlotsSlider: FC<TimeSlotsSliderProps> = ({
  timeSlots,
  selectedTime,
  onTimeSelect,
  onRemove,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  console.log(timeSlots);

  return (
    <div className="relative w-full">
      <div className="hidden md:block">
        <div className="grid grid-cols-5 gap-2">
          {timeSlots.map((time) => (
            <TimeSlotItem
              key={time}
              time={time}
              selectedTime={selectedTime}
              onTimeSelect={onTimeSelect}
              onRemove={onRemove}
            />
          ))}
        </div>
      </div>

      <div className="relative md:hidden">
        <div
          className={`grid ${timeSlots.length > 6 ? 'auto-cols-[45%]' : 'auto-cols-[50%]'} grid-flow-col grid-rows-3 gap-2 overflow-x-auto px-2`}
        >
          {timeSlots.map((time) => (
            <div key={time} className="flex-shrink-0">
              <TimeSlotItem
                time={time}
                selectedTime={selectedTime}
                onTimeSelect={onTimeSelect}
                onRemove={onRemove}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeSlotsSlider;
