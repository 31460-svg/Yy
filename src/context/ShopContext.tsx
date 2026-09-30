import React, { createContext, useContext, useState, useEffect } from 'react';
import { FlowerProduct, CartItem, Order, User, OrderStatus, PaymentMethod } from '../types';
import { INITIAL_FLOWERS, INITIAL_ORDERS, DEMO_USERS } from '../data/flowers';

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ShopContextType {
  products: FlowerProduct[];
  cart: CartItem[];
  orders: Order[];
  users: User[];
  currentUser: User | null;
  wishlist: string[];
  toasts: ToastItem[];
  activeTab: string;
  selectedProduct: FlowerProduct | null;
  searchQuery: string;
  selectedColor: string;
  selectedCategory: string;
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  cartTotal: number;

  // Actions
  setActiveTab: (tab: string) => void;
  setSelectedProduct: (product: FlowerProduct | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedColor: (color: string) => void;
  setSelectedCategory: (cat: string) => void;
  
  addToCart: (product: FlowerProduct, quantity?: number) => boolean;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  
  placeOrder: (data: {
    customerName: string;
    phone: string;
    address: string;
    note?: string;
    paymentMethod: PaymentMethod;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  login: (email: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, phone: string, address: string) => boolean;
  switchUserRole: (role: 'user' | 'admin') => void;

  addProduct: (product: Omit<FlowerProduct, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<FlowerProduct>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;

  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products with LocalStorage persistence
  const [products, setProducts] = useState<FlowerProduct[]>(() => {
    try {
      const saved = localStorage.getItem('flowershop_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_FLOWERS;
  });

  // Cart with LocalStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('flowershop_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Orders with LocalStorage persistence
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('flowershop_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ORDERS;
  });

  // Users with LocalStorage persistence
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('flowershop_users');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEMO_USERS;
  });

  // Current logged in user (defaults to Demo Customer for immediate smooth testing)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('flowershop_current_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEMO_USERS[0];
  });

  // Wishlist (favorites)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('flowershop_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['flower-1', 'flower-8', 'flower-19']; // Initial favorites
  });

  // UI state
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<FlowerProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('flowershop_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('flowershop_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('flowershop_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('flowershop_users', JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem('flowershop_current_user', JSON.stringify(currentUser));
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('flowershop_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Toast notification helper
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = cartSubtotal >= 500 || cartSubtotal === 0 ? 0 : 50;
  const cartTotal = cartSubtotal + shippingFee;

  // Add to cart with stock validation
  const addToCart = (product: FlowerProduct, quantity: number = 1): boolean => {
    const existing = cart.find(item => item.product.id === product.id);
    const currentQty = existing ? existing.quantity : 0;
    const targetQty = currentQty + quantity;

    if (targetQty > product.stock) {
      addToast(`สินค้าคงเหลือไม่เพียงพอ (คงเหลือ ${product.stock} ชิ้น)`, 'error');
      return false;
    }

    setCart(prev => {
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    addToast(`เพิ่ม "${product.name}" ลงในตะกร้าเรียบร้อยแล้ว 💐`, 'success');
    return true;
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (quantity > product.stock) {
      addToast(`สินค้าคงเหลือสูงสุด ${product.stock} ชิ้น`, 'info');
      return;
    }

    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find(i => i.product.id === productId);
    setCart(prev => prev.filter(i => i.product.id !== productId));
    if (item) {
      addToast(`นำ "${item.product.name}" ออกจากตะกร้าแล้ว`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const toggleWishlist = (productId: string) => {
    const product = products.find(p => p.id === productId);
    const flowerName = product ? product.name : 'สินค้า';

    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast(`นำ "${flowerName}" ออกจากรายการโปรดแล้ว`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        addToast(`บันทึก "${flowerName}" ในรายการโปรดแล้ว ❤️`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => {
    return wishlist.includes(productId);
  };

  // Place Order
  const placeOrder = (data: {
    customerName: string;
    phone: string;
    address: string;
    note?: string;
    paymentMethod: PaymentMethod;
  }): Order => {
    const orderNumber = `FS-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(Math.floor(1000 + Math.random() * 9000))}`;
    
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      customerName: data.customerName,
      phone: data.phone,
      address: data.address,
      note: data.note,
      items: [...cart],
      subtotal: cartSubtotal,
      shippingFee,
      totalPrice: cartTotal,
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'pending',
      userId: currentUser?.id
    };

    // Deduct stock
    setProducts(prev =>
      prev.map(p => {
        const cartItem = cart.find(ci => ci.product.id === p.id);
        if (cartItem) {
          return {
            ...p,
            stock: Math.max(0, p.stock - cartItem.quantity)
          };
        }
        return p;
      })
    );

    // Save order
    setOrders(prev => [newOrder, ...prev]);

    // Clear cart
    clearCart();

    addToast(`สั่งซื้อสำเร็จ! เลขที่คำสั่งซื้อ #${orderNumber} 🌸`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(ord =>
        ord.id === orderId ? { ...ord, orderStatus: status } : ord
      )
    );
    addToast('อัปเดตสถานะคำสั่งซื้อเรียบร้อยแล้ว', 'success');
  };

  // User Authentication
  const login = (email: string): boolean => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      addToast(`ยินดีต้อนรับคุณ ${found.name}`, 'success');
      return true;
    }
    // Allow any email to auto-sign in or prompt
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: email.split('@')[0],
      phone: '081-000-0000',
      address: 'กรุงเทพมหานคร',
      role: email.includes('admin') ? 'admin' : 'user',
      registeredAt: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    addToast(`เข้าสู่ระบบสำเร็จ ยินดีต้อนรับ ${newUser.name}`, 'success');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    addToast('ออกจากระบบเรียบร้อยแล้ว', 'info');
  };

  const register = (name: string, email: string, phone: string, address: string): boolean => {
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      addToast('อีเมลนี้ถูกใช้งานแล้ว กรุณาเข้าสู่ระบบ', 'error');
      return false;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      phone,
      address,
      role: 'user',
      registeredAt: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    addToast(`สมัครสมาชิกสำเร็จ! ยินดีต้อนรับคุณ ${name}`, 'success');
    return true;
  };

  const switchUserRole = (role: 'user' | 'admin') => {
    if (role === 'admin') {
      const admin = users.find(u => u.role === 'admin') || DEMO_USERS[2];
      setCurrentUser(admin);
      addToast('สลับเข้าสู่โหมด Admin สำเร็จ', 'info');
    } else {
      const user = users.find(u => u.role === 'user') || DEMO_USERS[0];
      setCurrentUser(user);
      addToast('สลับเข้าสู่โหมดสมาชิกลูกค้าสำเร็จ', 'info');
    }
  };

  // Product Admin Actions
  const addProduct = (productData: Omit<FlowerProduct, 'id'>) => {
    const newProduct: FlowerProduct = {
      ...productData,
      id: `flower-${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);
    addToast(`เพิ่มสินค้า "${newProduct.name}" เรียบร้อยแล้ว`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<FlowerProduct>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    addToast('บันทึกการแก้ไขสินค้าเรียบร้อยแล้ว', 'success');
  };

  const deleteProduct = (id: string) => {
    const item = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    if (item) {
      addToast(`ลบสินค้า "${item.name}" แล้ว`, 'info');
    }
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_FLOWERS);
    addToast('รีเซ็ตรายการสินค้าเป็นค่าเริ่มต้นแล้ว', 'success');
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        orders,
        users,
        currentUser,
        wishlist,
        toasts,
        activeTab,
        selectedProduct,
        searchQuery,
        selectedColor,
        selectedCategory,
        cartCount,
        cartSubtotal,
        shippingFee,
        cartTotal,
        setActiveTab,
        setSelectedProduct,
        setSearchQuery,
        setSelectedColor,
        setSelectedCategory,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isWishlisted,
        placeOrder,
        updateOrderStatus,
        login,
        logout,
        register,
        switchUserRole,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        addToast,
        removeToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
