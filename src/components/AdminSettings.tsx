import React from 'react';
import { motion } from 'motion/react';
import { Save, Globe, Palette, MapPin, Tag } from 'lucide-react';

interface AdminSettingsProps {
  settings: any;
  onUpdate: (settings: any) => void;
}

export default function AdminSettings({ settings, onUpdate }: AdminSettingsProps) {
  const [localSettings, setLocalSettings] = React.useState(settings);

  const handleSave = () => {
    onUpdate(localSettings);
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Branding */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-[#E5E5E5] space-y-6">
          <h3 className="text-xl font-black italic uppercase tracking-tight flex items-center gap-3">
             <Globe className="text-[#D97706]" size={22} /> Global Branding
          </h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B7E74]">Restaurant Name</label>
              <input 
                type="text" 
                value={localSettings.name}
                onChange={(e) => setLocalSettings({ ...localSettings, name: e.target.value })}
                className="w-full bg-[#F8F7F4] p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#D97706] text-sm font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B7E74]">Tagline</label>
              <input 
                type="text" 
                value={localSettings.tagline}
                onChange={(e) => setLocalSettings({ ...localSettings, tagline: e.target.value })}
                className="w-full bg-[#F8F7F4] p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#D97706] text-sm"
              />
            </div>
          </div>
        </div>

        {/* Location & Meta */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-[#E5E5E5] space-y-6">
          <h3 className="text-xl font-black italic uppercase tracking-tight flex items-center gap-3">
             <MapPin className="text-[#D97706]" size={22} /> Location & Info
          </h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B7E74]">Display Address</label>
              <input 
                type="text" 
                value={localSettings.address}
                onChange={(e) => setLocalSettings({ ...localSettings, address: e.target.value })}
                className="w-full bg-[#F8F7F4] p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#D97706] text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B7E74]">Quick Description</label>
              <input 
                type="text" 
                value={localSettings.description}
                onChange={(e) => setLocalSettings({ ...localSettings, description: e.target.value })}
                className="w-full bg-[#F8F7F4] p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#D97706] text-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* Visuals */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-[#E5E5E5] space-y-6">
          <h3 className="text-xl font-black italic uppercase tracking-tight flex items-center gap-3">
             <Palette className="text-[#D97706]" size={22} /> Theme & Colors
          </h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B7E74]">Primary Brand Color</label>
              <div className="flex gap-4 items-center">
                <input 
                  type="color" 
                  value={localSettings.themeColor}
                  onChange={(e) => setLocalSettings({ ...localSettings, themeColor: e.target.value })}
                  className="w-12 h-12 rounded-xl overflow-hidden cursor-pointer border-0 p-0"
                />
                <code className="text-xs font-black uppercase">{localSettings.themeColor}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col justify-end">
           <button 
            onClick={handleSave}
            className="w-full py-6 bg-[#1A1A1A] text-white rounded-[2rem] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#D97706] transition-all shadow-xl shadow-black/10 active:scale-95"
           >
             <Save size={20} /> Deploy Changes
           </button>
        </div>
      </div>
    </div>
  );
}
