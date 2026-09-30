import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HomeSections } from './components/HomeSections';
import { ProductGridPage } from './components/ProductGridPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { MemberProfile } from './components/MemberProfile';
import { AdminDashboard } from './components/AdminDashboard';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Order } from './types';

const MainLayout: React.FC = () => {
  const { activeTab, setActiveTab, cartCount, cartTotal } = useShop();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleOrderSuccess = (order: Order) => {
    // Keep checkout modal open to view the success receipt
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800">
      
      {/* 1. Global Navigation Bar */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* 2. Active Tab View Switcher */}
      <main className="flex-1 pb-16 sm:pb-0">
        {activeTab === 'home' && (
          <>
            <HeroSection />
            <HomeSections />
          </>
        )}

        {activeTab === 'products' && <ProductGridPage />}

        {activeTab === 'profile' && (
          <MemberProfile onOpenAuth={() => setIsAuthOpen(true)} />
        )}

        {activeTab === 'admin' && <AdminDashboard />}

        {activeTab === 'about' && <AboutSection />}

        {activeTab === 'contact' && <ContactSection />}
      </main>

      {/* 3. Global Footer */}
      <Footer />

      {/* 4. Interactive Modals & Drawers */}
      <ProductDetailModal />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handleOrderSuccess}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* 5. Mobile Quick Cart Sticky Bar (compact, <= 15% mobile viewport) */}
      {cartCount > 0 && !isCartOpen && !isCheckoutOpen && (
        <div className="sm:hidden fixed bottom-4 inset-x-4 z-30">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3 px-4 bg-stone-900 text-white rounded-full shadow-xl flex items-center justify-between font-medium text-xs cursor-pointer active:scale-98 transition-transform"
          >
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 bg-rose-600 rounded-full flex items-center justify-center text-[10px] font-bold">
                {cartCount}
              </span>
              <span>ดูตะกร้าสินค้า</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold tabular-nums">฿{cartTotal.toLocaleString()}</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </div>
          </button>
        </div>
      )}

      {/* 6. Notifications */}
      <ToastContainer />

    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
