import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextAuthProvider as SessionProvider } from "./component/Sessionprovider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VenueVista - Your occasion, our perfection",
  description:
    "A system to automate hall bookings, event scheduling, and payment tracking for efficient management and improved customer experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
      >
        <link rel="icon" href="/logo.jpg" />
        <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
