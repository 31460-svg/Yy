import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Lock, Mail, User, Phone, MapPin, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register, switchUserRole } = useShop();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('กรุณากรอกอีเมล');
      return;
    }
    const ok = login(email.trim());
    if (ok) {
      onClose();
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }
    const ok = register(name.trim(), email.trim(), phone.trim(), address.trim());
    if (ok) {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Headers */}
        <div className="pt-6 px-6 pb-2 text-center">
          <span className="text-3xl mb-1 inline-block">🌸</span>
          <h2 className="font-display text-2xl font-bold text-stone-900">
            {mode === 'login' ? 'เข้าสู่ระบบสมาชิก' : 'สมัครสมาชิกใหม่'}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            {mode === 'login'
              ? 'ยินดีต้อนรับกลับสู่ร้าน Flower Shop'
              : 'สร้างบัญชีเพื่อสะสมคะแนนและติดตามคำสั่งซื้อ'}
          </p>

          <div className="mt-5 grid grid-cols-2 p-1 bg-stone-100 rounded-xl">
            <button
              onClick={() => {
                setMode('login');
                setError('');
              }}
              className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === 'login' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              เข้าสู่ระบบ
            </button>
            <button
              onClick={() => {
                setMode('register');
                setError('');
              }}
              className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === 'register' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              สมัครสมาชิก
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 pt-3">
          {error && (
            <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  อีเมล (Email)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="email"
                    required
                    placeholder="customer@flowershop.th"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-rose-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  รหัสผ่าน (Password)
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-rose-500 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-stone-900 hover:bg-rose-700 text-white rounded-full font-semibold text-xs transition-colors shadow-xs cursor-pointer"
              >
                เข้าสู่ระบบ
              </button>

              {/* Quick Demo Logins for immediate testing */}
              <div className="pt-3 border-t border-stone-100 space-y-2">
                <p className="text-[11px] text-stone-400 text-center font-medium">
                  บัญชีทดสอบระบบ (คลิกเพื่อเข้าสู่ระบบทันที):
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      switchUserRole('user');
                      onClose();
                    }}
                    className="p-2 bg-stone-50 hover:bg-rose-50 border border-stone-200 rounded-xl text-[11px] font-medium text-stone-700 transition-colors text-center"
                  >
                    ลูกค้าตัวอย่าง
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      switchUserRole('admin');
                      onClose();
                    }}
                    className="p-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-[11px] font-medium transition-colors text-center"
                  >
                    แอดมินร้าน (Admin)
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  ชื่อ-นามสกุล
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    required
                    placeholder="คุณณภัทร สุขสมบูรณ์"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-rose-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  อีเมล
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="email"
                    required
                    placeholder="naphat@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-rose-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  เบอร์โทรศัพท์
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="tel"
                    required
                    placeholder="089-123-4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-rose-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  ที่อยู่เริ่มต้นสำหรับจัดส่ง
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                  <textarea
                    rows={2}
                    required
                    placeholder="เลขที่, ถนน, แขวง/เขต, จังหวัด, รหัสไปรษณีย์"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-rose-500 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-semibold text-xs transition-colors shadow-xs cursor-pointer mt-2"
              >
                ยืนยันการสมัครสมาชิก
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
