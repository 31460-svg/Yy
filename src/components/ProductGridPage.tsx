import React, { useMemo, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Search, Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';

export const ProductGridPage: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedColor,
    setSelectedColor,
    selectedCategory,
    setSelectedCategory
  } = useShop();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  const colorOptions = [
    { label: 'ทั้งหมด', value: 'all' },
    { label: 'แดง', value: 'แดง', hex: '#E11D48' },
    { label: 'ชมพู', value: 'ชมพู', hex: '#EC4899' },
    { label: 'เหลือง', value: 'เหลือง', hex: '#F59E0B' },
    { label: 'ขาว', value: 'ขาว', hex: '#E2E8F0' },
    { label: 'ม่วง', value: 'ม่วง', hex: '#9333EA' },
    { label: 'ส้ม', value: 'ส้ม', hex: '#EA580C' },
    { label: 'ฟ้า', value: 'ฟ้า', hex: '#38BDF8' },
  ];

  const categoryOptions = [
    { label: 'ดอกไม้ทั้งหมด', value: 'all' },
    { label: 'ดอกไม้ยอดนิยม', value: 'popular' },
    { label: 'ดอกไม้มงคล', value: 'thai_auspicious' },
    { label: 'ดอกไม้นำเข้า', value: 'imported' },
    { label: 'ดอกไม้มีกลิ่นหอม', value: 'fragrant' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.englishName.toLowerCase().includes(q) ||
        p.meaning.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q);

      // Color filter
      const matchesColor = selectedColor === 'all' || p.color.includes(selectedColor);

      // Category filter
      const matchesCategory =
        selectedCategory === 'all' ||
        (selectedCategory === 'popular' && (p.category === 'popular' || p.isPopular)) ||
        p.category === selectedCategory;

      return matchesSearch && matchesColor && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name, 'th');
      return 0; // featured/default
    });
  }, [products, searchQuery, selectedColor, selectedCategory, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedColor('all');
    setSelectedCategory('all');
    setSortBy('featured');
  };

  const hasActiveFilters = searchQuery !== '' || selectedColor !== 'all' || selectedCategory !== 'all' || sortBy !== 'featured';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Page Header */}
      <div className="space-y-2 mb-8">
        <div className="flex items-center gap-2 text-xs text-rose-800 font-semibold tracking-wider uppercase">
          <span>คลังดอกไม้สด</span>
          <span>·</span>
          <span>คัดเกรดพรีเมียม</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
              สินค้าดอกไม้ทั้งหมด ({products.length} รายการ)
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              เลือกชมดอกไม้สดหลากหลายสายพันธุ์ พร้อมความหมายอันงดงามสำหรับทุกโอกาส
            </p>
          </div>

          {/* Reset Filters button if any is active */}
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-xs text-rose-700 hover:text-rose-900 font-medium cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ล้างตัวกรองทั้งหมด</span>
            </button>
          )}
        </div>
      </div>

      {/* Control Surface: Search, Categories, Colors, Sorting */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs mb-8 space-y-5">
        
        {/* Row 1: Search Bar & Sort Dropdown */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="ค้นหาชื่อดอกไม้ (กุหลาบ, ทานตะวัน, มะลิ...), ความหมาย, สี..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-rose-500 focus:bg-white text-stone-800 transition-all placeholder:text-stone-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 p-1"
              >
                ล้าง
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-stone-500 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-700 focus:outline-rose-500 cursor-pointer"
            >
              <option value="featured">เรียงลำดับ: แนะนำ</option>
              <option value="price-asc">ราคา: ต่ำไปสูง</option>
              <option value="price-desc">ราคา: สูงไปต่ำ</option>
              <option value="name">ชื่อ: ก-ฮ</option>
            </select>
          </div>
        </div>

        {/* Row 2: Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          <span className="text-xs font-semibold text-stone-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>ประเภท:</span>
          </span>
          {categoryOptions.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.value
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Row 3: Color Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          <span className="text-xs font-semibold text-stone-500 mr-1">
            โทนสี:
          </span>
          {colorOptions.map((c) => {
            const isSelected = selectedColor === c.value;
            return (
              <button
                key={c.value}
                onClick={() => setSelectedColor(c.value)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-rose-100 text-rose-900 border border-rose-300 font-semibold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 border border-transparent'
                }`}
              >
                {c.hex && (
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-stone-300"
                    style={{ backgroundColor: c.hex }}
                  />
                )}
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Product Results Status */}
      <div className="flex items-center justify-between text-xs text-stone-500 mb-6">
        <span>
          แสดงผลลัพธ์ {filteredProducts.length} จาก {products.length} รายการ
        </span>
      </div>

      {/* Grid of Flowers */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((flower) => (
            <ProductCard key={flower.id} product={flower} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-stone-200/80">
          <span className="text-4xl mb-3 block">🔍</span>
          <h3 className="font-display text-xl font-bold text-stone-900 mb-1">
            ไม่พบดอกไม้ที่ตรงกับเงื่อนไขการค้นหา
          </h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto mb-5">
            ลองปรับเปลี่ยนคำค้นหา หรือเลือกตัวกรองสีและประเภทอื่น ๆ
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 bg-stone-900 text-white rounded-full text-xs font-medium hover:bg-stone-800 transition-colors cursor-pointer"
          >
            แสดงสินค้าทั้งหมด
          </button>
        </div>
      )}

    </div>
  );
};
