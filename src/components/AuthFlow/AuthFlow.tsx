"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { useAuthContext } from "@/context/AuthContext"; 
const AuthFlow = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1); 
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(120); 
  const [showResendButton, setShowResendButton] = useState(false); 

  const router = useRouter(); 
  const { isLoggedIn, setIsLoggedIn, phoneNumber, setPhoneNumber } =
    useAuthContext();

  useEffect(() => {
    setError("");
  }, [step]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowResendButton(true);
      if (interval) {
        clearInterval(interval);
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [step, timer]);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/UserPanel");
    }
  }, [isLoggedIn, router]); 

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSendOtp = async (isResend = false) => {
    setLoading(true);
    setError("");
    setShowResendButton(false); 
    setTimer(120); 
    try {
      const res = await fetch("https://apika.ir/apitak/auth/send_otp.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ phone }),
      });
      const data = await res.json();
      if (data.otp) {
        if (!isResend) setStep(2); 
      } else {
        setError(data.message || "مشکلی در ارسال کد تأیید پیش آمد."); 
      }
    } catch (err) {
      setError("خطا در برقراری ارتباط با سرور."); 
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://apika.ir/apitak/auth/verify_otp.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ phone, code: otp }),
      });
      const data = await res.json();
      if (data.status === "existing") {
        setIsLoggedIn(true); 
        setPhoneNumber(phone);
        router.push("/UserPanel");
      } else if (data.status === "new") {
        setIsNewUser(true);
        setStep(3); 
      } else {
        setError(data.message || "کد تأیید اشتباه است."); 
      }
    } catch (err) {
      setError("خطا در برقراری ارتباط با سرور.");
    } finally {
      setLoading(false);
    }
  };

  // Register new user
  const handleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        "https://apika.ir/apitak/auth/register_user.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ phone, name, family }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true); 
        setPhoneNumber(phone);
        
        router.push("/UserPanel"); 
      } else {
        setError(data.message || "مشکلی در ثبت‌نام پیش آمد.");
      }
    } catch (err) {
      setError("خطا در برقراری ارتباط با سرور."); 
      setLoading(false);
    }
  };

  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setPhoneNumber(""); 
    setStep(1); 
    setPhone(""); 
    setOtp(""); 
    setName("");
    setFamily("");
    
    router.push("/"); 
  };


  const buttonClass = (color: string) => `
    w-full ${color} text-white p-3 rounded-lg font-semibold
    transition duration-300 ease-in-out transform hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${loading ? "opacity-70 cursor-not-allowed" : ""}
  `;

  
  const inputClass = `
    w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition duration-200 ease-in-out
  `;

  
  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="max-w-md p-8 bg-white shadow-xl rounded-2xl space-y-8 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        {step === 1 && "ورود / ثبت‌نام"}
        {step === 2 && "تأیید کد"}
        {step === 3 && "تکمیل اطلاعات"}
      </h1>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative animate-slide-in-down"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

     
      {step === 1 && (
        <div className="space-y-6 animate-fade-in-up">
          <p className="text-gray-600 text-center">
            شماره موبایل خود را وارد کنید تا کد تأیید برای شما ارسال شود.
          </p>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="مثلاً 09123456789"
            className={inputClass}
            dir="rtl"
          />
          <button
            onClick={() => handleSendOtp(false)}
            className={buttonClass(
              "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
            )}
            disabled={loading}
          >
            {loading ? "در حال ارسال..." : "دریافت کد تأیید"}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-fade-in-up">
          <p className="text-gray-600 text-center">
            کد 6 رقمی ارسال شده به شماره **{phone}** را وارد کنید.
          </p>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="کد 6 رقمی"
            className={inputClass + " text-center tracking-widest"}
            maxLength={6}
            dir="ltr" 
          />
          <div className="text-center text-sm font-medium animate-fade-in">
            {timer > 0 ? (
              <p className="text-gray-500">
                زمان باقی‌مانده: **{formatTime(timer)}**
              </p>
            ) : (
              <p className="text-red-500">زمان به پایان رسید.</p>
            )}
          </div>
          <button
            onClick={handleVerifyOtp}
            className={buttonClass(
              "bg-green-600 hover:bg-green-700 focus:ring-green-500"
            )}
            disabled={loading || timer === 0}
          >
            {loading ? "در حال تأیید..." : "تأیید کد"}
          </button>
          {showResendButton && (
            <button
              onClick={() => handleSendOtp(true)}
              className={buttonClass(
                "bg-gray-500 hover:bg-gray-600 focus:ring-gray-400"
              )}
              disabled={loading}
            >
              {loading ? "در حال ارسال مجدد..." : "ارسال مجدد کد"}
            </button>
          )}
        </div>
      )}

      {step === 3 && isNewUser && (
        <div className="space-y-6 animate-fade-in-up">
          <p className="text-gray-600 text-center">
            برای تکمیل ثبت‌نام، نام و نام خانوادگی خود را وارد کنید.
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام"
            className={inputClass}
          />
          <input
            type="text"
            value={family}
            onChange={(e) => setFamily(e.target.value)}
            placeholder="نام خانوادگی"
            className={inputClass}
          />
          <button
            onClick={handleRegister}
            className={buttonClass(
              "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
            )}
            disabled={loading}
          >
            {loading ? "در حال ثبت‌نام..." : "ثبت نام و ورود"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthFlow;
