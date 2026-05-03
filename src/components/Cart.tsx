import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Minus, Plus, Trash2, ArrowRight, CreditCard, Smartphone, Banknote, MapPin, ShoppingBag, Info, Percent, ChevronRight } from 'lucide-react';
import { OrderItem, DeliveryType, PaymentMethod } from '../types';

interface CartProps {
  items: OrderItem[];
  onBack: () => void;
  onPlaceOrder: (name: string, phone: string, deliveryType: DeliveryType, paymentMethod: PaymentMethod, notes?: string) => void;
  onUpdateQty: (itemId: string, delta: number) => void;
  onRemove: (itemId: string) => void;
}

export default function Cart({ items, onBack, onPlaceOrder, onUpdateQty, onRemove }: CartProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('Takeaway');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [step, setStep] = useState<'ITEMS' | 'CHECKOUT'>('ITEMS');

  const subtotal = items.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const deliveryFee = deliveryType === 'Delivery' ? 40 : 0;
  const platformFee = 5;
  const total = subtotal + tax + deliveryFee + platformFee;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="w-20 h-20 bg-[#F2F1EF] rounded-full flex items-center justify-center text-[#8B7E74]">
          <ShoppingBag size={32} />
        </div>
        <h3 className="text-xl font-bold">Your cart is empty</h3>
        <p className="text-[#8B7E74]">Add some delicious items to get started!</p>
        <button 
          onClick={onBack}
          className="px-8 py-3 bg-[#1A1A1A] text-white rounded-2xl font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-[#F2F1EF] rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold font-serif uppercase tracking-tighter">
          {step === 'ITEMS' ? 'My Cart' : 'Checkout'}
        </h2>
      </div>

      <div className="space-y-6">
        {step === 'ITEMS' ? (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <motion.div 
                  layout
                  key={item.menuItemId} 
                  className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-[#F2F1EF] shadow-sm"
                >
                  <div className="w-20 h-20 bg-[#F8F7F4] rounded-2xl flex-shrink-0 flex items-center justify-center font-serif font-black text-xl text-[#D97706]/20">
                    KH
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-bold text-sm tracking-tight">{item.name}</h4>
                    <p className="text-xs text-[#D97706] font-bold">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-[#F8F7F4] p-1 rounded-xl">
                    <button 
                      onClick={() => onUpdateQty(item.menuItemId, -1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors border border-transparent active:border-[#D97706]"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQty(item.menuItemId, 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors border border-transparent active:border-[#D97706]"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button 
                    onClick={() => onRemove(item.menuItemId)}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-3xl space-y-4 shadow-premium border border-[#F2F1EF]">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D97706] mb-2">Detailed Bill</h4>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#8B7E74]">Item Total</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-xs font-bold">
                <div className="flex items-center gap-1">
                  <span className="text-[#8B7E74]">GST and Restaurant Charges</span>
                  <Info size={10} className="text-[#8B7E74]" />
                </div>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#8B7E74]">Platform Fee</span>
                <span>₹5</span>
              </div>
              {deliveryType === 'Delivery' && (
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#8B7E74]">Delivery Partner Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
              )}
              <div className="h-px bg-[#F2F1EF]" />
              <div className="flex justify-between items-center bg-[#F8F7F4] -mx-6 px-6 py-4">
                <span className="font-black uppercase tracking-tighter italic">Total Pay</span>
                <span className="font-black text-xl text-[#059669]">₹{total}</span>
              </div>
            </div>

            <div className="bg-[#059669]/5 border border-dashed border-[#059669]/30 p-4 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-[#059669]/10 transition-colors">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#059669] rounded-xl flex items-center justify-center text-white">
                     <Percent size={14} strokeWidth={3} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-wider">Apply Coupon</p>
                     <p className="text-[8px] font-bold text-[#8B7E74]">Save more on this order</p>
                  </div>
               </div>
               <ChevronRight size={18} className="text-[#8B7E74] group-hover:translate-x-1 transition-transform" />
            </div>

            <button 
              onClick={() => setStep('CHECKOUT')}
              className="w-full py-5 bg-[#D97706] text-white rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl shadow-[#D97706]/30 flex items-center justify-center gap-3 active:scale-95 transition-all text-sm"
            >
              Confirm Checkout <ArrowRight size={20} />
            </button>
          </>
        ) : (
          <div className="space-y-6">
            {/* Delivery Type Toggle */}
            <div className="bg-white p-1 rounded-2xl flex gap-1 shadow-sm border border-[#F2F1EF]">
               <button 
                onClick={() => setDeliveryType('Takeaway')}
                className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${deliveryType === 'Takeaway' ? 'bg-[#1A1A1A] text-white shadow-lg' : 'text-[#8B7E74]'}`}
               >
                 Takeaway
               </button>
               <button 
                onClick={() => setDeliveryType('Delivery')}
                className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${deliveryType === 'Delivery' ? 'bg-[#1A1A1A] text-white shadow-lg' : 'text-[#8B7E74]'}`}
               >
                 Delivery
               </button>
            </div>

            <div className="bg-white p-6 rounded-3xl space-y-6 shadow-sm border border-[#F2F1EF]">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D97706]">Contact Information</h4>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full p-4 bg-[#F8F7F4] rounded-2xl border border-transparent focus:border-[#D97706] outline-none transition-all text-sm font-bold"
                  />
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full p-4 bg-[#F8F7F4] rounded-2xl border border-transparent focus:border-[#D97706] outline-none transition-all text-sm font-bold"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D97706]">Select Payment App</h4>
                <div className="grid grid-cols-2 gap-3">
                   <PaymentOption 
                    active={paymentMethod === 'GPay'} 
                    onClick={() => setPaymentMethod('GPay')} 
                    icon={<Smartphone size={18} />} 
                    label="Google Pay" 
                   />
                   <PaymentOption 
                    active={paymentMethod === 'PhonePe'} 
                    onClick={() => setPaymentMethod('PhonePe')} 
                    icon={<Smartphone size={18} />} 
                    label="PhonePe" 
                   />
                   <PaymentOption 
                    active={paymentMethod === 'Paytm'} 
                    onClick={() => setPaymentMethod('Paytm')} 
                    icon={<Smartphone size={18} />} 
                    label="Paytm" 
                   />
                   <PaymentOption 
                    active={paymentMethod === 'UPI'} 
                    onClick={() => setPaymentMethod('UPI')} 
                    icon={<Smartphone size={18} />} 
                    label="Any UPI" 
                   />
                   <PaymentOption 
                    active={paymentMethod === 'Cash'} 
                    onClick={() => setPaymentMethod('Cash')} 
                    icon={<Banknote size={18} />} 
                    label="Cash" 
                   />
                </div>
              </div>
              
              <div className="space-y-2">
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Order notes (Any allergies or preferences?)"
                  className="w-full p-4 bg-[#F8F7F4] rounded-2xl outline-none border border-transparent focus:border-[#D97706] transition-all min-h-[80px] text-sm"
                />
              </div>
            </div>

            <div className="bg-[#1A1A1A] p-6 rounded-3xl text-white space-y-3">
               <div className="flex justify-between items-center text-xs opacity-60">
                 <span>Subtotal</span>
                 <span>₹{subtotal}</span>
               </div>
               {deliveryType === 'Delivery' && (
                 <div className="flex justify-between items-center text-xs opacity-60">
                   <span>Delivery Fee</span>
                   <span>₹40</span>
                 </div>
               )}
               <div className="flex justify-between items-center pt-3 border-t border-white/10">
                 <span className="font-serif font-black uppercase tracking-tighter">Amount to Pay</span>
                 <span className="text-xl font-black text-[#D97706]">₹{total}</span>
               </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setStep('ITEMS')}
                className="w-16 h-16 flex items-center justify-center bg-white border border-[#E5E5E5] rounded-2xl text-[#1A1A1A]"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                disabled={!name || !phone}
                onClick={() => onPlaceOrder(name, phone, deliveryType, paymentMethod, notes)}
                className="flex-1 py-4 bg-[#D97706] text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-[#D97706]/30 active:scale-95 transition-all disabled:opacity-50"
              >
                Pay & Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PaymentOption({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${
        active 
          ? 'border-[#D97706] bg-[#D97706]/5 text-[#D97706]' 
          : 'border-[#F2F1EF] bg-[#F8F7F4] text-[#8B7E74] hover:border-[#E5E5E5]'
      }`}
    >
      {icon}
      <span className="text-xs font-black uppercase tracking-wider">{label}</span>
      {active && <div className="ml-auto w-2 h-2 rounded-full bg-[#D97706]" />}
    </button>
  );
}
