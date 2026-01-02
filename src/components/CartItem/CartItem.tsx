"use client";

import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface ICartItem {
  id: number;
  qty?: number;
}

const CartItem: React.FC<ICartItem> = ({ id }) => {
  const {
    handleDecreaseProductQty,
    handleIncreaseQty,
    getProductQty,
    handleRemoveProduct,
  } = useShoppingCartContext();

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    axios(`https://apika.ir/apitak/get_products.php?id=${id}`).then((res) => {
      const fetched = res.data;
      const item = Array.isArray(fetched) ? fetched[0] : fetched;
      setProduct(item);
    });
  }, [id]);

  if (!product) {
    return (
      <div className="p-4 bg-white rounded-xl shadow border text-gray-400 text-center">
        در حال بارگذاری...
      </div>
    );
  }

  const qty = getProductQty(id);
  const totalPrice = product.price * qty;
  const totalBeforeDiscount = product.before_discount_price * qty;
  const hasDiscount =
    product.before_discount_price > product.price &&
    product.before_discount_price > 0;
  const discountPercent = hasDiscount
    ? Math.round(100 - (product.price / product.before_discount_price) * 100)
    : 0;

  return (
    <Link href={``}>
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        {/* تصویر محصول */}
        <div className="w-28 h-28 relative">
          <Image
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.title}
            fill
            className="object-contain rounded-md"
          />
        </div>

        {/* جزئیات محصول */}
        <div className="flex-1 w-full">
          <h2 className="text-lg font-semibold mb-2">{product.title}</h2>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* کنترل تعداد */}
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => handleDecreaseProductQty(id)}
                className="px-3 py-1 hover:bg-gray-100"
              >
                <Minus size={16} />
              </button>
              <span className="px-4">{qty}</span>
              <button
                onClick={() => handleIncreaseQty(id)}
                className="px-3 py-1 hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* قیمت و تخفیف */}
            <div className="text-right">
              <div className="text-blue-600 font-bold text-base whitespace-nowrap">
                {totalPrice.toLocaleString()} تومان
              </div>
              {hasDiscount && (
                <div className="text-gray-400 line-through text-sm whitespace-nowrap">
                  {totalBeforeDiscount.toLocaleString()} تومان
                </div>
              )}
              {hasDiscount && (
                <div className="text-red-500 text-xs font-bold mt-1">
                  ٪{discountPercent} تخفیف
                </div>
              )}
            </div>

            {/* حذف */}
            <button
              onClick={() => handleRemoveProduct(id)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CartItem;
