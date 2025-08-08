// 'use client';

// import Image from 'next/image';
// import { ShoppingCart, Trash2, Pencil } from 'lucide-react';
// import { useState } from 'react';
// import { IProduct } from '@/Types/Types';
// import Link from 'next/link';
// import { useAuthContext } from '@/context/AuthContext';
// import Swal from 'sweetalert2';

// const ProductCard = ({
//   id,
//   title,
//   price,
//   before_discount_price,
//   images,
//   inventory,
// }: IProduct) => {
//   const [hovered, setHovered] = useState(false);
//   const { isLoggedIn } = useAuthContext();

//   const numericPrice = Number(price);
//   const numericBeforeDiscountPrice = Number(before_discount_price);

//   const isPriceValid = !isNaN(numericPrice) && numericPrice > 0;

//   const hasDiscount =
//     isPriceValid &&
//     !isNaN(numericBeforeDiscountPrice) &&
//     numericBeforeDiscountPrice > 0 &&
//     numericPrice < numericBeforeDiscountPrice;

//   const discountPercentage = hasDiscount
//     ? Math.round(
//         ((numericBeforeDiscountPrice - numericPrice) /
//           numericBeforeDiscountPrice) *
//           100
//       )
//     : null;

//   const showSecondImage = hovered && images.length > 1;
//   const safeSlug = encodeURIComponent(title);

//   const handleDelete = async () => {
//     const confirm = await Swal.fire({
//       title: 'آیا مطمئنی؟',
//       text: 'این محصول برای همیشه حذف خواهد شد!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'بله، حذف کن!',
//       cancelButtonText: 'لغو',
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//     });

//     if (confirm.isConfirmed) {
//       try {
//         const res = await fetch('https://apika.ir/apitak/delete_product.php', {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ product_id: id }),
//         });

//         const data = await res.json();

//         if (data.success) {
//           Swal.fire('حذف شد!', 'محصول با موفقیت حذف شد.', 'success');
//           // Reload or remove from UI manually
//         } else {
//           Swal.fire('خطا', data.message || 'مشکلی پیش آمده است.', 'error');
//         }
//       } catch (err) {
//         Swal.fire('خطا', 'خطا در ارتباط با سرور.', 'error');
//       }
//     }
//   };

//   return (
//     <div
//       className="relative flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* دکمه‌های مدیریت (فقط در حالت ورود) */}
//       {isLoggedIn && (
//         <div className="absolute top-2 right-2 flex gap-2 z-10">
//           <Link
//             href={`/dashboard/edit/${id}`}
//             className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 transition"
//             title="ویرایش محصول"
//           >
//             <Pencil size={16} />
//           </Link>
//           <button
//             onClick={handleDelete}
//             className="bg-red-600 text-white p-1 rounded hover:bg-red-700 transition"
//             title="حذف محصول"
//           >
//             <Trash2 size={16} />
//           </button>
//         </div>
//       )}

//       <Link href={`/ProductPage/${safeSlug}`} passHref>
//         {/* تصویر محصول */}
//         <div className="relative w-full h-60 overflow-hidden">
//           <Image
//             src={showSecondImage ? images[1] : images[0]}
//             alt={title}
//             fill
//             className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
//           />
//           {discountPercentage && (
//             <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
//               %{discountPercentage}-
//             </span>
//           )}
//         </div>

//         {/* اطلاعات محصول */}
//         <div className="p-4 flex flex-col gap-2 flex-grow">
//           <h3 className="font-medium text-gray-800 line-clamp-2 h-10 text-sm">
//             {title}
//           </h3>

//           {isPriceValid ? (
//             <div className="flex flex-col mt-auto pt-2">
//               {hasDiscount && (
//                 <span className="text-sm text-gray-400 line-through mb-1">
//                   {numericBeforeDiscountPrice.toLocaleString('en-US')} تومان
//                 </span>
//               )}
//               <span className="text-blue-700 font-bold text-lg">
//                 {numericPrice.toLocaleString('en-US')} تومان
//               </span>
//               {Number(inventory) > 0 ? (
//                 <span className="text-xs text-green-600 mt-1">
//                   موجود در انبار
//                 </span>
//               ) : (
//                 <span className="text-xs text-red-600 mt-1">ناموجود</span>
//               )}
//             </div>
//           ) : (
//             <div className="mt-auto pt-2">
//               <span className="text-sm text-yellow-600 font-semibold">
//                 استعلام قیمت
//               </span>
//             </div>
//           )}
//         </div>

