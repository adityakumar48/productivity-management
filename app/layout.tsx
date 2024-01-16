import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import AuthProvider from "./auth/Provider";
import Auth from "./auth/Auth";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://productivity-management.vercel.app/"),
  title: "Productivity Hub",
  description: " A productivity Hub to manage your tasks and time.",
  authors: {
    name: "Visinigiri Aditya",
    url: "https://visinigiri-aditya.vercel.app/",
  },
  openGraph: {
    title: "Productivity Hub",
    description: " A productivity Hub to manage your tasks and time.",
    type: "website",
    url: "https://productivity-hub.vercel.app/",
    images: "https://productivity-hub.vercel.app/PHLogo.png",
    siteName: "Productivity Hub",
    locale: "en_US",
  },

  twitter: {
    site: "https://productivity-hub.vercel.app/",
    card: "summary_large_image",
    title: "Productivity Hub",
    creator: "@VisinigiriAdit1",
    description: " A productivity Hub to manage your tasks and time.",
    images: "https://productivity-hub.vercel.app/PHLogo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <AuthProvider>
          <Theme>
            <Auth>{children}</Auth>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
