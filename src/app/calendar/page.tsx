'use client';

import { Suspense, useEffect, useState } from 'react';
import Calendar from '../components/Calendar/Calendar';
import TimeSlotsAdmin from '../components/TimeSlots/TimeSlotsAdmin';
import Button from '../components/UI/Button';
import { redirect, RedirectType, useSearchParams } from 'next/navigation';
import { getDateSlots } from '../../../actions/timeSlots';
import Loading from '../components/UI/Loading';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useSession } from 'next-auth/react';

function CalendarContent() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [dateSlots, setDateSlots] = useState<Date[]>([]);

  const searchParams = useSearchParams();

  const [showAdmin, setShowAdmin] = useState(false);
  const { data: session } = useSession();

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

    params.set('day', selectedDate?.getDay()?.toString() || '');
    params.set('month', selectedDate?.getMonth()?.toString() || '');
    params.set('year', selectedDate?.getFullYear()?.toString() || '');
    params.set('time', selectedTime || '');

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
    <div className="custom-container flex h-full flex-col items-center lg:justify-center">
      <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Блок календаря */}
        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-semibold text-white">Выберите дату</h2>
          <Calendar
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onMonthChange={handleMonthChange}
            dateSlots={dateSlots}
          />
        </div>

        {/* Блок слотов */}
        <div className="flex flex-col justify-between rounded-3xl border border-white/20 bg-white/10 p-8 shadow-md">
          {selectedDate ? (
            <>
              <div>
                <h2 className="mb-6 text-xl font-semibold text-pink-400">
                  Свободное время на{' '}
                  {selectedDate.toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </h2>
                <TimeSlotsAdmin
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  setSelectedTime={handleSelectedTime}
                />
              </div>
              {selectedTime && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-6 text-center shadow-lg backdrop-blur-xl"
                >
                  <p className="mb-4 text-gray-200">
                    Вы выбрали: <span className="font-semibold text-pink-400">{selectedTime}</span>{' '}
                    на{' '}
                    <span className="font-semibold text-pink-400">
                      {selectedDate?.toLocaleDateString('ru-RU')}
                    </span>
                  </p>
                  <Button onClick={() => console.log('confirm')} variant="primary">
                    Подтвердить выбор
                  </Button>
                </motion.div>
              )}
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-gray-300">
              <p className="mb-4">Выберите дату в календаре</p>
              <svg
                className="h-12 w-12 text-gray-500"
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

      {selectedDate && (
        <motion.button
          onClick={() => setShowAdmin((prev) => !prev)}
          whileTap={{ scale: 0.9 }}
          className="fixed right-6 bottom-6 z-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-pink-400 p-3 shadow-[0_0_10px_rgba(236,72,153,0.8)] transition hover:shadow-[0_0_20px_rgba(236,72,153,1)] lg:hidden"
        >
          {showAdmin ? <X size={28} /> : <Plus size={28} />}
        </motion.button>
      )}
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
