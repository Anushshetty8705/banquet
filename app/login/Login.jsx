"use client";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Eye, EyeOff, User, Lock } from "lucide-react"; // added User + Lock icons

import Link from "next/link";


const Login = () => {
    const { data: session, status } = useSession();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [logemailerror, setlogemailerror] = useState("");
  const [logpasserror, setlogpasserror] = useState("");
const [ShowPasword, setShowPasword] = useState(false)
  const valloginEmail = (e) => {
    console.log(e.target.value);
    setLoginEmail(e.target.value);
    if (e.target.value.length < 8) setlogemailerror("email must be 8 char");
    else if (!e.target.value.endsWith("@gmail.com"))
      setlogemailerror("Invalid email (must end with @gmail.com)");
    else setlogemailerror("");
  };

  const valloginPassword = (e) => {
    setLoginPassword(e.target.value);
    if (e.target.value.length < 8) setlogpasserror("password must be 8 char");
    else setlogpasserror("");
  };
   if (status === "loading") {
   
  return null; // or a spinner, or nothing
}
if (status === "authenticated") {
  
  // Access session.user properties like session.user.email
}

  return (
    <>
      <div className="h-full w-1/2 flex flex-col items-center  justify-center relative  ">
        <div className="text-white text-4xl font-semibold mb-4 relative  ">LOGIN</div>
        <div className="w-[80%]  relative">
          <input
            value={loginEmail}
            onChange={(e) => valloginEmail(e)}
            type="email"
            placeholder=" Email"
            className="bg-white/20 w-[100%] py-2 rounded-xl px-10 relative placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <div className="text-red-600">{logemailerror}</div>
        </div>
        <div className="w-[80%] mb-4 relative">
          <button onClick={()=>setShowPasword(!ShowPasword)} className="relative cursor-pointer left-70 text-gray-300  top-8">
          {ShowPasword ? <EyeOff size={18} /> : <Eye size={18}  />}
             </button>
          <input
            value={loginPassword}
            onChange={(e) => valloginPassword(e)}
            type={ShowPasword?"text":"password"}
            placeholder="Password"
            className="bg-white/20 w-[100%] py-2 rounded-xl px-10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 relative"
          />
          
       <div className="text-red-600 inset-0">{logpasserror}</div>
        </div>
        <Link href={"/Forgot"}><div className="text-gray-300 hover:text-white cursor-pointer">Froget Password?</div></Link>
        <button
          onClick={() => setVisible(false)}
          className="bg-gradient-to-r from-red-400 to-pink-500 hover:opacity-90 w-[60%] py-2.5 text-white rounded-2xl text-xl"
        >
          Login In
        </button>

        <div className="text-white/80"> or continue with</div>
        <div className="flex gap-3">
          {!session ? (
        <div className="h-20 w-20 bg-amber-700 flex items-center justify-center">
          <button onClick={() => signIn("github")}>
          
          </button>
        </div>
      ) : null}

          <div className="h-10 w-10 bg-amber-400"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
