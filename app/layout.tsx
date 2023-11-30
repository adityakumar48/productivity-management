import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import AuthProvider from "./auth/Provider";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "Productivity Hub",
  description: " A productivity Hub to manage your tasks and time. ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <AuthProvider>
          <Theme>
            {" "}
            <main className="md:flex block">
              <div>
                <Sidebar />
              </div>
              <main className="md:w-[80%] md:ml-[20%]">
                <Navbar />
                {children}
              </main>
            </main>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
