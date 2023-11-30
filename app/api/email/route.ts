import { NextResponse, NextRequest } from "next/server";
import { onBoarding } from "./templates/onBoarding";
const nodemailer = require("nodemailer");

export async function POST(request: NextRequest) {
  const { name, email } = await request.json();

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

  try {
    const info = await transporter.sendMail({
      from: `"Visinigiri Aditya " <${process.env.NEXT_PUBLIC_EMAIL}>`,
      to: email,
      subject: `Welcome to ProductivityHub - Your Journey Begins Here!`,
      html: onBoarding(name),
    });

    console.log("Message sent: %s", info.messageId);
    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.log(error);
    NextResponse.json({ message: "COULD NOT SEND MESSAGE" });
  }
}
