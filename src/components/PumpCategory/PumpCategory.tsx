'use client';

import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    title: "پمپ آب خانگی",
    href: "/HouseholdPump",
    src: "https://rahabsanat.ir/wp-content/uploads/2025/03/leo_pump-1.webp",
    color: "from-blue-500 to-cyan-400",
    icon: "💧",
  },
  {
    title: "مکانیکال سیل",
    href: "/product-category/mechanical-seal/",
    src: "https://rahabsanat.ir/wp-content/uploads/2025/03/mechanical_seal-1.webp",
    color: "from-purple-500 to-pink-500",
    icon: "⚙️",
  },
  {
    title: "انبساط",
    href: "/ExpansionSource",
    src: "https://rahabsanat.ir/wp-content/uploads/2025/03/enbesat-1.webp",
    color: "from-green-500 to-teal-400",
    icon: "🫧",
  },
  {
    title: "موتور کولر",
    href: "/Cooler",
    src: "https://rahabsanat.ir/wp-content/uploads/2025/03/cooler_motor-1.webp",
    color: "from-indigo-500 to-blue-500",
    icon: "🌀",
  },
  {
    title: "ست کنترل",
    href: "/SetControl",
    src: "https://rahabsanat.ir/wp-content/uploads/2025/03/control-set.webp",
    color: "from-gray-500 to-gray-700",
    icon: "🎛️",
  },
];

const PumpCategory = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* عنوان مرکزی با افکت */}
      <div className="text-center mb-12 relative">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-wide">
          دسته‌بندی‌های اصلی
        </h2>
        <p className="text-gray-500 mt-3 text-lg">محصولات باکیفیت در یک نگاه</p>
        
        {/* خط زیر عنوان با گرادیان */}
        <div className="mt-6 h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
      </div>

      {/* شبکه دسته‌بندی‌ها */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 justify-items-center">
        {categories.map((cat, index) => (
          <Link
            key={index}
            href={cat.href}
            className="group relative w-full max-w-[240px] perspective-1000"
          >
            {/* کارت اصلی با گلاس مورفیسم */}
            <div
              className={`relative h-48 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-105 bg-gradient-to-br ${cat.color} p-1`}
            >
              {/* نور متحرک (Sweep) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-transparent via-white/80 to-transparent transform -skew-x-12 scale-x-150 animate-sweep pointer-events-none"></div>

              {/* پس‌زمینه گلاس مورفیسم */}
              <div className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/30"></div>

              {/* تصویر داخلی */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
                <div className="relative w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center rounded-full bg-white/60 shadow-inner mb-3 transform group-hover:rotate-6 transition-transform duration-500">
                  <Image
                    src={cat.src}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 80px, 96px"
                    className="object-contain p-2 transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <span className="text-lg font-bold text-gray-800 text-center leading-tight group-hover:text-white drop-shadow-sm">
                  {cat.title}
                </span>
              </div>

              {/* آیکون ایموجی (اختیاری برای جذابیت) */}
              <span className="absolute top-2 right-2 bg-white/90 text-lg rounded-full w-8 h-8 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                {cat.icon}
              </span>
            </div>

            {/* افکت حرکت نور */}
            <style jsx>{`
              @keyframes sweep {
                0% { transform: translateX(-100%) skewX(-12deg); }
                100% { transform: translateX(150%) skewX(-12deg); }
              }
              .animate-sweep {
                animation: sweep 1.5s ease-out forwards;
              }
              .perspective-1000 {
                perspective: 1000px;
              }
            `}</style>
          </Link>
        ))}
      </div>

      {/* دکمه مشاهده همه (اختیاری) */}
      <div className="text-center mt-12">
        <Link
          href="/products"
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          مشاهده تمام محصولات
        </Link>
      </div>
    </div>
  );
};

export default PumpCategory;


// import Image from "next/image";
// import Link from "next/link";
// // Assuming SectionHeader is correctly implemented and provides a title/separator
// // import SectionHeader from "../SectionSeperator/SectionSeperator"; 
// // import { GitPullRequest, GitPullRequestDraft } from "lucide-react"; // Icons not directly used in the card logic

// const categories = [
//   {
//     title: "پمپ آب خانگی",
//     href: "/HouseholdPump",
//     src: "https://rahabsanat.ir/wp-content/uploads/2025/03/leo_pump-1.webp",
//   },
//   {
//     title: "مکانیکال سیل",
//     href: "/product-category/mechanical-seal/",
//     src: "https://rahabsanat.ir/wp-content/uploads/2025/03/mechanical_seal-1.webp",
//   },
//   {
//     title: "انبساط",
//     href: "/ExpansionSource",
//     src: "https://rahabsanat.ir/wp-content/uploads/2025/03/enbesat-1.webp",
//   },
//   {
//     title: "گیربکس صنعتی",
//     href: "/product-category/gearbox/",
//     src: "https://rahabsanat.ir/wp-content/uploads/2025/03/gearbox_sanati.webp",
//   },
//   {
//     title: "موتور کولر",
//     href: "/Cooler",
//     src: "https://rahabsanat.ir/wp-content/uploads/2025/03/cooler_motor-1.webp",
//   },
//   {
//     title: "ست کنترل",
//     href: "/SetControl",
//     src: "https://rahabsanat.ir/wp-content/uploads/2025/03/control-set.webp",
//   },
// ];

// const PumpCategory = () => {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* If you have a SectionHeader component, you can use it here */}
//       {/* <SectionHeader title="دسته‌بندی‌های اصلی" /> */} 
//       <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">دسته‌بندی‌های اصلی</h2>
      
//       <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 justify-items-center">
//         {categories.map((cat, index) => (
//           <Link
//             key={index}
//             href={cat.href}
//             className="flex flex-col items-center justify-center text-center group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 w-full max-w-[220px]"
//           >
//             <div className="relative w-32 h-32 lg:w-40 lg:h-40 flex items-center justify-center bg-blue-50 rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-inner">
//               <Image
//                 src={cat.src}
//                 alt={cat.title}
//                 fill // Use fill to make image cover the div, combined with object-contain
//                 sizes="(max-width: 768px) 100px, 150px" // Optimize image loading
//                 className="object-contain p-2 transition-transform duration-500 ease-in-out" // Added padding for better fit
//               />
//               {/* Optional: Add a subtle overlay on hover for a richer effect */}
//               <div className="absolute inset-0 bg-gradient-to-t from-transparent to-blue-200 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full"></div>
//             </div>
//             <span className="mt-4 text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
//               {cat.title}
//             </span>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PumpCategory;