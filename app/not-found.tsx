"use client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center gap-4 items-center h-screen  flex-col">
      <div className="text-center">
        <h2 className="font-bold text-4xl md:text-7xl font-poppins">
          404 Not Found
        </h2>
        <p>Could not find requested resource</p>
      </div>
      <Button variant="soft" className="">
        <Link href="/" color="purple">
          Return Home
        </Link>
      </Button>
    </div>
  );
}
