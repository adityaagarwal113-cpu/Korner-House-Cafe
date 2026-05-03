export type Category = 'Coffee' | 'Snacks' | 'Desserts' | 'Beverages';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  image: string;
  rating?: number;
  reviews?: number;
}

export type OrderStatus = 'PROCESSING' | 'NEW' | 'PREPARING' | 'READY' | 'DONE';
export type DeliveryType = 'Takeaway' | 'Delivery';
export type PaymentMethod = 'UPI' | 'PhonePe' | 'GPay' | 'Paytm' | 'Cash';

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: number;
  notes?: string;
  deliveryType: DeliveryType;
  paymentMethod: PaymentMethod;
}

export interface Customer {
  id: string;
  name: string;
  phoneNumber: string;
  orderCount: number;
}
