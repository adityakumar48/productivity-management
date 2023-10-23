import React from "react";
import Link from "next/link";
import { LuListTodo, LuTimer } from "react-icons/lu";
import { FaRegNoteSticky } from "react-icons/fa6";
import { AiOutlineCalendar } from "react-icons/ai";
import { RiRemoteControlLine } from "react-icons/ri";
import { BiStats } from "react-icons/bi";
import { TiContacts } from "react-icons/ti";

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
          <div key={index} className="pl-6 pt-5">
            <h2 className="text-xl font-poppins font-semibold text-gray-600 tracking-wide py-3">
              {props.heading}
            </h2>
            {/* @ts-ignore */}
            {item[props.heading].data.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 pl-3 pb-1 text-lg hover:text-[#6963b0] transition-colors duration-200 ease-in-out "
                >
                  {<item.icon />}
                  <span className="">{item.name}</span>
                </Link>{" "}
              </li>
            ))}
          </div>
        );
      })}
    </>
  );
};

export const Sidebar = () => {
  return (
    <aside className="">
      <h1 className="font-poppins tracking-wide text-2xl pl-6 pt-10 text-gray-600 font-bold">
        <Link href={"/"}>Dashboard</Link>
      </h1>

      <ul>
        {sidebarHeadings.map((heading, index) => (
          <div key={index}>
            <ItemHeading heading={heading} number={sidebarHeadings.length} />
          </div>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
