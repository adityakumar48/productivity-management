import React from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Features", href: "/about" },
  { name: "Contact", href: "/contact" },
];
const Navbar = () => {
  return (
    <div className="fixed z-50 top-0 left-0 w-full">
      <div className="flex  px-28 h-[10vh]  bg-[rgba(137, 99, 233, 0.9)] shadow-sm justify-between items-center ">
        <div>
          <Image
            src="/logo.png"
            alt="logo"
            height={100}
            width={100}
            className="rounded-md"
          />
        </div>
        <div>
          <ul className="flex gap-6">
            {navLinks.map((item) => (
              <li
                className="text-md  font-poppins tracking-wider hover:text-gray-500 text-gray-900 cursor-pointer"
                key={item.name}
              >
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
            <li className="text-md  font-poppins tracking-wider  cursor-pointer">
              {" "}
              <Link
                className="py-2 px-5 text-white rounded-md font-poppins bg-[#8352FD]"
                href={"/api/auth/signin"}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
