'use client';

import { useShoppingCartContext } from '@/context/ShoppingCartContext';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

interface IQuantity {
  props: number; // موجودی
  id_p: number;  // شناسه محصول
}

const QuantitySelector: React.FC<IQuantity> = ({ props, id_p }) => {
  const {
    cartItems,
    getProductQty,
    handleIncreaseQty,
    handleDecreaseProductQty,
  } = useShoppingCartContext();

  const qty = getProductQty(id_p);
  const isMax = qty >= props;

  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full max-w-md  p-4 rounded-2xl shadow-md border border-gray-200 transition-all">
      
      {/* اگر در سبد بود: نمایش کنترل تعداد */}
      {qty > 0 ? (
        <div className="flex items-center justify-between w-full sm:w-auto border border-gray-300 rounded-xl px-3 py-2 shadow-sm bg-gray-50">
          <button
            onClick={() => handleDecreaseProductQty(id_p)}
            className="p-2 rounded-md hover:bg-red-100 hover:text-red-600 transition"
            aria-label="کاهش تعداد"
          >
            <Minus className="w-5 h-5" />
          </button>

          <span className="w-10 text-center font-semibold text-gray-800 text-lg select-none">
            {qty}
          </span>

          <button
            onClick={() => handleIncreaseQty(id_p)}
            disabled={isMax}
            className={`p-2 rounded-md transition ${
              isMax
                ? 'cursor-not-allowed text-gray-300'
                : 'hover:bg-green-100 hover:text-green-600'
            }`}
            aria-label="افزایش تعداد"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      ) : (
        // اگر در سبد نبود: دکمه افزودن به سبد
        <button
          onClick={() => handleIncreaseQty(id_p)}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm"
        >
          <ShoppingCart className="w-5 h-5" />
          افزودن به سبد خرید
        </button>
      )}
    </div>
  );
};

export default QuantitySelector;
