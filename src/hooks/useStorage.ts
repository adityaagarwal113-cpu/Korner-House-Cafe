import { useState, useEffect } from 'react';
import { MenuItem, Order, Customer } from '../types';
import { INITIAL_MENU } from '../constants';

export function useStorage() {
  const [menu, setMenu] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('cafe_menu');
    const localMenu = saved ? JSON.parse(saved) : INITIAL_MENU;
    
    // Ensure all INITIAL_MENU items are present
    const existingIds = new Set(localMenu.map((m: MenuItem) => m.id));
    const missingItems = INITIAL_MENU.filter(item => !existingIds.has(item.id));
    
    return [...localMenu, ...missingItems];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('cafe_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('cafe_customers');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cafe_menu', JSON.stringify(menu));
  }, [menu]);

  useEffect(() => {
    localStorage.setItem('cafe_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('cafe_customers', JSON.stringify(customers));
  }, [customers]);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    
    // Update customer list
    setCustomers(prev => {
      const existing = prev.find(c => c.phoneNumber === order.phoneNumber);
      if (existing) {
        return prev.map(c => 
          c.phoneNumber === order.phoneNumber 
            ? { ...c, orderCount: c.orderCount + 1, name: order.customerName } 
            : c
        );
      } else {
        return [...prev, { 
          id: Date.now().toString(), 
          name: order.customerName, 
          phoneNumber: order.phoneNumber, 
          orderCount: 1 
        }];
      }
    });
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const addMenuItem = (item: MenuItem) => {
    setMenu(prev => [item, ...prev]);
  };

  const removeMenuItem = (id: string) => {
    setMenu(prev => prev.filter(m => m.id !== id));
  };

  const updateMenuItem = (item: MenuItem) => {
    setMenu(prev => prev.map(m => m.id === item.id ? item : m));
  };

  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('cafe_categories');
    const localCats = saved ? JSON.parse(saved) : ['Coffee', 'Snacks', 'Desserts', 'Beverages'];
    
    // Ensure 'Beverages' is included if not present
    if (!localCats.includes('Beverages')) {
      localCats.push('Beverages');
    }
    return localCats;
  });

  useEffect(() => {
    localStorage.setItem('cafe_categories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories(prev => [...prev, category]);
    }
  };

  const removeCategory = (category: string) => {
    setCategories(prev => prev.filter(c => c !== category));
  };

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('cafe_settings');
    return saved ? JSON.parse(saved) : {
      name: 'Korner House',
      tagline: 'Café & Snacks',
      description: 'Burgers • Snacks • Desserts • Beverages',
      address: 'Mall Road, Sector 5 • 2.5 km',
      themeColor: '#D97706'
    };
  });

  useEffect(() => {
    localStorage.setItem('cafe_settings', JSON.stringify(settings));
  }, [settings]);

  return { 
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
  };
}
