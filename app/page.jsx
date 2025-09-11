"use client";
import Main from "./Login/Main";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const images = [
    "https://picsum.photos/id/1015/1200/800",
    "https://picsum.photos/id/1016/1200/800",
    "https://picsum.photos/id/1018/1200/800",
    "/bh.jpeg",
    "https://picsum.photos/id/1024/1200/800",
    "https://picsum.photos/id/1027/1200/800",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
// for login register visibility
const [Visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const totalImages = images.length;

    if (currentIndex >= totalImages) {
      track.style.transition = "none";
      setCurrentIndex(1);
      track.style.transform = "translateX(-100%)";
      track.offsetHeight; // force reflow
      track.style.transition = "transform 0.5s ease-in-out";
    }
  }, [currentIndex, images.length]);

  const carouselImages = [...images, images[0]];

  return (
    <>
      {/* Carousel Container */}
      <div  className="w-full h-[95vh] overflow-hidden relative">
     
        {/* Image Track */}
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`img${index}`}
              className={Visible ?"w-full h-screen object-cover flex-shrink-0 blur-[50px]":"w-full h-screen object-cover flex-shrink-0 "}
            />
          ))}
        </div>

        {/* Overlay */}
       <div className="absolute top-0 left-0 w-full h-full bg-black/30 "></div>

        {/* Navigation Bar */}
        <nav className={ Visible ? "absolute top-5 left-1/2 transform -translate-x-1/2 w-5/6 flex justify-between items-center text-white z-10 pointer-events-none blur-[1px]" :"absolute top-5 left-1/2 transform -translate-x-1/2 w-5/6 flex justify-between items-center text-white z-10" } >
          <div className="text-2xl font-bold text-black">ICON</div>
          <ul className="flex gap-8 text-xl">
            <li><Link href="/homepage" className="hover:underline">HOME</Link></li>
            <li><Link href="/gallarypage" className="hover:underline">GALLERY</Link></li>
            <li><Link href="/contactpage" className="hover:underline">CONTACT US</Link></li>
            <li><Link href="/aboutpage" className="hover:underline">ABOUT US</Link></li>
          </ul>
        </nav>

        {/* Hero Section */}
        <div className={ Visible ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 flex flex-col items-start gap-4 text-white z-10 pointer-events-none blur-[3px]" :"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 flex flex-col items-start gap-4 text-white z-10"}>
          <h1 className="text-6xl md:text-8xl font-bold">GRAND</h1>
          <h1 className="text-6xl md:text-8xl font-bold">PEARL.</h1>

            <button onClick={() =>setVisible(true)} className="mt-4 text-2xl bg-neutral-600 rounded-3xl px-10 py-5 hover:bg-neutral-700 transition">
              BOOK NOW
            </button>
         
        </div>
      </div>
     {Visible && <div className="absolute inset-0 flex items-center justify-center h-screen">
  <Main  Visible={Visible} setVisible={setVisible}/></div>} 



    </>
  );
}
