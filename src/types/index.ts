
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
  gtin?: string;
  manufacturing_time?: number;
  variations?: ProductVariation[];
}

export interface ProductVariation {
  id: string;
  attribute_combinations: Array<{
    id: string;
    name: string;
    value_id: string;
    value_name: string;
  }>;
  price: number;
  available_quantity: number;
  sold_quantity: number;
  picture_ids: string[];
  seller_custom_field?: string;
  catalog_product_id?: string;
  gtin?: string;
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

export interface MercadoLibreCredentials {
  client_id: string;
  client_secret: string;
  access_token: string;
  refresh_token: string;
  user_id: string;
}

