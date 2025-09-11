"use client";
import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";



const Page = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex items-center justify-center h-screen">
      {/* Container with two equal halves */}
      <div className="h-[70vh] w-[50vw] flex relative rounded-4xl bg-white overflow-hidden">
       <Register/>
        <Login/>

        <div
          className={`absolute top-0 h-full w-1/2 bg-purple-500 cursor-pointer transition-all duration-500
            ${active === 0 ? "rounded-r-[70px]" : "rounded-l-[70px]"}
          `}
          style={{ left: active === 0 ? "0" : "25vw" }}
        >
          {active === 0 ? (
            <div className="flex flex-col items-center justify-center  h-full gap-3">
              <span className="text-white text-4xl">Hello,Welcome</span>
              <span className="text-white">Don't have a account?</span>
              <button
                className="border border-white px-12 py-2 rounded-full text-white bg-gray-500 text-xl hover:bg-gray-700"
                onClick={() => setActive(1)}
              >
                Register
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center  h-full gap-3">
              <span className="text-white text-4xl">Welcome back</span>
              <span className="text-white"> Alerady have a acoount</span>
              <button
                className="border border-white px-12 py-2 rounded-full text-white bg-gray-500 text-xl hover:bg-gray-700"
                onClick={() => setActive(0)}
              >
                login in
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
