'use client';

import Image from 'next/image';
import { useState } from 'react';

const data = [
  { src: 'https://apika.ir/images/electrogen.jpg', brand: 'الکتروژن' },
  { src: 'https://apika.ir/images/motogen.png', brand: 'موتوژن' },
  { src: 'https://apika.ir/images/bahar.png', brand: 'بهار پمپ' },
  { src: 'https://apika.ir/images/rayan.jpg', brand: 'رایان پمپ' },
  { src: 'https://apika.ir/images/hedfix.jpg', brand: 'هدفیکس' },
  { src: 'https://apika.ir/images/PENTAX.png', brand: 'پنتاکس' },
  { src: 'https://apika.ir/images/onyx.png', brand: 'ONYX' },
  { src: 'https://apika.ir/images/abara.png', brand: 'آبارا' },
  { src: 'https://apika.ir/images/Danfoss.webp', brand: 'Danfoss' },
  { src: 'https://apika.ir/images/hachasou.png', brand: 'هاچاسو' },
];

const Brands = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="w-full py-12">
      {/* عنوان */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-800">برندهای معتبر همکار</h2>
        <p className="text-gray-500 mt-2">محصولات اصل، گارانتی معتبر و خدمات پس از فروش</p>
      </div>

      {/* شبکه برندها */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto px-6">
        {data.map((item, i) => (
          <div
            key={i}
            className="group flex flex-col items-center justify-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
            onMouseEnter={() => setLoaded(true)}
          >
            {/* لوگو */}
            <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
              <Image
                src={item.src}
                alt={item.brand}
                width={120}
                height={120}
                className="object-contain transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>

            {/* نام برند */}
            <h3 className="font-semibold text-gray-700 text-center group-hover:text-blue-600 transition-colors duration-300">
              {item.brand}
            </h3>
          </div>
        ))}
      </div>

      {/* خط زیرین با گرادیان */}
      <div className="mt-12 flex justify-center">
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
      </div>
    </section>
  );
};

export default Brands;