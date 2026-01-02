// "use client"
// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Home, ShoppingBag, Info, Phone, Menu, X, ChevronDown, User, ShoppingCart } from "lucide-react";
// import { useAuthContext } from "@/context/AuthContext";

// export default function Header() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false); // State for mega menu
//   // Destructure userName and userFamily from AuthContext
//   const { name, family, isLoggedIn, handleLogout } = useAuthContext(); // Assuming handleLogout is also available

//   return (
//     <>
//       {/* Header */}
//       <header className="bg-white shadow-md sticky top-0 py-2 z-50 border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">

//             {/* Logo */}
//             <div className="flex-shrink-0">
//               <Link href="/" className="flex items-center">
//                 <Image
//                   src="/apika2.svg" // Placeholder for apika2.svg
//                   alt="APIKA Logo"
//                   width={100}
//                   height={40}
//                 />
//               </Link>
//             </div>

//             {/* Desktop Menu */}
//             <nav className="hidden md:flex space-x-6 rtl">
//               <Link href="/" className="flex items-center gap-1 text-gray-700 hover:text-blue-800 transition">
//                 <Home size={16} /> صفحه اصلی
//               </Link>

//               {/* Products Link with Mega Menu */}
//               <div
//                 className="relative"
//                 onMouseEnter={() => setIsProductsMenuOpen(true)}
//                 onMouseLeave={() => setIsProductsMenuOpen(false)}
//               >
//                 <Link href="/products" className="flex items-center py-7 gap-1 text-gray-700 hover:text-blue-800 transition cursor-pointer">
//                   <ShoppingBag size={16} /> محصولات <ChevronDown size={16} className={`ml-1 transition-transform ${isProductsMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
//                 </Link>

//                 {/* Mega Menu Content */}
//                 {isProductsMenuOpen && (
//                   <div
//                     className="absolute right-0 w-max rounded-xl shadow-lg p-6 grid grid-cols-2 gap-8 z-50 rtl"
//                     style={{
//                       backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white
//                       backdropFilter: 'blur(10px)', // Frosted glass effect
//                       WebkitBackdropFilter: 'blur(10px)', // For Safari support
//                       border: '1px solid rgba(255, 255, 255, 0.3)', // Subtle border
//                     }}
//                   >
//                     {/* Category 1 */}
//                     <div>
//                       <h3 className="font-bold text-gray-900 mb-3 text-lg">دسته بندی ۱</h3>
//                       <ul className="space-y-2">
//                         <li><Link href="/products/category1/item1" className="text-gray-700 hover:text-blue-800 transition block">محصول ۱.۱</Link></li>
//                         <li><Link href="/products/category1/item2" className="text-gray-700 hover:text-blue-800 transition block">محصول ۱.۲</Link></li>
//                         <li><Link href="/products/category1/item3" className="text-gray-700 hover:text-blue-800 transition block">محصول ۱.۳</Link></li>
//                       </ul>
//                     </div>

//                     {/* Category 2 */}
//                     <div>
//                       <h3 className="font-bold text-gray-900 mb-3 text-lg">دسته بندی ۲</h3>
//                       <ul className="space-y-2">
//                         <li><Link href="/products/category2/item1" className="text-gray-700 hover:text-blue-800 transition block">محصول ۲.۱</Link></li>
//                         <li><Link href="/products/category2/item2" className="text-gray-700 hover:text-blue-800 transition block">محصول ۲.۲</Link></li>
//                         <li><Link href="/products/category2/item3" className="text-gray-700 hover:text-blue-800 transition block">محصول ۲.۳</Link></li>
//                       </ul>
//                     </div>

//                     {/* Add more categories or promotional content here */}
//                     <div className="col-span-2 mt-4 pt-4 border-t border-gray-200">
//                       <h3 className="font-bold text-gray-900 mb-3 text-lg">ویژه</h3>
//                       <p className="text-gray-600 text-sm">
//                         جدیدترین محصولات و پیشنهادات ویژه ما را کاوش کنید.
//                       </p>
//                       <Link href="/products/new-arrivals" className="mt-3 inline-block bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition text-sm">
//                         مشاهده همه محصولات
//                       </Link>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <Link href="/cart" className="flex items-center gap-1 text-gray-700 hover:text-blue-800 transition">
//                 <ShoppingCart size={16} /> سبد خرید
//               </Link>
//               <Link href="/contact" className="flex items-center gap-1 text-gray-700 hover:text-blue-800 transition">
//                 <Phone size={16} /> تماس با ما
//               </Link>
//             </nav>

