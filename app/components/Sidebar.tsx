"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LuListTodo, LuTimer } from "react-icons/lu";
import { FaRegNewspaper, FaRegNoteSticky, FaRegUser } from "react-icons/fa6";
import { AiOutlineCalendar, AiOutlineClose } from "react-icons/ai";
import { RiRemoteControlLine } from "react-icons/ri";
import { BiStats } from "react-icons/bi";
import { TiContacts } from "react-icons/ti";
import { signOut, useSession } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "@radix-ui/themes";
import { IoIosSearch, IoIosStats } from "react-icons/io";
import { VscPulse } from "react-icons/vsc";
import { FiActivity } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";

const sidebarItems = [
  {
    Focus: {
      name: "Focus",
      data: [
        {
          name: "Task",
          icon: LuListTodo,
          href: "/",
        },
        {
          name: "Notes",
          icon: FaRegNoteSticky,
          href: "/notes",
        },
        {
          name: "Habit Tracker",
          icon: AiOutlineCalendar,
          href: "/habit",
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

const adminSidebarItems = [
  {
    Analytics: {
      name: "Focus",
      data: [
        {
          name: "Reports",
          icon: IoIosStats,
          href: "/",
        },
        {
          name: "System health",
          icon: VscPulse,
          href: "/notes",
        },
      ],
    },
    User: {
      name: "Manage Users",
      data: [
        {
          name: "Users",
          icon: FaRegUser,
          href: "/admin/users",
        },
        {
          name: "Activity",
          icon: FiActivity,
          href: "/admin/activity",
        },
        {
          name: "Records",
          icon: IoIosSearch,
          href: "/timer",
        },
      ],
    },
    Newsletter: {
      name: "Email",
      data: [
        {
          name: "Newsletter",
          icon: FaRegNewspaper,
          href: "/reminder",
        },
        {
          name: "Email",
          icon: MdEmail,
          href: "/reminder",
        },
      ],
    },
    Tickets: {
      name: "Tickets",
      data: [
        {
          name: "Tickets",
          icon: IoTicketOutline,
          href: "/statistics",
        },
      ],
    },
  },
];

const sidebarHeadings = ["Focus", "Timer", "Reminder", "Statistics", "Addons"];
const adminSidebarHeadings = ["Analytics", "User", "Newsletter", "Tickets"];

type SidebarProps = {
  heading: string;
  number: number;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  sideBarItems: (typeof sidebarItems)[] | (typeof adminSidebarItems)[];
};

export const ItemHeading = ({
  heading,
  setOpen,
  sideBarItems,
}: SidebarProps) => {
  return (
    <>
      {sideBarItems.map((item, index) => {
        return (
          <div key={index} className="px-6 flex flex-col md:block pt-5">
            <h2 className="text-xl font-poppins font-semibold text-gray-600 tracking-wide py-3">
              {heading}
            </h2>

            <div>
              {/* @ts-ignore */}
              {item[heading].data.map((item, index) => (
                <li key={index} className="md:block flex flex-row">
                  <Link
                    href={item.href}
                    onClick={() => setOpen && setOpen(false)}
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

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <>
      {status === "authenticated" && (
        <aside className="md:w-[20%] md:h-screen md:overflow-scroll  no-scrollbar  bg-slate-100 md:min-h-screen md:fixed  ">
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
                {
                  // if url is /admin then show admin sidebar

                  session.user.isAdmin &&
                  window.location.pathname.includes("admin") ? (
                    <>
                      {adminSidebarHeadings.map((heading, index) => (
                        <ItemHeading
                          setOpen={setOpen}
                          key={index}
                          heading={heading}
                          number={index}
                          // @ts-ignore
                          sideBarItems={adminSidebarItems}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {sidebarHeadings.map((heading, index) => (
                        <ItemHeading
                          setOpen={setOpen}
                          key={index}
                          heading={heading}
                          number={index}
                          // @ts-ignore
                          sideBarItems={sidebarItems}
                        />
                      ))}
                    </>
                  )
                }

                <div className="pl-4 flex w-[90%] flex-wrap pt-12 pb-4 flex-col gap-1">
                  {session.user.isAdmin && (
                    <div>
                      {window.location.pathname === "/admin" ? (
                        <Link href={"/"}>
                          <Button
                            variant="soft"
                            className="w-full pl-4"
                            color="violet"
                            onClick={() => setOpen(false)}
                          >
                            <a>User dashboard</a>
                          </Button>
                        </Link>
                      ) : (
                        <Link href={"/admin"}>
                          <Button
                            variant="soft"
                            className="w-full pl-4"
                            color="violet"
                          >
                            <a>Admin dashboard</a>
                          </Button>
                        </Link>
                      )}
                      <p className="text-center text-neutral-600">or</p>
                    </div>
                  )}

                  <Button variant="solid" color="red" onClick={handleLogout}>
                    <Link href={""}>Logout</Link>{" "}
                  </Button>
                </div>
              </div>
            )}

            {/* if screen size above md then show sidebar */}

            <div className="hidden md:block">
              {
                // if url is /admin then show admin sidebar

                session.user.isAdmin &&
                window.location.pathname.includes("admin") ? (
                  <>
                    {adminSidebarHeadings.map((heading, index) => (
                      <ItemHeading
                        setOpen={setOpen}
                        key={index}
                        heading={heading}
                        number={index}
                        // @ts-ignore
                        sideBarItems={adminSidebarItems}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {sidebarHeadings.map((heading, index) => (
                      <ItemHeading
                        setOpen={setOpen}
                        key={index}
                        heading={heading}
                        number={index}
                        // @ts-ignore
                        sideBarItems={sidebarItems}
                      />
                    ))}
                  </>
                )
              }

              <div className="pl-4 flex w-[90%] flex-wrap pt-12 pb-4 flex-col gap-1">
                {session.user.isAdmin && (
                  <div>
                    {window.location.pathname.includes("admin") ? (
                      <Link href={"/"}>
                        <Button
                          variant="soft"
                          className="w-full pl-4"
                          color="violet"
                        >
                          <a>User dashboard</a>
                        </Button>
                      </Link>
                    ) : (
                      <Link href={"/admin"}>
                        <Button
                          variant="soft"
                          className="w-full pl-4"
                          color="violet"
                        >
                          <a>Admin dashboard</a>
                        </Button>
                      </Link>
                    )}
                    <p className="text-center text-neutral-600">or</p>
                  </div>
                )}

                <Button variant="solid" color="red" onClick={handleLogout}>
                  <Link href={""}>Logout</Link>{" "}
                </Button>
              </div>
            </div>
          </aside>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
