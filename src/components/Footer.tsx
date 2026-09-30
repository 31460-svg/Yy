import React from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useShop();

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-white tracking-tight">
              Flower Shop
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              ร้านดอกไม้ออนไลน์ คัดสรรดอกไม้สดสวยงามจากฟาร์มคุณภาพ พร้อมจัดส่งความรู้สึกดี ๆ ถึงคนสำคัญของคุณทุกวัน
            </p>
            <div className="text-xs text-stone-400 space-y-1">
              <p>📍 สุขุมวิท 55 ทองหล่อ, กรุงเทพมหานคร</p>
              <p>📞 โทร: 02-123-4567, 081-234-5678</p>
              <p>💬 LINE: @flowershop</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              เมนูหลัก
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  หน้าแรก (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  สินค้าดอกไม้ทั้งหมด (20 ชนิด)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  เรื่องราวของเรา (About Us)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ติดต่อร้านค้า (Contact)
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Member */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              บริการสมาชิก
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => handleNav('profile')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ข้อมูลส่วนตัวสมาชิก
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('profile')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ติดตามสถานะคำสั่งซื้อ
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('profile')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  รายการดอกไม้ที่ชอบ (❤️)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin')}
                  className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Shield className="w-3 h-3 text-amber-400" />
                  <span>ระบบหลังร้าน (Admin Portal)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Delivery & Assurance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              การันตีคุณภาพ
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              เรารับประกันความสดใหม่ของดอกไม้ทุกช่อ หากพบสินค้าชำรุดจากการขนส่ง ยินดีจัดส่งช่อใหม่ให้ทันทีโดยไม่มีค่าใช้จ่าย
            </p>
            <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700/80 text-[11px] text-stone-300">
              <span className="font-semibold text-white">ส่งฟรีทั่วกรุงเทพฯ</span> เมื่อมียอดสั่งซื้อ ฿500 ขึ้นไป
            </div>
          </div>

        </div>

        {/* Bottom Bar: Clean Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Flower Shop. สงวนลิขสิทธิ์ทั้งหมด.</p>
          <div className="flex items-center gap-4">
            <span>ส่งมอบความสุขด้วยความจริงใจ 💐</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
