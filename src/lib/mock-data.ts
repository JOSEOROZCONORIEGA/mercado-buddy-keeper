
import { Order, Product, RegionData, SalesData, Stats } from "@/types";

export const mockProducts: Product[] = [
  {
    id: "MLB1234567",
    title: "Portátil HP Pavilion 15.6 pulgadas Intel Core i5",
    price: 12999.99,
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_601999-MLA52554140009_112022-F.webp",
    sku: "HP-PAV-15-I5",
    stock: 42,
    categoryId: "MLB1648",
    status: "active",
    permalink: "https://www.mercadolibre.com.mx/producto/MLB1234567",
    description: "Portátil HP Pavilion con procesador Intel Core i5, 8GB RAM, 512GB SSD",
    sold: 157,
    views: 2345
  },
  {
    id: "MLB2345678",
    title: "Smartphone Samsung Galaxy S21 128GB",
    price: 9999.00,
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_963862-MLA45566612445_042021-F.webp",
    sku: "SAM-S21-128",
    stock: 78,
    categoryId: "MLB1055",
    status: "active",
    permalink: "https://www.mercadolibre.com.mx/producto/MLB2345678",
    description: "Samsung Galaxy S21 con 128GB de almacenamiento, 8GB RAM, cámara de 64MP",
    sold: 234,
    views: 4532
  },
  {
    id: "MLB3456789",
    title: "Smart TV LG 55 pulgadas 4K UHD",
    price: 7999.00,
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_795236-MLA48049382752_102021-F.webp",
    sku: "LG-TV-55-4K",
    stock: 23,
    categoryId: "MLB1002",
    status: "active",
    permalink: "https://www.mercadolibre.com.mx/producto/MLB3456789",
    description: "Smart TV LG 55 pulgadas con resolución 4K UHD, WebOS, HDR",
    sold: 89,
    views: 1876
  },
  {
    id: "MLB4567890",
    title: "Consola Nintendo Switch OLED",
    price: 6999.00,
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_626995-MLA47920360320_102021-F.webp",
    sku: "NIN-SW-OLED",
    stock: 15,
    categoryId: "MLB1144",
    status: "active",
    permalink: "https://www.mercadolibre.com.mx/producto/MLB4567890",
    description: "Consola Nintendo Switch modelo OLED con Joy-Con blanco",
    sold: 67,
    views: 1543
  },
  {
    id: "MLB5678901",
    title: "Zapatillas Nike Air Max 270",
    price: 2599.00,
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_652413-MLA49633356312_042022-F.webp",
    sku: "NIKE-AM-270",
    stock: 95,
    categoryId: "MLB1276",
    status: "active",
    permalink: "https://www.mercadolibre.com.mx/producto/MLB5678901",
    description: "Zapatillas Nike Air Max 270 negras, talle 42",
    sold: 214,
    views: 3257
  },
  {
    id: "MLB6789012",
    title: "Heladera Samsung 382L No Frost",
    price: 15999.00,
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_758064-MLA40843147449_022020-F.webp",
    sku: "SAM-HEL-382",
    stock: 12,
    categoryId: "MLB5726",
    status: "active",
    permalink: "https://www.mercadolibre.com.mx/producto/MLB6789012",
    description: "Heladera Samsung 382 litros con tecnología No Frost, dispenser de agua",
    sold: 31,
    views: 876
  },
  {
    id: "MLB7890123",
    title: "Bicicleta Mountain Bike Rodado 29",
    price: 4999.00,
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_694532-MLA52346374518_112022-F.webp",
    sku: "BIKE-MTB-29",
    stock: 27,
    categoryId: "MLB1292",
    status: "active",
    permalink: "https://www.mercadolibre.com.mx/producto/MLB7890123",
    description: "Bicicleta Mountain Bike rodado 29, 21 velocidades, frenos a disco",
    sold: 56,
    views: 1432
  },
  {
    id: "MLB8901234",
    title: "Auriculares Sony WH-1000XM4",
    price: 5999.00,
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_641225-MLA44159857534_112020-F.webp",
    sku: "SONY-WH-1000XM4",
    stock: 38,
    categoryId: "MLB1051",
    status: "active",
    permalink: "https://www.mercadolibre.com.mx/producto/MLB8901234",
    description: "Auriculares inalámbricos Sony con cancelación de ruido activa",
    sold: 124,
    views: 2654
  },
  {
    id: "MLB9012345",
    title: "Robot Aspirador iRobot Roomba",
    price: 8999.00,
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_885555-MLA40458317438_012020-F.webp",
    sku: "ROOMBA-980",
    stock: 18,
    categoryId: "MLB1574",
    status: "active",
    permalink: "https://www.mercadolibre.com.mx/producto/MLB9012345",
    description: "Robot aspirador automático iRobot Roomba con mapeo inteligente",
    sold: 45,
    views: 1098
  },
  {
    id: "MLB0123456",
    title: "Cafetera Nespresso Essenza Mini",
    price: 2299.00,
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_638264-MLA44855393149_022021-F.webp",
    sku: "NESPRESSO-ESSENZA",
    stock: 56,
    categoryId: "MLB1535",
    status: "active",
    permalink: "https://www.mercadolibre.com.mx/producto/MLB0123456",
    description: "Cafetera Nespresso Essenza Mini con 19 bares de presión",
    sold: 87,
    views: 1765
  }
];

