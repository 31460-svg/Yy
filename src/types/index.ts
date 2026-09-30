export interface FlowerProduct {
  id: string;
  name: string;
  englishName: string;
  scientificName?: string;
  category: 'popular' | 'thai_auspicious' | 'imported' | 'fragrant' | 'all';
  categoryLabel: string;
  price: number;
  shortDescription: string;
  description: string;
  color: string;
  colorHex: string;
  meaning: string;
  stock: number;
  image: string;
  rating: number;
  reviewCount: number;
  isPopular?: boolean;
}

export interface CartItem {
  product: FlowerProduct;
  quantity: number;
}

export type PaymentMethod = 'cod' | 'transfer' | 'qr';

export type OrderStatus = 'pending' | 'arranging' | 'shipping' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  phone: string;
  address: string;
  note?: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'verified';
  orderStatus: OrderStatus;
  userId?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  role: 'user' | 'admin';
  registeredAt: string;
}

export interface StoreStats {
  totalSales: number;
  totalOrders: number;
  totalMembers: number;
  totalProducts: number;
}
