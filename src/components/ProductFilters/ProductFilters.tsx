// src/components/ProductFilters/ProductFilters.tsx
'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // هوک‌های Next.js برای کار با URL

interface ProductFiltersProps {
  availableBrands: string[]; // لیستی از برندهای موجود برای نمایش در فیلتر
  title: string; // برای نمایش عنوان فیلتر (مثلا: "فیلترها")
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ availableBrands, title }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // گرفتن مقادیر فعلی فیلترها از URL
  const currentBrand = searchParams.get('brand') || 'all';
  const currentSortOrder = searchParams.get('sort') || 'default';

  // تابع برای به‌روزرسانی URL هنگام تغییر فیلتر
  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all' || value === 'default') {
      params.delete(key); // اگر مقدار پیش‌فرض بود، پارامتر را از URL حذف کن
    } else {
      params.set(key, value);
    }
    // تغییر URL بدون ریلود کامل صفحه (soft navigation)
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl p-4 space-y-6 shadow-lg md:sticky md:top-20 h-fit text-gray-800">
      <h3 className="text-xl font-bold border-b border-gray-300 pb-2">{title}</h3>

      {/* فیلتر برند */}
      <div>
        <label htmlFor="brand-filter" className="block text-sm font-medium mb-1">برند</label>
        <select
          id="brand-filter"
          value={currentBrand}
          onChange={(e) => updateUrl('brand', e.target.value)}
          className="w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="all">همه برندها</option>
          {availableBrands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      {/* مرتب‌سازی */}
      <div>
        <label className="block text-sm font-medium mb-1">مرتب‌سازی</label>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
          <button
            onClick={() => updateUrl('sort', 'cheapest')}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition
              ${currentSortOrder === 'cheapest' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          >
            ارزان‌ترین
          </button>
          <button
            onClick={() => updateUrl('sort', 'most_expensive')}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition
              ${currentSortOrder === 'most_expensive' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          >
            گران‌ترین
          </button>
          <button
            onClick={() => updateUrl('sort', 'default')}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition
              ${currentSortOrder === 'default' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          >
            پیش‌فرض
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;