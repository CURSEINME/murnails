'use client'

import { ContactForm, ContactScheme } from "@/lib/zodSchemes";
import { useCallback, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ContactStep({ onFormChange }: {onFormChange: ({name, phone}: {name: string, phone: string})  => void}) {
	const { register, control, formState: { errors, isValid } } = useForm<ContactForm>({
		resolver: zodResolver(ContactScheme),
		mode: 'onChange',
		defaultValues: {
			name: '',
			phone: ''
		}
	});

	const name = useWatch({control, name: 'name'})
	const phone = useWatch({control, name: 'phone'})

	useEffect(() => {
		console.log(isValid)
		if (isValid)
			onFormChange({name, phone});
	}, [name, phone, isValid, onFormChange]);

  return (
      <div className="max-w-md mx-auto ">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-pink-400 mb-2">
            Связь со мной
          </h2>
          <p className="text-gray-400">
            Оставьте свои контактные данные, и я свяжусь с вами
          </p>
        </div>

        <form className="space-y-6">
          <div className="space-y-4">
            {/* Поле имени */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  required
                  className="w-full px-4 py-3 bg-neutral-700/50 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="Ваше имя"
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
							{errors.name && <p className="text-red-500 mt-2">{errors.name.message}</p>}
            </div>

            {/* Поле телефона */}
            <div>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
									{...register("phone")}
                  required
                  className="w-full px-4 py-3 bg-neutral-700/50 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="Номер телефона"
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
							{errors.phone && <p className="text-red-500 mt-2">{errors.phone.message}</p>}
            </div>
          </div>
        </form>
      </div>
  );
}