import React from 'react';
import { useShop } from '../context/ShopContext';
import { APP_IMAGES } from '../assets/images';
import { ArrowRight, Sparkles, Clock, HeartHandshake } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveTab } = useShop();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDF8F5] via-[#FCF5F0] to-[#FAF8F5] pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 text-rose-800 text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>คัดสรรดอกไม้สดคุณภาพสูงเกรดพรีเมียมทุกเช้า</span>
            </div>

            {/* Exact Required Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15] text-balance">
              ดอกไม้สวย ๆ สำหรับทุกความรู้สึก 💐
            </h1>

            {/* Exact Required Description */}
            <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              เลือกดอกไม้ที่ใช่ ส่งต่อความรู้สึกดี ๆ ให้กับคนสำคัญของคุณ
            </p>

            {/* Exact Required CTA Button + Secondary Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-full font-medium text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>เลือกซื้อดอกไม้</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 rounded-full font-medium text-sm transition-all cursor-pointer"
              >
                เรื่องราวของเรา
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-8 border-t border-stone-200/80 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-xs text-stone-500 font-medium">ความสดใหม่</p>
                <p className="text-sm font-semibold text-stone-900 mt-0.5">คัดสดทุกเช้า 100%</p>
              </div>
              <div>
                <p className="text-xs text-stone-500 font-medium">การจัดส่ง</p>
                <p className="text-sm font-semibold text-stone-900 mt-0.5">ด่วนถึงปลายทางในวัน</p>
              </div>
              <div>
                <p className="text-xs text-stone-500 font-medium">ของแถมพิเศษ</p>
                <p className="text-sm font-semibold text-stone-900 mt-0.5">การ์ดอวยพรเขียนมือฟรี</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative soft blurred backdrop */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-rose-200/40 via-amber-100/30 to-emerald-100/30 rounded-3xl blur-2xl -z-10" />

              {/* Main Photo Card */}
              <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-xl transition-transform hover:scale-[1.01] duration-300">
                <img
                  src={APP_IMAGES.heroBouquet}
                  alt="ช่อดอกไม้สดเกรดพรีเมียมจาก Flower Shop"
                  className="w-full h-80 sm:h-96 object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating caption tag inside photo card */}
                <div className="p-4 bg-white/95 backdrop-blur-xs flex items-center justify-between border-t border-stone-100">
                  <div>
                    <p className="text-xs font-semibold text-stone-900">ช่อซิกเนเจอร์ Blossom Symphony</p>
                    <p className="text-[11px] text-stone-500">รวมดอกไม้พรีเมียม คัดเกรดพิเศษ</p>
                  </div>
                  <span className="text-sm font-semibold text-rose-700 tabular-nums">
                    ฿1,290
                  </span>
                </div>
              </div>

              {/* Little Floating Badge */}
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-stone-200/80 flex items-center gap-3">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-800">จัดส่งทั่วกรุงเทพฯ & ปริมณฑล</p>
                  <p className="text-[11px] text-stone-500">รับประกันความสดชื่นถึงมือคุณ</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
