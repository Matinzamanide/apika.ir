"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
interface Gallery {
  images: string[];
  title: string;
}
interface IGallery {
  GalleryProps: Gallery;
}
const Gallery: React.FC<IGallery> = ({ GalleryProps }) => {
  const [activeImage, setActiveImage] = useState(0);
  console.log(GalleryProps.images);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-lg h-[450px] bg-gray-100 border border-gray-200 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={GalleryProps.images[activeImage]}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={GalleryProps.images[activeImage]}
              alt={GalleryProps.title}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail Images */}
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {GalleryProps.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            className={`w-24 h-24 p-1 bg-white border-2 rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105
                ${
                  i === activeImage
                    ? "border-blue-600 ring-4 ring-blue-200 shadow-md"
                    : "border-gray-200 hover:border-blue-400 hover:shadow-sm"
                }`}
            aria-label={`View image ${i + 1}`}
          >
            <Image
              src={img}
              alt={`thumbnail-${i}`}
              width={96}
              height={96}
              className="object-contain rounded-md"
              unoptimized // ← تست برای جلوگیری از خطای لود
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