//             {/* Desktop User Panel / Login Button */}
//             {isLoggedIn ? (
//               <Link href="/UserPanel" className="hidden md:flex items-center text-gray-700 hover:text-blue-800 transition">
//                 <User size={20} className="ml-2" />
//                 <span className="font-semibold text-lg">{name} {family}</span>
//               </Link>
//             ) : (
//               <div className="hidden md:flex">
//                 <Link
//                   href="/Sign_in&up"
//                   className="bg-blue-800 text-white px-4 py-2 rounded-xl hover:bg-blue-900 transition"
//                 >
//                   ورود | ثبت نام
//                 </Link>
//               </div>
//             )}

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="md:hidden p-2 rounded-md cursor-pointer text-gray-700 hover:bg-gray-200 transition"
//               aria-label="باز کردن منو"
//             >
//               <Menu size={24} />
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Backdrop for Sidebar */}
//       {sidebarOpen && (
//         <div
//           onClick={() => setSidebarOpen(false)}
//           className="fixed inset-0 bg-black opacity-50 z-40 md:hidden" // Lower z-index than sidebar
//         />
//       )}

//       {/* Mobile Sidebar (Right-aligned) */}
//       <aside
//         className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden
//           ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
//         dir="rtl"
//       >
//         <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
//           <Link href="/" className="flex items-center">
//             <Image src="/apika2.svg" alt="APIKA Logo" width={100} height={40} /> {/* Placeholder */}
//           </Link>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="p-2 rounded-md text-gray-700 cursor-pointer hover:bg-gray-200 transition"
//             aria-label="بستن منو"
//           >
//             <X size={24} />
//           </button>
//         </div>
//         <nav className="flex flex-col mt-4 space-y-4 px-4 rtl">
//           <Link
//             href="/"
//             onClick={() => setSidebarOpen(false)}
//             className="flex items-center gap-2 text-gray-700 hover:text-blue-800 transition"
//           >
//             <Home size={20} /> صفحه اصلی
//           </Link>
//           <Link
//             href="/products"
//             onClick={() => setSidebarOpen(false)}
//             className="flex items-center gap-2 text-gray-700 hover:text-blue-800 transition"
//           >
//             <ShoppingBag size={20} /> محصولات
//           </Link>
//           <Link
//             href="/cart"
//             onClick={() => setSidebarOpen(false)}
//             className="flex items-center gap-2 text-gray-700 hover:text-blue-800 transition"
//           >
//             <ShoppingCart size={20} /> سبد خرید
//           </Link>
//           <Link
//             href="/about"
//             onClick={() => setSidebarOpen(false)}
//             className="flex items-center gap-2 text-gray-700 hover:text-blue-800 transition"
//           >
//             <Info size={20} /> درباره ما
//           </Link>
//           <Link
//             href="/contact"
//             onClick={() => setSidebarOpen(false)}
//             className="flex items-center gap-2 text-gray-700 hover:text-blue-800 transition"
//           >
//             <Phone size={20} /> تماس با ما
//           </Link>

