"use client";

import { Suspense, useEffect, useState } from "react";
import Calendar from "../components/Calendar/Calendar";
import TimeSlotsAdmin from "../components/TimeSlots/TimeSlotsAdmin";
import Button from "../components/UI/Button";
import { redirect, RedirectType, useSearchParams } from "next/navigation";
import { getDateSlots } from "../../../actions/timeSlots";
import Loading from "../components/UI/Loading";

function CalendarContent() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [dateSlots, setDateSlots] = useState<Date[]>([]);

  const searchParams = useSearchParams();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleSelectedTime = (time: string) => {
    setSelectedTime(time);
  };

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("day", selectedDate?.getDay()?.toString() || "");
    params.set("month", selectedDate?.getMonth()?.toString() || "");
    params.set("year", selectedDate?.getFullYear()?.toString() || "");
    params.set("time", selectedTime || "");

    redirect(`/contact?${params.toString()}`, RedirectType.push);
  };

  useEffect(() => {
    const getDates = async () => {
      const data = await getDateSlots();
      setDateSlots(data);
    };
    getDates();
  }, []);
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 py-5">
      <div className="lg:sticky lg:top-8 h-fit">
        <Calendar
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onMonthChange={handleMonthChange}
          dateSlots={dateSlots}
        />
      </div>

      <div className="bg-neutral-800/40 rounded-xl shadow-xl p-6">
        {selectedDate ? (
          <div className={`h-full flex flex-col`}>
            <h2 className="text-xl font-bold text-pink-400 mb-6">
              Cвободное время на{" "}
              {selectedDate.toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h2>
            <TimeSlotsAdmin
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              setSelectedTime={handleSelectedTime}
            />
            {selectedTime && (
              <Button
                onClick={handleClick}
                variant="secondary"
                type="button"
                className="mt-10"
              >
                Продолжить
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="text-gray-400 text-lg mb-4">
              Выберите дату в календаре
            </div>
            <svg
              className="w-12 h-12 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CalendarContent />
    </Suspense>
  );
};

export default Page;
