'use client';
import { useState } from 'react';
import { Plus, X, UploadCloud, CheckCircle2, FileText, ImageIcon, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

interface Specification {
  spec_key: string;
  spec_label: string;
  spec_value: string;
}

const NewProductForm = () => {
  const [form, setForm] = useState({
    title: '',
    price: '',
    before_discount_price: '',
    inventory: '',
    brand: '',
    catalog_url: '', // اینجا می‌تونه از فایل یا URL دستی پر بشه
    images: [] as string[],
    categories: [''],
    specifications: [{ spec_key: '', spec_label: '', spec_value: '' }] as Specification[],
    product_features: [''],
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [manualImageUrls, setManualImageUrls] = useState<string[]>(['']);
  const [catalogFile, setCatalogFile] = useState<File | null>(null);
  const [manualCatalogUrl, setManualCatalogUrl] = useState(''); // URL دستی کاتالوگ
  const [uploading, setUploading] = useState(false);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (
    field: 'categories' | 'product_features',
    index: number,
    value: string
  ) => {
    const updated = [...form[field]];
    updated[index] = value;
    handleChange(field, updated);
  };

  const addToArray = (field: 'categories' | 'product_features' | 'specifications') => {
    if (field === 'specifications') {
      handleChange(field, [...form.specifications, { spec_key: '', spec_label: '', spec_value: '' }]);
    } else {
      handleChange(field, [...form[field], '']);
    }
  };

  const removeFromArray = (
    field: 'categories' | 'product_features' | 'specifications',
    index: number
  ) => {
    const updated = [...form[field]];
    updated.splice(index, 1);
    handleChange(field, updated);
  };

  const handleSpecChange = (
    index: number,
    key: keyof Specification,
    value: string
  ) => {
    const updated = [...form.specifications];
    updated[index][key] = value;
    setForm((prev) => ({ ...prev, specifications: updated }));
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    if (newFiles.length > 0) {
      setImageFiles((prev) => [...prev, ...newFiles]);
    }
    e.target.value = '';
  };

  const handleManualUrlChange = (index: number, value: string) => {
    const updatedUrls = [...manualImageUrls];
    updatedUrls[index] = value;
    setManualImageUrls(updatedUrls);
  };

  const addManualImageUrl = () => {
    setManualImageUrls((prev) => [...prev, '']);
  };

  const removeManualImageUrl = (index: number) => {
    const updatedUrls = [...manualImageUrls];
    updatedUrls.splice(index, 1);
    setManualImageUrls(updatedUrls);
  };

  const removeImagePreview = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // آپلود یک فایل (تصویر یا PDF)
  const handleFileUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('https://apika.ir/apitak/upload.php', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();
      if (data.url) return data.url;
      toast.error(`آپلود فایل ${file.name} شکست خورد: ${data.message || 'خطای نامشخص'}`);
      return '';
    } catch (error) {
      console.error('Error uploading file:', file.name, error);
      toast.error(`خطا در آپلود ${file.name}`);
      return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    toast.loading('در حال آپلود فایل‌ها و ارسال محصول...');

    let catalogUrl = '';

    // اولویت: اگر فایل آپلود شده باشد، آن را آپلود کن
    if (catalogFile) {
      catalogUrl = await handleFileUpload(catalogFile);
      if (!catalogUrl) {
        setUploading(false);
        toast.dismiss();
        return;
      }
    }
    // اگر فایل نبود، از URL دستی استفاده کن
    else if (manualCatalogUrl.trim() !== '') {
      catalogUrl = manualCatalogUrl.trim();
    }

    // آپلود تصاویر
    const uploadedImages: string[] = [];
    for (const img of imageFiles) {
      const url = await handleFileUpload(img);
      if (url) uploadedImages.push(url);
    }

    const allImages = [...uploadedImages, ...manualImageUrls.filter(url => url.trim() !== '')];

    if (allImages.length === 0) {
      toast.dismiss();
      toast.error('لطفاً حداقل یک تصویر برای محصول اضافه کنید.');
      setUploading(false);
      return;
    }

    const finalForm = {
      ...form,
      catalog_url: catalogUrl,
      images: allImages,
      price: Number(form.price) || 0,
      before_discount_price: Number(form.before_discount_price) || 0,
      inventory: Number(form.inventory) || 0,
    };

    try {
      const res = await fetch('https://apika.ir/apitak/insert_products.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalForm),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const result = await res.json();

      if (result.success) {
        toast.success('محصول با موفقیت ارسال شد!');
        // ✅ نمی‌خوایم فرم پاک بشه — فقط اطلاعات آپلود حذف میشه
        setImageFiles([]);
        setCatalogFile(null);
        setManualCatalogUrl('');
        setManualImageUrls(['']);
      } else {
        toast.error(`ارسال محصول شکست خورد: ${result.message || 'خطای نامشخص'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(`خطا در ارسال محصول: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setUploading(false);
      toast.dismiss();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-2xl shadow-2xl space-y-8 transition-all duration-300"
      dir="rtl"
    >
      {/* عنوان فرم */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
          افزودن محصول جدید
        </h2>
        <p className="text-gray-500 mt-2">فرم کامل و حرفه‌ای برای افزودن محصول به فروشگاه</p>
      </div>

      {/* اطلاعات اصلی */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">عنوان محصول</label>
          <input
            id="title"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
            placeholder="مثال: پمپ آب خانگی 1 اسب"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="brand" className="block text-sm font-semibold text-gray-700 mb-2">برند</label>
          <input
            id="brand"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
            placeholder="مثال: گراندفوس"
            value={form.brand}
            onChange={(e) => handleChange('brand', e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">قیمت (تومان)</label>
          <input
            id="price"
            type="number"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="مثال: 1,500,000"
            value={form.price}
            onChange={(e) => handleChange('price', e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="before_discount_price" className="block text-sm font-semibold text-gray-700 mb-2">قیمت قبل تخفیف</label>
          <input
            id="before_discount_price"
            type="number"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 text-gray-800 placeholder-gray-400"
            placeholder="مثال: 1,800,000"
            value={form.before_discount_price}
            onChange={(e) => handleChange('before_discount_price', e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="inventory" className="block text-sm font-semibold text-gray-700 mb-2">موجودی</label>
          <input
            id="inventory"
            type="number"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
            placeholder="مثال: 10"
            value={form.inventory}
            onChange={(e) => handleChange('inventory', e.target.value)}
            required
          />
        </div>
      </div>

      {/* تصاویر */}
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl shadow-inner">
        <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
          <ImageIcon size={22} className="text-blue-600" /> تصاویر محصول
        </h3>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">آپلود تصاویر</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageFileChange}
            className="file-input file-input-bordered file-input-primary w-full"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {imageFiles.map((file, i) => (
              <div key={i} className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm text-sm text-gray-700 border">
                <span className="truncate max-w-xs">{file.name}</span>
                <button type="button" onClick={() => removeImagePreview(i)} className="text-red-500 hover:text-red-700">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">افزودن URL تصاویر</label>
          {manualImageUrls.map((url, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="url"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
                value={url}
                onChange={(e) => handleManualUrlChange(i, e.target.value)}
              />
              {manualImageUrls.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeManualImageUrl(i)}
                  className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addManualImageUrl}
            className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition flex items-center gap-1 text-sm"
          >
            <Plus size={16} /> افزودن URL
          </button>
        </div>
      </div>

      {/* کاتالوگ */}
      <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FileText size={22} className="text-gray-600" /> کاتالوگ (PDF یا URL)
        </h3>

        {/* آپلود فایل */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">آپلود فایل PDF</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setCatalogFile(e.target.files?.[0] || null)}
            className="file-input file-input-bordered file-input-secondary w-full"
          />
          {catalogFile && (
            <div className="mt-3 flex items-center justify-between bg-white px-4 py-2 rounded-lg border shadow-sm">
              <span className="text-sm text-gray-700">{catalogFile.name}</span>
              <button
                type="button"
                onClick={() => setCatalogFile(null)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>

        {/* یا وارد کردن URL دستی */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">یا وارد کردن URL کاتالوگ</label>
          <input
            type="url"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/catalog.pdf"
            value={manualCatalogUrl}
            onChange={(e) => setManualCatalogUrl(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">اگر فایل آپلود نکنید، از این لینک استفاده می‌شود.</p>
        </div>
      </div>

      {/* دسته‌بندی‌ها */}
      <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-2xl">
        <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
          <Tag size={22} className="text-purple-600" /> دسته‌بندی‌ها
        </h3>
        {form.categories.map((cat, i) => (
          <div key={i} className="flex gap-2 mb-3">
            <input
              className="flex-1 px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder={`دسته‌بندی ${i + 1}`}
              value={cat}
              onChange={(e) => handleArrayChange('categories', i, e.target.value)}
            />
            {form.categories.length > 1 && (
              <button
                type="button"
                onClick={() => removeFromArray('categories', i)}
                className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
              >
                <X size={20} />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addToArray('categories')}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition flex items-center gap-1"
        >
          <Plus size={18} /> افزودن دسته
        </button>
      </div>

      {/* مشخصات فنی */}
      <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 border border-green-100 rounded-2xl">
        <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
          <CheckCircle2 size={22} className="text-green-600" /> مشخصات فنی
        </h3>
        {form.specifications.map((spec, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <input
              placeholder="کلید"
              value={spec.spec_key}
              onChange={(e) => handleSpecChange(i, 'spec_key', e.target.value)}
              className="px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              placeholder="برچسب"
              value={spec.spec_label}
              onChange={(e) => handleSpecChange(i, 'spec_label', e.target.value)}
              className="px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <div className="flex gap-2 items-center">
              <input
                placeholder="مقدار"
                value={spec.spec_value}
                onChange={(e) => handleSpecChange(i, 'spec_value', e.target.value)}
                className="flex-1 px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              {form.specifications.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFromArray('specifications', i)}
                  className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addToArray('specifications')}
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition flex items-center gap-1"
        >
          <Plus size={18} /> افزودن مشخصه
        </button>
      </div>

      {/* ویژگی‌ها */}
      <div className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-100 rounded-2xl">
        <h3 className="text-lg font-bold text-orange-800 mb-4 flex items-center gap-2">
          <CheckCircle2 size={22} className="text-orange-600" /> ویژگی‌های محصول
        </h3>
        {form.product_features.map((feat, i) => (
          <div key={i} className="flex gap-2 mb-3">
            <input
              className="flex-1 px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder={`ویژگی ${i + 1}`}
              value={feat}
              onChange={(e) => handleArrayChange('product_features', i, e.target.value)}
            />
            {form.product_features.length > 1 && (
              <button
                type="button"
                onClick={() => removeFromArray('product_features', i)}
                className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
              >
                <X size={20} />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addToArray('product_features')}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:from-orange-600 hover:to-yellow-600 transition flex items-center gap-1"
        >
          <Plus size={18} /> افزودن ویژگی
        </button>
      </div>

      {/* دکمه ارسال */}
      <button
        type="submit"
        disabled={uploading}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-lg font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {uploading ? (
          <>
            <UploadCloud size={22} className="animate-spin" /> در حال آپلود و ارسال...
          </>
        ) : (
          <>
            <CheckCircle2 size={22} /> ارسال محصول
          </>
        )}
      </button>
    </form>
  );
};

export default NewProductForm;


// 'use client';
// import { useState } from 'react';
// import { Plus, X, UploadCloud, CheckCircle2, FileText, Image as ImageIcon, Tag } from 'lucide-react';
// import toast from 'react-hot-toast';

// interface Specification {
//   spec_key: string;
//   spec_label: string;
//   spec_value: string;
// }

// const NewProductForm = () => {
//   const [form, setForm] = useState({
//     title: '',
//     price: '',
//     before_discount_price: '',
//     inventory: '',
//     brand: '',
//     catalog_url: '',
//     images: [] as string[],
//     categories: [''],
//     specifications: [{ spec_key: '', spec_label: '', spec_value: '' }] as Specification[],
//     product_features: [''],
//   });

//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [manualImageUrls, setManualImageUrls] = useState<string[]>(['']);
//   const [catalogFile, setCatalogFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);

//   const handleChange = (field: string, value: any) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleArrayChange = (
//     field: 'categories' | 'product_features',
//     index: number,
//     value: string
//   ) => {
//     const updated = [...form[field]];
//     updated[index] = value;
//     handleChange(field, updated);
//   };

//   const addToArray = (field: 'categories' | 'product_features' | 'specifications') => {
//     if (field === 'specifications') {
//       handleChange(field, [...form.specifications, { spec_key: '', spec_label: '', spec_value: '' }]);
//     } else {
//       handleChange(field, [...form[field], '']);
//     }
//   };

//   const removeFromArray = (
//     field: 'categories' | 'product_features' | 'specifications',
//     index: number
//   ) => {
//     const updated = [...form[field]];
//     updated.splice(index, 1);
//     handleChange(field, updated);
//   };

//   const handleSpecChange = (
//     index: number,
//     key: keyof Specification,
//     value: string
//   ) => {
//     const updated = [...form.specifications];
//     updated[index][key] = value;
//     setForm((prev) => ({ ...prev, specifications: updated }));
//   };

//   const handleFileUpload = async (file: File): Promise<string> => {
//     const formData = new FormData();
//     formData.append('file', file);
//     try {
//       const res = await fetch('https://apika.ir/apitak/upload.php', {
//         method: 'POST',
//         body: formData,
//       });
//       if (!res.ok) throw new Error(`Server responded with ${res.status}`);
//       const data = await res.json();
//       if (data.url) return data.url;
//       toast.error(`آپلود فایل ${file.name} شکست خورد: ${data.message || 'خطای نامشخص'}`);
//       return '';
//     } catch (error) {
//       console.error('Error uploading file:', file.name, error);
//       toast.error(`خطا در آپلود ${file.name}`);
//       return '';
//     }
//   };

//   const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newFiles = e.target.files ? Array.from(e.target.files) : [];
//     if (newFiles.length > 0) {
//       setImageFiles((prev) => [...prev, ...newFiles]);
//     }
//     e.target.value = '';
//   };

//   const handleManualUrlChange = (index: number, value: string) => {
//     const updatedUrls = [...manualImageUrls];
//     updatedUrls[index] = value;
//     setManualImageUrls(updatedUrls);
//   };

//   const addManualImageUrl = () => {
//     setManualImageUrls((prev) => [...prev, '']);
//   };

//   const removeManualImageUrl = (index: number) => {
//     const updatedUrls = [...manualImageUrls];
//     updatedUrls.splice(index, 1);
//     setManualImageUrls(updatedUrls);
//   };

//   const removeImagePreview = (index: number) => {
//     setImageFiles((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setUploading(true);
//     toast.loading('در حال آپلود فایل‌ها و ارسال محصول...');

//     let catalogUrl = '';
//     if (catalogFile) {
//       catalogUrl = await handleFileUpload(catalogFile);
//       if (!catalogUrl) {
//         setUploading(false);
//         toast.dismiss();
//         return;
//       }
//     }

//     const uploadedImages: string[] = [];
//     for (const img of imageFiles) {
//       const url = await handleFileUpload(img);
//       if (url) uploadedImages.push(url);
//     }

//     const allImages = [...uploadedImages, ...manualImageUrls.filter(url => url.trim() !== '')];

//     if (allImages.length === 0) {
//       toast.dismiss();
//       toast.error('لطفاً حداقل یک تصویر برای محصول اضافه کنید.');
//       setUploading(false);
//       return;
//     }

//     const finalForm = {
//       ...form,
//       catalog_url: catalogUrl,
//       images: allImages,
//       price: Number(form.price) || 0,
//       before_discount_price: Number(form.before_discount_price) || 0,
//       inventory: Number(form.inventory) || 0,
//     };

//     try {
//       const res = await fetch('https://apika.ir/apitak/insert_products.php', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(finalForm),
//       });
//       if (!res.ok) throw new Error(`Server responded with ${res.status}`);
//       const result = await res.json();
//       if (result.success) {
//         toast.success('محصول با موفقیت ارسال شد!');
//         setForm({
//           title: '', price: '', before_discount_price: '', inventory: '', brand: '',
//           catalog_url: '', images: [], categories: [''], specifications: [{ spec_key: '', spec_label: '', spec_value: '' }],
//           product_features: [''],
//         });
//         setImageFiles([]);
//         setManualImageUrls(['']);
//         setCatalogFile(null);
//       } else {
//         toast.error(`ارسال محصول شکست خورد: ${result.message || 'خطای نامشخص'}`);
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       toast.error(`خطا در ارسال محصول: ${error instanceof Error ? error.message : String(error)}`);
//     } finally {
//       setUploading(false);
//       toast.dismiss();
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-2xl shadow-2xl space-y-8 transition-all duration-300"
//       dir="rtl"
//     >
//       {/* عنوان فرم */}
//       <div className="text-center mb-8">
//         <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
//           افزودن محصول جدید
//         </h2>
//         <p className="text-gray-500 mt-2">فرم کامل و حرفه‌ای برای افزودن محصول به فروشگاه</p>
//       </div>

//       {/* اطلاعات اصلی */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//         <div>
//           <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">عنوان محصول</label>
//           <input
//             id="title"
//             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
//             placeholder="مثال: پمپ آب خانگی 1 اسب"
//             value={form.title}
//             onChange={(e) => handleChange('title', e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="brand" className="block text-sm font-semibold text-gray-700 mb-2">برند</label>
//           <input
//             id="brand"
//             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
//             placeholder="مثال: گراندفوس"
//             value={form.brand}
//             onChange={(e) => handleChange('brand', e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">قیمت (تومان)</label>
//           <input
//             id="price"
//             type="number"
//             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//             placeholder="مثال: 1,500,000"
//             value={form.price}
//             onChange={(e) => handleChange('price', e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="before_discount_price" className="block text-sm font-semibold text-gray-700 mb-2">قیمت قبل تخفیف</label>
//           <input
//             id="before_discount_price"
//             type="number"
//             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 text-gray-800 placeholder-gray-400"
//             placeholder="مثال: 1,800,000"
//             value={form.before_discount_price}
//             onChange={(e) => handleChange('before_discount_price', e.target.value)}
//           />
//         </div>
//         <div className="md:col-span-2">
//           <label htmlFor="inventory" className="block text-sm font-semibold text-gray-700 mb-2">موجودی</label>
//           <input
//             id="inventory"
//             type="number"
//             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
//             placeholder="مثال: 10"
//             value={form.inventory}
//             onChange={(e) => handleChange('inventory', e.target.value)}
//             required
//           />
//         </div>
//       </div>

//       {/* تصاویر */}
//       <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl shadow-inner">
//         <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
//           <ImageIcon size={22} className="text-blue-600" /> تصاویر محصول
//         </h3>
//         <div className="mb-5">
//           <label className="block text-sm font-medium text-gray-700 mb-2">آپلود تصاویر</label>
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleImageFileChange}
//             className="file-input file-input-bordered file-input-primary w-full"
//           />
//           <div className="mt-3 flex flex-wrap gap-2">
//             {imageFiles.map((file, i) => (
//               <div key={i} className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm text-sm text-gray-700 border">
//                 <span className="truncate max-w-xs">{file.name}</span>
//                 <button type="button" onClick={() => removeImagePreview(i)} className="text-red-500 hover:text-red-700">
//                   <X size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">افزودن URL تصاویر</label>
//           {manualImageUrls.map((url, i) => (
//             <div key={i} className="flex gap-2 mb-2">
//               <input
//                 type="url"
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="https://example.com/image.jpg"
//                 value={url}
//                 onChange={(e) => handleManualUrlChange(i, e.target.value)}
//               />
//               {manualImageUrls.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeManualImageUrl(i)}
//                   className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition"
//                 >
//                   <X size={18} />
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addManualImageUrl}
//             className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition flex items-center gap-1 text-sm"
//           >
//             <Plus size={16} /> افزودن URL
//           </button>
//         </div>
//       </div>

//       {/* کاتالوگ */}
//       <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl">
//         <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//           <FileText size={22} className="text-gray-600" /> کاتالوگ (PDF)
//         </h3>
//         <input
//           type="file"
//           accept=".pdf"
//           onChange={(e) => setCatalogFile(e.target.files?.[0] || null)}
//           className="file-input file-input-bordered file-input-secondary w-full"
//         />
//         {catalogFile && (
//           <div className="mt-3 flex items-center justify-between bg-white px-4 py-2 rounded-lg border shadow-sm">
//             <span className="text-sm text-gray-700">{catalogFile.name}</span>
//             <button
//               type="button"
//               onClick={() => setCatalogFile(null)}
//               className="text-red-500 hover:text-red-700"
//             >
//               <X size={18} />
//             </button>
//           </div>
//         )}
//       </div>

//       {/* دسته‌بندی‌ها */}
//       <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-2xl">
//         <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
//           <Tag size={22} className="text-purple-600" /> دسته‌بندی‌ها
//         </h3>
//         {form.categories.map((cat, i) => (
//           <div key={i} className="flex gap-2 mb-3">
//             <input
//               className="flex-1 px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//               placeholder={`دسته‌بندی ${i + 1}`}
//               value={cat}
//               onChange={(e) => handleArrayChange('categories', i, e.target.value)}
//             />
//             {form.categories.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeFromArray('categories', i)}
//                 className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
//               >
//                 <X size={20} />
//               </button>
//             )}
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() => addToArray('categories')}
//           className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition flex items-center gap-1"
//         >
//           <Plus size={18} /> افزودن دسته
//         </button>
//       </div>

//       {/* مشخصات فنی */}
//       <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 border border-green-100 rounded-2xl">
//         <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
//           <CheckCircle2 size={22} className="text-green-600" /> مشخصات فنی
//         </h3>
//         {form.specifications.map((spec, i) => (
//           <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
//             <input
//               placeholder="کلید"
//               value={spec.spec_key}
//               onChange={(e) => handleSpecChange(i, 'spec_key', e.target.value)}
//               className="px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500"
//             />
//             <input
//               placeholder="برچسب"
//               value={spec.spec_label}
//               onChange={(e) => handleSpecChange(i, 'spec_label', e.target.value)}
//               className="px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500"
//             />
//             <div className="flex gap-2 items-center">
//               <input
//                 placeholder="مقدار"
//                 value={spec.spec_value}
//                 onChange={(e) => handleSpecChange(i, 'spec_value', e.target.value)}
//                 className="flex-1 px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500"
//               />
//               {form.specifications.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeFromArray('specifications', i)}
//                   className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
//                 >
//                   <X size={20} />
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() => addToArray('specifications')}
//           className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition flex items-center gap-1"
//         >
//           <Plus size={18} /> افزودن مشخصه
//         </button>
//       </div>

//       {/* ویژگی‌ها */}
//       <div className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-100 rounded-2xl">
//         <h3 className="text-lg font-bold text-orange-800 mb-4 flex items-center gap-2">
//           <CheckCircle2 size={22} className="text-orange-600" /> ویژگی‌های محصول
//         </h3>
//         {form.product_features.map((feat, i) => (
//           <div key={i} className="flex gap-2 mb-3">
//             <input
//               className="flex-1 px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500"
//               placeholder={`ویژگی ${i + 1}`}
//               value={feat}
//               onChange={(e) => handleArrayChange('product_features', i, e.target.value)}
//             />
//             {form.product_features.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeFromArray('product_features', i)}
//                 className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
//               >
//                 <X size={20} />
//               </button>
//             )}
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() => addToArray('product_features')}
//           className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:from-orange-600 hover:to-yellow-600 transition flex items-center gap-1"
//         >
//           <Plus size={18} /> افزودن ویژگی
//         </button>
//       </div>

//       {/* دکمه ارسال */}
//       <button
//         type="submit"
//         disabled={uploading}
//         className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-lg font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
//       >
//         {uploading ? (
//           <>
//             <UploadCloud size={22} className="animate-spin" /> در حال آپلود و ارسال...
//           </>
//         ) : (
//           <>
//             <CheckCircle2 size={22} /> ارسال محصول
//           </>
//         )}
//       </button>
//     </form>
//   );
// };

// export default NewProductForm;