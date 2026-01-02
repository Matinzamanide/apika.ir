// app/api/chat/route.ts

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

interface FilterOptions {
  capacity?: number;
  power?: number;
  pressure?: number;
  voltage?: number;
  feature?: string;
  brand?: string;
  priceRange?: { min: number; max: number };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ reply: 'لطفاً یک پیام معتبر وارد کنید.' }),
        { status: 400 }
      );
    }

    const userMessage = message.trim().toLowerCase();
    const cleanMsg = userMessage.replace(/[\s\-_]/g, '');

    // دریافت محصولات
    let products: Product[] = [];
    try {
      const res = await fetch('https://apika.ir/apitak/get_products.php', {
        cache: 'force-cache',
      });
      const data = await res.json();
      products = Array.isArray(data) ? data : [];
    } catch (err) {
      console.error('Failed to fetch products:', err);
      return new Response(
        JSON.stringify({ reply: 'در حال حاضر نمی‌توانیم لیست محصولات را بارگذاری کنیم.' }),
        { status: 500 }
      );
    }

    // تابع Fuzzy Match
    const fuzzyMatch = (text: string, query: string): boolean => {
      const t = text.toLowerCase().replace(/[\s\-_]/g, '');
      const q = query.toLowerCase().replace(/[\s\-_]/g, '');
      return t.includes(q) || q.includes(t);
    };

    // استخراج عدد از متن (مثلاً 100 از "100 لیتر")
    const extractNumber = (text: string): number | null => {
      const match = text.match(/\d+(\.\d+)?/);
      return match ? parseFloat(match[0]) : null;
    };

    // جستجو در مشخصات فنی
    const getSpecValue = (product: Product, possibleKeys: string[]): string | null => {
      const specs = product.specifications || [];
      for (const spec of specs) {
        if (!spec.spec_key || !spec.spec_value) continue;
        if (possibleKeys.some(key => fuzzyMatch(spec.spec_key, key))) {
          return spec.spec_value;
        }
      }
      return null;
    };

    // تابع فیلتر محصولات
    const filterProducts = (query: string, filters: FilterOptions): Product[] => {
      return products.filter(p => {
        // 1. Fuzzy Search در عنوان و دسته
        const title = p.title?.toLowerCase() || '';
        const categories = (p.categories || []).join(' ').toLowerCase();
        const matchesQuery = fuzzyMatch(title, query) || fuzzyMatch(categories, query);
        if (!matchesQuery) return false;

        // 2. فیلتر ظرفیت (مثلاً 100 لیتر)
        if (filters.capacity !== undefined) {
          const capacityLabels = ['ظرفیت', 'حجم', 'capacity', 'litre', 'لیتر'];
          const specValue = getSpecValue(p, capacityLabels);
          if (specValue) {
            const capacityInSpec = extractNumber(specValue);
            if (capacityInSpec !== filters.capacity) return false;
          } else {
            if (!fuzzyMatch(title, `${filters.capacity} لیتر`)) return false;
          }
        }

        // 3. فیلتر توان (اسب، کیلووات)
        if (filters.power !== undefined) {
          const powerLabels = ['توان', 'قدرت', 'horsepower', 'hp', 'کیلووات', 'وات'];
          const specValue = getSpecValue(p, powerLabels);
          if (specValue) {
            const powerInSpec = extractNumber(specValue) || 0;
            const horseInSpec = powerInSpec >= 0.7 ? powerInSpec / 0.735 : powerInSpec * 1.36; // تبدیل
            if (Math.abs(horseInSpec - filters.power) > 0.3) return false;
          }
        }

        // 4. فیلتر فشار (بار)
        if (filters.pressure !== undefined) {
          const pressureLabels = ['فشار', 'pressure', 'bar', 'کاری', 'حداکثر'];
          const specValue = getSpecValue(p, pressureLabels);
          if (specValue) {
            const pressureInSpec = extractNumber(specValue);
            if (!pressureInSpec || Math.abs(pressureInSpec - filters.pressure) > 0.5) return false;
          }
        }

        // 5. فیلتر ولتاژ
        if (filters.voltage !== undefined) {
          const voltageLabels = ['ولتاژ', 'voltage'];
          const specValue = getSpecValue(p, voltageLabels);
          if (specValue) {
            const voltageInSpec = extractNumber(specValue);
            if (!voltageInSpec || Math.abs(voltageInSpec - filters.voltage) > 10) return false;
          }
        }

        // 6. فیلتر ویژگی
        if (filters.feature) {
          const features = (p.product_features || []).join(' ').toLowerCase();
          if (!features.includes(filters.feature.toLowerCase())) return false;
        }

        // 7. فیلتر برند
        if (filters.brand) {
          if (!fuzzyMatch(p.brand, filters.brand)) return false;
        }

        // 8. فیلتر قیمت
        if (filters.priceRange) {
          const price = Number(p.price);
          if (isNaN(price) || price < filters.priceRange.min || price > filters.priceRange.max) return false;
        }

        return true;
      });
    };

    // استخراج بازه قیمت
    const extractPriceRange = (msg: string): { min: number; max: number } | null => {
      const numbers = msg.match(/\d+/g)?.map(Number).filter(n => n > 100);
      if (!numbers || numbers.length === 0) return null;
      let min = 0, max = Infinity;
      if (msg.includes('زیر') || msg.includes('کمتر از')) {
        max = Math.min(...numbers) * 1000;
      } else if (msg.includes('بالاتر') || msg.includes('بیشتر از')) {
        min = Math.min(...numbers) * 1000;
      } else if (numbers.length >= 2) {
        const sorted = numbers.sort((a, b) => a - b);
        min = sorted[0] * 1000;
        max = sorted[1] * 1000;
      } else {
        const val = numbers[0] * 1000;
        min = val * 0.8;
        max = val * 1.2;
      }
      return { min, max };
    };

    // تولید لینک محصول
    const getProductLink = (title: string): string => {
      const encodedTitle = encodeURIComponent(title);
      return `<a href="/ProductPage/${encodedTitle}" class="text-blue-600 underline font-medium hover:text-blue-800" target="_blank">${title}</a>`;
    };

    // پاسخ هوشمند
    let reply = '';

    if (userMessage.includes('سلام')) {
      reply = 'سلام! من ربات هوشمند APIKA هستم. می‌تونم کمکت کنم چه محصولی می‌خوای؟ (مثل: منبع انبساط 100 لیتری تفسان)';
    }
    else if (userMessage.includes('مقایسه') || userMessage.includes('تفاوت')) {
      const brands = ['استریم', 'شکوه', 'امرا', 'تفسان', 'پنتاکس', 'ویتال', 'ابارا'];
      const found = brands.filter(b => userMessage.includes(b.toLowerCase()));
      if (found.length === 2) {
        reply = `مقایسه دقیق بین ${found[0]} و ${found[1]} نیاز به بررسی فنی دارد. برای اطلاعات بیشتر با پشتیبانی تماس بگیرید.`;
      } else {
        reply = 'لطفاً دو برند یا محصول را مشخص کنید. مثلاً: "تفاوت استریم و شکوه چیه؟"';
      }
    }
    else if (userMessage.includes('جایگزین') || userMessage.includes('مشابه')) {
      const match = products.find(p => fuzzyMatch(userMessage, p.title));
      if (match) {
        const alternatives = products
          .filter(p => p.brand !== match.brand && p.price < match.price * 1.2)
          .slice(0, 2)
          .map(p => getProductLink(p.title) + ` - ${Number(p.price).toLocaleString()} تومان`)
          .join('<br>');
        reply = alternatives ? `محصولات مشابه:<br>${alternatives}` : 'محصول جایگزینی یافت نشد.';
      } else {
        reply = 'محصول مورد نظر یافت نشد.';
      }
    }
    else if (userMessage.includes('کاتالوگ')) {
      const match = products.find(p => fuzzyMatch(userMessage, p.title));
      if (match && match.catalog_url && match.catalog_url !== 'null' && !match.catalog_url.includes('undefined')) {
        reply = `کاتالوگ محصول: <a href="${match.catalog_url}" class="text-blue-600 underline" target="_blank">دانلود کاتالوگ</a>`;
      } else {
        reply = 'کاتالوگ برای این محصول موجود نیست.';
      }
    }
    else {
      // استخراج اطلاعات از پیام
      const capacityMatch = userMessage.match(/(\d+)\s*لیتر/i);
const capacity = capacityMatch ? parseInt(capacityMatch[1], 10) : undefined;

const powerMatch = userMessage.match(/(\d+(\.\d+)?)\s*اسب/i);
const power = powerMatch ? parseFloat(powerMatch[1]) : undefined;

const pressureMatch = userMessage.match(/(\d+(\.\d+)?)\s*بار/i);
const pressure = pressureMatch ? parseFloat(pressureMatch[1]) : undefined;

const voltageMatch = userMessage.match(/(\d+)\s*ولت/i);
const voltage = voltageMatch ? parseInt(voltageMatch[1], 10) : undefined;

const priceRange:any = extractPriceRange(userMessage) ;

// تشخیص دسته
let results: Product[] = [];
let query = '';

if (fuzzyMatch(userMessage, 'منبع انبساط') || fuzzyMatch(userMessage, 'فشار')) {
  query = 'منبع انبساط';
  results = filterProducts(query, { capacity, pressure, priceRange });
}
      else if (fuzzyMatch(userMessage, 'ست کنترل') || fuzzyMatch(userMessage, 'کنترل') || fuzzyMatch(userMessage, 'پرشر سوئیچ')) {
        query = 'ست کنترل';
        results = filterProducts(query, { pressure, voltage, priceRange });
      }
      else if (fuzzyMatch(userMessage, 'پمپ') || fuzzyMatch(userMessage, 'الکتروپمپ')) {
        query = 'پمپ';
        results = filterProducts(query, { power, pressure, voltage, priceRange });
      }
      else {
        results = products.filter(p => fuzzyMatch(p.title, userMessage));
      }

      if (results.length > 0) {
        reply = `محصولات پیشنهادی:<br>${results.slice(0, 5).map(p => {
          const price = Number(p.price).toLocaleString();
          const stock = Number(p.inventory) > 0 ? 'موجود' : 'ناموجود';
          return `• ${getProductLink(p.title)} - ${price} تومان (${stock})`;
        }).join('<br>')}`;
      } else {
        reply = 'محصولی با این مشخصات یافت نشد.';
      }
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({ reply: 'خطایی رخ داد. لطفاً دوباره امتحان کنید.' }),
      { status: 500 }
    );
  }
}