'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CategoryCards = () => {
  const [isVisible, setIsVisible] = useState(false);

  const data = [
    {
      name: 'الکتروموتور',
      src: 'https://rahabsanat.ir/wp-content/uploads/2017/04/ABBEMotor-100x100.jpg',
      gradient: 'from-blue-500 to-purple-600',
      hoverColor: 'hover:from-blue-600 hover:to-purple-700',
      link:'/ElectroMotor'
    },
    {
      name: 'پمپ لجن کش',
      src: 'https://rahabsanat.ir/wp-content/uploads/2017/05/ImageHandler-11-100x100.png',
      gradient: 'from-orange-500 to-red-600',
      hoverColor: 'hover:from-orange-600 hover:to-red-700',
      link:'/SludgePump'
    },
    {
      name: 'دوزینگ پمپ',
      src: 'https://rahabsanat.ir/wp-content/uploads/2019/12/dosing-pump-500-100x100.jpg',
      gradient: 'from-green-500 to-teal-600',
      hoverColor: 'hover:from-green-600 hover:to-teal-700',
      link:'/DosingPump'
    },
    {
      name: 'الکترو پمپ',
      src: 'https://rahabsanat.ir/wp-content/uploads/2016/10/ImageHandler-8-100x100.jpg',
      gradient: 'from-indigo-500 to-pink-600',
      hoverColor: 'hover:from-indigo-600 hover:to-pink-700',
      link:'/ElectroPump'
    },
  ];

  // فعال‌سازی انیمیشن پس از رندر اولیه
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
          دسته‌بندی محصولات
        </h2>
        <p className="text-md text-gray-600 max-w-2xl mx-auto">
          محصولات باکیفیت ما را در دسته‌بندی‌های متنوع کشف کنید.
        </p>
      </div>

      {/* شبکه کارت‌ها با انیمیشن */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {data.map((item, index) => (
          <div
            key={index}
            className={`group relative bg-white/70 backdrop-blur-lg rounded-3xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
            style={{
              transitionDelay: `${index * 150}ms`,
            }}
          >
            {/* گرادیان دور کارت (حالت هاور) */}
            <div
              className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${item.gradient} blur-md -z-10 scale-95 group-hover:scale-100`}
            ></div>

            {/* تصویر با حلقه نور */}
            <div className="p-8 flex justify-center">
              <div
                className={`p-4 rounded-full bg-gradient-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-500`}
              >
                <Image
                  width={80}
                  height={80}
                  src={item.src.trim()}
                  alt={item.name}
                  className="rounded-full object-cover w-16 h-16 drop-shadow-md"
                  unoptimized
                />
              </div>
            </div>

            {/* محتوا */}
            <div className="px-8 pb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center group-hover:text-white transition-colors duration-300">
                {item.name}
              </h3>

              {/* دکمه با انیمیشن ظهور */}
              <div className="overflow-hidden rounded-lg">
                <Link
                  href={`${item.link}`}
                  className={`block text-center py-3 text-white font-medium rounded-xl bg-gradient-to-r ${item.gradient} ${item.hoverColor} transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300`}
                >
                  مشاهده محصولات
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCards;

// 'use client';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Eye } from 'lucide-react'; // Changed from SquarePlus to Eye for "View"

// const CategorySlider = () => {
//   const data = [
//     {
//       name: 'الکتروموتور',
//       src: 'https://rahabsanat.ir/wp-content/uploads/2017/04/ABBEMotor-100x100.jpg',
//       link: '/categories/electromotor',
//     },
//     {
//       name: 'بوستر پمپ',
//       src: 'https://rahabsanat.ir/wp-content/uploads/2016/12/ImageHandler-100x100.png',
//       link: '/categories/booster-pump',
//     },
//     {
//       name: 'پمپ شناور',
//       src: 'https://rahabsanat.ir/wp-content/uploads/2017/05/ImageHandler-12-100x100.jpg',
//       link: '/categories/submersible-pump',
//     },
//     {
//       name: 'پمپ لجن کش',
//       src: 'https://rahabsanat.ir/wp-content/uploads/2017/05/ImageHandler-11-100x100.png',
//       link: '/categories/sludge-pump',
//     },
//     {
//       name: 'دوزینگ پمپ',
//       src: 'https://rahabsanat.ir/wp-content/uploads/2019/12/dosing-pump-500-100x100.jpg',
//       link: '/categories/dosing-pump',
//     },
//     {
//       name: 'گیربکس حلزونی',
//       src: 'https://rahabsanat.ir/wp-content/uploads/2024/05/halezooni-gearbox-fav.webp',
//       link: '/categories/worm-gearbox',
//     },
//     {
//       name: 'الکترو پمپ',
//       src: 'https://rahabsanat.ir/wp-content/uploads/2016/10/ImageHandler-8-100x100.jpg',
//       link: '/categories/electric-pump',
//     },
//     {
//       name: 'پمپ گریز از مرکز',
//       src: 'https://rahabsanat.ir/wp-content/uploads/2017/05/ImageHandler-14-100x100.png', // Added an extra item for better demonstration
//       link: '/categories/centrifugal-pump',
//     },
//   ];

//   return (
//     <div className="w-[95%] mx-auto my-14 relative px-4 sm:px-0">
//       <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center sm:text-right">
//         دسته‌بندی‌های محبوب
//       </h2>
//       <Swiper
//         modules={[Autoplay, Navigation]}
//         autoplay={{ delay: 2500, disableOnInteraction: false }}
//         loop={true}
//         speed={700}
//         navigation={{
//           nextEl: '.swiper-button-next-custom',
//           prevEl: '.swiper-button-prev-custom',
//         }}
//         breakpoints={{
//           0: {
//             slidesPerView: 2,
//             spaceBetween: 12,
//           },
//           640: {
//             slidesPerView: 3,
//             spaceBetween: 16,
//           },
//           768: {
//             slidesPerView: 4,
//             spaceBetween: 20,
//           },
//           1024: {
//             slidesPerView: 5,
//             spaceBetween: 24,
//           },
//           1280: {
//             slidesPerView: 6,
//             spaceBetween: 28,
//           },
//         }}
//         className="pb-8" // Add some padding for navigation arrows
//       >
//         {data.map((item, i) => (
//           <SwiperSlide key={i}>
//             <Link href={item.link || '/'} className="block h-full">
//               <div className="bg-white rounded-xl py-5 px-3 shadow-md hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center justify-between group h-full border border-gray-100 hover:border-blue-300">
//                 {/* Image and Name */}
//                 <div className="flex flex-col items-center gap-4">
//                   <div className="bg-blue-50 p-4 rounded-full border-2 border-blue-100 group-hover:scale-105 group-hover:border-blue-400 transition-all duration-300 overflow-hidden relative">
//                     <Image
//                       width={80}
//                       height={80}
//                       alt={item.name}
//                       src={item.src}
//                       className="rounded-full object-cover"
//                     />
//                   </div>
//                   <p className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
//                     {item.name}
//                   </p>
//                 </div>

//                 {/* "View" Button with Animated Transition */}
//                 <div className="relative mt-4 w-full flex justify-center h-8 overflow-hidden">
//                   <div className="absolute inset-0 flex items-center justify-center opacity-100 translate-y-0 group-hover:opacity-0 group-hover:-translate-y-full transition-all duration-400 ease-in-out">
//                     {/* Placeholder or initial icon if desired */}
//                   </div>
//                   <div className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-in-out delay-100">
//                     <span className="inline-flex items-center text-sm font-bold bg-blue-600 text-white py-2 px-4 rounded-full cursor-pointer shadow-md hover:bg-blue-700 transition-colors">
//                       <span className="ml-2">مشاهده</span>
//                       <Eye size={18} />
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </SwiperSlide>
//         ))}
//         {/* Custom Navigation Buttons */}
//         <div className="swiper-button-prev-custom absolute top-1/2 -left-3 transform -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-blue-50 border border-gray-200">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={2.5}
//             stroke="currentColor"
//             className="w-5 h-5 text-gray-700"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//           </svg>
//         </div>
//         <div className="swiper-button-next-custom absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-blue-50 border border-gray-200">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={2.5}
//             stroke="currentColor"
//             className="w-5 h-5 text-gray-700"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//           </svg>
//         </div>
//       </Swiper>
//     </div>
//   );
// };

// export default CategorySlider;