//         {/* دکمه خرید */}
//         <div className="p-4 pt-0">
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               console.log(`"${title}" clicked`);
//               // اضافه به سبد خرید...
//             }}
//             className={`w-full flex items-center justify-center gap-2 py-2 rounded-md transition-colors duration-200
//             ${isPriceValid ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}
//           `}
//           >
//             <ShoppingCart className="w-5 h-5" />
//             {isPriceValid ? 'مشاهده و خرید' : 'استعلام قیمت و خرید'}
//           </button>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ProductCard;

// 'use client';

// import Image from 'next/image';
// import { ShoppingCart } from 'lucide-react';
// import { useState } from 'react';
// import { IProduct } from '@/Types/Types';
// import Link from 'next/link';
// import { useAuthContext } from '@/context/AuthContext';

// const ProductCard = ({
//   title,
//   price,
//   before_discount_price,
//   images,
//   inventory,
// }: IProduct) => {
//   const [hovered, setHovered] = useState(false);

//   // تبدیل قیمت‌ها به عدد و اعتبارسنجی آنها
//   const numericPrice = Number(price);
//   const numericBeforeDiscountPrice = Number(before_discount_price);

//   // بررسی معتبر بودن قیمت‌ها و وجود تخفیف
//   const isPriceValid = !isNaN(numericPrice) && numericPrice > 0;

//   const hasDiscount =
//     isPriceValid &&
//     !isNaN(numericBeforeDiscountPrice) &&
//     numericBeforeDiscountPrice > 0 && // اطمینان از اینکه قیمت قبل از تخفیف هم مثبت است
//     numericPrice < numericBeforeDiscountPrice;

//   // محاسبه درصد تخفیف
//   const discountPercentage =
//     hasDiscount
//       ? Math.round(((numericBeforeDiscountPrice - numericPrice) / numericBeforeDiscountPrice) * 100)
//       : null;

//   const showSecondImage = hovered && images.length > 1;
//   const safeSlug = encodeURIComponent(title);

//   return (
//     <Link
//       href={`/ProductPage/${safeSlug}`}
//       passHref
//       className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* تصویر محصول */}
//       <div className="relative w-full h-60 overflow-hidden">
//         <Image
//           src={showSecondImage ? images[1] : images[0]}
//           alt={title}
//           fill
//           className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
//         />
//         {discountPercentage && (
//           <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
//             %{discountPercentage}-
//           </span>
//         )}
//       </div>

//       {/* اطلاعات محصول */}
//       <div className="p-4 flex flex-col gap-2 flex-grow">
//         <h3 className="font-medium text-gray-800 line-clamp-2 h-10 text-sm">
//           {title}
//         </h3>

//         {isPriceValid ? (
//           <div className="flex flex-col mt-auto pt-2">
//             {/* نمایش قیمت قبل از تخفیف فقط اگر تخفیف وجود دارد */}
//             {hasDiscount && (
//               <span className="text-sm text-gray-400 line-through mb-1">
//                 {numericBeforeDiscountPrice.toLocaleString('en-US')} تومان {/* تغییر در اینجا */}
//               </span>
//             )}
//             <span className="text-blue-700 font-bold text-lg">
//               {numericPrice.toLocaleString('en-US')} تومان {/* تغییر در اینجا */}
//             </span>
//             {Number(inventory) > 0 ? (
//               <span className="text-xs text-green-600 mt-1">موجود در انبار</span>
//             ) : (
//               <span className="text-xs text-red-600 mt-1">ناموجود</span>
//             )}
//           </div>
//         ) : (
//           <div className="mt-auto pt-2">
//             <span className="text-sm text-yellow-600 font-semibold">
//               استعلام قیمت
//             </span>
//           </div>
//         )}
//       </div>

//       {/* دکمه خرید */}
//       <div className="p-4 pt-0">
//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             e.stopPropagation();
//             console.log(`"${title}" clicked`);
//             // عمل اضافه به سبد یا ارجاع به تماس...
//           }}
//           className={`w-full flex items-center justify-center gap-2 py-2 rounded-md transition-colors duration-200
//             ${isPriceValid ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}
//           `}
//         >
//           <ShoppingCart className="w-5 h-5" />
//           {isPriceValid ? 'مشاهده و خرید' : 'استعلام قیمت و خرید'}
//         </button>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;
'use client';

import Image from 'next/image';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useState } from 'react';
import { IProduct } from '@/Types/Types';
import Link from 'next/link';

