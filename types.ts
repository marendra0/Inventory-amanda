
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  quantity: number;
  minStock: number;
  price: number;
  description: string;
  imageUrl?: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  productId: string;
  productName: string;
  type: 'IN' | 'OUT';
  quantity: number;
  date: string;
  user: string;
}

export interface DashboardStats {
  totalItems: number;
  lowStockItems: number;
  totalValue: number;
  recentTransactions: Transaction[];
}

export type View = 'dashboard' | 'inventory' | 'insights' | 'settings';
