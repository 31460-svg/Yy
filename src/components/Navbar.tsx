import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, User as UserIcon, Menu, X, Shield, Search } from 'lucide-react';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart, onOpenAuth }) => {
  const {
    activeTab,
    setActiveTab,
    cartCount,
    wishlist,
    currentUser,
    switchUserRole,
    setSearchQuery
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearchOpen, setNavSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
      setActiveTab('products');
      setNavSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer focus-visible:outline-rose-500"
            >
              <span className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900 group-hover:text-rose-800 transition-colors">
                Flower Shop
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-normal text-rose-700/80 tracking-widest uppercase">
                · ร้านดอกไม้ออนไลน์
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean text links with subtle hover) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors hover:text-rose-700 cursor-pointer ${
                activeTab === 'home' ? 'text-rose-800 font-semibold' : ''
              }`}
            >
              หน้าแรก
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className={`transition-colors hover:text-rose-700 cursor-pointer ${
                activeTab === 'products' ? 'text-rose-800 font-semibold' : ''
              }`}
            >
              สินค้าทั้งหมด
            </button>
            <button
              onClick={() => {
                setActiveTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="transition-colors hover:text-rose-700 cursor-pointer"
            >
              ดอกไม้ยอดนิยม
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`transition-colors hover:text-rose-700 cursor-pointer ${
                activeTab === 'about' ? 'text-rose-800 font-semibold' : ''
              }`}
            >
              เกี่ยวกับเรา
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`transition-colors hover:text-rose-700 cursor-pointer ${
                activeTab === 'contact' ? 'text-rose-800 font-semibold' : ''
              }`}
            >
              ติดต่อเรา
            </button>
          </nav>

          {/* Zone 3: Primary Actions (Search, Wishlist, Cart, Profile, Admin) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Nav Search Toggle */}
            {navSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  placeholder="ค้นหาชื่อดอกไม้..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  autoFocus
                  className="w-36 sm:w-52 px-3 py-1.5 text-xs sm:text-sm bg-stone-100 border border-stone-300 rounded-full focus:outline-rose-500 focus:bg-white text-stone-800"
                />
                <button
                  type="button"
                  onClick={() => setNavSearchOpen(false)}
                  className="ml-1 p-1 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setNavSearchOpen(true)}
                className="p-2 text-stone-600 hover:text-rose-700 hover:bg-rose-50/60 rounded-full transition-colors cursor-pointer"
                title="ค้นหาดอกไม้"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Wishlist */}
            <button
              onClick={() => handleNavClick('profile')}
              className="relative p-2 text-stone-600 hover:text-rose-700 hover:bg-rose-50/60 rounded-full transition-colors cursor-pointer"
              title="รายการโปรด"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-rose-500 rounded-full tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-full transition-colors cursor-pointer shadow-xs"
              title="ตะกร้าสินค้า"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-semibold tabular-nums">{cartCount}</span>
            </button>

            {/* User / Member */}
            <button
              onClick={() => (currentUser ? handleNavClick('profile') : onOpenAuth())}
              className="flex items-center gap-1.5 p-2 text-stone-600 hover:text-rose-700 hover:bg-rose-50/60 rounded-full transition-colors cursor-pointer"
              title={currentUser ? currentUser.name : 'เข้าสู่ระบบ'}
            >
              <UserIcon className="w-5 h-5" />
              {currentUser && (
                <span className="hidden lg:inline text-xs font-medium text-stone-700 max-w-[90px] truncate">
                  {currentUser.name}
                </span>
              )}
            </button>

            {/* Admin Switcher Shortcut */}
            <button
              onClick={() => {
                if (currentUser?.role === 'admin') {
                  handleNavClick('admin');
                } else {
                  switchUserRole('admin');
                  handleNavClick('admin');
                }
              }}
              className={`p-2 rounded-full transition-colors cursor-pointer text-xs font-medium flex items-center gap-1 ${
                currentUser?.role === 'admin' && activeTab === 'admin'
                  ? 'bg-rose-100 text-rose-800'
                  : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
              }`}
              title="ระบบผู้ดูแลร้าน (Admin Dashboard)"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden xl:inline text-xs">Admin</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-600 hover:text-stone-900 md:hidden rounded-lg"
              aria-label="เปิดเมนู"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'home' ? 'bg-rose-50 text-rose-800 font-semibold' : 'text-stone-700'
            }`}
          >
            🌸 หน้าแรก (Home)
          </button>
          <button
            onClick={() => handleNavClick('products')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'products' ? 'bg-rose-50 text-rose-800 font-semibold' : 'text-stone-700'
            }`}
          >
            💐 สินค้าดอกไม้ทั้งหมด 20 รายการ
          </button>
          <button
            onClick={() => handleNavClick('profile')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'profile' ? 'bg-rose-50 text-rose-800 font-semibold' : 'text-stone-700'
            }`}
          >
            👤 ข้อมูลส่วนตัว / ประวัติคำสั่งซื้อ / รายการโปรด
          </button>
          <button
            onClick={() => handleNavClick('admin')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'admin' ? 'bg-stone-900 text-white' : 'text-stone-700'
            }`}
          >
            🛡️ ระบบจัดการร้าน (Admin Dashboard)
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'about' ? 'bg-rose-50 text-rose-800 font-semibold' : 'text-stone-700'
            }`}
          >
            🌿 เกี่ยวกับเรา (About Us)
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'contact' ? 'bg-rose-50 text-rose-800 font-semibold' : 'text-stone-700'
            }`}
          >
            📞 ติดต่อเรา (Contact)
          </button>
        </div>
      )}
    </header>
  );
};
