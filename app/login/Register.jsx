"use client";
import { Eye, EyeOff, Hash, KeyRound, Mail, User } from "lucide-react"; // added User + Lock icons
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, Flip } from "react-toastify";


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
  const [verified, setverified] = useState(true);
  const [isvalid, setisvalid] = useState(false);
  const [otpvalid, setotpvalid] = useState(false);
const [ShowPasword, setShowPasword] = useState(false);
  const [isuservalid, setisuservalid] = useState(false);
  const [ispassvalid, setispassvalid] = useState(false);
  const [validotp, setvalidotp] = useState(false)
const [verifiedEmail, setVerifiedEmail] = useState(""); // stores verified email



  const valregisterusername = (e) => {
    setregisterusername(e.target.value);
    if (e.target.value.length < 5) {
      setregusererror("username must be 5 char");
      setisvalid(false);
      setisuservalid(false);
    } else {
      setisuservalid(true);
      setisvalid(true);

      setregusererror("");
    }
  };

  const valregisteremail = (e) => {

    setregisteremail(e.target.value);
    if (e.target.value.length < 8) {
      setisvalid(false);
      setotpvalid(false);
      setregemailerror("email must be 8 char");

    } else if (!e.target.value.endsWith("@gmail.com")) {
      setisvalid(false);
      setotpvalid(false);
   
      setregemailerror("Invalid email (must end with @gmail.com)");
    } 
    else {
      setisvalid(true);
      setregemailerror("");
      setotpvalid(true);

    }
  };

  const valregisterpassword = (e) => {
    setregisterpassword(e.target.value);
    if (e.target.value.length < 8) {
      setregpasserror("password must be 8 char");
      setisvalid(false);
      setispassvalid(false);
    } else {
      setregpasserror("");
      setisvalid(true);
      setispassvalid(true);
    }
  };
  const valotp = (e) => {
    setotp(e.target.value);
    if(e.target.value.length ===6 ){
       setvalidotp(true)
    }
    else{
       setvalidotp(false)
    }
  };
  //  otpsending
 const sendOtp = async () => {
  if (registeremail.length > 8 && registeremail.endsWith("@gmail.com")) {
    try {
      setVerifiedEmail(registeremail); // only this email is marked verified

      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: registeremail }),
      });

      if (res.ok) {
        toast.success("OTP sent successfully 📧", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          transition: Flip,
        });
        setvisotp(true);
      } else {
        toast.error("Failed to send OTP ❌", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          transition: Flip,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Flip,
      });
    }
  }
};

  // verify otp
  const verifyOtp = async () => {
    if (otp.length === 6) {
     
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // 👈 fix
        body: JSON.stringify({ email: registeremail, otp }),
      });
   
      const data = await res.json();
      {
        setvisotp(false);
      }
    
      alert(data.message);
   
    }

    // will show "OTP verified ✅" or "Invalid OTP ❌"
  };
  const router = useRouter();
  if (status === "loading") return null;
  if (status === "authenticated") {
    signOut("facebook");
    // router.push("/dashboard");

    return null;
  }

  const registerconfirm = () => {
    if (registeremail.length === 0) {
      setregemailerror("* This field is required");
      setisvalid(false);
    }

    if (registerusername.length == 0) {
      setisvalid(false);
      setregusererror("* This field is required");
    }
    if (registerpassword.length == 0) {
      setisvalid(false);
      setregpasserror("* This field is required");
    }
    if (verified === false) {
      setisvalid(false)

      alert("verify email");
    }
    if (registeremail !== verifiedEmail) {
  toast.error("Please verify your current email before registering ❌");
  return; // stop registration
}

    if (
      registeremail.length > 8 &&
      registerusername.length > 8 &&
      registerpassword.length > 8 &&
      registeremail.endsWith("@gmail.com") &&
      verifiedEmail === registeremail
    ) {
      console.log("good ");
    }
  };

  return (
    <>
      <div className="h-full w-1/2 flex flex-col items-center justify-center relative  gap-2 ">
        <div className="text-white text-3xl font-semibold mb-6 ">REGISTER</div>

        <div className="w-[80%] mb-4 relative">
          <p className="text-white mr-40 text-sm pb-1">Enter your Name</p>
          <input
            type="text"
            placeholder=" Name"
            value={registerusername}
            onChange={(e) => valregisterusername(e)}
            className={`bg-white/20 w-[100%] py-3 relative text-white placeholder-gray-300  rounded-xl px-10 focus:outline-none focus:ring-2 ${
              isuservalid ? "focus:ring-red-400" : "focus:ring-green-400"
            } `}
          />
          <User className="absolute left-3 top-8 text-gray-300" size={14} />
          <div className="text-red-400 ">{regusererror}</div>
        </div>
        <div className="w-[80%] mb-4 relative">
          <p className="text-white mr-40 text-sm pb-1">
            Enter your {visotp ? "OTP" : "Email"}
          </p>

          <div className="relative flex gap-2">
            {visotp ? (
              <>
                <input
                  value={otp}
                  type="tel"
                  placeholder=" OTP"
                  onChange={(e) => valotp(e)}
                   className={`bg-white/20 text-white relative w-[80%]  placeholder-gray-300 rounded-xl px-10 focus:outline-none focus:ring-2 ${!validotp ? " focus:ring-red-400" : " focus:ring-green-400"}` }
                
                />

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
                <input
                  value={registeremail}
                  type="email"
                  placeholder=" Email"
                  onChange={(e) => valregisteremail(e)}
                   className={`  bg-white/20  text-white relative w-[80%]  placeholder-gray-300 rounded-xl px-10 focus:outline-none focus:ring-2  ${!otpvalid ? "focus:ring-red-400" : "focus:ring-green-400"}   `}
                />
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

          <Hash className="absolute left-3 top-8 text-gray-300" size={14} />

          <div className="text-red-400 ">{regemailerror}</div>
        </div>
        <div className="w-[80%] mb-4 relative">
          <p className="text-white text-sm pb-1">Enter your password</p>

          <input
            value={registerpassword}
            type={ShowPasword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => valregisterpassword(e)}
            className={`bg-white/20 w-[100%] py-3 relative text-white placeholder-gray-300  rounded-xl px-10 focus:outline-none focus:ring-2 ${
              !ispassvalid ? "focus:ring-red-400" : "focus:ring-green-400"
            } `}
          />
            <button
                    type="button"
                    onClick={() => setShowPasword(!ShowPasword)}
                    className="absolute right-3 top-8 text-gray-300"
                  >
                    {ShowPasword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
          <KeyRound className="absolute left-3 top-8 text-gray-300" size={14} />

          <div className="text-red-400 ">{regpasserror}</div>
        </div>
        <button
          onClick={() => registerconfirm()}
          className={` w-[60%] py-2.5 text-white rounded-2xl text-xl ${
            isvalid
              ? "bg-gradient-to-r from-red-400 to-pink-500 hover:opacity-90"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Register
        </button>
        <div className="text-white/80 mb-5">or continue with</div>
        <div>
          {!session && (
            <>
              <div className=" flex items-center justify-center gap-5">
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
