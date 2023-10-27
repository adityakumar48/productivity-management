"use client";
import Image from "next/image";
import React, { useState } from "react";
import DateTime from "./DateTime";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const greetingData = [
    "Hi",
    "Hello",
    "Hey",
    "Hola",
    "Namaste",
    "Bonjour",
    "Ciao",
    "Salut",
    "Hallo",
    "Hej",
    "Salam",
    "Konnichiwa",
    "Olá",
    "Ahoj",
  ];
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  const randomGreeting =
    greetingData[Math.floor(Math.random() * greetingData.length)];

  return (
    <nav className="container">
      <div className="flex h-[10vh] items-center justify-between px-16 ">
        <div className="logo">
          <h1 className="text-xl font-bold font-poppins">
            {" "}
            {randomGreeting}, {session?.user?.name?.split(" ")[0]} 👋
          </h1>
        </div>

        <div className="logo flex items-center gap-4">
          <DateTime />
          <div>
            {status === "authenticated" ? (
              <Image
                src={`${session?.user?.image}`}
                alt="profile"
                width={50}
                height={50}
                className="rounded-full "
              />
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
