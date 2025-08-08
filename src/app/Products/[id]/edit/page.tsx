'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Specification {
  spec_key: string;
  spec_label: string;
  spec_value: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  before_discount_price: number;
  inventory: number;
  brand: string;
  catalog_url: string;
  images: string[];
  categories: string[];
  specifications: Specification[];
  product_features: string[];
}

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1️⃣ دریافت اطلاعات محصول
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://apika.ir/apitak/get_products.php?id=${id}`);
        if (!res.ok) throw new Error('محصول یافت نشد');
        const data = await res.json();
        if (data && data.id) {
          setProduct(data);
        } else {
          throw new Error('داده نامعتبر');
        }
      } catch (err) {
        console.error('خطا در دریافت محصول:', err);
        alert('خطا در بارگذاری محصول. لطفاً دوباره امتحان کنید.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // 2️⃣ تغییر فیلدهای ساده
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setProduct((prev) => (prev ? { ...prev, [name]: value } : null));
    },
    []
  );

  // 3️⃣ آپلود تصاویر جدید به سرور
  const handleImageUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0 || !product) return;

      // فیلتر کردن فقط تصاویر
      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith('image/')
      );

      if (imageFiles.length === 0) {
        alert('لطفاً فقط فایل تصویر انتخاب کنید.');
        return;
      }

      const formData = new FormData();
      imageFiles.forEach((file) => formData.append('images[]', file));

      try {
        const res = await fetch('https://apika.ir/apitak/upload.php', {
          method: 'POST',
          body: formData,
          // ❌ نباید Content-Type ست شود — مرورگر خودش می‌ذاره
        });

        const result = await res.json();

        if (result.success && Array.isArray(result.image_urls)) {
          // ✅ آپلود موفقیت‌آمیز — آپدیت وضعیت
          setProduct((prev) =>
            prev
              ? {
                  ...prev,
                  images: [...prev.images, ...result.image_urls],
                }
              : null
          );
          alert(`${result.image_urls.length} تصویر با موفقیت آپلود شد.`);
        } else {
          throw new Error(result.error || 'آپلود ناموفق');
        }
      } catch (err) {
        console.error('خطا در آپلود عکس:', err);
        alert('آپلود تصویر با خطا مواجه شد. لطفاً دوباره امتحان کنید.');
      }
    },
    [product]
  );

  // 4️⃣ مدیریت آرایه‌ها: دسته‌ها، ویژگی‌ها، تصاویر (دستی)
  const handleArrayChange = useCallback(
    (key: 'images' | 'categories' | 'product_features', index: number, value: string) => {
      setProduct((prev) =>
        prev
          ? {
              ...prev,
              [key]: prev[key].map((item, i) => (i === index ? value : item)),
            }
          : null
      );
    },
    []
  );

  const handleAddToArray = useCallback(
    (key: 'images' | 'categories' | 'product_features', defaultValue: string = '') => {
      setProduct((prev) => (prev ? { ...prev, [key]: [...prev[key], defaultValue] } : null));
    },
    []
  );

  const handleRemoveFromArray = useCallback(
    (key: 'images' | 'categories' | 'product_features', index: number) => {
      setProduct((prev) =>
        prev
          ? {
              ...prev,
              [key]: prev[key].filter((_, i) => i !== index),
            }
          : null
      );
    },
    []
  );

  // 5️⃣ مدیریت مشخصات فنی
  const handleSpecChange = useCallback(
    (index: number, field: 'spec_key' | 'spec_label' | 'spec_value', value: string) => {
      setProduct((prev) =>
        prev
          ? {
              ...prev,
              specifications: prev.specifications.map((spec, i) =>
                i === index ? { ...spec, [field]: value } : spec
              ),
            }
          : null
      );
    },
    []
  );

  const addSpec = useCallback(() => {
    setProduct((prev) =>
      prev
        ? {
            ...prev,
            specifications: [
              ...prev.specifications,
              { spec_key: '', spec_label: '', spec_value: '' },
            ],
          }
        : null
    );
  }, []);

  const removeSpec = useCallback((index: number) => {
    setProduct((prev) =>
      prev
        ? {
            ...prev,
            specifications: prev.specifications.filter((_, i) => i !== index),
          }
        : null
    );
  }, []);

  // 6️⃣ ارسال فرم و آپدیت محصول
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('https://apika.ir/apitak/update_product.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      const result = await res.json();

      if (result.success) {
        alert('محصول با موفقیت ویرایش شد!');
        router.push('/products'); // یا مسیر دلخواه
        router.refresh();
      } else {
        alert('خطا در ویرایش: ' + (result.error || 'نامشخص'));
      }
    } catch (err) {
      console.error('خطا در ارسال فرم:', err);
      alert('خطا در ارتباط با سرور. لطفاً دوباره امتحان کنید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 7️⃣ UI بارگذاری و خطای محصول
  if (loading) {
    return <div className="p-10 text-center text-lg">در حال بارگذاری...</div>;
  }

  if (!product) {
    return (
      <div className="p-10 text-center text-lg text-red-500">
        محصول یافت نشد یا خطایی رخ داده است.
      </div>
    );
  }

  // 8️⃣ رِندر فرم
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl my-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">ویرایش محصول</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <input type="hidden" name="id" value={product.id} />

        {/* عنوان */}
        <div className="space-y-2">
          <label className="block font-semibold text-gray-700">عنوان</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="عنوان محصول"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* قیمت و موجودی */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700">قیمت (تومان)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="مثلاً 5000000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700">قیمت قبل از تخفیف</label>
            <input
              type="number"
              name="before_discount_price"
              value={product.before_discount_price}
              onChange={handleChange}
              placeholder="در صورت نیاز"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700">موجودی</label>
            <input
              type="number"
              name="inventory"
              value={product.inventory}
              onChange={handleChange}
              placeholder="تعداد"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>
        </div>

        {/* برند و کاتالوگ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700">برند</label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              placeholder="نام برند"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700">لینک کاتالوگ</label>
            <input
              type="text"
              name="catalog_url"
              value={product.catalog_url}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>
        </div>

        {/* دسته‌بندی‌ها */}
        <div className="space-y-3">
          <label className="block font-semibold text-gray-700">دسته‌بندی‌ها</label>
          {product.categories.map((cat, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                type="text"
                value={cat}
                onChange={(e) => handleArrayChange('categories', i, e.target.value)}
                placeholder={`دسته‌بندی ${i + 1}`}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
              />
              <button
                type="button"
                onClick={() => handleRemoveFromArray('categories', i)}
                className="text-red-500 hover:text-red-700 font-bold px-3 py-1"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddToArray('categories')}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition"
          >
            + افزودن دسته‌بندی
          </button>
        </div>

        {/* تصاویر */}
        <div className="space-y-3">
          <label className="block font-semibold text-gray-700">تصاویر</label>
          {product.images.map((img, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                type="text"
                value={img}
                onChange={(e) => handleArrayChange('images', i, e.target.value)}
                placeholder="URL تصویر"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
              />
              <button
                type="button"
                onClick={() => handleRemoveFromArray('images', i)}
                className="text-red-500 hover:text-red-700 font-bold px-3 py-1"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddToArray('images')}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition"
          >
            + افزودن تصویر دستی
          </button>

          {/* آپلود فایل */}
          <div className="mt-4">
            <label className="block font-medium text-gray-700 mb-2">آپلود تصاویر جدید</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files)}
              className="w-full file:px-4 file:py-2 file:rounded-lg file:bg-blue-600 file:text-white file:border-none file:cursor-pointer hover:file:bg-blue-700"
            />
          </div>
        </div>

        {/* مشخصات فنی */}
        <div className="space-y-3">
          <label className="block font-semibold text-gray-700">مشخصات فنی</label>
          {product.specifications.map((spec, i) => (
            <div key={i} className="grid grid-cols-4 gap-2 items-center">
              <input
                type="text"
                placeholder="کلید"
                value={spec.spec_key}
                onChange={(e) => handleSpecChange(i, 'spec_key', e.target.value)}
                className="col-span-1 border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="text"
                placeholder="برچسب"
                value={spec.spec_label}
                onChange={(e) => handleSpecChange(i, 'spec_label', e.target.value)}
                className="col-span-1 border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="text"
                placeholder="مقدار"
                value={spec.spec_value}
                onChange={(e) => handleSpecChange(i, 'spec_value', e.target.value)}
                className="col-span-1 border border-gray-300 rounded-lg px-3 py-2"
              />
              <button
                type="button"
                onClick={() => removeSpec(i)}
                className="text-red-500 hover:text-red-700 font-bold px-2"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSpec}
            className="text-sm bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg transition"
          >
            + افزودن مشخصه
          </button>
        </div>

        {/* ویژگی‌ها */}
        <div className="space-y-3">
          <label className="block font-semibold text-gray-700">ویژگی‌ها</label>
          {product.product_features.map((feature, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleArrayChange('product_features', i, e.target.value)}
                placeholder={`ویژگی ${i + 1}`}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
              />
              <button
                type="button"
                onClick={() => handleRemoveFromArray('product_features', i)}
                className="text-red-500 hover:text-red-700 font-bold px-3 py-1"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddToArray('product_features')}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition"
          >
            + افزودن ویژگی
          </button>
        </div>

        {/* دکمه ارسال */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-lg transition-colors duration-300 mt-6"
        >
          {isSubmitting ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
        </button>
      </form>
    </div>
  );
}