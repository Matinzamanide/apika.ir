// import {  Download, CheckCircle, Package, Tag } from 'lucide-react';
// import TabComponent from '@/components/TabCom/TabComponent';
// import Gallery from '@/components/Gallery/Gallery';
// import QuantitySelector from '@/components/QuantitySelector/QuantitySelector';
// import { Toaster } from 'react-hot-toast';
// import Link from 'next/link';


//  interface IProps{
//     params:Promise<{id:string}>
//  }
// const dataLightPage:React.FC<IProps> = async (props) => {
//     const {id}=await props.params;
//     console.log(id)


//     const res=await fetch(`https://apika.ir/apitak/get_products.php?title=${id}`);
//     const [data]=await res.json();

//     console.log(data);


//   const hasDiscount = data.price < data.before_discount_price;
//   const discountPercentage = hasDiscount
//     ? Math.round(((data.before_discount_price - data.price) / data.before_discount_price) * 100)
//     : 0;
//   const isInStock = data.inventory > 0;
//   const stockMessage = isInStock
//     ? data.inventory > 5
//       ? 'موجود در انبار'
//       : `تنها ${data.inventory} عدد باقی مانده!`
//     : 'ناموجود';

//   const tabs = [
//     { key: 'specs', label: 'مشخصات فنی' },
//     { key: 'features', label: 'ویژگی‌ها' },
//     { key: 'comments', label: 'نظرات کاربران' },
//     { key: 'questions', label: 'سوالات کاربران' },
//   ];
//   const formatPrice = (price: number) => {
//     return price.toLocaleString('fa-IR') + ' تومان';
//   };
//   console.log(typeof data.price)

//   return (
//     <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen text-[#1a1a1a] py-12 px-4 sm:px-6 lg:px-8">
//       <button className='bg-emerald-600 text-emerald-300 px-10 rounded py-1'>
//         <Link href={`/Products/${data.id}/edit`} target='_blank'>ویرایش</Link>
//       </button>
//       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
//         {/* Product Image Gallery */}
//         <Gallery GalleryProps={data} />

//         {/* Product Details */}
//         <div className="flex flex-col gap-6 lg:gap-8">
//           <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
//             {data.title}
//           </h1>

//           {/* Price Section */}
//           <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
//             <span className="text-green-700 text-3xl sm:text-4xl font-bold">
//               {
//                 data.price !=0 &&(
//               data.price.toLocaleString() + 'تومان'
//                 )
//               } 
//             </span>
//             {hasDiscount && (
//               <div className="flex items-center gap-3">
//                 <span className="text-lg sm:text-xl line-through text-gray-400">
//                   {data.before_discount_price.toLocaleString()} تومان
//                 </span>
//                 <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
//                   %{discountPercentage}-
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Availability, Brand, Categories */}
//           <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
//             {
//                 data.price !=0 &&(

//             <div className={`flex items-center gap-1 ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
//               <Package size={18} />
              
//               <span className="font-semibold">{stockMessage}</span> ({data.inventory} عدد)
//             </div>
//                 )
//             }
//             <div className="flex items-center gap-1 text-gray-700">
//               <Tag size={18} />
//               <span className="font-semibold">برند:</span> {data.brand}
//             </div>
//             <div className="flex items-center gap-1 text-gray-700">
//               <span className="font-semibold">دسته‌بندی‌ها:</span>
//               {data.categories.map((cat:string, i:string) => (
//                 <span key={i} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
//                   {cat}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Download Catalog */}
//           <a
//             href={data.catalog_url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center justify-center w-fit gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-5 py-2 rounded-lg transition duration-200 ease-in-out shadow-sm hover:shadow-md"
//           >
//             <Download size={20} />
//             دانلود کاتالوگ محصول
//           </a>

//           {/* Add to Cart Section */}
//         <QuantitySelector props={data.inventory} id_p={data.id} />

//           {/* Product Features */}
//           <div className="mt-6">
//             <h3 className="text-xl font-bold mb-4 text-gray-800">ویژگی‌های برجسته محصول:</h3>
//             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-base">
//               {data.product_features.map((f :string, i:string) => (
//                 <li key={i} className="flex items-start gap-3">
//                   <CheckCircle className="text-green-500 w-5 h-5 mt-1 flex-shrink-0" />
//                   <span>{f}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Tabs for Specifications, Features, Comments, Questions */}
//      <TabComponent TabProps={data} />
//      <Toaster position='top-center' />
//     </div>
//   );
// };

