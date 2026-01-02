"use client";
import { IChildren } from "@/Types/Types";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface ICartItems {
  id: number;
  qty: number;
}
interface IShoppingCartContext {
  cartItems: ICartItems[];
  handleIncreaseQty: (id: number) => void;
  handleDecreaseProductQty: (id: number) => void;
  getProductQty: (id: number) => number;
  cartTotalQty: number;
  handleRemoveProduct: (id: number) => void;
}
const ShoppingCartContext = createContext({} as IShoppingCartContext);

export const useShoppingCartContext = () => {
  return useContext(ShoppingCartContext);
};

const ShoppingCartContextProvider: React.FC<IChildren> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ICartItems[]>([]);
  const handleIncreaseQty = (id: number) => {
    toast.success("محصول با موفقیت به سبد اضافه شد");
    setCartItems((currentItem) => {
      let isNotProductExist = currentItem.find((item) => item.id == id) == null;
      if (isNotProductExist) {
        return [...currentItem, { id: id, qty: 1 }];
      } else {
        return currentItem.map((item) => {
          if (item.id == id) {
            return {
              ...item,
              qty: item.qty + 1,
            };
          } else {
            return item;
          }
        });
      }
    });
  };
  const handleDecreaseProductQty = (id: number) => {
    toast("محصول با موفقیت حذف شد!", {
      icon: "👍🏼",
    });
    setCartItems((currentItems) => {
      const isLastOne = currentItems.find((item) => item.id === id)?.qty === 1;
      if (isLastOne) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        );
      }
    });
  };

  const handleRemoveProduct = (id: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log(cartItems);
  }, [cartItems]);

  const getProductQty = (id: number) => {
    return cartItems.find((item) => item.id === id)?.qty || 0;
  };

  const cartTotalQty = cartItems.reduce((totalQty, item) => {
    return totalQty + item.qty;
  }, 0);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        handleIncreaseQty,
        handleDecreaseProductQty,
        getProductQty,
        cartTotalQty,
        handleRemoveProduct,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartContextProvider;

// "use client";
// import { IChildren } from "@/Types/Types";
// import { createContext, useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useAuthContext } from "./AuthContext";

// export interface ICartItems {
//   id: number;
//   qty: number;
// }

// interface IShoppingCartContext {
//   cartItems: ICartItems[];
//   handleIncreaseQty: (id: number) => void;
//   handleDecreaseProductQty: (id: number) => void;
//   getProductQty: (id: number) => number;
//   cartTotalQty: number;
//   handleRemoveProduct: (id: number) => void;
// }

// const ShoppingCartContext = createContext({} as IShoppingCartContext);

// export const useShoppingCartContext = () => useContext(ShoppingCartContext);

// const ShoppingCartContextProvider: React.FC<IChildren> = ({ children }) => {
//   const [cartItems, setCartItems] = useState<ICartItems[]>([]);
//   const { phoneNumber, isLoggedIn } = useAuthContext();

//   useEffect(() => {
//     const loadCart = async () => {
//       if (phoneNumber && isLoggedIn) {
//         try {
//           const res = await fetch(`https://apika.ir/apitak/cart/get_cart.php?phone=${phoneNumber}`);
//           const data = await res.json();
//           setCartItems(data);
//         } catch (err) {
//           console.error("خطا در دریافت سبد خرید:", err);
//         }
//       } else {
//         const stored = localStorage.getItem("cartItems");
//         if (stored) setCartItems(JSON.parse(stored));
//       }
//     };
//     loadCart();
//   }, [phoneNumber, isLoggedIn]);

//   useEffect(() => {
//     if (!phoneNumber || !isLoggedIn) {
//       localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     }
//   }, [cartItems, phoneNumber, isLoggedIn]);

//   const syncWithServer = async (id: number, qty: number) => {
//     if (!phoneNumber || !isLoggedIn) return;
//     try {
//       await fetch("https://apika.ir/apitak/cart/update_cart.php", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: phoneNumber, product_id: id, qty }),
//       });
//     } catch (error) {
//       console.error("خطا در سینک سبد خرید:", error);
//     }
//   };

//   const handleIncreaseQty = async (id: number) => {
//     toast.success("افزوده شد");
//     const existing = cartItems.find((item) => item.id === id);
//     const newQty = existing ? existing.qty + 1 : 1;

//     setCartItems((prev) =>
//       existing
//         ? prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
//         : [...prev, { id, qty: 1 }]
//     );

//     await syncWithServer(id, newQty);
//   };

//   const handleDecreaseProductQty = async (id: number) => {
//     const item = cartItems.find((i) => i.id === id);
//     if (!item) return;
//     const newQty = item.qty - 1;

//     setCartItems((prev) =>
//       newQty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty: newQty } : i))
//     );

//     await syncWithServer(id, newQty);
//   };

//   const handleRemoveProduct = async (id: number) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//     await syncWithServer(id, 0);
//   };

//   const getProductQty = (id: number) => cartItems.find((item) => item.id === id)?.qty || 0;

//   const cartTotalQty = cartItems.reduce((total, item) => total + item.qty, 0);

//   return (
//     <ShoppingCartContext.Provider
//       value={{
//         cartItems,
//         handleIncreaseQty,
//         handleDecreaseProductQty,
//         getProductQty,
//         cartTotalQty,
//         handleRemoveProduct,
//       }}
//     >
//       {children}
//     </ShoppingCartContext.Provider>
//   );
// };

// export default ShoppingCartContextProvider;
