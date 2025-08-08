import ProductCard from "@/components/ProductCard/ProductCard";
import ProductFilters from "@/components/ProductFilters/ProductFilters";
import { IProduct } from "@/Types/Types";

interface ExpansionSourceProps {
  searchParams: {
    brand?: string;
    sort?: string;
  };
}

const HouseholdPump = async ({ searchParams }: ExpansionSourceProps) => {
  const selectedBrand = searchParams.brand || "all";
  const sortOrder = searchParams.sort || "default";

  let allProducts: IProduct[] = [];
  try {
    const res = await fetch("https://apika.ir/apitak/get_products.php", {
      cache: "no-store",
    });
    allProducts = (await res.json()) as IProduct[];
  } catch (error) {
    console.error("خطا در دریافت محصولات:", error);
    return (
      <div
        className="max-w-[95%] mx-auto py-10 px-4 sm:px-6 lg:px-8 text-center text-red-500"
        dir="rtl"
      >
        <p className="text-xl font-medium">
          متأسفانه در حال حاضر امکان بارگذاری محصولات وجود ندارد.
        </p>
        <p>لطفاً دقایقی دیگر تلاش کنید.</p>
      </div>
    );
  }

  // ✅ فیلتر محصولات دوزینگ پمپ
  let filteredByCategory = allProducts.filter((product) =>
    product.categories?.some((cat) => cat.includes("پمپ آب خانگی"))
  );

  // ✅ استخراج برندهای منحصر به فرد از محصولات فیلتر شده
  const availableBrands = Array.from(
    new Set(filteredByCategory.map((product) => product.brand))
  ).filter((brand): brand is string => Boolean(brand));

  // ✅ فیلتر بر اساس برند انتخابی
  if (selectedBrand !== "all") {
    filteredByCategory = filteredByCategory.filter(
      (product) => product.brand === selectedBrand
    );
  }

  // ✅ مرتب‌سازی
  if (sortOrder === "cheapest") {
    filteredByCategory.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortOrder === "most_expensive") {
    filteredByCategory.sort((a, b) => Number(b.price) - Number(a.price));
  }

  return (
    <div className="max-w-[95%] mx-auto py-10 px-4 sm:px-6 lg:px-8" dir="rtl">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
          پمپ خانگی
      </h2>

      <div className="flex flex-col md:grid md:grid-cols-4 md:gap-6">
        <div className="mb-6 md:mb-0">
          <ProductFilters availableBrands={availableBrands} title="فیلترها" />
        </div>

        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredByCategory.length > 0 ? (
            filteredByCategory.map((item, index) => (
              <ProductCard key={item.id || index} {...item} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-600">
              <p className="text-xl font-medium">محصولی با این فیلترها یافت نشد.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HouseholdPump;
// 'use client';

// import ProductCard from "@/components/ProductCard/ProductCard";
// import SkeletonProductCard from "@/components/SkeletonProductCard/SkeletonProductCard";
// import { IProduct } from "@/Types/Types"; // Assuming IProduct is correctly defined here
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// const HouseholdPump = () => {
//   const [products, setProducts] = useState<IProduct[]>([]);
//   const [loading, setLoading] = useState(true); // New loading state

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("https://apika.ir/apitak/get_products.php", {
//           cache: "no-store",
//         });
//         const data = (await res.json()) as IProduct[];

//         // Filter products with "پمپ آب خانگی" category
//         const filtered = data.filter((product) =>
//           product.categories?.some((cat) => cat.includes("پمپ آب خانگی"))
//         );

//         setProducts(filtered);
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//         // Optionally, handle error state here (e.g., show an error message)
//       } finally {
//         setLoading(false); // Set loading to false after fetch (success or failure)
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-12">
//       {/* Section Header */}
//       <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
//         پمپ‌های آب خانگی
//       </h2>

//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {loading ? (
//           // Display skeleton cards while loading
//           Array.from({ length: 4 }).map((_, index) => ( // Show 4 skeleton cards
//             <SkeletonProductCard key={index} />
//           ))
//         ) : products.length > 0 ? (
//           // Display actual product cards if products are available
//           products.map((item, index) => (
//             <motion.div
//               key={item.title} // Consider using item.id if available and unique
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
//             >
//               <ProductCard {...item} />
//             </motion.div>
//           ))
//         ) : (
//           // Display a message if no products are found after loading
//           <div className="col-span-full text-center py-10 text-gray-600">
//             <p className="text-xl font-medium">هیچ پمپ آب خانگی در حال حاضر یافت نشد.</p>
//             <p className="text-md mt-2">لطفاً بعداً دوباره امتحان کنید یا سایر دسته‌بندی‌ها را بررسی نمایید.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HouseholdPump;
