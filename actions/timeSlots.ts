"use server";

import { prisma } from "@/lib/prisma";

export async function createTimeSlot({
  date,
  time,
}: {
  time: string;
  date: Date;
}) {
  try {
    const res = await prisma.timeSlot.create({
      data: { date, time },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getDateSlots() {
  const res = await prisma.timeSlot.findMany();
  return res.map((r) => r.date);
}

export async function getTimeSlots(date: Date) {
  const res = await prisma.timeSlot.findMany({ where: { date: date } });
  return res.map((r) => r.time);
}

export async function deleteTimeSlot({
  date,
  time,
}: {
  date: Date;
  time: string;
}) {
  try {
    const res = await prisma.timeSlot.deleteMany({
      where: { date: date, time: time },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
