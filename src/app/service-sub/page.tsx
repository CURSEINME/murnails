"use client";

import { useState } from "react";
import Calendar from "../components/Calendar/Calendar";
import TimeSlotsAdmin from "../components/TimeSlots/TimeSlotsAdmin";
import ServiceSelection from "../components/ServiceSelection";

const Page = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMouth, setCurrentMonth] = useState(new Date());

  const handleDateSelect = (data: Date) => {
    setSelectedDate(data);
  };
  const handleMouthChange = (data: Date) => {
    setCurrentMonth(data);
  };
  return (
    <div>
      <ServiceSelection />
      <Calendar
        currentMonth={currentMouth}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        onMonthChange={handleMouthChange}
      />

      {selectedDate && (
        <div className="max-w-2xl mx-auto p-4">
          <TimeSlotsAdmin
            selectedDate={selectedDate}
            onSlotsUpdate={() => {}}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
