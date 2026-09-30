import React from 'react';
import { useShop } from '../context/ShopContext';
import { APP_IMAGES } from '../assets/images';
import { Heart, Sparkles, Award, ShieldCheck, ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { setActiveTab } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
      
      {/* Editorial Header */}
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <span className="text-xs font-semibold text-rose-800 tracking-widest uppercase">
          เรื่องราวและความตั้งใจของเรา
        </span>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
          ส่งมอบความรู้สึกที่งดงาม ผ่านดอกไม้ทุกช่อ
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Flower Shop ก่อตั้งขึ้นด้วยความรักในธรรมชาติและศิลปะแห่งการจัดดอกไม้ เราเชื่อว่าดอกไม้แต่ละสายพันธุ์มีภาษาและความหมายที่สามารถแทนใจได้อย่างลึกซึ้ง
        </p>
      </div>

      {/* Main Workshop Visual & Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-6 overflow-hidden rounded-3xl border border-stone-200 shadow-md">
          <img
            src={APP_IMAGES.workshop}
            alt="สตูดิโอจัดดอกไม้ Flower Shop"
            className="w-full h-80 sm:h-96 object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
            สตูดิโอของช่างดอกไม้มืออาชีพ
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            เราคัดเลือกดอกไม้สดใหม่จากฟาร์มทั้งในประเทศและสายพันธุ์นำเข้าทุกเช้าตรู่ ดอกไม้แต่ละก้านได้รับการดูแลอย่างทะนุถนอมในอุณหภูมิที่เหมาะสม เพื่อให้มั่นใจว่าเมื่อถึงมือผู้รับ จะคงความสดใสและบานสะพรั่งได้อย่างยาวนานที่สุด
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1.5">
              <Sparkles className="w-5 h-5 text-rose-600" />
              <h3 className="text-sm font-semibold text-stone-900">คัดเกรดพรีเมียมทุกเช้า</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                กลีบดอกแน่น ก้านแข็งแรง ผ่านการตรวจสอบคุณภาพดอกต่อดอก
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1.5">
              <Award className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-semibold text-stone-900">ดีไซน์สไตล์มินิมอลโมเดิร์น</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                จัดช่อด้วยศิลปะร่วมสมัย เรียบหรู อ่อนโยน และทรงคุณค่า
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setActiveTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-full text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>เลือกชมช่อดอกไม้ของเรา</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
