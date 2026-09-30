import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { FlowerProduct, OrderStatus } from '../types';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  Plus,
  Trash2,
  Edit2,
  RotateCcw,
  CheckCircle,
  Clock,
  Truck,
  X,
  Search,
  Check
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    users,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    updateOrderStatus
  } = useShop();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'members'>('products');
  const [productSearch, setProductSearch] = useState('');
  
  // Product Edit/Add Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<FlowerProduct | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    englishName: '',
    price: 150,
    color: 'ชมพู',
    colorHex: '#EC4899',
    category: 'popular' as const,
    categoryLabel: 'ดอกไม้ยอดนิยม',
    meaning: '',
    shortDescription: '',
    description: '',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 15
  });

  // KPI Calculations
  const totalSales = orders.reduce((sum, ord) => sum + ord.totalPrice, 0);
  const totalOrdersCount = orders.length;
  const totalMembersCount = users.length;
  const totalProductsCount = products.length;

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      englishName: '',
      price: 150,
      color: 'ชมพู',
      colorHex: '#EC4899',
      category: 'popular',
      categoryLabel: 'ดอกไม้ยอดนิยม',
      meaning: '',
      shortDescription: '',
      description: '',
      stock: 20,
      image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviewCount: 10
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: FlowerProduct) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      englishName: p.englishName,
      price: p.price,
      color: p.color,
      colorHex: p.colorHex,
      category: p.category as any,
      categoryLabel: p.categoryLabel,
      meaning: p.meaning,
      shortDescription: p.shortDescription,
      description: p.description,
      stock: p.stock,
      image: p.image,
      rating: p.rating,
      reviewCount: p.reviewCount
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      });
    } else {
      addProduct({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      });
    }

    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.includes(productSearch) ||
      p.englishName.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.color.includes(productSearch)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 tracking-wider uppercase">
            <span>แดชบอร์ดผู้ดูแลร้าน</span>
            <span>·</span>
            <span>FLOWER SHOP ADMIN</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            ระบบจัดการร้านดอกไม้
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetProductsToDefault}
            className="px-3.5 py-2 border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            title="รีเซ็ตสินค้า 20 รายการเดิม"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>รีเซ็ตสินค้าเริ่มต้น</span>
          </button>
          
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-stone-900 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>เพิ่มสินค้าใหม่</span>
          </button>
        </div>
      </div>

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        
        {/* KPI 1: Total Sales */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium">ยอดขายรวม</span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
            ฿{totalSales.toLocaleString()}
          </p>
          <p className="text-[11px] text-stone-400 mt-1">
            จากคำสั่งซื้อทั้งหมดที่เข้ามา
          </p>
        </div>

        {/* KPI 2: Total Orders */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium">จำนวนคำสั่งซื้อ</span>
            <div className="p-2 bg-rose-50 text-rose-700 rounded-lg">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
            {totalOrdersCount}
          </p>
          <p className="text-[11px] text-stone-400 mt-1">
            รายการคำสั่งซื้อทั้งหมด
          </p>
        </div>

        {/* KPI 3: Total Members */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium">จำนวนสมาชิก</span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
            {totalMembersCount}
          </p>
          <p className="text-[11px] text-stone-400 mt-1">
            บัญชีลูกค้าที่ลงทะเบียนแล้ว
          </p>
        </div>

        {/* KPI 4: Total Products */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium">จำนวนสินค้าทั้งหมด</span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-lg">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
            {totalProductsCount}
          </p>
          <p className="text-[11px] text-stone-400 mt-1">
            รายการดอกไม้พร้อมจำหน่าย
          </p>
        </div>

      </div>

      {/* Main Admin Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-stone-100/80 rounded-2xl max-w-lg mb-6">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'products'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          จัดการสินค้า ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          จัดการคำสั่งซื้อ ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('members')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'members'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          รายชื่อสมาชิก ({users.length})
        </button>
      </div>

      {/* Tab 1: Products Management */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-xs">
          
          <div className="p-4 sm:p-6 border-b border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="ค้นหาชื่อดอกไม้ในคลัง..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-rose-500 focus:bg-white"
              />
            </div>
            <span className="text-xs text-stone-400">
              แสดง {filteredProducts.length} จาก {products.length} รายการ
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50/70 text-stone-500 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">รูปภาพ</th>
                  <th className="py-3 px-4">ชื่อดอกไม้</th>
                  <th className="py-3 px-4">หมวดหมู่ & สี</th>
                  <th className="py-3 px-4">ราคา (บาท)</th>
                  <th className="py-3 px-4">คงเหลือ (ชิ้น)</th>
                  <th className="py-3 px-4 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                        referrerPolicy="no-referrer"
                      />
                    </td>
                    <td className="py-3 px-4 font-semibold text-stone-900">
                      <div>{p.name}</div>
                      <div className="text-[11px] font-normal text-stone-400 font-serif italic">
                        {p.englishName}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-stone-600">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-stone-300"
                          style={{ backgroundColor: p.colorHex }}
                        />
                        <span>สี{p.color}</span>
                        <span className="text-stone-300">·</span>
                        <span>{p.categoryLabel}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-stone-900 tabular-nums">
                      ฿{p.price}
                    </td>
                    <td className="py-3 px-4 tabular-nums">
                      {p.stock <= 5 ? (
                        <span className="text-rose-600 font-bold">{p.stock} (ใกล้หมด)</span>
                      ) : (
                        <span className="text-stone-700">{p.stock}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                          title="แก้ไขสินค้า"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="ลบสินค้า"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* Tab 2: Orders Management */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50/70 text-stone-500 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">เลขที่คำสั่งซื้อ</th>
                  <th className="py-3 px-4">ลูกค้า & เบอร์โทร</th>
                  <th className="py-3 px-4">รายการสินค้า</th>
                  <th className="py-3 px-4">ยอดรวม</th>
                  <th className="py-3 px-4">วิธีชำระ</th>
                  <th className="py-3 px-4">สถานะคำสั่งซื้อ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-stone-900">
                      <div>#{ord.orderNumber}</div>
                      <div className="text-[11px] font-normal text-stone-400">
                        {new Date(ord.createdAt).toLocaleDateString('th-TH')}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-stone-800">
                      <div className="font-semibold">{ord.customerName}</div>
                      <div className="text-[11px] text-stone-500">{ord.phone}</div>
                    </td>
                    <td className="py-3 px-4 text-stone-600">
                      <div className="max-w-xs truncate">
                        {ord.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-rose-700 tabular-nums">
                      ฿{ord.totalPrice.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-stone-600">
                      {ord.paymentMethod === 'cod'
                        ? 'เงินสดปลายทาง'
                        : ord.paymentMethod === 'qr'
                        ? 'QR Code'
                        : 'โอนเงิน'}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs font-semibold text-stone-800 focus:outline-rose-500 cursor-pointer"
                      >
                        <option value="pending">⏳ รอดำเนินการ</option>
                        <option value="arranging">🌸 กำลังจัดช่อดอกไม้</option>
                        <option value="shipping">🚚 กำลังจัดส่ง</option>
                        <option value="delivered">✅ จัดส่งสำเร็จแล้ว</option>
                        <option value="cancelled">❌ ยกเลิก</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Members List */}
      {activeTab === 'members' && (
        <div className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50/70 text-stone-500 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">ชื่อสมาชิก</th>
                  <th className="py-3 px-4">อีเมล</th>
                  <th className="py-3 px-4">เบอร์โทรศัพท์</th>
                  <th className="py-3 px-4">ที่อยู่</th>
                  <th className="py-3 px-4">สถานะบทบาท</th>
                  <th className="py-3 px-4">วันที่สมัคร</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-stone-900">{u.name}</td>
                    <td className="py-3 px-4 text-stone-600">{u.email}</td>
                    <td className="py-3 px-4 text-stone-600">{u.phone}</td>
                    <td className="py-3 px-4 text-stone-500 max-w-xs truncate">{u.address}</td>
                    <td className="py-3 px-4">
                      {u.role === 'admin' ? (
                        <span className="px-2 py-0.5 bg-stone-900 text-white rounded-md text-[10px] font-bold">
                          Admin
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-rose-50 text-rose-700 rounded-md text-[10px] font-semibold">
                          ลูกค้าสมาชิก
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-stone-400">{u.registeredAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for Add / Edit Product */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6">
            
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <h3 className="font-display text-lg font-bold text-stone-900">
                {editingProduct ? 'แก้ไขข้อมูลสินค้า' : 'เพิ่มสินค้าดอกไม้ใหม่'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    ชื่อภาษาไทย <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="เช่น กุหลาบขาว"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    ชื่อภาษาอังกฤษ
                  </label>
                  <input
                    type="text"
                    value={formData.englishName}
                    onChange={(e) => setFormData({ ...formData, englishName: e.target.value })}
                    placeholder="เช่น White Rose"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    ราคา (บาท) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    จำนวนคงเหลือ <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    สีของดอกไม้
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="ขาว / แดง / ชมพู"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  ความหมายของดอกไม้
                </label>
                <input
                  type="text"
                  value={formData.meaning}
                  onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
                  placeholder="เช่น สื่อถึงความรักที่บริสุทธิ์และจริงใจ"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  รายละเอียดสั้น ๆ
                </label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="คำอธิบายสั้น ๆ สำหรับการ์ดสินค้า"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  URL รูปภาพ
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 text-white rounded-xl hover:bg-rose-700 transition-colors font-semibold"
                >
                  บันทึกสินค้า
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
