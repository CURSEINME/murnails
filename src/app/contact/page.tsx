"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { sendMail } from "../../../actions/email";
import Loading from "../components/UI/Loading";
import { toast } from "react-toastify";

function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const searchParams = useSearchParams();
  const day = searchParams.get("day") || "";
  const month = searchParams.get("month") || "";
  const year = searchParams.get("year") || "";
  const time = searchParams.get("time") || "";
  const service = searchParams.get("service") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    console.log();
    e.preventDefault();
    try {
      const result = await sendMail({
        date: [day, time, month, year],
        service,
        tel: formData.phone,
        name: formData.name,
      });

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
        // Очистка формы после успешной отправки
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
    } finally {
      // setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="h-[calc(100vh-84px)] grid place-items-center">
      <div className="max-w-md mx-auto bg-neutral-800/70 py-12 px-4 sm:px-6 lg:px-8 rounded-xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-pink-400 mb-2">
            Свяжитесь с нами
          </h2>
          <p className="text-gray-400">
            Оставьте свои контактные данные, и мы вам перезвоним
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Поле имени */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Ваше имя
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-700/50 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="Иван Иванов"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Поле телефона */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Номер телефона
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-700/50 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="+7 (999) 123-45-67"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Кнопка отправки */}
          <div>
            <button
              type="submit"
              className="mt-auto w-full px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-lg hover:shadow-pink-500/20"
            >
              Отправить заявку
            </button>
          </div>
        </form>

        {/* Дополнительная информация */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Или свяжитесь с нами напрямую:</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a
              href="tel:+79991234567"
              className="text-pink-400 hover:text-pink-300 flex items-center"
            >
              <svg
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +7 (999) 99-99-99
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ContactContent />
    </Suspense>
  );
};

export default Page;
