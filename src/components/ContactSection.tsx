import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { addToast } = useShop();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitted(true);
    addToast('ส่งข้อความถึงทีมงานเรียบร้อยแล้ว เราจะติดต่อกลับโดยเร็วที่สุด 💐', 'success');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      
      <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
        <span className="text-xs font-semibold text-rose-800 tracking-widest uppercase">
          ช่องทางการติดต่อ
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
          ติดต่อเรา Flower Shop
        </h1>
        <p className="text-sm text-stone-600">
          มีข้อสงสัยเกี่ยวกับการเลือกดอกไม้ การสั่งจัดช่อพิเศษ หรืองานอีเวนต์ สามารถติดต่อเราได้ตลอดเวลา
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="p-5 bg-white rounded-2xl border border-stone-200/90 shadow-xs flex items-start gap-4">
            <div className="p-3 bg-rose-50 text-rose-700 rounded-xl shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <h3 className="text-sm font-semibold text-stone-900">ที่ตั้งหน้าร้าน</h3>
              <p className="text-stone-600 mt-1 leading-relaxed">
                128/9 ถนนสุขุมวิท 55 (ทองหล่อ ซอย 10) แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110
              </p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-stone-200/90 shadow-xs flex items-start gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <h3 className="text-sm font-semibold text-stone-900">โทรศัพท์ติดต่อ</h3>
              <p className="text-stone-600 mt-1">
                02-123-4567, 081-234-5678 (สายด่วน)
              </p>
              <p className="text-stone-400 mt-0.5">บริการสั่งดอกไม้ด่วนตลอดวัน</p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-stone-200/90 shadow-xs flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-blue-700 rounded-xl shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <h3 className="text-sm font-semibold text-stone-900">LINE Official & Social</h3>
              <p className="text-stone-600 mt-1">
                LINE: <span className="font-semibold text-emerald-700">@flowershop</span>
              </p>
              <p className="text-stone-400 mt-0.5">Instagram / Facebook: @flowershop.thailand</p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-stone-200/90 shadow-xs flex items-start gap-4">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-xl shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <h3 className="text-sm font-semibold text-stone-900">เวลาทำการ</h3>
              <p className="text-stone-600 mt-1">
                เปิดให้บริการทุกวัน: 08:00 น. - 20:00 น.
              </p>
              <p className="text-stone-400 mt-0.5">สั่งซื้อออนไลน์ได้ตลอด 24 ชั่วโมง</p>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs">
          
          <h2 className="font-display text-2xl font-bold text-stone-900 mb-2">
            ส่งข้อความถึงช่างจัดดอกไม้
          </h2>
          <p className="text-xs text-stone-500 mb-6">
            ทีมงานพร้อมให้คำแนะนำและตอบกลับภายใน 15-30 นาที
          </p>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="text-sm font-bold text-emerald-900">
                ได้รับข้อความของคุณเรียบร้อยแล้ว
              </h3>
              <p className="text-xs text-emerald-700">
                เจ้าหน้าที่จะติดต่อกลับผ่านเบอร์โทรหรืออีเมลที่คุณระบุไว้ ขอบคุณค่ะ
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    ชื่อของคุณ <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="เช่น คุณกมลวรรณ"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-rose-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    อีเมล หรือ เบอร์โทรติดต่อ
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="081-xxx-xxxx หรือ email@gmail.com"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-rose-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  หัวข้อเรื่อง
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="เช่น สั่งจัดช่อดอกไม้แต่งงาน, สอบถามการจัดส่งด่วน"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-rose-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  รายละเอียดข้อความ <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="พิมพ์ข้อความที่คุณต้องการสอบถามที่นี่..."
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-rose-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-stone-900 hover:bg-rose-700 text-white rounded-full font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>ส่งข้อความ</span>
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
