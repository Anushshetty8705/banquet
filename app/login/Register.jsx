"use client";
import React, { useState } from "react";

const Register = () => {
      const [registerusername, setregisterusername] = useState("");
      const [registeremail, setregisteremail] = useState("");
      const [registerpassword, setregisterpassword] = useState("");
      const [regusererror, setregusererror] = useState("")
      const [regemailerror, setregemailerror] = useState("")
      const [regpasserror, setregpasserror] = useState("")
    
    
    
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
 <div className="h-full w-1/2 flex flex-col items-center top-20 relative  gap-3 ">
          <div className="text-black text-4xl font-semibold mb-8 ">
            REGISTER
          </div>
          <div className="w-[80%] mb-8">
            <input
              type="text"
              placeholder=" Name"
              value={registerusername}
              onChange={(e) => valregisterusername(e)}
              className="bg-gray-400/60 w-[100%] py-2.5 rounded-xl px-3 focus:outline-none"
            />
            <div className="text-red-600">{regusererror}</div>
          </div>
          <div className="w-[80%] mb-8">
            <input
              value={registeremail}
              type="email"
              placeholder=" Email"
              onChange={(e) => valregisteremail(e)}
              className="bg-gray-400/60 w-[100%] py-2.5 rounded-xl px-3 focus:outline-none"
            />
            <div className="text-red-600">{regemailerror}</div>
          </div>
          <div className="w-[80%] mb-8">
            <input
              value={registerpassword}
              type="password"
              placeholder="Password"
              onChange={(e) => valregisterpassword(e)}
              className="bg-gray-400/60 w-[100%] py-2.5 rounded-xl px-3 focus:outline-none"
            />
            <div className="text-red-600">{regpasserror}</div>
          </div>
          <button className="bg-purple-500 w-[60%] py-2.5 text-white rounded-2xl text-xl">
            Register
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

export default Register
