// components/OrderForm.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";

const OrderForm = ({
  totalPrice,
  totalOldPrice,
}: {
  totalPrice: number;
  totalOldPrice: number;
}) => {
  const { phoneNumber } = useAuthContext();
  const { cartItems } = useShoppingCartContext();

  const [formData, setFormData] = useState({
    name: "",
    family: "",
    province: "",
    city: "",
    postalCode: "",
    address: "",
    phone: "",
    shippingMethod: "پست",
  });
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://apika.ir/apitak/orders/submit_order.php",
        {
          userPhone: phoneNumber,
          ...formData,
          products: cartItems,
          totalPrice,
          totalOldPrice,
          paymentStatus: "در انتظار پرداخت",
        }
      );

      if (res.data.success) {
        setMessage("✅ سفارش شما با موفقیت ثبت شد.");
      } else {
        setMessage(res.data.error || "❌ خطایی در ثبت سفارش رخ داد.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">اطلاعات سفارش</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <input name="name" placeholder="نام" onChange={handleChange} className="border p-2 rounded" />
        <input name="family" placeholder="نام خانوادگی" onChange={handleChange} className="border p-2 rounded" /> */}
        <input
          name="province"
          placeholder="استان"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="city"
          placeholder="شهر"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="postalCode"
          placeholder="کد پستی"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="address"
          placeholder="آدرس کامل"
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />
        <input
          name="phone"
          placeholder="شماره ثابت"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <select
          name="shippingMethod"
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="پست">ارسال با پست</option>
          <option value="تیپاکس">ارسال با تیپاکس</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
      >
        {loading ? "در حال ارسال..." : "ثبت نهایی سفارش"}
      </button>

      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  );
};

export default OrderForm;
// "use client";
// import { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// interface OrderFormProps {
//   totalPrice: number;
//   totalOldPrice: number;
//   phone: string;
// }

// const OrderForm: React.FC<OrderFormProps> = ({ totalPrice, totalOldPrice, phone }) => {
//   const [address, setAddress] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!address) {
//       toast.error("لطفاً آدرس را وارد کنید.");
//       return;
//     }

//     try {
//       const res = await axios.post("https://apika.ir/apitak/orders/submit_order.php", {
//         phone,
//         address,
//         total_price: totalPrice,
//         total_old_price: totalOldPrice,
//       });

//       if (res.data.success) {
//         toast.success("سفارش با موفقیت ثبت شد.");
//       } else {
//         toast.error("خطا در ثبت سفارش.");
//       }
//     } catch (err) {
//       toast.error("خطا در ارتباط با سرور.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
//       <h2 className="text-xl font-bold">تکمیل اطلاعات سفارش</h2>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">آدرس:</label>
//         <textarea
//           className="w-full mt-1 p-2 border border-gray-300 rounded"
//           rows={3}
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />
//       </div>

//       <button
//         type="submit"
//         className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
//       >
//         ثبت سفارش
//       </button>
//     </form>
//   );
// };

// export default OrderForm;
