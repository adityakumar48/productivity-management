import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div>
      <Link href="/api/auth/signin">Login</Link>
    </div>
  );
};

export default HeroSection;
