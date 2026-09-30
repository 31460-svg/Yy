import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { APP_IMAGES } from '../assets/images';
import { ArrowRight, Sparkles, HeartHandshake, ShieldCheck, Truck } from 'lucide-react';

export const HomeSections: React.FC = () => {
  const { products, setActiveTab, setSelectedCategory } = useShop();

  const categories = [
    {
      id: 'popular',
      title: 'ดอกไม้ยอดนิยม',
      subtitle: 'กุหลาบ, ทานตะวัน, ทิวลิป',
      emoji: '🌹',
      colorBg: 'bg-rose-50 hover:bg-rose-100/80',
      textColor: 'text-rose-900',
      count: products.filter(p => p.category === 'popular' || p.isPopular).length
    },
    {
      id: 'thai_auspicious',
      title: 'ดอกไม้มงคล & ดอกไม้ไทย',
      subtitle: 'ดาวเรือง, ดอกบัว, ดอกเข็ม',
      emoji: '🪷',
      colorBg: 'bg-amber-50 hover:bg-amber-100/80',
      textColor: 'text-amber-900',
      count: products.filter(p => p.category === 'thai_auspicious').length
    },
    {
      id: 'fragrant',
      title: 'ดอกไม้มีกลิ่นหอม',
      subtitle: 'มะลิ, จำปี, ลาเวนเดอร์',
      emoji: '🌸',
      colorBg: 'bg-emerald-50 hover:bg-emerald-100/80',
      textColor: 'text-emerald-900',
      count: products.filter(p => p.category === 'fragrant').length
    },
    {
      id: 'imported',
      title: 'ดอกไม้นำเข้าพรีเมียม',
      subtitle: 'โบตั๋น, ไฮเดรนเยีย, ลิลลี่',
      emoji: '💐',
      colorBg: 'bg-purple-50 hover:bg-purple-100/80',
      textColor: 'text-purple-900',
      count: products.filter(p => p.category === 'imported').length
    }
  ];

  // Popular items to highlight
  const popularFlowers = products.filter(p => p.isPopular || p.price > 150).slice(0, 8);

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setActiveTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 py-12">
      
      {/* 1. Category Quick Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold text-rose-800 tracking-wider uppercase">
            หมวดหมู่ดอกไม้
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            เลือกดอกไม้ตามความชอบและโอกาส
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`p-5 rounded-2xl border border-stone-200/80 transition-all duration-300 text-left cursor-pointer group shadow-xs hover:shadow-md ${cat.colorBg}`}
            >
              <div className="text-3xl mb-3">{cat.emoji}</div>
              <div className="flex items-center justify-between">
                <h3 className={`font-display text-lg font-bold ${cat.textColor}`}>
                  {cat.title}
                </h3>
                <span className="text-xs font-medium text-stone-500 tabular-nums">
                  {cat.count} ชนิด
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                {cat.subtitle}
              </p>
              <div className="mt-3 flex items-center text-xs font-semibold text-stone-700 group-hover:text-stone-950">
                <span>เลือกชมหมวดนี้</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 2. Popular Products Grid (สินค้ายอดนิยม) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-800 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>คัดสรรมอบความรู้สึกดี ๆ</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-stone-900 mt-1">
              สินค้ายอดนิยมประจำสัปดาห์
            </h2>
            <p className="text-sm text-stone-600 mt-0.5">
              ดอกไม้ที่ได้รับความนิยมสูงสุด คัดเกรดพรีเมียมพร้อมจัดส่งทุกวัน
            </p>
          </div>

          <button
            onClick={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-rose-700 transition-colors cursor-pointer"
          >
            <span>ดูสินค้าทั้งหมด 20 รายการ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularFlowers.map((flower) => (
            <ProductCard key={flower.id} product={flower} />
          ))}
        </div>
      </section>

      {/* 3. Editorial Spotlight: Handcrafted Blooms */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-rose-200">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>ส่งมอบแทนความรู้สึก</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                ดอกไม้สดทุกก้าน มีความหมายพิเศษเพื่อคนสำคัญ
              </h2>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-xl">
                ไม่ว่าจะเป็นกุหลาบแดงบอกรัก มะลิกตัญญู ทานตะวันส่งพลังบวก หรือลิลลี่ขาวแทนความจริงใจ ช่างดอกไม้ของเราพร้อมดูแลทุกรายละเอียดด้วยความประณีต
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => {
                    setActiveTab('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-white hover:bg-stone-100 text-stone-900 rounded-full font-semibold text-xs transition-colors cursor-pointer shadow-md"
                >
                  เลือกช่อดอกไม้ตอนนี้
                </button>
                <button
                  onClick={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 border border-white/30 hover:border-white text-white rounded-full font-semibold text-xs transition-colors cursor-pointer"
                >
                  ปรึกษาช่างจัดดอกไม้
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 h-72 sm:h-96 lg:h-full min-h-[300px] relative">
              <img
                src={APP_IMAGES.weddingBlooms}
                alt="ดอกไม้จัดส่งพรีเมียม"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 4. Features / Guarantees Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-xs space-y-2">
            <Truck className="w-6 h-6 text-rose-600" />
            <h3 className="font-display text-lg font-bold text-stone-900">
              จัดส่งด่วนตรงเวลา
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              จัดส่งดอกไม้ด่วนภายใน 2-3 ชั่วโมงในเขตกรุงเทพฯ และปริมณฑล มั่นใจถึงมือผู้รับตรงตามเวลานัดหมาย
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-xs space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h3 className="font-display text-lg font-bold text-stone-900">
              รับประกันความสดชื่น
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              คัดเฉพาะดอกไม้สดใหม่เกรดพรีเมียมจากฟาร์ม หากดอกไม้เสียหายจากการจัดส่ง ยินดีส่งช่อใหม่ให้ทันที
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-xs space-y-2">
            <Sparkles className="w-6 h-6 text-amber-600" />
            <h3 className="font-display text-lg font-bold text-stone-900">
              การ์ดอวยพรเขียนมือฟรี
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              ส่งมอบความรู้สึกของคุณอย่างสมบูรณ์แบบด้วยการ์ดดีไซน์พิเศษ และบริการเขียนข้อความอวยพรฟรีทุกออเดอร์
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
