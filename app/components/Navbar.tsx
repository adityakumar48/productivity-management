import Image from "next/image";
import React, { useState } from "react";
import DateTime from "./DateTime";

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

  const randomGreeting =
    greetingData[Math.floor(Math.random() * greetingData.length)];

  return (
    <nav className="container">
      <div className="flex h-[10vh] items-center justify-between px-16 ">
        <div className="logo">
          <h1 className="text-xl font-bold font-poppins">
            {" "}
            {randomGreeting}, Aditya 👋
          </h1>
        </div>

        <div className="logo flex items-center gap-4">
          <DateTime />
          <div>
            <Image
              src={"https://dummyimage.com/300x300/000/fff"}
              alt="profile"
              width={50}
              height={50}
              className="rounded-full "
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