export const mockOrders: Order[] = [
  {
    id: "2000005883294392",
    date: "2023-08-15T10:23:54Z",
    status: "delivered",
    total: 12999.99,
    buyer: {
      name: "Carlos Mendez",
      id: "BUYER123456"
    },
    items: [
      {
        id: "ITEM1234",
        product_id: "MLB1234567",
        title: "Portátil HP Pavilion 15.6 pulgadas Intel Core i5",
        quantity: 1,
        unit_price: 12999.99,
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_601999-MLA52554140009_112022-F.webp"
      }
    ],
    shipping: {
      address: "Calle Principal 123",
      city: "Ciudad de México",
      state: "CDMX",
      zipCode: "01234",
      type: "standard"
    }
  },
  {
    id: "2000005883294393",
    date: "2023-08-16T15:45:12Z",
    status: "shipped",
    total: 9999.00,
    buyer: {
      name: "Ana García",
      id: "BUYER234567"
    },
    items: [
      {
        id: "ITEM2345",
        product_id: "MLB2345678",
        title: "Smartphone Samsung Galaxy S21 128GB",
        quantity: 1,
        unit_price: 9999.00,
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_963862-MLA45566612445_042021-F.webp"
      }
    ],
    shipping: {
      address: "Avenida Central 456",
      city: "Guadalajara",
      state: "Jalisco",
      zipCode: "44100",
      type: "express"
    }
  },
  {
    id: "2000005883294394",
    date: "2023-08-17T09:12:33Z",
    status: "paid",
    total: 7999.00,
    buyer: {
      name: "Roberto Torres",
      id: "BUYER345678"
    },
    items: [
      {
        id: "ITEM3456",
        product_id: "MLB3456789",
        title: "Smart TV LG 55 pulgadas 4K UHD",
        quantity: 1,
        unit_price: 7999.00,
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_795236-MLA48049382752_102021-F.webp"
      }
    ],
    shipping: {
      address: "Calle Norte 789",
      city: "Monterrey",
      state: "Nuevo León",
      zipCode: "64000",
      type: "standard"
    }
  },
  {
    id: "2000005883294395",
    date: "2023-08-18T14:23:45Z",
    status: "pending",
    total: 6999.00,
    buyer: {
      name: "Laura Ramírez",
      id: "BUYER456789"
    },
    items: [
      {
        id: "ITEM4567",
        product_id: "MLB4567890",
        title: "Consola Nintendo Switch OLED",
        quantity: 1,
        unit_price: 6999.00,
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_626995-MLA47920360320_102021-F.webp"
      }
    ],
    shipping: {
      address: "Avenida Sur 321",
      city: "Puebla",
      state: "Puebla",
      zipCode: "72000",
      type: "standard"
    }
  },
  {
    id: "2000005883294396",
    date: "2023-08-19T11:34:56Z",
    status: "delivered",
    total: 2599.00,
    buyer: {
      name: "Diego Flores",
      id: "BUYER567890"
    },
    items: [
      {
        id: "ITEM5678",
        product_id: "MLB5678901",
        title: "Zapatillas Nike Air Max 270",
        quantity: 1,
        unit_price: 2599.00,
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_652413-MLA49633356312_042022-F.webp"
      }
    ],
    shipping: {
      address: "Calle Este 654",
      city: "Querétaro",
      state: "Querétaro",
      zipCode: "76000",
      type: "express"
    }
  }
];

export const mockSalesData: SalesData[] = [
  { date: "2023-08-15", sales: 23, revenue: 54998.99 },
  { date: "2023-08-16", sales: 19, revenue: 45670.50 },
  { date: "2023-08-17", sales: 14, revenue: 32450.75 },
  { date: "2023-08-18", sales: 27, revenue: 59874.25 },
  { date: "2023-08-19", sales: 18, revenue: 38765.00 },
  { date: "2023-08-20", sales: 31, revenue: 73210.50 },
  { date: "2023-08-21", sales: 0, revenue: 0 }
];

export const mockStats: Stats = {
  totalSales: 132,
  totalOrders: 143,
  totalRevenue: 304969.99,
  pendingOrders: 15,
  conversionRate: 2.3,
  visitCount: 5782
};

export const mockRegionData: RegionData[] = [
  { region: "Ciudad de México", sales: 45, percentage: 34.1 },
  { region: "Jalisco", sales: 23, percentage: 17.4 },
  { region: "Nuevo León", sales: 19, percentage: 14.4 },
  { region: "Puebla", sales: 12, percentage: 9.1 },
  { region: "Querétaro", sales: 10, percentage: 7.6 },
  { region: "Otros", sales: 23, percentage: 17.4 }
];
