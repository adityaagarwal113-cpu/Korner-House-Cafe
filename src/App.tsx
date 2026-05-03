/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, ShoppingCart, User, ClipboardList, Settings, ChevronLeft, ChevronRight, LayoutDashboard, UtensilsCrossed } from 'lucide-react';
import { useStorage } from './hooks/useStorage';
import { MenuItem, Order, OrderItem } from './types';
import CustomerHome from './components/CustomerHome';
import Cart from './components/Cart';
import OrderStatus from './components/OrderStatus';
import CafeDashboard from './components/CafeDashboard';
import MenuManagement from './components/MenuManagement';
import CustomerList from './components/CustomerList';
import AdminSettings from './components/AdminSettings';

type ViewMode = 'CUSTOMER' | 'CAFE';
type CustomerView = 'HOME' | 'CART' | 'STATUS';
type CafeView = 'DASHBOARD' | 'MENU' | 'CUSTOMERS';

export default function App() {
  const { 
    menu, 
    orders, 
    customers, 
    categories,
    settings,
    addOrder, 
    updateOrderStatus, 
    addMenuItem, 
    removeMenuItem, 
    updateMenuItem,
    addCategory,
    removeCategory,
    setSettings
  } = useStorage();
  const [viewMode, setViewMode] = useState<ViewMode>('CUSTOMER');
  const [customerView, setCustomerView] = useState<CustomerView>('HOME');
  const [cafeView, setCafeView] = useState<CafeView | 'SETTINGS'>('DASHBOARD');
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [cart, setCart] = useState<OrderItem[]>([]);

  const addToCart = (item: MenuItem, withExtraCheese: boolean = false) => {
    setCart(prev => {
      const existing = prev.find(i => i.menuItemId === item.id && i.withExtraCheese === withExtraCheese);
      if (existing) {
        return prev.map(i => (i.menuItemId === item.id && i.withExtraCheese === withExtraCheese) ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { menuItemId: item.id, name: item.name, price: item.price, quantity: 1, withExtraCheese }];
    });
  };

  const removeFromCart = (itemId: string, withExtraCheese?: boolean) => {
    setCart(prev => prev.filter(i => !(i.menuItemId === itemId && i.withExtraCheese === withExtraCheese)));
  };

  const updateCartQuantity = (itemId: string, delta: number, withExtraCheese?: boolean) => {
    setCart(prev => prev.map(i => {
      if (i.menuItemId === itemId && i.withExtraCheese === withExtraCheese) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const placeOrder = (name: string, phone: string, deliveryType: any, paymentMethod: any, notes?: string) => {
    const CHEESE_PRICE = 30;
    const itemsTotal = cart.reduce((acc, i) => acc + (i.price + (i.withExtraCheese ? CHEESE_PRICE : 0)) * i.quantity, 0);
    const newOrder: Order = {
      id: Math.floor(100 + Math.random() * 900).toString(),
      customerName: name,
      phoneNumber: phone,
      items: cart,
      total: itemsTotal + (deliveryType === 'Delivery' ? 40 : 0),
      status: 'PROCESSING',
      createdAt: Date.now(),
      notes,
      deliveryType,
      paymentMethod
    };
    addOrder(newOrder);
    setActiveOrderId(newOrder.id);
    setCart([]);
    setCustomerView('STATUS');
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans selection:bg-[#E6D4C1]">
      {/* Floating Mode Toggle */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <button
          onClick={() => setViewMode(viewMode === 'CUSTOMER' ? 'CAFE' : 'CUSTOMER')}
          className="w-14 h-14 bg-[#1A1A1A] text-white rounded-2xl shadow-premium border border-white/10 flex items-center justify-center hover:bg-[#D97706] transition-all group active:scale-90"
          title={viewMode === 'CUSTOMER' ? 'Switch to Admin' : 'Switch to Customer'}
        >
          {viewMode === 'CUSTOMER' ? <Settings size={22} className="group-hover:rotate-90 transition-transform duration-500" /> : <User size={22} />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'CUSTOMER' ? (
          <motion.div
            key="customer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-24"
          >
            {/* Header */}
            <header className="px-6 pt-10 pb-6 flex justify-between items-center max-w-2xl mx-auto sticky top-0 z-40 bg-[#F8F7F4]/80 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="relative group cursor-pointer">
                  <div className="w-14 h-14 bg-[#1A1A1A] flex items-center justify-center rounded-2xl rotate-45 border-2 border-[#D97706]/30 group-hover:rotate-90 transition-transform duration-700">
                    <UtensilsCrossed size={28} className="-rotate-45 group-hover:-rotate-90 transition-transform duration-700 text-[#D97706]" />
                  </div>
                  <div className="absolute -inset-1 border border-[#D97706]/20 rounded-2xl rotate-45 pointer-events-none" />
                </div>
                <div>
                  <h1 className="text-3xl font-serif font-black text-[#1A1A1A] tracking-tighter uppercase leading-none italic">{settings.name.split(' ')[0]} <span className="text-[#D97706]">{settings.name.split(' ').slice(1).join(' ')}</span></h1>
                  <div className="flex items-center gap-2 mt-1 px-1">
                    <span className="w-8 h-[1px] bg-[#D97706]/30" />
                    <p className="text-[9px] font-black text-[#8B7E74] uppercase tracking-[0.4em]">{settings.tagline}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setCustomerView('CART')}
                  className="relative w-12 h-12 bg-white rounded-2xl shadow-premium border border-[#F2F1EF] flex items-center justify-center button-hover-effect"
                >
                  <ShoppingCart size={22} className="text-[#1A1A1A]" />
                  {cart.length > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-[#D97706] text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-black shadow-lg shadow-[#D97706]/20 border-2 border-[#F8F7F4]"
                    >
                      {cart.reduce((acc, i) => acc + i.quantity, 0)}
                    </motion.span>
                  )}
                </button>
              </div>
            </header>

            <main className="max-w-2xl mx-auto px-6 pb-32">
              {customerView === 'HOME' && (
                <>
                  <CustomerHome 
                    menu={menu} 
                    categories={categories} 
                    settings={settings}
                    cart={cart}
                    onAddToCart={addToCart} 
                    onUpdateQuantity={updateCartQuantity}
                  />
                  {cart.length > 0 && (
                    <motion.div 
                      initial={{ y: 100 }}
                      animate={{ y: 0 }}
                      className="fixed bottom-24 left-6 right-6 max-w-lg mx-auto z-50 bg-[#D97706] text-white p-4 rounded-2xl shadow-2xl flex justify-between items-center cursor-pointer hover:bg-[#B45309] transition-colors border border-white/20"
                      onClick={() => setCustomerView('CART')}
                    >
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-black">
                            {cart.reduce((acc, i) => acc + i.quantity, 0)}
                         </div>
                         <div>
                            <p className="text-xs font-black uppercase tracking-widest leading-none mb-1">View Cart</p>
                            <p className="text-[10px] font-bold opacity-80 leading-none">₹{cart.reduce((acc, i) => acc + (i.price + (i.withExtraCheese ? 30 : 0)) * i.quantity, 0)} • PLUS TAXES</p>
                         </div>
                      </div>
                      <ChevronRight size={24} strokeWidth={3} />
                    </motion.div>
                  )}
                </>
              )}
              {customerView === 'CART' && (
                <Cart 
                  items={cart} 
                  onBack={() => setCustomerView('HOME')} 
                  onPlaceOrder={placeOrder}
                  onUpdateQty={updateCartQuantity}
                  onRemove={removeFromCart}
                />
              )}
              {customerView === 'STATUS' && activeOrderId && (
                <OrderStatus 
                  order={orders.find(o => o.id === activeOrderId) || orders[0]} 
                  onNewOrder={() => {
                    setActiveOrderId(null);
                    setCustomerView('HOME');
                  }}
                />
              )}
            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-[#E5E5E5] px-8 py-4 flex justify-around items-center max-w-2xl mx-auto rounded-t-3xl shadow-2xl">
              <button 
                onClick={() => setCustomerView('HOME')}
                className={`flex flex-col items-center gap-1 ${customerView === 'HOME' ? 'text-[#D97706]' : 'text-[#8B7E74]'}`}
              >
                <Coffee size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Menu</span>
              </button>
              <button 
                onClick={() => setCustomerView('CART')}
                className={`flex flex-col items-center gap-1 ${customerView === 'CART' ? 'text-[#D97706]' : 'text-[#8B7E74]'}`}
              >
                <ShoppingCart size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Cart</span>
              </button>
              <button 
                onClick={() => {
                  const lastOrder = orders[0];
                  if (lastOrder) {
                    setActiveOrderId(lastOrder.id);
                    setCustomerView('STATUS');
                  }
                }}
                className={`flex flex-col items-center gap-1 ${customerView === 'STATUS' ? 'text-[#D97706]' : 'text-[#8B7E74]'}`}
              >
                <ClipboardList size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Orders</span>
              </button>
            </nav>
          </motion.div>
        ) : (
          <motion.div
            key="cafe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-screen bg-[#F8F7F4]"
          >
            {/* Sidebar Desktop */}
            <aside className="w-64 bg-[#1A1A1A] text-white p-6 flex flex-col hidden md:flex">
              <div className="mb-12 flex flex-col items-start gap-1">
                <div className="flex items-center gap-3 mb-2">
                  <UtensilsCrossed size={28} className="text-[#D97706]" />
                  <h2 className="text-xl font-serif font-black uppercase tracking-tighter">Korner <span className="text-[#D97706]">House</span></h2>
                </div>
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest px-1">Admin Panel</span>
              </div>
              <nav className="flex-1 space-y-2">
                <AdminNavItem 
                  active={cafeView === 'DASHBOARD'} 
                  onClick={() => setCafeView('DASHBOARD')}
                  icon={<LayoutDashboard size={20} />}
                  label="Dashboard"
                />
                <AdminNavItem 
                  active={cafeView === 'MENU'} 
                  onClick={() => setCafeView('MENU')}
                  icon={<Coffee size={20} />}
                  label="Menu Manager"
                />
                <AdminNavItem 
                  active={cafeView === 'CUSTOMERS'} 
                  onClick={() => setCafeView('CUSTOMERS')}
                  icon={<User size={20} />}
                  label="Customers"
                />
                <AdminNavItem 
                  active={cafeView === 'SETTINGS'} 
                  onClick={() => setCafeView('SETTINGS')}
                  icon={<Settings size={20} />}
                  label="Site Settings"
                />
              </nav>
                <div className="flex items-center gap-4 py-2 border-y border-white/10 opacity-50 text-[10px] font-bold uppercase tracking-widest text-center px-4">
                  © {settings.name}
                </div>
              </aside>

            {/* Main Content Area */}
            <div className="flex-1 overflow-auto">
              <header className="bg-white border-b border-[#E5E5E5] px-8 py-6 flex justify-between items-center sticky top-0 z-10">
                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">
                  {cafeView === 'DASHBOARD' && 'Today Orders'}
                  {cafeView === 'MENU' && 'Menu Management'}
                  {cafeView === 'CUSTOMERS' && 'Customer Database'}
                  {cafeView === 'SETTINGS' && 'Site Settings'}
                </h2>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-bold">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                    <p className="text-xs text-[#8B7E74]">Admin Session Active</p>
                  </div>
                </div>
              </header>

              <main className="p-8">
                <AnimatePresence mode="wait">
                  {cafeView === 'DASHBOARD' && (
                    <CafeDashboard 
                      orders={orders} 
                      onUpdateStatus={updateOrderStatus} 
                    />
                  )}
                  {cafeView === 'MENU' && (
                    <MenuManagement 
                      menu={menu} 
                      categories={categories}
                      onAdd={addMenuItem} 
                      onRemove={removeMenuItem}
                      onUpdate={updateMenuItem}
                      onAddCategory={addCategory}
                      onRemoveCategory={removeCategory}
                    />
                  )}
                  {cafeView === 'CUSTOMERS' && (
                    <CustomerList 
                      customers={customers} 
                    />
                  )}
                  {cafeView === 'SETTINGS' && (
                    <AdminSettings 
                      settings={settings}
                      onUpdate={setSettings}
                    />
                  )}
                </AnimatePresence>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AdminNavItem({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active ? 'bg-[#D97706] text-white shadow-lg' : 'text-white/60 hover:bg-white/5 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}
