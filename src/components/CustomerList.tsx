import { User, Phone, ShoppingBag, Calendar } from 'lucide-react';
import { Customer } from '../types';

interface CustomerListProps {
  customers: Customer[];
}

export default function CustomerList({ customers }: CustomerListProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl border border-[#E5E5E5] overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#F8F7F4] border-b border-[#E5E5E5]">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#8B7E74]">Customer Info</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#8B7E74]">Contact</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#8B7E74]">Orders</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#8B7E74]">Loyalty Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F1EF]">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-[#FDFCFB] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E6D4C1] text-[#4A3428] rounded-full flex items-center justify-center font-bold">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{customer.name}</p>
                      <p className="text-[10px] text-[#8B7E74] flex items-center gap-1">
                        <Calendar size={10} /> Joined today
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs font-medium flex items-center gap-2">
                    <Phone size={14} className="text-[#D97706]" /> {customer.phoneNumber}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={14} className="text-[#8B7E74]" />
                    <span className="font-bold text-sm">{customer.orderCount}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    customer.orderCount >= 5 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {customer.orderCount >= 5 ? 'Gold Member' : 'New Client'}
                  </span>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center text-[#8B7E74] opacity-50">
                  No customers in the database yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
