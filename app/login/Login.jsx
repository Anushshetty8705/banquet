"use client";
import React, { useState } from "react";


const Login = ({ Visible, setVisible }) => {
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [logemailerror, setlogemailerror] = useState("");
  const [logpasserror, setlogpasserror] = useState("");




  const valloginEmail = (e) => {
    setLoginEmail(e.target.value);
   if(e.target.value.length<8)
      setlogemailerror("email must be 8 char")
    else if(!e.target.value.endsWith("@gmail.com"))
      setlogemailerror("Invalid email (must end with @gmail.com)");
    else
      setlogemailerror("");
  }




  const valloginPassword = (e) => {
    setLoginPassword(e.target.value);
   if(e.target.value.length<8)
      setlogpasserror("password must be 8 char")

    else
      setlogpasserror("");
  }

  return (
<>
<div className="h-full w-1/2 flex flex-col items-center  justify-center  gap-3 ">
          <div className="text-black text-4xl font-semibold mb-8 ">LOGIN</div>
          <div className="w-[80%] mb-8">
            <input
              value={loginEmail}
              onChange={(e) => valloginEmail(e)}
              type="email"
              placeholder=" Email"
              className="bg-gray-400/60 w-[100%] py-2.5 rounded-xl px-3 focus:outline-none"
            />
            <div className="text-red-600">{logemailerror}</div>
          </div>
          <div className="w-[80%] mb-8">
            <input
              value={loginPassword}
              onChange={(e) => valloginPassword(e)}
              type="password"
              placeholder="Password"
              className="bg-gray-400/60 w-[100%] py-2.5 rounded-xl px-3 focus:outline-none"
            />
            <div className="text-red-600">{logpasserror}</div>
          </div>
          <div className="text-gray-500">Froget Password?</div>
          <button onClick={() => setVisible(false)} className="bg-purple-500 w-[60%] py-2.5 text-white rounded-2xl text-xl">
            Login In
          </button>
          <div className="text-gray-500">or continue with</div>
          <div className="flex gap-3">
            <div className="h-10 w-10 bg-amber-400"></div>
            <div className="h-10 w-10 bg-amber-400"></div>
          </div>
        </div>
</>
  )
}

export default Login
