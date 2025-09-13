"use client";
import { Eye, EyeOff, User, Lock } from "lucide-react"; // added User + Lock icons

import React, { useState } from "react";

const Register = ({ Visible, setVisible }) => {
      const [registerusername, setregisterusername] = useState("");
           const [registeremail, setregisteremail] = useState("");
           const [registerpassword, setregisterpassword] = useState("");
           const [regusererror, setregusererror] = useState("")
           const [regemailerror, setregemailerror] = useState("")
           const [regpasserror, setregpasserror] = useState("")
             const [isValid, setIsValid] = useState(false);
           
         
         
         
            const valregisterusername = (e) => {
             setregisterusername(e.target.value);
             if(e.target.value.length<5)
               setregusererror("username must be 5 char")
             
             else
               setregusererror("");
           }
         
         
         
           const valregisteremail = (e) => {
             setregisteremail(e.target.value);
              if(e.target.value.length<8)
               setregemailerror("email must be 8 char")
              else if(!e.target.value.endsWith("@gmail.com"))
               setregemailerror("Invalid email (must end with @gmail.com)");
             else
               setregemailerror("");
           }
         
           const valregisterpassword = (e) => {
             setregisterpassword(e.target.value);
             if(e.target.value.length<8)
               setregpasserror("password must be 8 char")
         
             else
               setregpasserror("");
         
           }
  return (
<>
 <div className="h-full w-1/2 flex flex-col items-center justify-center relative  gap-2 ">
          <div className="text-white text-3xl font-semibold mb-6 ">
            REGISTER
          </div>
          <div className="w-[80%] mb-4 relative">
            <input
              type="text"
              placeholder=" Name"
              value={registerusername}
              onChange={(e) => valregisterusername(e)}
              className="bg-white/20 w-[100%] py-2 relative placeholder-gray-300  rounded-xl px-10 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <User className="absolute left-4 top-3 text-gray-300" size={18} />
            <div className="text-red-400 ">{regusererror}</div>
          </div>
          <div className="w-[80%] mb-4 relative">
            <input
              value={registeremail}
              type="email"
              placeholder=" Email"
              onChange={(e) => valregisteremail(e)}
              className="bg-white/20  relative w-[100%] py-2 placeholder-gray-300 rounded-xl px-10 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
                      <Lock className="absolute left-4 top-3 text-gray-300" size={18} />
            
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
                                  <Lock className="absolute left-4 top-3 text-gray-300" size={18} />

            <div className="text-red-400 ">{regpasserror}</div>
          </div>
          <button onClick={() => setVisible(false)} className="bg-gradient-to-r from-red-400 to-pink-500 hover:opacity-90 w-[60%] py-2.5 text-white rounded-2xl text-xl">
            Register
          </button>
          <div className="text-white/80">or continue with</div>
          <div className="flex gap-3">
            <div className="h-10 w-10 bg-amber-400"></div>
            <div className="h-10 w-10 bg-amber-400"></div>
          </div>
        </div>
</>
  )
}

export default Register
