import { MenuItem } from './types';

export const INITIAL_MENU: MenuItem[] = [
  {
    id: '1',
    name: 'Special Classic Burger',
    price: 189,
    category: 'Snacks',
    description: 'Korner House Special - Ultimate jumbo patty with secret sauce, fresh veggies, and molten cheese.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: 1200,
    allowExtraCheese: true
  },
  {
    id: '2',
    name: 'Garlic Bread',
    price: 99,
    category: 'Snacks',
    description: 'Crispy toasted baguette slices brushed with aromatic herb butter and garlic.',
    image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    reviews: 850
  },
  {
    id: '3',
    name: 'Mango Moose Jar Cake',
    price: 149,
    category: 'Desserts',
    description: 'Triple-layered mango mousse with fresh chunks in a signature souvenir jar.',
    image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviews: 640
  },
  {
    id: '4',
    name: 'Signature Cold Chocolate',
    price: 159,
    category: 'Coffee',
    description: 'Our legendary thick dark chocolate blend topped with premium cocoa drizzle.',
    image: 'https://images.unsplash.com/photo-1544145945-f904253db0ad?q=80&w=800&auto=format&fit=crop',
    rating: 5.0,
    reviews: 2100
  },
  {
    id: '5',
    name: 'Hazelnut Latte',
    price: 179,
    category: 'Coffee',
    description: 'Creamy espresso with toasted hazelnut notes and silky microfoam.',
    image: 'https://images.unsplash.com/photo-1541167760496-162955ed8521?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    reviews: 980
  },
  {
    id: '6',
    name: 'Peri Peri Fries',
    price: 119,
    category: 'Snacks',
    description: 'Crispy golden fries tossed in our signature extra-hot peri peri seasoning.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviews: 2100,
    allowExtraCheese: true
  },
  {
    id: '7',
    name: 'Blueberry Cheesecake',
    price: 199,
    category: 'Desserts',
    description: 'Authentic New York style cheesecake topped with hand-picked blueberry compote.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: 450
  },
  {
    id: '8',
    name: 'Virgin Mojito',
    price: 129,
    category: 'Beverages',
    description: 'Refreshing muddled mint and lime juice with a splash of soda and ice.',
    image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=800&auto=format&fit=crop',
    rating: 4.5,
    reviews: 320
  },
  {
    id: '9',
    name: 'Masala Sandwich',
    price: 139,
    category: 'Snacks',
    description: 'Classic Mumbai-style toasted sandwich filled with spiced potato and green chutney.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    reviews: 560,
    allowExtraCheese: true
  },
  {
    id: '10',
    name: 'Iced Americano',
    price: 110,
    category: 'Coffee',
    description: 'Two shots of our signature espresso poured over ice for a bold, clean finish.',
    image: 'https://images.unsplash.com/photo-1517701550731-33230ed8bc02?q=80&w=800&auto=format&fit=crop',
    rating: 4.4,
    reviews: 280
  },
  {
    id: '11',
    name: 'Paneer Wrap',
    price: 169,
    category: 'Snacks',
    description: 'Soft tortilla wrap loaded with marinated paneer, crunchy veggies, and mint mayo.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviews: 740
  },
  {
    id: '12',
    name: 'Chocolate Truffle Cake',
    price: 159,
    category: 'Desserts',
    description: 'Rich, dense Ganache chocolate cake for the ultimate chocolate lover.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: 890
  },
  {
    id: '13',
    name: 'Affogato',
    price: 145,
    category: 'Coffee',
    description: 'A scoop of premium vanilla bean ice cream "drowned" in a hot shot of espresso.',
    image: 'https://images.unsplash.com/photo-1594631252845-59fc49c0ae0f?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviews: 150
  },
  {
    id: '14',
    name: 'Veg Spring Rolls',
    price: 129,
    category: 'Snacks',
    description: 'Hand-rolled crispy thin sheets packed with sautéed oriental vegetables.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265da4?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    reviews: 420
  },
  {
    id: '15',
    name: 'KitKat Shake',
    price: 179,
    category: 'Beverages',
    description: 'Thick creamy milkshake blended with crunchy KitKat bars and topped with whipped cream.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: 1300
  }
];

export const CATEGORIES = ['Coffee', 'Snacks', 'Desserts', 'Beverages'] as const;
