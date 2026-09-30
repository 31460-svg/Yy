import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Plus, Minus, Check, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, toggleWishlist, isWishlisted } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  if (!selectedProduct) return null;

  const isFavorite = isWishlisted(selectedProduct.id);
  const isOutOfStock = selectedProduct.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    const ok = addToCart(selectedProduct, quantity);
    if (ok) {
      setJustAdded(true);
      setTimeout(() => {
        setJustAdded(false);
        setSelectedProduct(null);
      }, 1000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 bg-white/80 hover:bg-white rounded-full backdrop-blur-xs transition-colors shadow-xs"
          aria-label="ปิดหน้าต่าง"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image */}
          <div className="relative aspect-4/3 md:aspect-auto bg-stone-100 min-h-[300px]">
            {!imageError ? (
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                onError={() => setImageError(true)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 p-8 text-center">
                <span className="text-5xl mb-2">🌸</span>
                <span className="text-base font-medium text-stone-600">{selectedProduct.name}</span>
              </div>
            )}

            {/* Favorite Button on Image */}
            <button
              onClick={() => toggleWishlist(selectedProduct.id)}
              className={`absolute top-4 left-4 p-2.5 rounded-full transition-all duration-200 ${
                isFavorite
                  ? 'bg-white text-rose-500 shadow-md scale-105'
                  : 'bg-white/90 text-stone-600 hover:text-rose-500 shadow-xs'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

          {/* Right Column: Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Category & Color */}
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span
                  className="w-3 h-3 rounded-full border border-stone-300"
                  style={{ backgroundColor: selectedProduct.colorHex }}
                />
                <span>ดอกไม้สี{selectedProduct.color}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedProduct.categoryLabel}</span>
              </div>

              {/* Title & English name */}
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
                  {selectedProduct.name}
                </h2>
                <p className="text-sm text-stone-400 font-serif italic mt-0.5">
                  {selectedProduct.englishName} {selectedProduct.scientificName ? `(${selectedProduct.scientificName})` : ''}
                </p>
              </div>

              {/* Price & Stock */}
              <div className="flex items-baseline justify-between py-2 border-y border-stone-100">
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                    ฿{selectedProduct.price}
                  </span>
                  <span className="text-xs text-stone-500 ml-1.5">/ กิ่งหรือช่อ</span>
                </div>
                <div className="text-xs">
                  {isOutOfStock ? (
                    <span className="text-rose-600 font-semibold">สินค้าหมดชั่วคราว</span>
                  ) : (
                    <span className="text-emerald-700 font-medium tabular-nums">
                      คงเหลือในคลัง {selectedProduct.stock} รายการ
                    </span>
                  )}
                </div>
              </div>

              {/* Meaning of the Flower (ความหมาย) */}
              <div className="p-3.5 bg-rose-50/70 rounded-2xl border border-rose-100">
                <p className="text-xs font-semibold text-rose-900 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                  <span>ความหมายของดอกไม้:</span>
                </p>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {selectedProduct.meaning}
                </p>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-1">
                  รายละเอียดสินค้า
                </p>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Small perks */}
              <div className="grid grid-cols-2 gap-2 text-xs text-stone-500 pt-2">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-stone-400" />
                  <span>จัดส่งด่วนในวัน</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-stone-400" />
                  <span>รับประกันความสดชื่น</span>
                </div>
              </div>

            </div>

            {/* Bottom Actions: Quantity Selector & Add to Cart */}
            <div className="pt-4 border-t border-stone-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-700">จำนวน:</span>
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-stone-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="p-2 text-stone-600 hover:bg-stone-200 disabled:opacity-40 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-semibold tabular-nums text-stone-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                    disabled={quantity >= selectedProduct.stock || isOutOfStock}
                    className="p-2 text-stone-600 hover:bg-stone-200 disabled:opacity-40 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Primary Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`w-full py-3.5 rounded-full font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
                  isOutOfStock
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-900 hover:bg-rose-700 text-white cursor-pointer'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>เพิ่มลงตะกร้าเรียบร้อยแล้ว</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      เพิ่มลงตะกร้า · ฿{(selectedProduct.price * quantity).toLocaleString()}
                    </span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
