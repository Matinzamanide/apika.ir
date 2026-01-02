// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// const categories = [
//   {
//     title: "پمپ آب خانگی",
//     href: "/HouseholdPump",
//     src: "https://rahabsanat.ir/wp-content/uploads/2025/03/leo_pump-1.webp",
//     glow: "rgba(59, 130, 246, 0.5)",
//     bgText: "01",
//   },
//   {
//     title: "مکانیکال سیل",
//     href: "/product-category/mechanical-seal/",
//     src: "https://rahabsanat.ir/wp-content/uploads/2025/03/mechanical_seal-1.webp",
//     glow: "rgba(168, 85, 247, 0.5)",
//     bgText: "02",
//   },
//   {
//     title: "منبع انبساط",
//     href: "/ExpansionSource",
//     src: "https://rahabsanat.ir/wp-content/uploads/2025/03/enbesat-1.webp",
//     glow: "rgba(34, 197, 94, 0.5)",
//     bgText: "03",
//   },
//   {
//     title: "موتور کولر",
//     href: "/Cooler",
//     src: "https://rahabsanat.ir/wp-content/uploads/2025/03/cooler_motor-1.webp",
//     glow: "rgba(249, 115, 22, 0.5)",
//     bgText: "04",
//   },
//   {
//     title: "ست کنترل",
//     href: "/SetControl",
//     src: "https://rahabsanat.ir/wp-content/uploads/2025/03/control-set.webp",
//     glow: "rgba(71, 85, 105, 0.5)",
//     bgText: "05",
//   },
// ];

// const PumpCategory = () => {
//   return (
//     <div className="container mx-auto px-6 py-20 bg-[#f8fafc] overflow-hidden">
//       {/* هدر با استایل تایپوگرافی خاص */}
//       <div className="relative mb-20 text-right">
//         <motion.span 
//           initial={{ opacity: 0, x: -20 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           className="text-blue-600 font-black tracking-widest text-sm uppercase"
//         >
//           Premium Collection
//         </motion.span>
//         <motion.h2 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="text-5xl md:text-6xl font-black text-slate-900 mt-2 leading-tight"
//         >
//           انتخاب حرفه‌ای، <br />
//           <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-cyan-500">
//             تجهیزات صنعتی
//           </span>
//         </motion.h2>
//       </div>

//       {/* شبکه کارت‌ها */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
//         {categories.map((cat, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1, duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             <Link href={cat.href} className="group relative block">
//               {/* پس‌زمینه بزرگ شماره دسته‌بندی */}
//               <span className="absolute -top-10 -right-4 text-8xl font-black text-slate-200/50 group-hover:text-blue-100 transition-colors duration-500 select-none z-0">
//                 {cat.bgText}
//               </span>

//               {/* کارت اصلی */}
//               <div className="relative z-10 bg-white rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col items-center border border-slate-100 group-hover:border-blue-200 overflow-hidden">
                
//                 {/* دایره دکوراتیو چرخان در پس‌زمینه تصویر */}
//                 <div 
//                   className="absolute top-10 w-32 h-32 rounded-full border-2 border-dashed border-slate-200 group-hover:rotate-180 group-hover:border-blue-400 group-hover:scale-125 transition-all duration-[2s] ease-in-out"
//                 />

//                 {/* تصویر محصول با Glow داینامیک */}
//                 <div className="relative w-32 h-32 mb-8 group-hover:translate-y-[-10px] transition-transform duration-500">
//                    <div 
//                     className="absolute inset-0 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
//                     style={{ backgroundColor: cat.glow }}
//                    />
//                   <Image
//                     src={cat.src}
//                     alt={cat.title}
//                     fill
//                     className="object-contain z-10 p-2"
//                   />
//                 </div>

//                 {/* متن کاتالوگی */}
//                 <div className="text-center z-10">
//                   <h3 className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors duration-300 mb-2">
//                     {cat.title}
//                   </h3>
//                   <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
//                     <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">View Products</span>
//                     <div className="w-8 h-[2px] bg-blue-500" />
//                   </div>
//                 </div>

//                 {/* المان تزیینی گوشه کارت */}
//                 <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-slate-50 rounded-tr-3xl group-hover:bg-blue-600 transition-colors duration-500 flex items-center justify-center">
//                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full group-hover:bg-white animate-pulse" />
//                 </div>
//               </div>
//             </Link>
//           </motion.div>
//         ))}
//       </div>

