import React, { useState } from 'react';
import { FlowerProduct } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: FlowerProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted, setSelectedProduct } = useShop();
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorite = isWishlisted(product.id);
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    const ok = addToCart(product, 1);
    if (ok) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1200);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProduct(product);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group relative flex flex-col bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
    >
      {/* Image Container with 4:3 Aspect Ratio */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 p-4 text-center">
            <span className="text-3xl mb-1">🌸</span>
            <span className="text-xs font-medium text-stone-500">{product.name}</span>
          </div>
        )}

        {/* Wishlist Button (Top-Right) */}
        <button
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'นำออกจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 cursor-pointer ${
            isFavorite
              ? 'bg-white text-rose-500 shadow-md scale-105'
              : 'bg-white/80 backdrop-blur-xs text-stone-600 hover:text-rose-500 hover:bg-white shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Stock / Status Marker (Unboxed text metadata) */}
        <div className="absolute top-3 left-3">
          {isOutOfStock ? (
            <span className="px-2.5 py-1 bg-stone-900/85 backdrop-blur-xs text-white text-[11px] font-medium rounded-md">
              สินค้าหมด
            </span>
          ) : product.stock <= 5 ? (
            <span className="px-2.5 py-1 bg-amber-500/90 backdrop-blur-xs text-white text-[11px] font-medium rounded-md tabular-nums">
              เหลือเพียง {product.stock} ดอก
            </span>
          ) : (
            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-xs text-stone-700 text-[11px] font-medium rounded-md tabular-nums">
              คงเหลือ {product.stock}
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Category & Color Indicator */}
        <div className="flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block border border-stone-300 shrink-0"
              style={{ backgroundColor: product.colorHex }}
              title={`สี${product.color}`}
            />
            <span>สี{product.color}</span>
            <span aria-hidden="true">·</span>
            <span>{product.categoryLabel}</span>
          </div>
          <span className="text-[11px] text-stone-400 font-serif italic">
            {product.englishName}
          </span>
        </div>

        {/* Flower Name & Price */}
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display text-lg sm:text-xl font-semibold text-stone-900 group-hover:text-rose-800 transition-colors">
              {product.name}
            </h3>
            <span className="text-base sm:text-lg font-bold text-stone-900 tabular-nums">
              ฿{product.price}
            </span>
          </div>
          
          {/* Short description */}
          <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Flower Meaning (ความหมายของดอกไม้) */}
        <div className="p-2.5 bg-rose-50/60 rounded-xl border border-rose-100/60">
          <p className="text-[11px] font-semibold text-rose-800 flex items-center gap-1">
            <span>ความหมาย:</span>
          </p>
          <p className="text-xs text-stone-700 line-clamp-2 mt-0.5 leading-relaxed">
            {product.meaning}
          </p>
        </div>

        {/* Action Buttons: "เพิ่มลงตะกร้า" and "ดูรายละเอียด" */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          {/* View Details Button */}
          <button
            onClick={handleQuickView}
            className="w-full py-2 px-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>ดูรายละเอียด</span>
          </button>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full py-2 px-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shadow-2xs ${
              isOutOfStock
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-900 hover:bg-rose-700 text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>เพิ่มแล้ว</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>เพิ่มลงตะกร้า</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
