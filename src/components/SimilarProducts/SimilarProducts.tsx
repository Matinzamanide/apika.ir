"use client"
import { IProduct } from "@/Types/Types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

interface ICatName {
  catName: string;
}

const SimilarProducts: React.FC<ICatName> =  ({ catName }) => {
const [data,setData]=useState<IProduct[]>([]);


useEffect(()=>{
  axios('https://apika.ir/apitak/get_products.php')
  .then((res)=>{
    setData(res.data);
  })
},[])

  const filteredByCategory = data.filter((product) =>
    product.categories?.some((cat) => cat.toLowerCase().includes(catName.toLowerCase()))
  );

  if (filteredByCategory.length === 0) {
    return (
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">محصولات مشابه</h3>
          <p className="text-gray-500">محصولی در دسته‌بندی "{catName}" یافت نشد.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-extrabold text-gray-800 mb-8  text-right">
          محصولات مشابه 
        </h3>

        {/* Swiper اسلایدر */}
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={filteredByCategory.length > 1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 28 },
          }}
          className="mySwiper"
        >
          {filteredByCategory.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SimilarProducts;