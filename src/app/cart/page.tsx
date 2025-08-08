"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "@/components/CartItem/CartItem";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import OrderForm from "@/components/OrderForm/OrderForm";
import { useAuthContext } from "@/context/AuthContext";

interface IProductData {
  id: number;
  price: number;
  old_price?: number;
}

const Cart = () => {
  const { cartItems } = useShoppingCartContext();
  const [productsData, setProductsData] = useState<IProductData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loginMessage, setLoginMessage] = useState<string | null>(null); // New state for login message
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const promises = cartItems.map((item) =>
        axios(`https://apika.ir/apitak/get_products.php?id=${item.id}`).then(
          (res) => {
            const data = Array.isArray(res.data) ? res.data[0] : res.data;
            return {
              id: item.id,
              price: data.price,
              old_price: data.old_price || Math.round(data.price / 0.9),
            };
          }
        )
      );

      const allData = await Promise.all(promises);
      setProductsData(allData);
    };

    if (cartItems.length > 0) fetchData();
  }, [cartItems]);

  // محاسبه قیمت‌ها
  const totalPrice = cartItems.reduce((acc, item) => {
    const product = productsData.find((p) => p.id === item.id);
    return acc + (product?.price || 0) * item.qty;
  }, 0);

  const totalOldPrice = cartItems.reduce((acc, item) => {
    const product = productsData.find((p) => p.id === item.id);
    const baseOldPrice =
      typeof product?.old_price === "number"
        ? product.old_price
        : product?.price || 0;
    return acc + baseOldPrice * item.qty;
  }, 0);

  const handleContinueCheckout = () => {
    if (!isLoggedIn) {
      setLoginMessage(
        "برای ادامه فرآیند خرید، ابتدا باید وارد حساب کاربری خود شوید."
      );
    } else {
      setLoginMessage(null);
      setShowForm(true);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-center">سبد خرید شما</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">سبد خرید شما خالی است.</p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {cartItems.map((item) => (
            <CartItem key={item.id} id={item.id} qty={item.qty} />
          ))}

          <div className="text-right mt-10 space-y-2 border-t pt-4">
            <div className="text-gray-500 text-lg">
              قیمت قبل تخفیف:{" "}
              <span className="line-through">
                {totalOldPrice.toLocaleString()} تومان
              </span>
            </div>
            <div className="text-xl font-bold text-blue-600">
              مجموع نهایی: {totalPrice.toLocaleString()} تومان
            </div>

            {loginMessage && (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative text-sm mt-4">
                {loginMessage}
              </div>
            )}

            {!showForm && (
              <button
                onClick={handleContinueCheckout}
                className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                ادامه فرآیند خرید
              </button>
            )}
          </div>

          {showForm && (
            <OrderForm totalPrice={totalPrice} totalOldPrice={totalOldPrice} />
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import CartItem from "@/components/CartItem/CartItem";
// import { useShoppingCartContext } from "@/context/ShoppingCartContext";
// import OrderForm from "@/components/OrderForm/OrderForm";
// import { useAuthContext } from "@/context/AuthContext";

// interface IProductData {
//   id: number;
//   price: number;
//   old_price?: number;
// }

// const Cart = () => {
//   const { cartItems } = useShoppingCartContext();
//   const [productsData, setProductsData] = useState<IProductData[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [loginMessage, setLoginMessage] = useState<string | null>(null);
//   const { isLoggedIn, phoneNumber } = useAuthContext();

//   useEffect(() => {
//     const fetchData = async () => {
//       const promises = cartItems.map((item) =>
//         axios
//           .get(`https://apika.ir/apitak/get_products.php?id=${item.id}`)
//           .then((res) => {
//             const data = Array.isArray(res.data) ? res.data[0] : res.data;
//             return {
//               id: item.id,
//               price: data.price,
//               old_price: data.old_price || Math.round(data.price / 0.9),
//             };
//           })
//       );

//       const allData = await Promise.all(promises);
//       setProductsData(allData);
//     };

//     if (cartItems.length > 0) fetchData();
//   }, [cartItems]);

//   const totalPrice = cartItems.reduce((acc, item) => {
//     const product = productsData.find((p) => p.id === item.id);
//     return acc + (product?.price || 0) * item.qty;
//   }, 0);

//   const totalOldPrice = cartItems.reduce((acc, item) => {
//     const product = productsData.find((p) => p.id === item.id);
//     const baseOldPrice =
//       typeof product?.old_price === "number" ? product.old_price : product?.price || 0;
//     return acc + baseOldPrice * item.qty;
//   }, 0);

//   const handleContinueCheckout = () => {
//     if (!isLoggedIn) {
//       setLoginMessage("برای ادامه فرآیند خرید، ابتدا باید وارد حساب کاربری خود شوید.");
//     } else {
//       setLoginMessage(null);
//       setShowForm(true);
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10 text-gray-800">
//       <h1 className="text-3xl font-bold mb-8 text-center">سبد خرید شما</h1>

//       {cartItems.length === 0 ? (
//         <p className="text-center text-gray-500">سبد خرید شما خالی است.</p>
//       ) : (
//         <div className="max-w-5xl mx-auto space-y-6">
//           {cartItems.map((item) => (
//             <CartItem key={item.id} id={item.id} qty={item.qty} />
//           ))}

//           <div className="text-right mt-10 space-y-2 border-t pt-4">
//             <div className="text-gray-500 text-lg">
//               قیمت قبل تخفیف:{" "}
//               <span className="line-through">{totalOldPrice.toLocaleString()} تومان</span>
//             </div>
//             <div className="text-xl font-bold text-blue-600">
//               مجموع نهایی: {totalPrice.toLocaleString()} تومان
//             </div>

//             {loginMessage && (
//               <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative text-sm mt-4">
//                 {loginMessage}
//               </div>
//             )}

//             {!showForm && (
//               <button
//                 onClick={handleContinueCheckout}
//                 className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
//               >
//                 ادامه فرآیند خرید
//               </button>
//             )}
//           </div>

//           {showForm && (
//             <OrderForm
//               totalPrice={totalPrice}
//               totalOldPrice={totalOldPrice}
//               phone={phoneNumber}
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
