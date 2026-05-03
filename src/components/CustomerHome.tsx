import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Plus, Star, Clock, MapPin, Banknote } from 'lucide-react';
import { MenuItem, Category } from '../types';
import { CATEGORIES } from '../constants';

interface CustomerHomeProps {
  menu: MenuItem[];
  categories: string[];
  settings: any;
  onAddToCart: (item: MenuItem) => void;
}

export default function CustomerHome({ menu, categories, settings, onAddToCart }: CustomerHomeProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMenu = menu.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Restaurant Header */}
      <section className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-[#1A1A1A] tracking-tighter uppercase italic">{settings.name}</h2>
            <p className="text-xs font-bold text-[#8B7E74] uppercase tracking-wider">{settings.tagline} • {settings.description}</p>
            <p className="text-[10px] text-[#8B7E74] flex items-center gap-1 font-bold">
              <MapPin size={10} className="text-[#D97706]" /> {settings.address}
            </p>
          </div>
          <div className="bg-white p-2 rounded-2xl shadow-premium border border-[#F2F1EF] text-center min-w-[60px]">
            <div className="flex items-center justify-center gap-1 text-[#059669] font-black italic text-lg">
              4.4 <Star size={14} className="fill-[#059669]" />
            </div>
            <div className="h-px bg-[#F2F1EF] my-1" />
            <p className="text-[8px] font-black text-[#8B7E74] uppercase tracking-tighter">10K+ Ratings</p>
          </div>
        </div>

        <div className="flex items-center gap-4 py-2 border-y border-[#F2F1EF]">
           <div className="flex items-center gap-2">
              <Clock size={14} className="text-[#8B7E74]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]">25-30 mins</span>
           </div>
           <div className="w-1 h-1 rounded-full bg-[#E5E5E5]" />
           <div className="flex items-center gap-2">
              <Banknote size={14} className="text-[#8B7E74]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]">₹400 for two</span>
           </div>
        </div>
      </section>

      {/* Search Bar - Zomato Style */}
      <section className="sticky top-[88px] z-30 py-1 bg-[#F8F7F4]/80 backdrop-blur-md">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D97706]" size={18} strokeWidth={3} />
          <input
            type="text"
            placeholder="Search within the menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#E5E5E5] rounded-2xl py-3.5 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-[#D97706] transition-all outline-none text-sm font-medium"
          />
        </div>
      </section>

      {/* Offer Banner */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-[#1A1A1A] p-8 text-white flex flex-col justify-center border border-white/10 shadow-2xl">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#D97706] text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-[0.2em] animate-pulse">Flash Deal</span>
          </div>
          <h3 className="text-4xl font-black italic tracking-tighter uppercase leading-none">Flat 50% <br/><span className="text-[#D97706]">OFF</span></h3>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">On your first order today</p>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1594179047519-f347310d3322?q=80&w=800&auto=format&fit=crop" 
          alt="Banner" 
          className="absolute right-0 top-0 h-full w-[55%] object-cover opacity-80 mask-gradient"
        />
      </section>

      {/* Categories */}
      <section className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2 sticky top-[156px] z-30 bg-[#F8F7F4]/80 backdrop-blur-md py-2">
        <CategoryTab 
          label="All Menu" 
          active={activeCategory === 'All'} 
          onClick={() => setActiveCategory('All')} 
        />
        {categories.map(cat => (
          <CategoryTab 
            key={cat} 
            label={cat} 
            active={activeCategory === cat} 
            onClick={() => setActiveCategory(cat)} 
          />
        ))}
      </section>

      {/* Menu Grid */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#1A1A1A]">Recommended Items</h3>
          <div className="flex-1 h-px bg-[#F2F1EF]" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
          {filteredMenu.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 items-center group cursor-pointer"
            >
              <div className="flex-1 space-y-2">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border border-orange-600 p-[2px] flex items-center justify-center">
                       <div className="w-full h-full bg-orange-600 rounded-full" />
                    </div>
                    {item.rating! > 4.7 && (
                      <span className="text-[8px] font-black uppercase tracking-widest text-white bg-[#D97706] px-1.5 py-0.5 rounded-sm">Bestseller</span>
                    )}
                 </div>
                 <h4 className="font-black text-lg tracking-tight uppercase italic group-hover:text-[#D97706] transition-colors">{item.name}</h4>
                 <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-[#1A1A1A]">₹{item.price}</span>
                    <div className="flex items-center text-xs text-[#059669] font-bold">
                       <Star size={10} className="fill-[#059669]" /> {item.rating}
                    </div>
                 </div>
                 <p className="text-xs text-[#8B7E74] font-medium leading-relaxed line-clamp-2 max-w-sm">
                  {item.description}
                 </p>
              </div>
              
              <div className="relative w-32 h-32 rounded-3xl overflow-hidden shadow-premium flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-1 left-1 right-1">
                   <button 
                    onClick={(e) => { e.stopPropagation(); onAddToCart(item); }}
                    className="w-full py-2 bg-white text-[#D97706] text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg border border-[#F2F1EF] hover:bg-[#D97706] hover:text-white transition-all transform active:scale-95"
                   >
                     Add +
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CategoryTab({ label, active, onClick }: { label: string, active: boolean, onClick: () => void, key?: any }) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap shadow-premium border ${
        active 
          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] scale-105 shadow-xl shadow-black/10' 
          : 'bg-white text-[#8B7E74] border-[#F2F1EF] hover:bg-[#F2F1EF] hover:text-[#1A1A1A]'
      }`}
    >
      {label}
    </button>
  );
}
