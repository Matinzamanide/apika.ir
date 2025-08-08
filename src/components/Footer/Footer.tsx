'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  ArrowUp 
} from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // انیمیشن ظهور فوتر
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <footer className={`bg-gray-50 text-gray-700 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* بخش اصلی فوتر */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* ستون ۱: لوگو و توضیحات */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-2xl text-blue-700">
            <img src="/apika2.svg" alt="APIKA Logo" className="h-10" />
          </Link>
          <p className="text-sm leading-relaxed text-gray-500">
            APIKA، تأمین‌کننده تجهیزات صنعتی و پمپ با کیفیت. 
            با بیش از ۱۰ سال تجربه در زمینه پمپ‌ها، موتورها و گیربکس‌ها.
          </p>
          <div className="flex space-x-4 space-x-reverse">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
              <Instagram size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
              <Facebook size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors duration-300">
              <Youtube size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-800 transition-colors duration-300">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* ستون ۲: دسته‌بندی‌ها */}
        <div>
          <h3 className="font-bold text-lg mb-6 text-gray-800">دسته‌بندی‌ها</h3>
          <ul className="space-y-3">
            <li><Link href="/HouseholdPump" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">پمپ آب خانگی</Link></li>
            <li><Link href="/Cooler" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">موتور کولر</Link></li>
            <li><Link href="/product-category/gearbox/" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">گیربکس صنعتی</Link></li>
            <li><Link href="/ExpansionSource" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">مبدل انبساط</Link></li>
            <li><Link href="/product-category/mechanical-seal/" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">مکانیکال سیل</Link></li>
          </ul>
        </div>

        {/* ستون ۳: لینک‌های سریع */}
        <div>
          <h3 className="font-bold text-lg mb-6 text-gray-800">لینک‌های سریع</h3>
          <ul className="space-y-3">
            <li><Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">صفحه اصلی</Link></li>
            <li><Link href="/cart" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">سبد خرید</Link></li>
            <li><Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">تماس با ما</Link></li>
            <li><Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">درباره ما</Link></li>
            <li><Link href="/faq" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">سوالات متداول</Link></li>
          </ul>
        </div>

        {/* ستون ۴: اطلاعات تماس */}
        <div>
          <h3 className="font-bold text-lg mb-6 text-gray-800">اطلاعات تماس</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <Phone size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <span>021-12345678 <br /> 0912-345-6789</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <span>info@apika.ir</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <span>تهران، خیابان ولیعصر، نرسیده به میدان آزادی، پلاک ۱۲۳</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <span>شنبه تا چهارشنبه: ۸:۳۰ تا ۱۷:۰۰ <br /> پنجشنبه: ۸:۳۰ تا ۱۳:۰۰</span>
            </li>
          </ul>
        </div>
      </div>

      {/* خط جداکننده */}
      <div className="border-t border-gray-200"></div>

      {/* بخش پایینی (کپی‌رایت و دکمه بالا رفتن) */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} APIKA. تمامی حقوق محفوظ است.</p>
        
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-sm"
          aria-label="برو به بالا"
        >
          <ArrowUp size={16} />
          بالا
        </button>
      </div>

      {/* استایل گلوبال برای فوتر */}
      <style jsx global>{`
        .footer-gradient {
          background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
        }
      `}</style>
    </footer>
  );
};

export default Footer;