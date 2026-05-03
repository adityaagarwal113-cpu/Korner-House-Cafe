import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Check, Play, Package, User, Smartphone, Coffee } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface CafeDashboardProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

export default function CafeDashboard({ orders, onUpdateStatus }: CafeDashboardProps) {
  const activeOrders = orders.filter(o => o.status !== 'DONE');
  const completedOrders = orders.filter(o => o.status === 'DONE');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard label="Live Orders" value={activeOrders.length} color="bg-blue-600" trend="+2 since last hour" />
        <StatsCard label="Incoming" value={orders.filter(o => o.status === 'PROCESSING').length} color="bg-zinc-600" trend="New requests" />
        <StatsCard label="Kitchen" value={orders.filter(o => o.status === 'PREPARING').length} color="bg-orange-500" trend="In preparation" />
        <StatsCard label="Revenue Today" value={`₹${orders.reduce((acc, o) => acc + o.total, 0)}`} color="bg-[#1A1A1A]" trend="Stable" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Orders List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between bg-white px-6 py-4 rounded-3xl border border-[#E5E5E5] shadow-premium">
            <h3 className="text-lg font-black uppercase tracking-tighter flex items-center gap-2 italic">
              <Clock size={20} className="text-[#D97706]" /> Order Processing Queue
            </h3>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B7E74]">Real-time Sync</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {activeOrders.map((order) => (
                <motion.div
                  layout
                  key={order.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[2rem] p-6 shadow-premium border border-[#E5E5E5] space-y-5 group hover:border-[#D97706]/40 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm tracking-tighter text-[#1A1A1A]">#{order.id}</span>
                        <StatusBadge status={order.status} />
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#D97706] ml-2 px-2 py-0.5 bg-[#D97706]/5 rounded-sm">
                          {order.deliveryType}
                        </span>
                      </div>
                      <h4 className="font-black text-xl tracking-tight italic uppercase">{order.customerName}</h4>
                      <div className="flex items-center gap-3">
                        <p className="text-[10px] text-[#8B7E74] font-bold flex items-center gap-1 uppercase tracking-widest">
                          <User size={10} /> {order.phoneNumber}
                        </p>
                        <p className="text-[10px] text-[#8B7E74] font-bold flex items-center gap-1 uppercase tracking-widest">
                          <Smartphone size={10} /> {order.paymentMethod}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-black text-[#1A1A1A] tracking-tighter">₹{order.total}</p>
                  </div>

                  <div className="bg-[#F8F7F4] rounded-2xl p-4 space-y-2 border border-[#F2F1EF]">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs font-bold">
                        <span className="text-[#1A1A1A]/70">{item.quantity}x <span className="text-[#1A1A1A] uppercase italic">{item.name}</span></span>
                        <span className="text-[#8B7E74]">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                    {order.notes && (
                      <div className="mt-3 pt-3 border-t border-[#E5E5E5] text-[9px] text-[#D97706] font-black uppercase tracking-[0.15em] italic">
                        Note: {order.notes}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-2">
                    {order.status === 'PROCESSING' && (
                      <ActionButton onClick={() => onUpdateStatus(order.id, 'NEW')} icon={<Check size={16} />} label="Confirm Order" color="bg-[#1A1A1A]" />
                    )}
                    {order.status === 'NEW' && (
                      <ActionButton onClick={() => onUpdateStatus(order.id, 'PREPARING')} icon={<Play size={16} />} label="Start Preparing" color="bg-[#D97706]" />
                    )}
                    {order.status === 'PREPARING' && (
                      <ActionButton onClick={() => onUpdateStatus(order.id, 'READY')} icon={<Package size={16} />} label="Mark for Pickup" color="bg-zinc-800" />
                    )}
                    {order.status === 'READY' && (
                      <ActionButton onClick={() => onUpdateStatus(order.id, 'DONE')} icon={<Check size={16} />} label="Complete & Done" color="bg-green-600" />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {activeOrders.length === 0 && (
              <div className="col-span-full py-24 text-center space-y-4 bg-white rounded-[3rem] border border-dashed border-[#E5E5E5]">
                 <div className="w-16 h-16 bg-[#F8F7F4] rounded-full flex items-center justify-center mx-auto text-[#8B7E74]">
                    <Coffee size={32} />
                 </div>
                 <div>
                  <h4 className="font-black text-lg uppercase italic tracking-tighter">Quiet Session</h4>
                  <p className="text-xs font-bold text-[#8B7E74] uppercase tracking-widest">No active orders in the queue</p>
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* History Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#1A1A1A] rounded-[2.5rem] p-8 text-white space-y-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl text-white" />
             
             <div className="space-y-1 relative z-10">
               <h3 className="text-xl font-black italic tracking-tighter uppercase">Recent History</h3>
               <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Last 5 Completed</p>
             </div>

             <div className="space-y-4 relative z-10">
              {completedOrders.slice(0, 5).map((order) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={order.id} 
                  className="flex items-center gap-4 py-4 border-b border-white/10 last:border-0 group hover:bg-white/5 transition-colors -mx-4 px-4 rounded-xl cursor-default"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#D97706]/20 transition-colors">
                    <Check size={24} className="text-[#D97706]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-black text-sm truncate uppercase italic tracking-tight">{order.customerName}</h5>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Batch #{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm text-[#D97706] tracking-tighter">₹{order.total}</p>
                    <p className="text-[8px] font-bold text-white/20 uppercase">Success</p>
                  </div>
                </motion.div>
              ))}
              {completedOrders.length === 0 && (
                <div className="py-12 text-center space-y-2">
                  <p className="text-xs font-bold text-white/20 uppercase tracking-widest">History is empty</p>
                </div>
              )}
             </div>

             <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-colors relative z-10">
                View All History
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ label, value, color, trend }: { label: string, value: string | number, color: string, trend?: string }) {
  return (
    <div className="bg-white rounded-[2rem] p-7 border border-[#E5E5E5] shadow-premium hover:border-[#D97706]/30 transition-all group overflow-hidden relative">
      <div className={`absolute top-0 right-0 w-1 pt-[100%] ${color} opacity-0 group-hover:opacity-100 transition-opacity`} />
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B7E74] block mb-4">{label}</span>
      <div className="flex items-end justify-between">
        <span className="text-4xl font-serif font-black italic tracking-tighter">{value}</span>
        {trend && (
           <span className="text-[8px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-2 py-1 rounded-sm">
            {trend}
           </span>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const styles = {
    PROCESSING: 'bg-zinc-100 text-zinc-700 border-zinc-200',
    NEW: 'bg-blue-100 text-blue-700 border-blue-200',
    PREPARING: 'bg-orange-100 text-orange-700 border-orange-200',
    READY: 'bg-green-100 text-green-700 border-green-200',
    DONE: 'bg-gray-100 text-gray-700 border-gray-200',
  };
  return (
    <span className={`px-3 py-1 rounded-sm text-[9px] font-black uppercase tracking-[0.15em] border ${styles[status]}`}>
      {status === 'PROCESSING' ? 'Pending' : status}
    </span>
  );
}

function ActionButton({ onClick, icon, label, color }: { onClick: () => void, icon: React.ReactNode, label: string, color: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:brightness-110 active:scale-[0.98] ${color} shadow-xl shadow-black/10`}
    >
      {icon} {label}
    </button>
  );
}
