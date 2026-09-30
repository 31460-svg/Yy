import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onProceedToCheckout
}) => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
    shippingFee,
    cartTotal,
    setActiveTab
  } = useShop();

  if (!isOpen) return null;

  const freeShippingThreshold = 500;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-stone-900/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-800" />
            <h2 className="font-display text-xl font-bold text-stone-900">
              ตะกร้าสินค้า
            </h2>
            <span className="text-xs font-semibold text-stone-500 tabular-nums">
              ({cartCount} ชิ้น)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-stone-400 hover:text-rose-600 transition-colors cursor-pointer mr-1"
                title="ล้างตะกร้าสินค้าทั้งหมด"
              >
                ล้างตะกร้า
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-800 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
              aria-label="ปิดตะกร้า"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-3 bg-rose-50/50 border-b border-rose-100/80">
          <div className="flex items-center justify-between text-xs text-stone-700 mb-1.5">
            <span className="flex items-center gap-1.5 font-medium text-rose-900">
              <Truck className="w-3.5 h-3.5" />
              {remainingForFreeShipping > 0 ? (
                <>ซื้อเพิ่มอีก <span className="font-bold tabular-nums">฿{remainingForFreeShipping}</span> เพื่อรับส่งฟรี!</>
              ) : (
                <span className="text-emerald-700 font-semibold">🎉 ยอดครบ ฿500 จัดส่งฟรี!</span>
              )}
            </span>
            <span className="text-[11px] text-stone-400 tabular-nums">
              {Math.round(freeShippingProgress)}%
            </span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-rose-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-stone-100 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <span className="text-5xl mb-3">🧺</span>
              <p className="font-display text-lg font-semibold text-stone-900">
                ยังไม่มีสินค้าในตะกร้า
              </p>
              <p className="text-xs text-stone-500 max-w-xs mt-1 mb-6">
                เลือกชมดอกไม้สวย ๆ แล้วกดปุ่ม "เพิ่มลงตะกร้า" เพื่อสั่งซื้อดอกไม้ที่คุณชื่นชอบ
              </p>
              <button
                onClick={() => {
                  onClose();
                  setActiveTab('products');
                }}
                className="px-6 py-2.5 bg-stone-900 text-white rounded-full text-xs font-medium hover:bg-stone-800 transition-colors cursor-pointer"
              >
                เลือกซื้อดอกไม้เลย
              </button>
            </div>
          ) : (
            cart.map(({ product, quantity }) => (
              <div key={product.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-stone-500">
                        สี{product.color} · ฿{product.price}
                      </p>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-1 text-stone-300 hover:text-rose-600 transition-colors cursor-pointer"
                      title="ลบสินค้านี้"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity Stepper & Subtotal */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity - 1)}
                        className="p-1 text-stone-600 hover:bg-stone-200 rounded-l transition-colors"
                        aria-label="ลดจำนวน"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold tabular-nums text-stone-800">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity + 1)}
                        disabled={quantity >= product.stock}
                        className="p-1 text-stone-600 hover:bg-stone-200 rounded-r disabled:opacity-30 transition-colors"
                        aria-label="เพิ่มจำนวน"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-stone-900 tabular-nums">
                      ฿{(product.price * quantity).toLocaleString()}
                    </span>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Calculations & Checkout Button */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-stone-200 bg-stone-50/80 space-y-3">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>ยอดรวมสินค้า ({cartCount} ชิ้น)</span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  ฿{cartSubtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>ค่าจัดส่ง</span>
                <span className="font-semibold tabular-nums">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700">ส่งฟรี</span>
                  ) : (
                    `฿${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>ยอดสุทธิทั้งหมด</span>
                <span className="text-rose-800 tabular-nums">
                  ฿{cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Exact Required "สั่งซื้อสินค้า" Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-stone-900 hover:bg-rose-700 text-white rounded-full font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
            >
              <span>สั่งซื้อสินค้า</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
