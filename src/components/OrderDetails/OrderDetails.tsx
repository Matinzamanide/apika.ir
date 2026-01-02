// No need to import ICartItems as it's not used here.
// import { ICartItems } from "@/context/ShoppingCartContext";
import OrderItem from "../OrderItem/orderItem";

export interface IsOrder {
  id: number;
  user_id: number;
  name: string;
  family: string;
  province: string;
  city: string;
  postal_code: string;
  address: string;
  phone: string;
  shipping_method: string;
  products: string; // This should be string as it's a JSON string
  total_price: number;
  old_total_price: number;
  payment_status: string;
  created_at: string;
}

interface Product {
  id: number;
  qty: number;
}

const OrderDetails: React.FC<IsOrder> = async ({
  id,
  address,
  city,
  created_at,
  family,
  name,
  old_total_price,
  payment_status,
  phone,
  postal_code,
  products, // This is the raw JSON string
  province,
  shipping_method,
  total_price,
  user_id,
}) => {
  let parsedProducts: Product[] = [];
  try {
    parsedProducts = JSON.parse(products);
  } catch (e) {
    console.error("خطا در تجزیه‌ی لیست محصولات:", e);
    // You might want to display an error message to the user here
    // or handle this more gracefully, e.g., by setting parsedProducts to an empty array.
  }

  console.log(parsedProducts);
  const res = await fetch(
    `https://apika.ir/apitak/auth/get_user_info.php?id=${user_id}`
  );
  const data = await res.json();
  console.log(data);
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-right" dir="rtl">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        جزئیات سفارش #{id}
        <p>{user_id}</p>
      </h1>

      <div className="bg-white rounded-lg shadow p-6 space-y-4 text-sm sm:text-base">
        <div>
          <h2 className="font-semibold text-gray-700 mb-1">اطلاعات خریدار:</h2>
          <p>
            نام: {data.name} {data.family}
          </p>
          <p>شماره تماس: {data.phone}</p>
          <p>شماره ثابت: {phone}</p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700 mb-1">آدرس:</h2>
          <p>استان : {province}</p>
          <p>شهر : {city}</p>
          <p>آدرس :{address}</p>
          <p>کد پستی: {postal_code}</p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700 mb-1">روش ارسال:</h2>
          <p>{shipping_method}</p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700 mb-1">وضعیت پرداخت:</h2>
          <p>{payment_status}</p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700 mb-1">تاریخ ثبت سفارش:</h2>
          <p>{new Date(created_at).toLocaleString("fa-IR")}</p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700 mb-1">محصولات:</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {parsedProducts.map((product) => (
              <OrderItem key={product.id} id={product.id} qty={product.qty} />
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-gray-500 line-through text-sm">
            قیمت قبل تخفیف: {old_total_price.toLocaleString()} تومان
          </p>
          <p className="text-lg font-bold text-green-600">
            مبلغ پرداختی: {total_price.toLocaleString()} تومان
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
