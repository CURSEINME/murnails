'use client';

import { useEffect, useState } from 'react';
import Calendar from '../components/Calendar/Calendar';
import TimeSlotsAdmin from '../components/TimeSlots/TimeSlotsAdmin';
import Button from '../components/UI/Button';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { getDateSlots } from '../../../actions/timeSlots';
import { motion } from 'framer-motion';
import Stepper, { Step } from '@/components/Stepper';
import { sendMail } from '../../../actions/email';
import { toast } from 'react-toastify';
import ContactStep from '../components/steps/ContactStep';

interface TimeSlotsProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
}

function TimeSlotsStep({ selectedDate, selectedTime, setSelectedTime}: TimeSlotsProps) {
  return (
    <div className="flex flex-col flex-1">
      <div>
        <h2 className="mb-6 text-xl font-semibold text-pink-400">
          Свободное время на{' '}
          {selectedDate?.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </h2>
          <TimeSlotsAdmin
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />  
      </div>
    </div>
  )
}

interface CalendarProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void
}

function CalendarStep({selectedDate, setSelectedDate}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [dateSlots, setDateSlots] = useState<Date[]>([])

  useEffect(() => {
    const getDates = async () => {
      const data = await getDateSlots();
      setDateSlots(data);
    };
    getDates();
  }, []);
  return (
    <div className="rounded-3xl">
      <h2 className="mb-4 text-center text-xl font-semibold text-white">Выберите дату</h2>
      <Calendar
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        onMonthChange={setCurrentMonth}
        dateSlots={dateSlots}
      />
    </div>
  )
}

const Page = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [stepperKey, setStepperKey] = useState(0)

  const [formData, setFormData] = useState({ name: '', phone: '' });

  const searchParams = useSearchParams();
  const router = useRouter()

  const payload = configureFinalPayload()

  const [currentStep, setCurrentStep] = useState(1)

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  function configureFinalPayload() {
    if (!selectedDate || !selectedTime) return null

    const day = selectedDate?.getDate().toString() || ""
    const month = selectedDate?.getMonth().toString() || ""
    const year = selectedDate?.getFullYear().toString() || ""
    const time = selectedTime || ''
    const service = searchParams.get("service") || ''
    const tel = formData.phone
    const name = formData.name

    return {
      date: {day, month, year, time},
      service,
      tel,
      name
    }
  }

  async function handleStepChange(step: number) {
    if (step < currentStep) {
      if (step < 3) {
        setFormData({name: '', phone: ''})
      }

      if (step < 2) {
        setSelectedTime(null)
      }
    }

    setCurrentStep(step)

    if (step == 3) {
      const params = new URLSearchParams(searchParams.toString());
  
      params.set('day', selectedDate?.getDate()?.toString() || '');
      params.set('month', selectedDate?.getMonth()?.toString() || '');
      params.set('year', selectedDate?.getFullYear()?.toString() || '');
      params.set('time', selectedTime || '');
  
      router.push(`/calendar?${params.toString()}`)
    }
    
    if (step == 4 && payload) {
      console.log(payload)
      try {
        const result = { ok: true, message: 'test'}

        if (result.ok) {
          toast.success("✅ Ваша заявка успешно отправлена!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setFormData({
            name: "",
            phone: "",
          });
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        toast.error("❌ Произошла ошибка при отправке", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.error("Ошибка:", error);
      }
    }
  }

  async function handleReset() {
    router.push('/')

    await new Promise((resolve) => setTimeout(resolve, 2000)).then(() => setStepperKey(prev => prev + 1))

    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({ name: '', phone: '' });
    setCurrentStep(1);
  }

  return (
    <Stepper
      key={stepperKey}
      contentClassName='min-h-[350px]'
      stepCircleContainerClassName='max-w-[800px]! backdrop-blur-md bg-black/40'
      initialStep={1}
      onStepChange={(step) => handleStepChange(step)}
      onFinalStepCompleted={handleReset}
      nextButtonProps={{
        disabled:
          (currentStep === 1 && !selectedDate) ||
          (currentStep === 2 && !selectedTime) ||
          (currentStep === 3 && (!formData.name || !formData.phone)),
      }}
      backButtonText="Назад"
      nextButtonText="Далее"
      disableStepIndicators
    >
      <Step>
        <CalendarStep selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      </Step>
      <Step>
        <TimeSlotsStep setSelectedTime={setSelectedTime} selectedTime={selectedTime} selectedDate={selectedDate}/>
      </Step>
      <Step>
        <ContactStep handleChange={onChange} {...formData}/>
      </Step>
      <Step>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center space-y-6 py-10"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Запись успешно оформлена
          </h2>

          <p className="max-w-md text-muted-foreground text-base leading-relaxed">
            Спасибо за доверие 🤍  
            Я получила вашу заявку и свяжусь с вами в ближайшее время
            для подтверждения записи.
          </p>

          <p className="text-sm text-gray-400">
            Если понадобится что-то уточнить — вы всегда можете написать или позвонить.
          </p>
        </motion.div>
      </Step>
    </Stepper>
  );
};

export default Page;
