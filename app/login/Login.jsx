"use client";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Eye, EyeOff, User } from "lucide-react";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Login = () => {
  const { data: session, status } = useSession();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [logemailerror, setlogemailerror] = useState("");
  const [logpasserror, setlogpasserror] = useState("");
  const [ShowPasword, setShowPasword] = useState(false);

  const valloginEmail = (e) => {
    setLoginEmail(e.target.value);
    if (e.target.value.length < 8) setlogemailerror("Email must be at least 8 chars");
    else if (!e.target.value.endsWith("@gmail.com"))
      setlogemailerror("Invalid email (must end with @gmail.com)");
    else setlogemailerror("");
  };

  const valloginPassword = (e) => {
    setLoginPassword(e.target.value);
    if (e.target.value.length < 8) setlogpasserror("Password must be at least 8 chars");
    else setlogpasserror("");
  };
const router = useRouter();
  if (status === "loading") return null;
if (status === "authenticated") {
  // router.push("/dashboard");
  return null;
}

  return (
    <div className="h-full w-1/2 flex flex-col items-center justify-center">
      <div className="text-white text-4xl font-semibold mb-4">LOGIN</div>

      {/* Email */}
      <div className="w-[80%] mb-4 relative">
        <input
          value={loginEmail}
          onChange={valloginEmail}
          type="email"
          placeholder="Email"
          className="bg-white/20 w-full py-2 rounded-xl px-10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <div className="text-red-600">{logemailerror}</div>
      </div>

      {/* Password */}
      <div className="w-[80%] mb-4 relative">
        <input
          value={loginPassword}
          onChange={valloginPassword}
          type={ShowPasword ? "text" : "password"}
          placeholder="Password"
          className="bg-white/20 w-full py-2 rounded-xl px-10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          type="button"
          onClick={() => setShowPasword(!ShowPasword)}
          className="absolute right-3 top-2 text-gray-300"
        >
          {ShowPasword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        <div>
           <p className="text-red-400 text-xs mt-1">{logpasserror}</p>
        </div>
      </div>

      <Link href="/Forgot" className="text-gray-300 hover:text-white mb-4">
        Forgot Password?
      </Link>

      <button
        className="bg-gradient-to-r from-red-400 to-pink-500 hover:opacity-90 w-[60%] py-2.5 text-white rounded-2xl text-xl"
      >
        Login
      </button>

      <div className="text-white/80 my-4">or continue with</div>

      <div className="flex gap-3">
        {!session && 
          <>
            <div className=" flex items-center justify-center">
            
            <button onClick={() => signIn("github")}>  <FaGithub className="hi bg-gray-200/10 p-2 rounded-full text-white/80 hover:bg-gray-800" size={24} /></button>
            <button onClick={() => signIn("google")}>  <FaGoogle className="hi bg-gray-200/10 p-2 rounded-full text-white/80 hover:bg-gray-800" size={24} /></button>
            <button onClick={() => signIn("facebook")}>  <FaFacebookF className="hi bg-gray-200/10 p-2 rounded-full text-white/80 hover:bg-gray-800" size={24} /></button>

          </div>
            </>
         
        }
      </div>
    </div>
  );
};

export default Login;
