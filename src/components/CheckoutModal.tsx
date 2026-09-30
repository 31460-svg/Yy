import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PaymentMethod, Order } from '../types';
import {
  X,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Copy,
  Check
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { cart, cartSubtotal, shippingFee, cartTotal, currentUser, placeOrder } = useShop();

  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qr');
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);
  const [copiedBank, setCopiedBank] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText('012-3-45678-9');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('กรุณากรอกชื่อลูกค้า');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('กรุณากรอกเบอร์โทรศัพท์ที่ติดต่อได้');
      return;
    }
    if (!address.trim()) {
      setErrorMsg('กรุณากรอกที่อยู่จัดส่ง');
      return;
    }

    setErrorMsg('');
    const newOrder = placeOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      note: note.trim() || undefined,
      paymentMethod
    });

    setSubmittedOrder(newOrder);
    onSuccess(newOrder);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
              {submittedOrder ? 'ยืนยันคำสั่งซื้อสำเร็จ' : 'ดำเนินการสั่งซื้อสินค้า'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {submittedOrder
                ? `เลขที่คำสั่งซื้อ: #${submittedOrder.orderNumber}`
                : 'กรุณากรอกข้อมูลจัดส่งและเลือกวิธีการชำระเงิน'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Form vs Success Receipt */}
        {!submittedOrder ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {errorMsg && (
              <div className="p-3 bg-rose-50 text-rose-800 border border-rose-200 rounded-xl text-xs font-medium">
                {errorMsg}
              </div>
            )}

            {/* 1. Customer Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                1. ข้อมูลผู้รับและที่อยู่จัดส่ง
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    ชื่อ-นามสกุลลูกค้า <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น คุณสมชาย สุขเกษม"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-rose-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    เบอร์โทรศัพท์ <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="เช่น 081-234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-rose-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  ที่อยู่จัดส่งโดยละเอียด <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="บ้านเลขที่, ซอย, ถนน, แขวง/ตำบล, เขต/อำเภอ, จังหวัด, รหัสไปรษณีย์"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-rose-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  ข้อความแนบการ์ดอวยพร / รายละเอียดเพิ่มเติม (ถ้ามี)
                </label>
                <input
                  type="text"
                  placeholder="เช่น ข้อความบนการ์ด: 'สุขสันต์วันเกิด ขอให้มีความสุขมาก ๆ นะคะ'"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-rose-500 focus:bg-white"
                />
              </div>
            </div>

            {/* 2. Payment Method Selector */}
            <div className="space-y-3 pt-2 border-t border-stone-200/80">
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                2. เลือกวิธีการชำระเงิน
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* QR Code PromptPay */}
                <label
                  className={`flex flex-col p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'qr'
                      ? 'border-rose-500 bg-rose-50/50 shadow-xs ring-1 ring-rose-500'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="qr"
                    checked={paymentMethod === 'qr'}
                    onChange={() => setPaymentMethod('qr')}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-2 mb-2">
                    <QrCode className="w-5 h-5 text-rose-700" />
                    <span className="text-xs font-bold text-stone-900">QR Code พร้อมเพย์</span>
                  </div>
                  <span className="text-[11px] text-stone-500 leading-tight">
                    สแกนจ่ายผ่านแอปธนาคารทุกแห่ง
                  </span>
                </label>

                {/* Bank Transfer */}
                <label
                  className={`flex flex-col p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'transfer'
                      ? 'border-rose-500 bg-rose-50/50 shadow-xs ring-1 ring-rose-500'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="transfer"
                    checked={paymentMethod === 'transfer'}
                    onChange={() => setPaymentMethod('transfer')}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-5 h-5 text-rose-700" />
                    <span className="text-xs font-bold text-stone-900">โอนเงินธนาคาร</span>
                  </div>
                  <span className="text-[11px] text-stone-500 leading-tight">
                    โอนเข้าบัญชีร้านค้าโดยตรง
                  </span>
                </label>

                {/* Cash on Delivery (COD) */}
                <label
                  className={`flex flex-col p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-rose-500 bg-rose-50/50 shadow-xs ring-1 ring-rose-500'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-2 mb-2">
                    <Banknote className="w-5 h-5 text-rose-700" />
                    <span className="text-xs font-bold text-stone-900">เงินสดปลายทาง</span>
                  </div>
                  <span className="text-[11px] text-stone-500 leading-tight">
                    ชำระเงินเมื่อได้รับดอกไม้
                  </span>
                </label>

              </div>

              {/* Payment preview info */}
              {paymentMethod === 'qr' && (
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                  <div className="text-xs text-stone-600">
                    <p className="font-semibold text-stone-900">พร้อมเพย์: 081-234-5678</p>
                    <p className="text-[11px] text-stone-500">ชื่อบัญชี: บจก. ฟลาวเวอร์ ช็อป ไทยแลนด์</p>
                  </div>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                    ฟรีค่าธรรมเนียม
                  </span>
                </div>
              )}

              {paymentMethod === 'transfer' && (
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-stone-900">ธนาคารกสิกรไทย · 012-3-45678-9</p>
                    <p className="text-[11px] text-stone-500">ชื่อบัญชี: Flower Shop Official</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAccount}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 text-[11px] text-stone-700"
                  >
                    {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBank ? 'คัดลอกแล้ว' : 'คัดลอกเลขบัญชี'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Order Summary Before Confirmation */}
            <div className="space-y-3 pt-2 border-t border-stone-200/80">
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                3. สรุปรายการสินค้าและยอดรวม
              </h3>

              <div className="max-h-40 overflow-y-auto divide-y divide-stone-100 bg-stone-50 rounded-xl p-3 border border-stone-200">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="py-1.5 flex justify-between items-center text-xs">
                    <span className="text-stone-700">
                      {product.name} <span className="text-stone-400">× {quantity}</span>
                    </span>
                    <span className="font-semibold text-stone-900 tabular-nums">
                      ฿{(product.price * quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1 text-xs text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>ยอดรวมสินค้า</span>
                  <span className="font-medium text-stone-900 tabular-nums">
                    ฿{cartSubtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>ค่าจัดส่ง</span>
                  <span className="font-medium tabular-nums">
                    {shippingFee === 0 ? <span className="text-emerald-700">ฟรี (สั่งซื้อเกิน ฿500)</span> : `฿${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>ยอดที่ต้องชำระทั้งหมด</span>
                  <span className="text-rose-800 text-lg tabular-nums">
                    ฿{cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-stone-900 hover:bg-rose-700 text-white rounded-full font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>ยืนยันการสั่งซื้อสินค้า (฿{cartTotal.toLocaleString()})</span>
              </button>
            </div>

          </form>
        ) : (
          /* Success Receipt View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-stone-900">
                ร้านค้าได้รับคำสั่งซื้อของคุณแล้ว!
              </h3>
              <p className="text-sm text-stone-600 mt-1 max-w-md mx-auto">
                ขอบคุณที่ไว้วางใจ Flower Shop เรากำลังเตรียมจัดดอกไม้สดที่สวยงามที่สุดเพื่อส่งถึงมือคุณ
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 text-left space-y-3 max-w-md mx-auto text-xs">
              <div className="flex justify-between pb-2 border-b border-stone-200">
                <span className="text-stone-500">หมายเลขคำสั่งซื้อ</span>
                <span className="font-bold text-stone-900">{submittedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">ผู้สั่งซื้อ</span>
                <span className="font-semibold text-stone-900">{submittedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">เบอร์โทรศัพท์</span>
                <span className="font-semibold text-stone-900">{submittedOrder.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">วิธีชำระเงิน</span>
                <span className="font-semibold text-stone-900">
                  {submittedOrder.paymentMethod === 'cod'
                    ? 'เงินสดปลายทาง (COD)'
                    : submittedOrder.paymentMethod === 'qr'
                    ? 'QR Code พร้อมเพย์'
                    : 'โอนเงินผ่านธนาคาร'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-bold">
                <span>ยอดชำระสุทธิ</span>
                <span className="text-rose-700 tabular-nums">฿{submittedOrder.totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-7 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-full text-xs font-semibold transition-colors cursor-pointer"
              >
                เรียบร้อย / ปิดหน้าต่าง
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
