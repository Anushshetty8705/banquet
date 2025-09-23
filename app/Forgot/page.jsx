"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, KeyRound, Mail,Hash} from "lucide-react"; // added User + Lock icons
import { toast, Flip } from "react-toastify";//TOAST

const Page = () => {
  const [EMAIL, setEMAIL] = useState("");//FOR EMAIL
  const [EMAILERROR, setEMAILERROR] = useState("");// FOR EMAIL ERROR
  const [OTPBOX, setOTPBOX] = useState(false);// TO SHOW OTP INPUT BOX
  const [ISVALID, setISVALID] = useState(false);//FOR LOGIN BUTTON
  const [otpvalid, setotpvalid] = useState(false);//FOR CEHCKING OTP VALID FOR INPUT BOX AND VERIFY
 const [otp, setotp] = useState("");// FOR OTP
  const [validotp, setvalidotp] = useState(false)//to check email ADDRESS and send otp BUTTTON
const [verifiedEmail, setVerifiedEmail] = useState("");// TO STORE  THE VALUE OF OTP EMAIL

    const [ShowPasword, setShowPasword] = useState(false)//SHOW AND HIDE PASSWORD
const [showConfirmPassword, setshowConfirmPassword] = useState(false)//SHOW AND HIDE CONFIRM PASSWORD


  const [loginPassword, setLoginPassword] = useState("");//FOR PASSWORD
const [PASSWORDERROR, setPASSWORDERROR] = useState("");
const [ISVALID_PASS, setISVALID_PASS] = useState(false)


const [confirmPassword, setconfirmPassword] = useState("")
const [confirmpasserror, setconfirmpasserror] = useState("")
const [ISVALIDconfirmpass, setISVALIDconfirmpass] = useState(false)

// SETTING EMAIL AND ERROR
  const valEMAIL = (e) => {
    setEMAIL(e.target.value);
    if (e.target.value.length < 8) {
      setISVALID(false);
      setotpvalid(false);
      setEMAILERROR("email must be 8 char");
    } else if (!e.target.value.endsWith("@gmail.com")) {
      setISVALID(false);
      setotpvalid(false);

      setEMAILERROR("Invalid email (must end with @gmail.com)");
    } else {
      setISVALID(true);
      setEMAILERROR("");
      setotpvalid(true);
    }
  };
  
// SETTING OTP VALIDOTP
   const valotp = (e) => {
    setotp(e.target.value);
    if(e.target.value.length ===6 ){
       setvalidotp(true)
    }
    else{
       setvalidotp(false)
    }
  };

// CONFIRM PASSWORD
  const confirmpass =(e) => {
     setconfirmPassword(e.target.value);
    if (e.target.value.length < 8)
    {
setISVALIDconfirmpass(false)
      setconfirmpasserror("Password must be at least 8 chars");
       setISVALID(false);
    }
  //  else if(loginPassword!==e.target.value){
  //     setconfirmpasserror("Password don't match");
  //  }
    else{
      setISVALIDconfirmpass(true)
      setconfirmpasserror("");
      // setvalidcred(true)
       setISVALID(true);
    } 
  }
  

// PASSWORD
  const PASSWORD = (e) => {
    setLoginPassword(e.target.value);
    if (e.target.value.length < 8)
    {
setISVALID_PASS(false)
setISVALID(false)
      setPASSWORDERROR("Password must be at least 8 chars");
      // setvalidcred(false)
    }
    else{
      setISVALID_PASS(true)
      setPASSWORDERROR("");
      // setvalidcred(true)
      setISVALID(true)

    } 
  };

// SENDING OTP
   const sendOtp = async () => {
    if (EMAIL.length > 8 && EMAIL.endsWith("@gmail.com")) {
      try {
        setVerifiedEmail(EMAIL); // only this email is marked verified
  
        const res = await fetch("/api/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: EMAIL }),
        });
  
        if (res.ok) {
          toast.success("OTP sent successfully 📧", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            transition: Flip,
          });
          setOTPBOX(true);
        } else {
          toast.error("Failed to send OTP ❌", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            transition: Flip,
          });
        }
      } catch (err) {
      
        toast.error("Something went wrong ❌", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          transition: Flip,
        });
      }
    }
  };


  // VERIFYING OTP
   const verifyOtp = async () => {
      if (otp.length === 6) {
       
        const res = await fetch("/api/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" }, // 👈 fix
          body: JSON.stringify({ email: EMAIL, otp }),
        });
     
        const data = await res.json();
        {
          setOTPBOX(false);
        }
      
      toast.success("Email verfied")
     
      }
  
      // will show "OTP verified ✅" or "Invalid OTP ❌"
    };


