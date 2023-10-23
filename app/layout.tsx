import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <Theme>
          <main className="flex">
            <aside className="w-[20%] bg-slate-100 min-h-screen fixed  ">
              <Sidebar />
            </aside>
            <main className="w-[80%] ml-[20%]">
              <Navbar />
              {children}
            </main>
          </main>
        </Theme>
      </body>
    </html>
  );
}
