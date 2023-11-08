import Link from "next/link";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="pt-[10vh] heroLinear ">
      <div className="md:flex  md:h-[90vh]  md:max-h-[90vh] justify-between  w-full md:flex-row flex-row-reverse  items-center flex-wrap px-8 md:px-20">
        <div className="flex-1 md:pl-8">
          <div className="text-4xl md:text-7xl text-neutral-800  font-extrabold font-poppins leading-tight">
            <h1>
              <span>Your</span> Time.
            </h1>
            <h1>
              <span>Your</span> Goals.
            </h1>
            <h1>
              <span>You&apos;re</span> the Boss.
            </h1>
          </div>
          <div className="pl-2">
            <p className=" pt-2 text-xl text-neutral-500 font-medium font-poppins">
              Start and stop when you want...
            </p>
            <p className="w-4/5 pt-2 text-neutral-400 ">
              Welcome to ProductivityHub 🚀 – Your all-in-one productivity
              management platform. Take control of your daily life, track your
              time efficiently, and supercharge your productivity. With sleek
              design and robust features, ProductivityHub helps you visualize
              and optimize your tasks, making every moment count. Join us on the
              journey to a more productive and fulfilling life!
            </p>
            <div className="pt-4 ">
              <p className="font-semibold tracking-wide font-poppins text-sm ">
                Registration Free Let’s onboard
              </p>
              <button className="bg-[#8352FD] text-white bg-opacity-80 px-5 py-2 rounded-md mt-2 ">
                <Link
                  href="/api/auth/signin"
                  className="flex items-center gap-3"
                >
                  <span className="font-semibold tracking-wide  font-poppins ">
                    {" "}
                    Get Started
                  </span>{" "}
                  <AiOutlineArrowRight />
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 md:py-0  py-12  ">
          {/* Right Side */}
          <Image
            width={500}
            height={500}
            quality={100}
            priority={true}
            src="/Right side Img.png"
            style={{ objectFit: "contain" }}
            alt="logo"
            className="w-full   "
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