// export default dataLightPage;

// ❌ حذف این خط:
// 'use client';

import { Download, CheckCircle, Package, Tag } from 'lucide-react';
import TabComponent from '@/components/TabCom/TabComponent';
import Gallery from '@/components/Gallery/Gallery';
import QuantitySelector from '@/components/QuantitySelector/QuantitySelector';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';

interface IProps {
  params: { id: string }; 
}

const DataLightPage = async ({ params }: IProps) => {
  const { id } = params;

  let data = null;
  try {
    const res = await fetch(`https://apika.ir/apitak/get_products.php?title=${id}`, {
      cache: 'no-store',
    });

    const json = await res.json();
    data = Array.isArray(json) && json.length > 0 ? json[0] : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    data = null;
  }

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto p-10 text-center">
        <h2 className="text-2xl text-gray-600">محصولی یافت نشد یا خطایی رخ داده است.</h2>
      </div>
    );
  }

  const hasDiscount = data.price < data.before_discount_price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((Number(data.before_discount_price) - Number(data.price)) / Number(data.before_discount_price)) * 100
      )
    : 0;
  const isInStock = Number(data.inventory) > 0;
  const stockMessage = isInStock
    ? Number(data.inventory) > 5
      ? 'موجود در انبار'
      : `تنها ${data.inventory} عدد باقی مانده!`
    : 'ناموجود';

  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR') + ' تومان';
  };
  console.log(data.categories[0])
  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-white min-h-screen text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <Breadcrumb productName={data.title} category={data.categories[0]} link='HouseholdPump' />
      <div className="max-w-7xl mx-auto mb-8">
        <Link href={`/Products/${data.id}/edit`} target="_blank">
          <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-2 rounded-xl font-semibold shadow-md hover:from-emerald-600 hover:to-emerald-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2">
            ویرایش محصول
          </button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 lg:p-10 transition-all duration-300 hover:shadow-3xl">
        <div className="transform hover:scale-[1.01] transition-transform duration-300">
          {data.images && data.images.length > 0 ? (
            <Gallery GalleryProps={{ images: data.images, title: data.title }} />
          ) : (
            <div className="flex items-center justify-center h-80 bg-gray-100 rounded-lg">
              <p className="text-gray-500">تصویری موجود نیست</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6 lg:gap-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            {data.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="text-3xl sm:text-4xl font-bold text-green-700">
              {data.price !== 0 ? formatPrice(Number(data.price)) : 'تماس بگیرید'}
            </span>
            {hasDiscount && (
              <div className="flex items-center gap-3 bg-gradient-to-r from-red-50 to-pink-50 px-4 py-2 rounded-xl border border-red-100">
                <span className="text-lg line-through text-gray-500">
                  {formatPrice(Number(data.before_discount_price))}
                </span>
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                  %{discountPercentage} تخفیف
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            {data.price !== 0 && (
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                  isInStock
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                <Package size={18} />
                <span className="font-semibold">{stockMessage}</span>
              </div>
            )}

            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
              <Tag size={18} className="text-gray-600" />
              <span className="font-semibold text-gray-700">برند:</span>
              <span className="text-gray-800">{data.brand}</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
              {data.categories?.map((cat: string, i: number) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full hover:bg-blue-200 transition-all duration-150"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {data.catalog_url && data.catalog_url !== 'null' && data.catalog_url !== '' && (
            <a
              href={data.catalog_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 w-fit bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              <Download size={20} />
              دانلود کاتالوگ محصول
            </a>
          )}

          <div className="mt-4">
            <QuantitySelector props={Number(data.inventory)} id_p={data.id} />
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">ویژگی‌های برجسته محصول:</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.product_features?.map((f: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 hover:text-gray-900 transition-colors">
                  <CheckCircle className="text-green-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12">
        <TabComponent
          TabProps={{
            specifications: data.specifications || [],
            product_features: data.product_features || [],
          }}
        />
      </div>

    </div>
  );
};

export default DataLightPage;