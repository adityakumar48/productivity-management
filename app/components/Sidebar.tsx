"use client";
import React, { useState } from "react";
import Link from "next/link";
import { LuListTodo, LuTimer } from "react-icons/lu";
import { FaRegNoteSticky } from "react-icons/fa6";
import { AiOutlineCalendar, AiOutlineClose } from "react-icons/ai";
import { RiRemoteControlLine } from "react-icons/ri";
import { BiStats } from "react-icons/bi";
import { TiContacts } from "react-icons/ti";
import { useSession } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi";

const sidebarItems = [
  {
    Focus: {
      name: "Focus",
      data: [
        {
          name: "Todo",
          icon: LuListTodo,
          href: "/todo",
        },
        {
          name: "Notes",
          icon: FaRegNoteSticky,
          href: "/notes",
        },
        {
          name: "Calendar",
          icon: AiOutlineCalendar,
          href: "/calendar",
        },
      ],
    },
    Timer: {
      name: "Timer",
      data: [
        {
          name: "Timer",
          icon: LuTimer,
          href: "/timer",
        },
      ],
    },
    Reminder: {
      name: "Reminder",
      data: [
        {
          name: "Reminder",
          icon: RiRemoteControlLine,
          href: "/reminder",
        },
      ],
    },
    Statistics: {
      name: "Statistics",
      data: [
        {
          name: "Statistics",
          icon: BiStats,
          href: "/statistics",
        },
      ],
    },
    Addons: {
      name: "Addons",
      data: [
        {
          name: "Contact Book",
          icon: TiContacts,
          href: "/contactbook",
        },
      ],
    },
  },
];

const sidebarHeadings = ["Focus", "Timer", "Reminder", "Statistics", "Addons"];

type SidebarProps = {
  heading: string;
  number: number;
};

export const ItemHeading = (props: SidebarProps) => {
  return (
    <>
      {sidebarItems.map((item, index) => {
        return (
          <div key={index} className="px-6 flex flex-col md:block pt-5">
            <h2 className="text-xl font-poppins font-semibold text-gray-600 tracking-wide py-3">
              {props.heading}
            </h2>

            <div>
              {/* @ts-ignore */}
              {item[props.heading].data.map((item, index) => (
                <li key={index} className="md:block flex flex-row">
                  <Link
                    href={item.href}
                    className="flex  items-center space-x-1 pl-3 pb-1 text-lg hover:text-[#6963b0] transition-colors duration-200 ease-in-out "
                  >
                    {<item.icon />}
                    <span className="">{item.name}</span>
                  </Link>{" "}
                </li>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export const Sidebar = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {status === "authenticated" && (
        <aside className="md:w-[20%]  bg-slate-100 md:min-h-screen md:fixed  ">
          <aside className="">
            <h1 className="font-poppins tracking-wide text-2xl md:pl-6 px-6 py-6 flex items-center justify-between text-gray-600 font-bold">
              <Link href={"/"}>Dashboard</Link>

              {/* if screen size below md then show icon */}

              {open ? (
                <AiOutlineClose
                  className="md:hidden"
                  onClick={() => setOpen(false)}
                />
              ) : (
                <GiHamburgerMenu
                  className="md:hidden"
                  onClick={() => setOpen(true)}
                />
              )}
            </h1>

            {/* if screen size below md then show sidebar */}

            {open && (
              <div className="md:hidden">
                {sidebarHeadings.map((heading, index) => (
                  <ItemHeading key={index} heading={heading} number={index} />
                ))}
              </div>
            )}

            {/* if screen size above md then show sidebar */}

            <div className="hidden md:block">
              {sidebarHeadings.map((heading, index) => (
                <ItemHeading key={index} heading={heading} number={index} />
              ))}
            </div>
          </aside>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
