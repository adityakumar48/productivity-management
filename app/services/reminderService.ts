import prisma from "@/prisma/client";
import schedule from "node-schedule";

import nodemailer from "nodemailer";
import { taskReminder } from "../api/email/templates/taskReminder";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { NextRequest } from "next/server";

interface Reminder {
  name: string | null;
  Email: string | null;
  Title: string | null;
  Description: string | null;
  Time: string | null;
  id: string;
}

const runTasks = async () => {
  console.log("Running Tasks Service...");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
      },
    });

    // Every 2 minutes after fetch all reminders
    const reminders = await prisma.reminder.findMany({
      where: {
        Status: "Active",
      },
    });

    reminders.forEach((reminder) => {
      const { name, Email, Title, Description, Time, id }: Reminder = reminder;
      console.log(Email);
      // @ts-ignore
      const someDate = new Date(Time);
      const j = schedule.scheduleJob(someDate, async function () {
        const info = await transporter.sendMail({
          from: `"Visinigiri Aditya " <${process.env.NEXT_PUBLIC_EMAIL}>`,
          // @ts-ignore
          to: [Email],

          subject: `Welcome to ProductivityHub - Your Journey Begins Here!`,
          html: taskReminder(name, Title, Time, Description),
        });

        console.log("Message sent: %s", Title);

        await prisma.reminder.update({
          where: {
            id: id,
          },
          data: {
            Status: "COMPLETED",
          },
        });
      });
    });

    setInterval(async () => {
      const reminders = await prisma.reminder.findMany({
        where: {
          Status: "Active",
        },
      });
      reminders.forEach((reminder) => {
        const { Title, name, Email, Description, Time, id }: Reminder =
          reminder;
        console.log("-------------------");
        console.log(Time);
        console.log("-------------------");
        // @ts-ignore
        const someDate = new Date(Time);
        const j = schedule.scheduleJob(someDate, async function () {
          console.log("Task Running");
          const info = await transporter.sendMail({
            from: `"Visinigiri Aditya " <${process.env.NEXT_PUBLIC_EMAIL}>`,
            // @ts-ignore
            to: [Email],
            subject: `Welcome to ProductivityHub - Your Journey Begins Here!`,
            html: taskReminder(name, Title, Time, Description),
          });

          console.log("Message sent: %s", Title);
          const updatedReminder = await prisma.reminder.update({
            where: {
              id: id,
            },
            data: {
              Status: "COMPLETED",
            },
          });

          if (updatedReminder.Status === "COMPLETED") {
            console.log("Task Completed " + updatedReminder.Title);
          }
        });
      });
    }, 120000);
  } catch (error) {
    console.log(error);
  }
};

export default runTasks;
