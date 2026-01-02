

// 'use client'; // <--- ADD THIS LINE AT THE VERY TOP

// import Image from "next/image";
// import { motion } from "framer-motion"; // Import motion for animations

// const PumpBrands = () => {
//   const brandImages = [
//     {
//       src: "https://rahabsanat.ir/wp-content/uploads/2025/03/tavantek.webp",
//       alt: "برند توانتک",
//     },
//     {
//       src: "https://rahabsanat.ir/wp-content/uploads/2025/03/bahar-1.webp",
//       alt: "برند بهار",
//     },
//     {
//       src: "https://rahabsanat.ir/wp-content/uploads/2025/03/navidmotor.webp",
//       alt: "برند نوید موتور",
//     },
//     {
//       src: "https://rahabsanat.ir/wp-content/uploads/2025/03/rayan.webp",
//       alt: "برند رایان",
//     },
//   ];

//   const mainBrandImage = {
//     src: "https://rahabsanat.ir/wp-content/uploads/2025/03/motox.webp",
//     alt: "برند موتوژن", // Assuming this is Motogen based on common brands
//   };

//   return (
//     <div className="container mx-auto px-4 py-10 mt-24">
//       <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
//         برندهای معتبر پمپ
//       </h2>

//       <div className="w-full mx-auto bg-gradient-to-b from-blue-50 to-white p-6 rounded-2xl shadow-xl">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[400px] overflow-hidden">
//           {/* Main Brand Image (Right/Top on Mobile) */}
//           <div className="relative w-full h-[250px] md:h-full rounded-lg overflow-hidden group">
//             <Image
//               src={mainBrandImage.src}
//               alt={mainBrandImage.alt}
//               fill
//               sizes="(max-width: 768px) 100vw, 50vw"
//               className="object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-75"
//             />
//             <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <span className="text-white text-xl font-bold p-3 bg-blue-600 rounded-md">
//                 {mainBrandImage.alt}
//               </span>
//             </div>
//           </div>

//           {/* Smaller Brand Grid (Left/Bottom on Mobile) */}
//           <div className="grid grid-cols-2 gap-4">
//             {brandImages.map((brand, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true, amount: 0.5 }}
//                 transition={{ duration: 0.5, delay: i * 0.1 }}
//                 className="relative w-full h-[190px] rounded-lg overflow-hidden group"
//               >
//                 <Image
//                   src={brand.src}
//                   alt={brand.alt}
//                   fill
//                   sizes="(max-width: 768px) 50vw, 25vw"
//                   className="object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-75"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <span className="text-white text-lg font-bold p-2 bg-blue-600 rounded-md">
//                     {brand.alt}
//                   </span>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PumpBrands;

'use client'; 

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const PumpBrands = () => {
  const brandImages = [
    {
      src: "https://rahabsanat.ir/wp-content/uploads/2025/03/tavantek.webp",
      alt: "برند توانتک",
      link:"/ProductBrands/توان تک"
    },
    {
      src: "https://rahabsanat.ir/wp-content/uploads/2025/03/bahar-1.webp",
      alt: "برند بهار",
      link:"/ProductBrands/بهار پمپ"
    },
    {
      src: "https://rahabsanat.ir/wp-content/uploads/2025/03/navidmotor.webp",
      alt: "برند نوید موتور",
      link:"/ProductBrands/نود موتور"
    },
    {
      src: "https://rahabsanat.ir/wp-content/uploads/2025/03/rayan.webp",
      alt: "برند رایان",
      link:"/ProductBrands/رایان"
    },
  ];

  const mainBrandImage = {
    src: "https://rahabsanat.ir/wp-content/uploads/2025/03/motox.webp",
    alt: "برند موتوژن",
    link:"/ProductBrands/موتوژن" 
  };

  return (
    <div className="container mx-auto px-4 py-10 mt-24">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
        برندهای معتبر پمپ
      </h2>

      <div className="w-full mx-auto bg-gradient-to-b from-blue-50 to-white p-6 rounded-2xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[400px] overflow-hidden">
          {/* Main Brand Image (Right/Top on Mobile) */}
          <div className="relative w-full h-[250px] md:h-full rounded-lg overflow-hidden group flex items-center justify-center bg-gray-100"> {/* Added flex centering & bg-gray-100 for visibility of empty space */}
            <Image
              src={mainBrandImage.src}
              alt={mainBrandImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-75" // Changed to object-contain
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link href={mainBrandImage.link} className="text-white text-xl font-bold p-3 bg-blue-600 rounded-md">
                {mainBrandImage.alt}
              </Link>
            </div>
          </div>

          {/* Smaller Brand Grid (Left/Bottom on Mobile) */}
          <div className="grid grid-cols-2 gap-4">
            {brandImages.map((brand, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative w-full h-[190px] rounded-lg overflow-hidden group flex items-center justify-center bg-gray-100" // Added flex centering & bg-gray-100
              >
                <Image
                  src={brand.src}
                  alt={brand.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-contain transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-75" // Changed to object-contain
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link href={brand.link} className="text-white text-lg font-bold p-2 bg-blue-600 rounded-md">
                    {brand.alt}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PumpBrands;