//       {/* دکمه پایین صفحه با استایل مدرن خطی */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         className="mt-20 flex flex-col items-center"
//       >
//         <Link href="/products" className="group flex items-center gap-4 text-slate-900 no-underline">
//            <span className="text-lg font-black group-hover:text-blue-600 transition-colors">مشاهده کاتالوگ کامل</span>
//            <div className="w-12 h-12 rounded-full border-2 border-slate-900 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
//              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="rotate-180">
//                <path d="M5 12h14M12 5l7 7-7 7"/>
//              </svg>
//            </div>
//         </Link>
//       </motion.div>
//     </div>
//   );
// };

// export default PumpCategory;
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  {
    title: "پمپ آب خانگی",
    enTitle: "Water Pumps",
    href: "/HouseholdPump",
    src: "https://rahabsanat.ir/wp-content/uploads/2025/03/leo_pump-1.webp",
    accent: "bg-blue-500",
  },
  {
    title: "مکانیکال سیل",
    enTitle: "APIKA",
    href: "/product-category/mechanical-seal/",
    src: "https://rahabsanat.ir/wp-content/uploads/2025/03/mechanical_seal-1.webp",
    accent: "bg-purple-500",
  },
  {
    title: "منبع انبساط",
    enTitle: "Expansion Tank",
    href: "/ExpansionSource",
    src: "https://rahabsanat.ir/wp-content/uploads/2025/03/enbesat-1.webp",
    accent: "bg-emerald-500",
  },
  {
    title: "موتور کولر",
    enTitle: "Cooler Motor",
    href: "/Cooler",
    src: "https://rahabsanat.ir/wp-content/uploads/2025/03/cooler_motor-1.webp",
    accent: "bg-orange-500",
  },
  {
    title: "ست کنترل",
    enTitle: "Control Set",
    href: "/SetControl",
    src: "https://rahabsanat.ir/wp-content/uploads/2025/03/control-set.webp",
    accent: "bg-slate-700",
  },
];

const PremiumCategory = () => {
  return (
    <section className="py-24 bg-white overflow-hidden" dir="rtl">
      <div className="container mx-auto px-6">
        
        {/* Header: بسیار ساده و با کلاس */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              className="h-1 bg-slate-900 mb-6"
            />
            <h2 className="text-4xl md:text-6xl font-light text-slate-900 leading-tight tracking-tight">
              تجلی <span className="font-black text-blue-600">قدرت</span> <br /> 
              در مهندسی آب و صنعت
            </h2>
          </div>
          <p className="text-slate-400 font-medium max-w-[200px] text-sm leading-6 border-r-2 border-slate-100 pr-4">
            مجموعه‌ای از برترین برندهای جهانی برای پروژه‌های هوشمند شما.
          </p>
        </div>

        {/* Grid: معماری منظم و خلوت */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={cat.href} className="group relative block h-[450px] w-full bg-slate-50 rounded-[3rem] overflow-hidden border border-transparent hover:border-slate-200 transition-all duration-700">
                
                {/* پس‌زمینه متنی عمودی */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] rotate-90 group-hover:rotate-0 transition-transform duration-1000">
                  <span className="text-8xl font-black uppercase whitespace-nowrap">
                    {cat.enTitle}
                  </span>
                </div>

                {/* محتوای کارت */}
                <div className="relative h-full w-full flex flex-col items-center justify-between py-12 px-6 z-10">
                  
                  {/* دایره کوچک شاخص */}
                  <div className={`w-2 h-2 rounded-full ${cat.accent} mb-4 group-hover:scale-[3] transition-transform duration-500`} />

                  {/* تصویر محصول با سایه معلق */}
                  <div className="relative w-40 h-40 group-hover:scale-110 group-hover:-translate-y-4 transition-all duration-700 ease-out">
                    <div className="absolute inset-0 bg-slate-200 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity" />
                    <Image
                      src={cat.src}
                      alt={cat.title}
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>

                  {/* عنوان و دکمه کشیده */}
                  <div className="text-center w-full">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 group-hover:tracking-widest transition-all duration-500">
                      {cat.title}
                    </h3>
                    
                    {/* دکمه دایره‌ای پایین کارت */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 shadow-sm">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* لایه رنگی بسیار ملایم در پایین که در هوور بالا می‌آید */}
                <div className="absolute bottom-0 left-0 right-0 h-0 bg-white group-hover:h-full transition-all duration-700 -z-0 opacity-10" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* استایل برای بهبود فونت‌ها */}
      <style jsx global>{`
        .font-light { font-weight: 300; }
        .tracking-tight { letter-spacing: -0.05em; }
      `}</style>
    </section>
  );
};

export default PremiumCategory;