//TO CHANGE PASSWORD
    const SUBMIT = () => {
        if (EMAIL.length === 0) {
          setEMAILERROR("* This field is required");
          setISVALID(false);
        }
    
        if (confirmPassword.length == 0) {
          setISVALID(false);
          setconfirmpasserror("* This field is required");
        }
        if (loginPassword.length == 0) {
          setISVALID(false);
          setPASSWORDERROR("* This field is required");
        }
        if (EMAIL !== verifiedEmail) {
      toast.error("Please verify your current email before registering ❌");
      return; // stop registration
    }
    
        if (
          EMAIL.length > 8 &&
          loginPassword.length > 8 &&
          confirmPassword.length > 8 &&
          EMAIL.endsWith("@gmail.com") &&
          verifiedEmail === EMAIL
        ) {
          try{
              toast.success("Registration sucessfull")
          }
          catch{
              toast.error("something went Wrong")
            }
      
        }
      };


  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-[90%] sm:w-[400px] flex flex-col items-center">
        <h1 className="text-white text-3xl font-semibold mb-6">
          Reset Password
        </h1>

      
        <div className="w-full mb-4 relative">
          <p className="text-white mr-40 text-sm pb-1">
            Enter your {OTPBOX ? "OTP" : "Email"}
          </p>

          <div className="relative flex gap-2">
            {OTPBOX ? (
              <>
              {/* OTP */}
                <input
                  value={otp}
                  type="tel"
                  placeholder=" OTP"
                  onChange={(e) => valotp(e)}
                   className={`bg-white/20 text-white relative w-[85%]  placeholder-gray-300 rounded-xl px-10 focus:outline-none focus:ring-2 ${!validotp ? " focus:ring-red-400" : " focus:ring-green-400"}` }
                
                />
{/* VERIFY */}
                <button
                  onClick={verifyOtp}
                  className={`px-3 py-2 rounded-xl text-white text-[12px] ${validotp ? "bg-gradient-to-r from-red-400 to-pink-500 hover:opacity-90"
              : "bg-gray-600 cursor-not-allowed"} `}
                >
                  Verify
                </button>
              </>
            ) : (
              <>
                {/* Email */}
                <input
                  value={EMAIL}
                  type="email"
                  placeholder=" Email"
                  onChange={(e) => valEMAIL(e)}
                   className={`  bg-white/20  text-white relative w-[85%]  placeholder-gray-300 rounded-xl px-10 focus:outline-none focus:ring-2  ${!otpvalid ? "focus:ring-red-400" : "focus:ring-green-400"}   `}
                />
                {/* SEND OTP */}
                <button
                  onClick={sendOtp}
                  className={` px-3 py-2 rounded-xl text-white text-[12px] ${
                    otpvalid
                      ? "bg-gradient-to-r from-red-400 to-pink-500 hover:opacity-90"
                      : "bg-gray-600 cursor-not-allowed"
                  }`}
                >
                  Send
                </button>
              </>
            )}
          </div>
          {/* HASH AND MAIL ICON */}
           {OTPBOX ? <Hash className="absolute left-3 top-8 text-gray-300" size={14} /> :<Mail className="absolute left-3 top-8 text-gray-300" size={14} />}  
{/* EMAIL ERROR */}
          <div className="text-red-400 ">{EMAILERROR}</div>
        </div>

        {/* New Password */}
        <div className="w-full mb-4 relative">
          <p className="text-white text-sm pb-1">Enter your new password</p>
          <input
          className={`bg-white/20  text-white w-full py-3 rounded-xl px-10 placeholder-gray-300 focus:outline-none focus:ring-2 ${ISVALID_PASS ? "focus:ring-green-400 " : "focus:ring-red-400 "} `}
            placeholder="New password"
            type={ShowPasword ? "text" : "password"}
            value={loginPassword}
             onChange={PASSWORD}
          />
          {/* KEY Icon */}
          <KeyRound className="absolute left-3 top-9 text-gray-300" size={18} />
          {/* Show/Hide Password */}
          <button
            type="button"
            onClick={() => setShowPasword(!ShowPasword)}
            className="absolute right-3 top-8 text-gray-300"
          >
            {!ShowPasword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
{/* PASSWORD ERROR */}
          <p className="text-red-400 text-xs mt-1">{PASSWORDERROR}</p>
        </div>

        {/* Confirm Password */}
        <div className="w-full mb-4 relative">
          <p className="text-white text-sm pb-1">Confirm password</p>
          <input
            className={`bg-white/20  text-white w-full py-3 rounded-xl px-10 placeholder-gray-300 focus:outline-none focus:ring-2 ${ISVALIDconfirmpass ? "focus:ring-green-400 " : "focus:ring-red-400 "} `}
            placeholder="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => confirmpass(e)}
          />
          {/* KEY Icon */}
          <KeyRound className="absolute left-3 top-9 text-gray-300" size={18} />
          {/* Show/Hide Confirm Password */}
          <button
            type="button"
            onClick={() => setshowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-gray-300 hover:text-white"
          >
            {!showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
{/* CONFRIM PASSWORD ERROR */}
          <p className="text-red-400 text-xs mt-1">{confirmpasserror}</p>
        </div>

        {/* Submit */}
        <button
          onClick={() => SUBMIT()}
          className={` w-[60%] py-2.5 text-white rounded-2xl text-xl ${
            ISVALID
              ? "bg-gradient-to-r from-red-400 to-pink-500 hover:opacity-90"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Submit
        </button>

        {/*  redirect */}
        <Link
          href="/login"
          className="mt-3 text-sm text-gray-300 hover:text-white"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default Page;