const ProductCard = ({
  title,
  price,
  before_discount_price,
  images,
  inventory,
}: IProduct) => {
  const [hovered, setHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const numericPrice = Number(price);
  const numericBeforeDiscountPrice = Number(before_discount_price);

  const isPriceValid = !isNaN(numericPrice) && numericPrice > 0;
  const isAvailable = Number(inventory) > 0;

  const hasDiscount =
    isPriceValid &&
    !isNaN(numericBeforeDiscountPrice) &&
    numericBeforeDiscountPrice > 0 &&
    numericPrice < numericBeforeDiscountPrice;

  const discountPercentage = hasDiscount
    ? Math.round(((numericBeforeDiscountPrice - numericPrice) / numericBeforeDiscountPrice) * 100)
    : null;

  const showSecondImage = hovered && images.length > 1;
  const safeSlug = encodeURIComponent(title);

  return (
    <Link
      href={isAvailable ? `/ProductPage/${safeSlug}` : '#'}
      passHref
      className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-100 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl will-change-transform ${
        isAvailable
          ? 'hover:border-gray-200'
          : 'grayscale pointer-events-none opacity-60 cursor-not-allowed'
      }`}
      onMouseEnter={() => isAvailable && setHovered(true)}
      onMouseLeave={() => isAvailable && setHovered(false)}
    >
      {/* لایه overlay روی تصویر */}
      <div className={`relative h-64 ${isAvailable ? 'bg-gray-50' : 'bg-gray-200'} overflow-hidden`}>
        <Image
          src={showSecondImage ? images[1] : images[0]}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-contain p-6 transition-transform duration-700 ${
            isAvailable ? 'group-hover:scale-110' : 'scale-100'
          }`}
        />

        {/* برچسب تخفیف */}
        {discountPercentage && isAvailable && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-lg transform -rotate-12 animate-bounce">
              🔥 %{discountPercentage} تخفیف
            </span>
          </div>
        )}

        

        {/* ریتینگ - فقط اگر موجود بود */}
        {isAvailable && (
          <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {/* <span className="text-xs font-medium text-gray-800">{rating}</span> */}
          </div>
        )}

        {/* برچسب "ناموجود" وقتی موجودی صفر است */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-white font-extrabold text-lg text-center px-4">
              ناموجود
            </span>
          </div>
        )}
      </div>

      {/* بدنه اطلاعات */}
      <div className="p-5 pt-4 flex flex-col">
        <h3
          className={`font-bold text-base leading-tight line-clamp-2 min-h-14 transition-colors duration-300 ${
            isAvailable ? 'text-gray-800 group-hover:text-blue-700' : 'text-gray-500'
          }`}
        >
          {title}
        </h3>

        <div className="flex flex-col mt-3">
          {isPriceValid ? (
            <div className="space-y-1">
              {hasDiscount && (
                <span className={`text-sm ${isAvailable ? 'text-gray-400' : 'text-gray-500'} line-through`}>
                  {numericBeforeDiscountPrice.toLocaleString('fa-IR')} تومان
                </span>
              )}
              <span
                className={`font-extrabold text-xl ${
                  isAvailable ? 'text-blue-700' : 'text-gray-500'
                }`}
              >
                {numericPrice.toLocaleString('fa-IR')} تومان
              </span>
              <span
                className={`text-xs font-semibold mt-1 inline-block px-2 py-0.5 rounded-full w-fit ${
                  isAvailable
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {isAvailable ? '✅ موجود' : '❌ ناموجود'}
              </span>
            </div>
          ) : (
            <span className="text-sm font-bold bg-amber-50 text-amber-600 px-3 py-1 rounded-full w-fit">
              📞 استعلام قیمت
            </span>
          )}
        </div>
      </div>

      {/* دکمه اصلی */}
      <div className="p-5 pt-0">
        <button
          // فقط اگر موجود باشد، عمل کند
          onClick={(e) => {
            if (!isAvailable) {
              e.preventDefault();
              e.stopPropagation();
              return;
            }
            e.preventDefault();
            e.stopPropagation();
            console.log(`"${title}" به سبد اضافه شد`);
          }}
          className={`w-full flex items-center justify-center gap-3 py-3.5 font-bold rounded-2xl transition-all duration-300 ${
            isAvailable
              ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300 group'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!isAvailable}
        >
          <ShoppingCart
            className={`w-5 h-5 ${
              isAvailable ? 'group-hover:rotate-12 transition-transform duration-300' : ''
            }`}
          />
          {isPriceValid ? 'مشاهده و خرید' : 'دریافت پیش‌فاکتور'}
        </button>
      </div>

      {/* نوار پیشرفت فروش — فقط اگر موجود و کمتر از 10 باشد */}
      {isAvailable && Number(inventory) < 5 && (
        <div className="px-5 pt-2">
          <div className="text-xs text-orange-600 mb-1">
            فروش ویژه! فقط {inventory} عدد باقی مانده
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-orange-400 to-red-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(10 - Number(inventory)) * 10}%` }}
            ></div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default ProductCard;