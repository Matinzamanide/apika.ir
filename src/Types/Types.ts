export interface IChildren{
    children:React.ReactNode;
}
export interface IProduct {
  id:number;
    title: string;
    price?: string; // ممکنه وجود نداشته باشه
    before_discount_price?: string;
    images: string[]; // آرایه‌ای از تصاویر
    categories: string[];
    brand:string
    inventory: string;
    specifications: Specification[];
    product_features: string[]
    catalog_url?: string; // لینک کاتالوگ اختیاری
  }
  
  export interface Specification {
    [key: string]: string; // کلیدهای داینامیک، مثل "brand"، "voltage"، ...
  }
  