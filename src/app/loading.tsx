// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';

// const LoadingPage = ({ onComplete }: { onComplete: () => void }) => {
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     // شبیه‌سازی بارگذاری — بعد از 2.5 ثانیه لودینگ تموم میشه
//     const timer = setTimeout(() => {
//       setIsVisible(false);
//       onComplete();
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [onComplete]);

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
//       {/* کانتینر مرکزی */}
//       <div className="text-center">
//         {/* لوگو با انیمیشن */}
//         <div className="relative mb-4">
//           <Image
//             src="/apika2.svg"
//             alt="APIKA Logo"
//             width={150}
//             height={60}
//             className="animate-pulse"
//           />
//           {/* حلقه چرخشی */}
//           <div
//             className="absolute inset-0 border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"
//             style={{ width: '170px', height: '80px' }}
//           ></div>
//         </div>

//         {/* متن */}
//         <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//           APIKA
//         </h2>
//         <p className="text-gray-600 text-sm mt-2">در حال بارگذاری...</p>
//       </div>

//       {/* افکت نور متحرک */}
//       <style jsx>{`
//         @keyframes float {
//           0% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//           100% { transform: translateY(0px); }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LoadingPage;

"use client"
import Image from 'next/image';

export default function LoadingApika() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 relative overflow-hidden">
      {/* نام APIKA */}
      <h1 className="relative text-6xl md:text-8xl font-extrabold text-gray-800 tracking-wide">
        {/* حرف A با نقطه ای برای قطره */}
        <span className="relative">
          A
          {/* نقطه بالای A — محل شروع قطره */}
          <span
            className="absolute top-0 right-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full opacity-0 animate-drop-start"
          ></span>
        </span>
        PIKA
      </h1>

      {/* قطره آب متحرک */}
      <div className="absolute animate-drop-travel">
        <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg"></div>
        {/* دم قطره */}
        <div className="w-1 h-4 mx-auto bg-blue-400 rounded-full mt-0.5"></div>
      </div>

      {/* متن بارگذاری (اختیاری) */}
      <p className="text-gray-600 text-sm mt-6 animate-pulse">در حال بارگذاری سیستم...</p>

      {/* استایل انیمیشن‌ها */}
      <style jsx>{`
        @keyframes drop-start {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(0) translateY(4px); }
        }

        @keyframes drop-travel {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.8);
          }
          10% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          90% {
            opacity: 1;
            transform: translateY(150px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(180px) scale(0.8);
          }
        }

        .animate-drop-start {
          animation: drop-start 2s ease-in-out infinite;
        }

        .animate-drop-travel {
          animation: drop-travel 2s ease-in-out infinite;
          top: -30px;
          right: calc(50% - 6px); /* وسط حرف A */
        }
      `}</style>
    </div>
  );
}