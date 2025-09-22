"use client"
import "./globals.css";
import { NextAuthProvider as SessionProvider } from "./component/Sessionprovider";
import { ToastContainer, Flip} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased relative min-h-screen"
      >
        <link rel="icon" href="/logo.jpg" />
        <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
        <SessionProvider>
          {children}
         <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Flip}
/>
        </SessionProvider>
      </body>
    </html>
  );
}
