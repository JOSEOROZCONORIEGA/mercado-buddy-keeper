
export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  sku: string;
  stock: number;
  categoryId: string;
  status: 'active' | 'paused' | 'under_review';
  permalink: string;
  description: string;
  sold: number;
  views: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  buyer: {
    name: string;
    id: string;
  };
  items: Array<{
    id: string;
    product_id: string;
    title: string;
    quantity: number;
    unit_price: number;
    image: string;
  }>;
  shipping: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    type: 'standard' | 'express';
  };
}

export interface SalesData {
  date: string;
  sales: number;
  revenue: number;
}

export interface Stats {
  totalSales: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  conversionRate: number;
  visitCount: number;
}

export interface RegionData {
  region: string;
  sales: number;
  percentage: number;
}
