"use server";

import nodemailer from "nodemailer";

type MailData = {
  date: {day: string, time: string, month: string, year: string};
  service: string;
  tel: string;
  name: string;
};

export async function sendMail(data: MailData) {
  const { date, service, tel, name } = data;
  const {day, time, month, year} = date;

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
  const formattedDate = `${parseInt(day)} ${
    months[parseInt(month) - 1]
  } ${year} года`;
  const formattedTime = time.includes(":")
    ? time
    : `${time.slice(0, 2)}:${time.slice(2)}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Клиент"`,
      to: "curseinme@yandex.ru",
      subject: `Новая заявка на ${service} от ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #ec4899; text-align: center;">Новая заявка на услугу</h2>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Детали услуги</h3>
            <p><strong>Услуга:</strong> ${service}</p>
            <p><strong>Дата:</strong> ${formattedDate}</p>
            <p><strong>Время:</strong> ${formattedTime}</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px;">
            <h3 style="color: #333; margin-top: 0;">Контактная информация</h3>
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Телефон:</strong> <a href="tel:${tel}">${tel}</a></p>
          </div>
          
          <p style="text-align: center; margin-top: 20px; color: #666;">
            Пожалуйста, свяжитесь с клиентом для подтверждения записи.
          </p>
        </div>
      `,
      text: `Новая заявка на услугу:
        Услуга: ${service}
        Дата: ${formattedDate}
        Время: ${formattedTime}
        Клиент: ${name}
        Телефон: ${tel}`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return { message: "Произошла ошибка при отправке", ok: false };
  }

  return { message: "Ваша заявка успешно отправлена", ok: true };
}
