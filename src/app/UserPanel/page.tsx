"use client";

import { useAuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, LogOut } from "lucide-react";
import OrderItem from "@/components/OrderItem/orderItem";

interface IUserInfo {
  name: string;
  family: string;
}

interface IOrder {
  id: number;
  total_price: number;
  old_total_price: number;
  created_at: string;
  payment_status: string;
  shipping_method: string;
  province: string;
  city: string;
  address: string;
  postal_code: string;
  products: string; 
}

const UserPanel = () => {
  const {
    phoneNumber,
    setFamily,
    setName,
    isLoggedIn,
    name,
    family,
    handleLogout,
  } = useAuthContext();
  const router = useRouter();

  const [userData, setUserData] = useState<IUserInfo | null>(null);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/Sign_in&up");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (!isLoggedIn || !phoneNumber) return;

    setLoadingUser(true);
    axios(`https://apika.ir/apitak/auth/get_user_info.php?phone=${phoneNumber}`)
      .then((result) => {
        setUserData(result.data);
        setName(result.data.name);
        setFamily(result.data.family);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      })
      .finally(() => {
        setLoadingUser(false);
      });
  }, [isLoggedIn, phoneNumber, setName, setFamily]);

  useEffect(() => {
    if (!isLoggedIn || !phoneNumber) return;

    setLoadingOrders(true);
    const url = `https://apika.ir/apitak/orders/submit_order.php?user_phone=${phoneNumber}`;
    console.log("Fetching orders from:", url);

    axios(url)
      .then((res) => {
        console.log("Fetched orders:", res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      })
      .finally(() => {
        setLoadingOrders(false);
      });
  }, [isLoggedIn, phoneNumber]);

  if (!isLoggedIn) return null;

  if (loadingUser || (!name && !family)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
        <p className="mt-4 text-lg">در حال بارگذاری اطلاعات پنل کاربری...</p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4 text-right font-inter"
      dir="rtl"
    >
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 text-center space-y-8 max-w-lg w-full mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800">پنل کاربری</h1>

        <div className="text-gray-700 space-y-4">
          <div className="flex items-center justify-center bg-gray-50 p-3 rounded-xl shadow-sm">
            <User className="w-6 h-6 text-blue-500 mr-3" />
            <span className="text-lg font-medium">
              نام کامل: {name || userData?.name} {family || userData?.family}
            </span>
          </div>
          <div className="flex items-center justify-center bg-gray-50 p-3 rounded-xl shadow-sm">
            <Phone className="w-6 h-6 text-green-500 mr-3" />
            <span className="text-lg font-medium">
              شماره موبایل: {phoneNumber}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl font-semibold text-lg mt-6 transition duration-300 ease-in-out hover:scale-105"
        >
          <LogOut className="w-5 h-5 ml-2" />
          خروج از حساب
        </button>
      </div>

      {/* سفارشات */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">سفارش‌های شما</h2>

        {loadingOrders ? (
          <p className="text-gray-500">در حال بارگذاری سفارش‌ها...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500">شما هنوز سفارشی ثبت نکرده‌اید.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              let parsedProducts: { id: number; qty: number }[] = [];

              try {
                parsedProducts = JSON.parse(order.products);
              } catch (e) {
                console.error("خطا در تبدیل JSON محصولات سفارش:", e);
              }

              return (
                <div
                  key={order.id}
                  className="p-4 border border-gray-200 rounded-lg shadow-sm"
                >
                  <p className="text-gray-700 font-semibold">
                    کد سفارش: {order.id}
                  </p>
                  <p>تاریخ: {order.created_at}</p>
                  <p>
                    وضعیت پرداخت:{" "}
                    <span className="font-medium text-blue-600">
                      {order.payment_status}
                    </span>
                  </p>
                  <p>
                    قیمت کل:{" "}
                    <span className="text-green-600 font-bold">
                      {Number(order.total_price).toLocaleString()} تومان
                    </span>
                  </p>
                  <p>
                    قیمت قبل تخفیف:{" "}
                    <span className="line-through text-red-500">
                      {Number(order.old_total_price).toLocaleString()} تومان
                    </span>
                  </p>
                  <p>روش ارسال: {order.shipping_method}</p>
                  <p>
                    آدرس: {order.province}، {order.city}، {order.address}
                  </p>
                  <p>کد پستی: {order.postal_code}</p>

                  <div className="mt-4">
                    <p className="font-semibold text-gray-700">
                      محصولات سفارش:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {parsedProducts.length > 0 ? (
                        parsedProducts.map((product, index) => (
                          <OrderItem id={product.id} qty={product.qty} />
                        ))
                      ) : (
                        <li className="text-gray-400 italic">
                          محصولی یافت نشد.
                        </li>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPanel;
