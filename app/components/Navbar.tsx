"use client";
import { Avatar, DropdownMenu, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
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
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  const randomGreeting =
    greetingData[Math.floor(Math.random() * greetingData.length)];

  return (
    <nav className="container">
      <div className="md:flex  h-[10vh] my-5 md:my-0 items-center justify-between px-4 md:px-8 ">
        <div className="logo">
          <h1 className="text-xl font-bold font-poppins">
            {" "}
            {randomGreeting}, {session?.user?.name?.split(" ")[0]} 👋
          </h1>
        </div>

        <div className="logo flex items-center md:pt-0 pt-5 md:flex-row justify-end md:justify-normal flex-row-reverse gap-4">
          <DateTime />
          <div className="">
            {status === "authenticated" ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback="?"
                    radius="full"
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size={"2"}>{session.user!.name}</Text>{" "}
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <a href="/api/auth/signout">Sign out</a>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
