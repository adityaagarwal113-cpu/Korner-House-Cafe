import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, Package, Check, Coffee, BellRing, Phone, MapPin, ChevronRight, User, ShoppingBag, CreditCard, ReceiptText } from 'lucide-react';
import { Order } from '../types';

interface OrderStatusProps {
  order: Order;
  onNewOrder: () => void;
}

export default function OrderStatus({ order, onNewOrder }: OrderStatusProps) {
  if (!order) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-[#8B7E74] font-bold uppercase tracking-widest">Order not found</p>
        <button onClick={onNewOrder} className="px-6 py-2 bg-[#1A1A1A] text-white rounded-xl">Back to Menu</button>
      </div>
    );
  }

  const steps = [
    { id: 'PROCESSING', label: 'Order Processed', description: 'Your order is received and waiting for confirmation.', icon: <Clock size={20} /> },
    { id: 'NEW', label: 'Confirmed', description: 'Restaurant has accepted your order.', icon: <CheckCircle2 size={20} /> },
    { id: 'PREPARING', label: 'Preparing', description: 'Our chefs are working magic.', icon: <Coffee size={20} /> },
    { id: 'READY', label: 'Ready', description: 'Order is ready for pickup/delivery.', icon: <BellRing size={20} /> },
    { id: 'DONE', label: 'Completed', description: 'Enjoy your meal!', icon: <Check size={20} /> },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === order.status);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-lg mx-auto pb-24">
      {/* Header Status */}
      <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] text-white overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D97706]/20 rounded-full blur-3xl -mr-10 -mt-10" />
        <div className="space-y-4 relative z-10">
           <div className="flex justify-between items-center">
              <div className="px-3 py-1 bg-white/10 rounded-full border border-white/20 text-[10px] font-black uppercase tracking-widest leading-none">
                 Order ID #{order.id}
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black text-[#D97706] uppercase tracking-widest">
                 Live Status <div className="w-1.5 h-1.5 rounded-full bg-[#D97706] animate-pulse" />
              </div>
           </div>
           <div>
              <h2 className="text-3xl font-serif font-black italic tracking-tighter uppercase leading-none">
                {order.status === 'PROCESSING' ? 'Processing...' : 
                 order.status === 'NEW' ? 'Order Confirmed' : 
                 order.status === 'PREPARING' ? 'Cooking Your Meal' : 
                 order.status === 'READY' ? 'Order Ready' : 'Order Delivered'}
              </h2>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mt-2">Prepared with care at Korner House</p>
           </div>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="bg-white p-6 rounded-[2rem] shadow-premium border border-[#F2F1EF] space-y-6">
        <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#D97706] flex items-center gap-2">
          <Clock size={12} /> Live Milestones
        </h4>
        <div className="flex flex-col gap-6">
          {steps.map((step, index) => {
            const isActive = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div key={step.id} className="flex gap-4 relative">
                {index < steps.length - 1 && (
                  <div className={`absolute left-[17px] top-9 w-[2px] h-[calc(100%-12px)] transition-all duration-1000 ${index < currentStepIndex ? 'bg-[#059669]' : 'bg-[#F2F1EF]'}`} />
                )}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 z-10 transition-all duration-700 ${
                  isActive ? 'bg-[#1A1A1A] text-[#D97706] scale-105 shadow-md' : 'bg-[#F8F7F4] text-[#8B7E74]'
                } ${isCurrent ? 'ring-4 ring-[#D97706]/10' : ''}`}>
                  {isCurrent && index < 4 ? <div className="absolute inset-0 bg-[#D97706]/10 rounded-xl animate-ping" /> : null}
                  {step.icon}
                </div>
                <div className={`space-y-0.5 py-0.5 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                  <h4 className={`font-black text-[11px] uppercase tracking-wider ${isActive ? 'text-[#1A1A1A]' : 'text-[#8B7E74]'}`}>{step.label}</h4>
                  <p className="text-[9px] font-bold text-[#8B7E74] leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invoice Section */}
      <div className="bg-white rounded-[2rem] shadow-premium border border-[#F2F1EF] overflow-hidden">
        <div className="p-6 border-b border-[#F2F1EF] flex justify-between items-center">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D97706] flex items-center gap-2">
            <ReceiptText size={14} /> Order Invoice
          </h4>
          <span className="text-[10px] font-bold bg-[#F8F7F4] px-2 py-1 rounded-lg text-[#8B7E74]">{order.paymentMethod}</span>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs font-bold">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 flex items-center justify-center bg-[#F8F7F4] rounded text-[10px] text-[#D97706]">{item.quantity}x</span>
                    <span className="text-[#1A1A1A]">{item.name}</span>
                  </div>
                  <span className="text-[#8B7E74]">₹{(item.price + (item.withExtraCheese ? 30 : 0)) * item.quantity}</span>
                </div>
                {item.withExtraCheese && (
                  <p className="text-[8px] font-black uppercase text-[#D97706] tracking-[0.2em] ml-8">+ Extra Cheese</p>
                )}
              </div>
            ))}
          </div>

          <div className="h-px bg-[#F2F1EF] my-2" />

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-[#8B7E74]">
              <span>Item Subtotal</span>
              <span>₹{order.items.reduce((acc, i) => acc + (i.price + (i.withExtraCheese ? 30 : 0)) * i.quantity, 0)}</span>
            </div>
            <div className="flex justify-between text-[10px] font-bold text-[#8B7E74]">
              <span>GST & Platform Charges</span>
              <span>₹{Math.round(order.total * 0.08)}</span>
            </div>
            {order.deliveryType === 'Delivery' && (
              <div className="flex justify-between text-[10px] font-bold text-[#8B7E74]">
                <span>Delivery Fee</span>
                <span>₹40</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 mt-2">
              <span className="text-xs font-black uppercase tracking-tight italic">Total Amount Paid</span>
              <span className="text-lg font-black text-[#059669]">₹{order.total}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#F8F7F4] p-4 text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#8B7E74]">Thank you for ordering!</p>
        </div>
      </div>

      <div className="pt-2">
        <button 
          onClick={onNewOrder}
          className="w-full py-5 bg-[#1A1A1A] text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-[#D97706] transition-all shadow-xl active:scale-95"
        >
          Back to Menu <ChevronRight size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
