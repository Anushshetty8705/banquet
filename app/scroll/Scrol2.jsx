"use client";

import { useEffect, useRef, useState } from "react";

export default function Scrol2() {
  const images = [
    "https://picsum.photos/id/1015/1200/800",
    "https://picsum.photos/id/1016/1200/800",
    "https://picsum.photos/id/1018/1200/800",
    "https://picsum.photos/id/1020/1200/800",
    "https://picsum.photos/id/1024/1200/800",
    "https://picsum.photos/id/1025/1200/800",
    "https://picsum.photos/id/1031/1200/800",
    "https://picsum.photos/id/1035/1200/800",
    "https://picsum.photos/id/1037/1200/800",
    "https://picsum.photos/id/1041/1200/800",
    "https://picsum.photos/id/1043/1200/800",
    "https://picsum.photos/id/1050/1200/800",
  ];

  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(5);

  useEffect(() => {
    function calc() {
      const el = containerRef.current;
      if (!el) return;
      const cw = el.clientWidth;
      const imgW = window.innerWidth * 0.2;
      const vis = Math.max(1, Math.floor(cw / imgW));
      setVisible(vis);
      setIndex((i) => Math.min(i, Math.max(0, images.length - vis)));
    }

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const maxIndex = Math.ceil(images.length / visible) - 1;

  function go(delta) {
    setIndex((i) => {
      const ni = Math.min(maxIndex, Math.max(0, i + delta));
      return ni;
    });
  }

  const translateX = `calc(-1 * ${index * visible} * (20vw + 12px))`;

  return (
    <div className="w-full">
      {/* ROOMS div permanently visible */}
      <div className="flex justify-start items-center mb-2 font-bold text-lg">ROOMS</div>

      <div className="relative group">
        {/* Left/Right buttons, hidden by default, show on hover */}
        <button
          aria-label="scroll-left"
          onClick={() => go(-1)}
          disabled={index <= 0}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full shadow-lg focus:outline-none disabled:opacity-40 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          ◀
        </button>

        <button
          aria-label="scroll-right"
          onClick={() => go(1)}
          disabled={index >= maxIndex}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full shadow-lg focus:outline-none disabled:opacity-40 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          ▶
        </button>

        <div ref={containerRef} className="w-full h-[30vh] overflow-hidden">
          <div className="flex items-center h-full transition-transform duration-500" style={{ transform: `translateX(${translateX})` }}>
            {images.map((src, i) => (
              <div key={i} className="flex-shrink-0 mr-3" style={{ width: "20vw", height: "30vh" }}>
                <img src={src} alt={`pic-${i}`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} draggable={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
