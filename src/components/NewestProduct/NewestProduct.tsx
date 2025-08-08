// "use client";
// import { IProduct } from "@/Types/Types";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import ProductCard from "../ProductCard/ProductCard";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import SectionHeader from "../SectionSeperator/SectionSeperator";
// import { GitPullRequest } from "lucide-react";
// const NewestProduct = () => {
//   const [data, setData] = useState<IProduct[]>([]);
//   useEffect(() => {
//     axios("https://apika.ir/apitak/get_products.php").then((res) => {
//       setData(res.data);
//     });
//   }, []);
//   return (
//     <div className="">
//       <SectionHeader
//         title="جدیدترین محصولات"
//         icon={<GitPullRequest />}
//         linkHref="HouseholdPump"
//       />

//       <div className="w-[95%] mx-auto">
//         <Swiper
//           modules={[Autoplay, Navigation]}
//           autoplay={{ delay: 2000, disableOnInteraction: false }}
//           loop={true}
//           speed={600}
//           navigation={true}
//           breakpoints={{
//             0: {
//               slidesPerView: 1,
//               spaceBetween: 12,
//             },
//             640: {
//               slidesPerView: 3,
//               spaceBetween: 16,
//             },
//             1024: {
//               slidesPerView: 4,
//               spaceBetween: 20,
//             },
//           }}
//         >
//           {data.map((item, i) => {
//             return (
//               <SwiperSlide key={i}>
//                 <ProductCard {...item} />
//               </SwiperSlide>
//             );
//           })}
//         </Swiper>

//         <style jsx global>{`
//           .swiper-button-prev,
//           .swiper-button-next {
//             background: white;
//             width: 32px;
//             height: 32px;
//             border-radius: 9999px;
//             box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
//             color: #222;
//           }

//           .swiper-button-prev::after,
//           .swiper-button-next::after {
//             font-size: 14px;
//             font-weight: bold;
//           }

//           .swiper-button-prev {
//             left: -10px;
//           }

//           .swiper-button-next {
//             right: -10px;
//           }

//           @media (max-width: 640px) {
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// };

// export default NewestProduct;
'use client';

import { IProduct } from '@/Types/Types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import SectionHeader from '../SectionSeperator/SectionSeperator';
import { GitPullRequest } from 'lucide-react';

// Swiper core
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules'; // ✅ اصلاح اصلی

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const NewestProduct = () => {
  const [data, setData] = useState<IProduct[]>([]);

  useEffect(() => {
    axios('https://apika.ir/apitak/get_products.php')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setData(res.data.slice(0, 8));
        } else {
          console.error('API response is not an array:', res.data);
        }
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  }, []);

  return (
    <div className="py-8">
      <SectionHeader title="جدیدترین محصولات" icon={<GitPullRequest />} linkHref="/HouseholdPump" />

      <div className="w-[95%] mx-auto mt-6 relative">
        {data.length === 0 ? (
          <div className="flex gap-4 overflow-x-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-3xl w-60 h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Navigation]} // ✅ اصلاح شده
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            speed={600}
            navigation
            breakpoints={{
              0: { slidesPerView: 1.2, spaceBetween: 12 },
              640: { slidesPerView: 2.5, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="pb-8"
          >
            {data.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                  <ProductCard {...item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <style jsx global>{`
          .swiper-button-prev,
          .swiper-button-next {
            background: white;
            width: 36px;
            height: 36px;
            border-radius: 9999px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            color: #222;
            opacity: 0.9;
            transition: all 0.3s ease;
          }
          .swiper-button-prev:hover,
          .swiper-button-next:hover {
            transform: scale(1.1);
            opacity: 1;
          }
          .swiper-button-prev {
            left: -18px;
          }
          .swiper-button-next {
            right: -18px;
          }
          @media (max-width: 640px) {
            .swiper-button-prev,
            .swiper-button-next {
              display: none;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default NewestProduct;
