import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const sidebarItems = [
  {
    Focus: {
      name: "Focus",
      data: [
        {
          name: "Task",

          href: "/Task",
        },
        {
          name: "Notes",

          href: "/notes",
        },
        {
          name: "Calendar",

          href: "/calendar",
        },
      ],
    },
    Timer: {
      name: "Timer",
      data: [
        {
          name: "Timer",

          href: "/timer",
        },
      ],
    },
    Reminder: {
      name: "Reminder",
      data: [
        {
          name: "Reminder",

          href: "/reminder",
        },
      ],
    },
    Statistics: {
      name: "Statistics",
      data: [
        {
          name: "Statistics",

          href: "/statistics",
        },
      ],
    },
    Addons: {
      name: "Addons",
      data: [
        {
          name: "Contact Book",

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
              <Skeleton width={200} />
            </h2>
            {/* @ts-ignore */}
            {item[props.heading].data.map((item, index) => (
              <li key={index}>
                <Skeleton
                  width={150}
                  className="flex items-center space-x-1 pl-3 pb-1 text-lg hover:text-[#6963b0] transition-colors duration-200 ease-in-out "
                />
              </li>
            ))}
          </div>
        );
      })}
    </>
  );
};

const ReminderLoading = () => {
  return (
    <>
      <main className="flex">
        <aside className="w-[20%] bg-slate-100 min-h-screen md:left-0 md:absolute  ">
          <aside className="">
            <h1 className="font-poppins tracking-wide text-2xl pl-6 pt-10 text-gray-600 font-bold">
              <Skeleton width={200} />
            </h1>

            <ul>
              {sidebarHeadings.map((heading, index) => (
                <div key={index}>
                  <ItemHeading
                    heading={heading}
                    number={sidebarHeadings.length}
                  />
                </div>
              ))}
            </ul>
          </aside>
        </aside>

        <main className="w-[70%] ">
          <div className="mx-16 h-[10vh] w-full flex justify-between items-center ">
            <Skeleton width={100} height={25} />
            <div className="flex">
              <div>
                <Skeleton width={200} />
                <Skeleton width={100} />
              </div>
              <div className="ml-5">
                {/* avatar skeleton */}
                <Skeleton circle={true} height={40} width={40} />
              </div>
            </div>
          </div>
          <div className={`pt-5 mx-16`}>
            <p className=" pl-1 py-2 text-sm tracking-wide text-gray-400">
              <Skeleton height={40} width={120} />
            </p>

            <Skeleton width={200} />

            <div className="pt-8 flex gap-2">
              <Skeleton height={40} width={180} />
              <Skeleton height={40} width={100} />
            </div>

            <div className="mt-8 flex justify-center items-center">
              <Skeleton width={800} height={2} />
            </div>

            <div className="pt-5">
              <Skeleton width={200} height={30} />
            </div>

            <div className="flex justify-between mt-5 items-center gap-4 mx-5">
              <Skeleton width={300} height={300} borderRadius={5} />
              <Skeleton width={300} height={300} borderRadius={5} />
              <Skeleton width={300} height={300} borderRadius={5} />
            </div>
          </div>
        </main>
      </main>
    </>
  );
};

export default ReminderLoading;
