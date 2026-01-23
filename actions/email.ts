"use server";

import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

type MailData = {
  date: Date;
  time: string;
  service: string;
  tel: string;
  name: string;
};

export async function sendMail({ date, time, service, tel, name }: MailData) {
  try {
    // 🔒 пример глобальной блокировки записи
    const bookingEnabled = true;
    if (!bookingEnabled) {
      return {
        ok: false,
        code: "BOOKING_DISABLED",
        message: "Запись временно недоступна. Попробуйте позже.",
      };
    }

    /**
     * 1️⃣ Ищем слот
     */
    const timeSlot = await prisma.timeSlot.findUnique({
      where: {
        date_time: {
          date,
          time,
        },
      },
      include: {
        appointments: {
          where: {
            status: {
              in: ["PENDING", "CONFIRMED"],
            },
          },
        },
      },
    });

    if (!timeSlot) {
      return {
        ok: false,
        code: "SLOT_NOT_FOUND",
        message: "Выбранное время больше недоступно",
      };
    }

    /**
     * 2️⃣ Проверяем, что слот свободен
     */
    if (timeSlot.appointments.length > 0) {
      return {
        ok: false,
        code: "SLOT_BUSY",
        message: "Это время уже занято. Пожалуйста, выберите другое.",
      };
    }

    /**
     * 3️⃣ Создаём пользователя + запись (транзакция)
     */
    const appointment = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          tel,
        },
      });

      return tx.appointment.create({
        data: {
          userId: user.id,
          timeSlotId: timeSlot.id,
          service,
          status: "PENDING",
        },
      });
    });

    /**
     * 4️⃣ Форматирование даты
     */
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];

    const formattedDate = `${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()} года`;

    const formattedTime = time.includes(":")
      ? time
      : `${time.slice(0, 2)}:${time.slice(2)}`;

    /**
     * 5️⃣ Отправка письма
     */
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Клиент" <${process.env.SMTP_USER}>`,
      to: "curseinme@yandex.ru",
      subject: `Новая запись: ${service}`,
      html: `
        <h2>Новая запись</h2>
        <p><strong>Услуга:</strong> ${service}</p>
        <p><strong>Дата:</strong> ${formattedDate}</p>
        <p><strong>Время:</strong> ${formattedTime}</p>
        <hr />
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> <a href="tel:${tel}">${tel}</a></p>
      `,
    });

    return {
      ok: true,
      message: "Запись успешно создана",
      appointmentId: appointment.id,
    };
  } catch (error) {
    console.error("sendMail error:", error);

    return {
      ok: false,
      code: "MAIL_ERROR",
      message: "Произошла ошибка при создании записи",
    };
  }
}
