import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import {
  User as UserIcon,
  ShoppingBag,
  Heart,
  Clock,
  MapPin,
  Phone,
  Mail,
  LogOut,
  Shield,
  CheckCircle,
  Truck,
  RotateCcw
} from 'lucide-react';

interface MemberProfileProps {
  onOpenAuth: () => void;
}

export const MemberProfile: React.FC<MemberProfileProps> = ({ onOpenAuth }) => {
  const {
    currentUser,
    orders,
    wishlist,
    products,
    logout,
    switchUserRole,
    setActiveTab
  } = useShop();

  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'orders' | 'favorites'>('orders');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="font-display text-2xl font-bold text-stone-900 mb-2">
          เข้าสู่ระบบเพื่อดูข้อมูลสมาชิก
        </h2>
        <p className="text-xs text-stone-500 mb-6">
          เข้าสู่ระบบเพื่อดูประวัติการสั่งซื้อ รายการโปรด และจัดการข้อมูลส่วนตัว
        </p>
        <button
          onClick={onOpenAuth}
          className="px-6 py-3 bg-stone-900 text-white rounded-full text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
        >
          เข้าสู่ระบบ / สมัครสมาชิก
        </button>
      </div>
    );
  }

  // Filter orders for this user (or all if demo testing)
  const userOrders = orders.filter(
    (o) => o.userId === currentUser.id || !o.userId || currentUser.role === 'admin'
  );

  const favoriteProducts = products.filter((p) => wishlist.includes(p.id));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-[11px] font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>รอดำเนินการ</span>
          </span>
        );
      case 'arranging':
        return (
          <span className="px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-md text-[11px] font-medium flex items-center gap-1">
            <span>🌸 กำลังจัดช่อดอกไม้</span>
          </span>
        );
      case 'shipping':
        return (
          <span className="px-2.5 py-1 bg-purple-50 text-purple-800 border border-purple-200 rounded-md text-[11px] font-medium flex items-center gap-1">
            <Truck className="w-3 h-3" />
            <span>กำลังจัดส่ง</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md text-[11px] font-medium flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            <span>จัดส่งสำเร็จแล้ว</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 bg-stone-100 text-stone-600 rounded-md text-[11px] font-medium">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Banner & User Profile Hero */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center font-display text-2xl font-bold shadow-md">
            {currentUser.name.charAt(0) || 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-stone-900">
                {currentUser.name}
              </h1>
              {currentUser.role === 'admin' ? (
                <span className="px-2.5 py-0.5 bg-stone-900 text-white text-[11px] font-semibold rounded-full flex items-center gap-1">
                  <Shield className="w-3 h-3 text-amber-400" />
                  <span>Admin</span>
                </span>
              ) : (
                <span className="px-2.5 py-0.5 bg-rose-50 text-rose-700 text-[11px] font-semibold rounded-full">
                  สมาชิกทั่วไป
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {currentUser.email} · สมาชิกตั้งแต่ {currentUser.registeredAt}
            </p>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {currentUser.role === 'admin' ? (
            <button
              onClick={() => setActiveTab('admin')}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>เข้าสู่ Admin Dashboard</span>
            </button>
          ) : (
            <button
              onClick={() => switchUserRole('admin')}
              className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-medium transition-colors cursor-pointer"
            >
              สลับเป็น Admin (ทดสอบ)
            </button>
          )}

          <button
            onClick={logout}
            className="px-3.5 py-2 border border-stone-200 hover:bg-stone-50 text-stone-600 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs: Orders / Profile / Favorites */}
      <div className="flex items-center gap-2 p-1.5 bg-stone-100/80 rounded-2xl max-w-md mb-8">
        <button
          onClick={() => setActiveSubTab('orders')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === 'orders'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>ประวัติสั่งซื้อ ({userOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('favorites')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === 'favorites'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>รายการโปรด ({favoriteProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('profile')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === 'profile'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <UserIcon className="w-4 h-4" />
          <span>ข้อมูลส่วนตัว</span>
        </button>
      </div>

      {/* Sub Tab 1: Orders History */}
      {activeSubTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl font-bold text-stone-900">
              ประวัติการสั่งซื้อของคุณ
            </h2>
          </div>

          {userOrders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200/80 p-8">
              <span className="text-4xl mb-3 block">📦</span>
              <h3 className="font-display text-lg font-bold text-stone-900">
                ยังไม่มีประวัติการสั่งซื้อ
              </h3>
              <p className="text-xs text-stone-500 mt-1 mb-6">
                เมื่อคุณสั่งซื้อดอกไม้ รายละเอียดคำสั่งซื้อและสถานะการจัดส่งจะแสดงที่นี่
              </p>
              <button
                onClick={() => setActiveTab('products')}
                className="px-6 py-2.5 bg-stone-900 text-white rounded-full text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                เลือกซื้อดอกไม้เลย
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {userOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs space-y-4"
                >
                  {/* Order header row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm">
                          คำสั่งซื้อ #{order.orderNumber}
                        </span>
                        {getStatusBadge(order.orderStatus)}
                      </div>
                      <p className="text-xs text-stone-400 mt-0.5">
                        วันที่สั่งซื้อ: {new Date(order.createdAt).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-stone-500">ยอดรวมทั้งสิ้น</span>
                      <p className="text-base font-bold text-rose-700 tabular-nums">
                        ฿{order.totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Itemized List */}
                  <div className="divide-y divide-stone-50">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-10 h-10 rounded-lg object-cover border border-stone-200"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="font-semibold text-stone-900">
                              {item.product.name}
                            </span>
                            <span className="text-stone-400 ml-1.5">× {item.quantity}</span>
                            <p className="text-[11px] text-stone-500">สี{item.product.color}</p>
                          </div>
                        </div>
                        <span className="font-medium text-stone-800 tabular-nums">
                          ฿{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Footer details: recipient, address, note */}
                  <div className="pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600 bg-stone-50/60 p-3 rounded-xl">
                    <div>
                      <p className="font-medium text-stone-800">ที่อยู่จัดส่ง:</p>
                      <p className="text-stone-600 mt-0.5">{order.address}</p>
                      <p className="text-stone-500 mt-0.5">ผู้รับ: {order.customerName} ({order.phone})</p>
                    </div>
                    <div>
                      <p className="font-medium text-stone-800">การชำระเงิน & หมายเหตุ:</p>
                      <p className="text-stone-600 mt-0.5">
                        วิธีชำระ: {order.paymentMethod === 'cod' ? 'เงินสดปลายทาง' : order.paymentMethod === 'qr' ? 'QR Code พร้อมเพย์' : 'โอนเงินธนาคาร'}
                      </p>
                      {order.note && (
                        <p className="text-stone-500 mt-0.5 italic">
                          ข้อความบนการ์ด: "{order.note}"
                        </p>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sub Tab 2: Favorites (Wishlist ❤️) */}
      {activeSubTab === 'favorites' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl font-bold text-stone-900">
              รายการดอกไม้ที่คุณชื่นชอบ ❤️ ({favoriteProducts.length})
            </h2>
          </div>

          {favoriteProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200/80 p-8">
              <span className="text-4xl mb-3 block">🤍</span>
              <h3 className="font-display text-lg font-bold text-stone-900">
                ยังไม่มีรายการโปรด
              </h3>
              <p className="text-xs text-stone-500 mt-1 mb-6">
                กดไอคอนหัวใจ ❤️ บนดอกไม้ที่คุณชอบเพื่อบันทึกไว้ดูภายหลัง
              </p>
              <button
                onClick={() => setActiveTab('products')}
                className="px-6 py-2.5 bg-stone-900 text-white rounded-full text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                ค้นหาดอกไม้ถูกใจ
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteProducts.map((flower) => (
                <ProductCard key={flower.id} product={flower} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sub Tab 3: Personal Information */}
      {activeSubTab === 'profile' && (
        <div className="max-w-2xl bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 space-y-6">
          <h2 className="font-display text-xl font-bold text-stone-900">
            ข้อมูลส่วนตัวและที่อยู่สำหรับจัดส่ง
          </h2>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
              <UserIcon className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-stone-400">ชื่อสมาชิก</p>
                <p className="text-sm font-semibold text-stone-900 mt-0.5">{currentUser.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
              <Mail className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-stone-400">อีเมล</p>
                <p className="text-sm font-semibold text-stone-900 mt-0.5">{currentUser.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
              <Phone className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-stone-400">เบอร์โทรศัพท์ติดต่อ</p>
                <p className="text-sm font-semibold text-stone-900 mt-0.5">{currentUser.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
              <MapPin className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-stone-400">ที่อยู่เริ่มต้นสำหรับจัดส่ง</p>
                <p className="text-sm font-semibold text-stone-900 mt-0.5 leading-relaxed">
                  {currentUser.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
