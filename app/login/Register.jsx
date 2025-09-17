"use client";
import { Eye, EyeOff, User, Lock, Link } from "lucide-react"; // added User + Lock icons
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Register = () => {
  const { data: session, status } = useSession();
  const [registerusername, setregisterusername] = useState("");
  const [registeremail, setregisteremail] = useState("");
  const [registerpassword, setregisterpassword] = useState("");
  const [regusererror, setregusererror] = useState("");
  const [regemailerror, setregemailerror] = useState("");
  const [regpasserror, setregpasserror] = useState("");
  const [otp, setotp] = useState("");
  const [visotp, setvisotp] = useState(false);

  const valregisterusername = (e) => {
    setregisterusername(e.target.value);
    if (e.target.value.length < 5) setregusererror("username must be 5 char");
    else setregusererror("");
  };

  const valregisteremail = (e) => {
    setregisteremail(e.target.value);
    if (e.target.value.length < 8) setregemailerror("email must be 8 char");
    else if (!e.target.value.endsWith("@gmail.com"))
      setregemailerror("Invalid email (must end with @gmail.com)");
    else setregemailerror("");
  };

  const valregisterpassword = (e) => {
    setregisterpassword(e.target.value);
    if (e.target.value.length < 8) setregpasserror("password must be 8 char");
    else setregpasserror("");
  };
  const valotp = (e) => {
    
    setotp(e.target.value);
  }   
  //  otpsending
  const sendOtp = async () => {
    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // 👈 fix
      body: JSON.stringify({ email: registeremail }),
    });

    if (res.ok) {
      alert("OTP sent to your email ✅");
      setvisotp(true)
    } else {
      alert("Failed to send OTP ❌");
    }
  };

  // verify otp
  const verifyOtp = async () => {
    console.log("verifying otp", otp);
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // 👈 fix
      body: JSON.stringify({ email: registeremail, otp }),
    });

    const data = await res.json();
    {setvisotp(false)}
    alert(data.message); // will show "OTP verified ✅" or "Invalid OTP ❌"
  };
  const router = useRouter();
  if (status === "loading") return null;
  if (status === "authenticated") {
     signOut("facebook")
    // router.push("/dashboard");

    return null;
  }

  return (
    <>
      <div className="h-full w-1/2 flex flex-col items-center justify-center relative  gap-2 ">
        <div className="text-white text-3xl font-semibold mb-6 ">REGISTER</div>
        <div className="w-[80%] mb-4 relative">
          <input
            type="text"
            placeholder=" Name"
            value={registerusername}
            onChange={(e) => valregisterusername(e)}
            className="bg-white/20 w-[100%] py-2 relative placeholder-gray-300  rounded-xl px-10 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <User className="absolute left-3 top-2 text-gray-300" size={16} />
          <div className="text-red-400 ">{regusererror}</div>
        </div>
        <div className="w-[80%] mb-4 relative">
          <div className="relative flex gap-2">
            {visotp ? (
              <>
               <input
                value={otp}
                type="tel"
                placeholder=" OTP"
                onChange={(e) => valotp(e)}
                className="bg-white/20  relative w-[80%] py-2 placeholder-gray-300 rounded-xl px-10 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              
           
              <button
              onClick={verifyOtp}
              className="  px-3 py-2 rounded-xl text-white text-[12px] bg-gradient-to-r from-red-400 to-pink-500 hover:opacity-90"
            >
              Verify
            </button>
            </>
            ) : (
              <>
         <input
                value={registeremail}
                type="email"
                placeholder=" Email"
                onChange={(e) => valregisteremail(e)}
                className="bg-white/20  relative w-[80%] py-2 placeholder-gray-300 rounded-xl px-10 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
                 <button
              onClick={sendOtp}
              className="  px-3 py-2 rounded-xl text-white text-[12px] bg-gradient-to-r from-red-400 to-pink-500 hover:opacity-90"
            >
              Send
            </button>
             
                  </>
            )}

           
          </div>

          <User className="absolute left-3 top-2 text-gray-300" size={16} />

          <div className="text-red-400 ">{regemailerror}</div>
        </div>
        <div className="w-[80%] mb-4 relative">
          <input
            value={registerpassword}
            type="password"
            placeholder="Password"
            onChange={(e) => valregisterpassword(e)}
            className=" relative bg-white/20 w-[100%] py-2 rounded-xl placeholder-gray-300 px-10 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <Lock className="absolute left-3 top-2 text-gray-300" size={18} />

          <div className="text-red-400 ">{regpasserror}</div>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="bg-gradient-to-r from-red-400 to-pink-500 hover:opacity-90 w-[60%] py-2.5 text-white rounded-2xl text-xl"
        >
          Register
        </button>
        <div className="text-white/80">or continue with</div>
        <div className="flex gap-3">
          {!session && (
            <>
              <div className=" flex items-center justify-center">
                <button onClick={() => signIn("github")}>
                  
                  <FaGithub
                    className="hi bg-gray-200/10 p-2 rounded-full text-white/80 hover:bg-gray-800"
                    size={24}
                  />
                </button>
                <button onClick={() => signIn("google")}>
                
                  <FaGoogle
                    className="hi bg-gray-200/10 p-2 rounded-full text-white/80 hover:bg-gray-800"
                    size={24}
                  />
                </button>
                <button onClick={() => signIn("facebook")}>
                  <FaFacebookF
                    className="hi bg-gray-200/10 p-2 rounded-full text-white/80 hover:bg-gray-800"
                    size={24}
                  />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
