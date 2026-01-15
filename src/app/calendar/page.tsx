'use client';

import { Suspense, useEffect, useState } from 'react';
import Calendar from '../components/Calendar/Calendar';
import TimeSlotsAdmin from '../components/TimeSlots/TimeSlotsAdmin';
import Button from '../components/UI/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { getDateSlots } from '../../../actions/timeSlots';
import Loading from '../components/UI/Loading';
import { motion } from 'framer-motion';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { useSession } from 'next-auth/react';

function CalendarContent() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [dateSlots, setDateSlots] = useState<Date[]>([]);
  const [timeSlotsCount, setTimeSlotsCount] = useState<number>(0);

  const router = useRouter();
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

  const handleClick = () => {
    if (!selectedDate || !selectedTime) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('day', selectedDate.getDate().toString());
    params.set('month', (selectedDate.getMonth() + 1).toString());
    params.set('year', selectedDate.getFullYear().toString());
    params.set('time', selectedTime);
    router.push(`/contact?${params.toString()}`);
  };

  useEffect(() => {
    const getDates = async () => {
      const data = await getDateSlots();
      setDateSlots(data);
    };
    getDates();
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-10 py-8 lg:max-h-[650px] lg:flex-row">
      {/* Календарь */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full flex-col lg:w-1/2"
      >
        {/* Обёртка для выравнивания по высоте */}
        <div className="h-full rounded-2xl">
          <Calendar
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onMonthChange={handleMonthChange}
            dateSlots={dateSlots}
          />
        </div>
      </motion.div>

      {/* Панель выбора времени */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-card relative flex w-full flex-col lg:w-1/2"
      >
        {/* Чтобы высота совпадала с календарём */}
        <div className="relative flex h-full flex-col rounded-2xl p-6 lg:p-8">
          {/* Декоративный фон */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/5 to-purple-500/5"></div>

          <div className="relative z-10 flex h-full flex-col">
            {selectedDate ? (
              <div className="flex h-full flex-col">
                {/* Заголовок */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 flex-shrink-0"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500">
                      <CalendarDays size={18} className="text-white" />
                    </div>
                    <h2 className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-xl font-bold text-transparent">
                      Выбранная дата
                    </h2>
                  </div>
                  <p className="text-lg font-medium text-gray-200">
                    {selectedDate.toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </motion.div>

                {/* Список времени */}
                <div className="flex-1">
                  <TimeSlotsAdmin
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                  />
                </div>

                {/* Кнопка */}
                {selectedTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 flex-shrink-0"
                  >
                    <Button
                      onClick={handleClick}
                      variant="primary"
                      type="button"
                      className="group flex w-full items-center justify-center gap-2 py-3 text-lg font-semibold"
                    >
                      Продолжить
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-gradient-to-r from-pink-500/20 to-purple-500/20"
                >
                  <CalendarDays size={32} className="text-pink-400" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-2 text-xl font-semibold text-white"
                >
                  Выберите дату
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-sm text-gray-400"
                >
                  Нажмите на доступную дату в календаре, чтобы увидеть свободные временные слоты
                </motion.p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const Page = () => (
  <Suspense fallback={<Loading />}>
    <div className="custom-container !my-0 flex !py-10">
      <CalendarContent />
    </div>
  </Suspense>
);

export default Page;