//           {/* Mobile User Panel / Login Button */}
//           {isLoggedIn ? (
//             <Link
//               href="/UserPanel"
//               onClick={() => setSidebarOpen(false)}
//               className="mt-6 flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-xl font-semibold hover:bg-blue-200 transition"
//             >
//               <User size={20} /> {name} {family}
//             </Link>
//           ) : (
//             <Link
//               href="/Sign_in&up"
//               onClick={() => setSidebarOpen(false)}
//               className="mt-6 bg-blue-800 text-white px-4 py-2 rounded-xl text-center hover:bg-blue-900 transition"
//             >
//               ورود | ثبت نام
//             </Link>
//           )}
//         </nav>
//       </aside>
//     </>
//   );
// }

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  ShoppingBag,
  Info,
  Phone,
  Menu,
  X,
  ChevronDown,
  User,
  ShoppingCart,
} from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';
import { useShoppingCartContext } from '@/context/ShoppingCartContext';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // برای تشخیص کلیک/هوور روی منو
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { name, family, isLoggedIn } = useAuthContext();
  const {cartTotalQty} =useShoppingCartContext();

  // باز کردن منو
  const openMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsProductsMenuOpen(true);
  };

  // بستن منو با تأخیر
  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => {
      setIsProductsMenuOpen(false);
    }, 200); // 200ms تأخیر — کاربر وقت دارد حرکت کند
  };

  // پاک‌سازی تایمر در unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Header با گلاس مورفیسم */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border border-gray-200 shadow-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center font-bold text-xl group">
                <Image src="/apika2.svg" alt="APIKA Logo" width={130} height={40} />
              </Link>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-1 rtl" ref={menuRef}>
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-300 group"
              >
                <Home size={18} className="group-hover:rotate-6 transition-transform" />
                صفحه اصلی
              </Link>

              {/* مگا منوی هوشمند */}
              <div
                className="relative"
                onMouseEnter={openMenu}
                onMouseLeave={closeMenu}
              >
                {/* لینک اصلی */}
                <span
                  className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-xl cursor-pointer transition-all duration-300 group"
                >
                  <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                  محصولات
                  <ChevronDown
                    size={16}
                    className={`mr-1 transition-transform duration-300 ${
                      isProductsMenuOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </span>

                {/* مگا منوی شیشه‌ای با انتقال هوشمند */}
                {isProductsMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-96 origin-top-right rounded-2xl overflow-hidden shadow-2xl border border-gray-100 z-50"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                    }}
                    onMouseEnter={openMenu} // وقتی موس وارد منو شد، باز بمونه
                    onMouseLeave={closeMenu} // وقتی بیرون رفت، بسته بشه
                  >
                    <div className="p-6 grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                          <span className="inline-block w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
                          دسته بندی ۱
                        </h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/products/category1/item1"
                              className="block text-gray-700 hover:text-blue-700 hover:translate-x-1 transition-all duration-200"
                            >
                              محصول ۱.۱
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/products/category1/item2"
                              className="block text-gray-700 hover:text-blue-700 hover:translate-x-1 transition-all duration-200"
                            >
                              محصول ۱.۲
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/products/category1/item3"
                              className="block text-gray-700 hover:text-blue-700 hover:translate-x-1 transition-all duration-200"
                            >
                              محصول ۱.۳
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                          <span className="inline-block w-2 h-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-full"></span>
                          دسته بندی ۲
                        </h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/products/category2/item1"
                              className="block text-gray-700 hover:text-green-700 hover:translate-x-1 transition-all duration-200"
                            >
                              محصول ۲.۱
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/products/category2/item2"
                              className="block text-gray-700 hover:text-green-700 hover:translate-x-1 transition-all duration-200"
                            >
                              محصول ۲.۲
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/products/category2/item3"
                              className="block text-gray-700 hover:text-green-700 hover:translate-x-1 transition-all duration-200"
                            >
                              محصول ۲.۳
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-4">
                      <h3 className="font-bold text-lg mb-1">✨ پیشنهاد ویژه</h3>
                      <p className="text-blue-100 text-sm mb-3">تخفیف تا ۴۰٪ روی جدیدترین محصولات</p>
                      <Link
                        href="/products/special"
                        className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm px-5 py-2 rounded-xl transition-all duration-300"
                      >
                        مشاهده پیشنهادها →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* سایر آیتم‌ها */}
              <Link
  href="/cart"
  className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:text-orange-700 hover:bg-orange-50 rounded-xl transition-all duration-300 group relative"
>
  <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
  <span className="relative">
    سبد خرید
    {cartTotalQty > 0 && (
      <span
        style={{
          background: 'linear-gradient(135deg, #fdba74, #f97316)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
        className="absolute -top-2 -right-6 text-white text-xs font-bold px-2 min-w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-orange-200 animate-pulse"
      >
        {cartTotalQty}
      </span>
    )}
  </span>
</Link>

              <Link
                href="/contact"
                className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300 group"
              >
                <Phone size={18} className="group-hover:scale-110 transition-transform" />
                تماس با ما
              </Link>
            </nav>

            {/* دکمه ورود / پنل */}
            <div className="hidden md:flex">
              {isLoggedIn ? (
                <Link
                  href="/UserPanel"
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl shadow-sm hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
                >
                  <User size={20} /> {name} {family}
                </Link>
              ) : (
                <Link
                  href="/Sign_in&up"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl shadow-sm hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  ورود | ثبت نام
                </Link>
              )}
            </div>

            {/* منوی موبایل */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
              aria-label="باز کردن منو"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
        />
      )}

      {/* سایدبار موبایل */}
      <aside
        className={`fixed top-0 right-0 z-50 w-80 h-full bg-white shadow-2xl transform transition-transform duration-500 ease-in-out md:hidden ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        dir="rtl"
      >
        {/* ... (همان سایدبار قبلی) */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-gray-200">
          <Link href="/" onClick={() => setSidebarOpen(false)}>
            <Image src="/apika2.svg" alt="Logo" width={120} height={40} />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="p-6 space-y-4">
          <Link
            href="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-50 rounded-xl"
          >
            <Home size={20} /> صفحه اصلی
          </Link>
          <Link
            href="/products"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 p-3 text-gray-700 hover:bg-purple-50 rounded-xl"
          >
            <ShoppingBag size={20} /> محصولات
          </Link>
          <Link
            href="/cart"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 p-3 text-gray-700 hover:bg-orange-50 rounded-xl"
          >
            <ShoppingCart size={20} /> سبد خرید
          </Link>
          <Link
            href="/about"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 p-3 text-gray-700 hover:bg-green-50 rounded-xl"
          >
            <Info size={20} /> درباره ما
          </Link>
          <Link
            href="/contact"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 p-3 text-gray-700 hover:bg-red-50 rounded-xl"
          >
            <Phone size={20} /> تماس با ما
          </Link>
          {isLoggedIn ? (
            <Link
              href="/UserPanel"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 p-4 mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg transform hover:scale-105"
            >
              <User size={22} /> {name} {family}
            </Link>
          ) : (
            <Link
              href="/Sign_in&up"
              onClick={() => setSidebarOpen(false)}
              className="block text-center p-4 mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-lg transform hover:scale-105 font-medium"
            >
              ورود | ثبت نام
            </Link>
          )}
        </nav>
      </aside>
    </>
  );
}