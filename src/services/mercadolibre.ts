
import { MercadoLibreCredentials, Product, ProductVariation } from "@/types";

// Set default credentials from the environment if available
const DEFAULT_CREDENTIALS: MercadoLibreCredentials = {
  client_id: "4093911268328479",
  client_secret: "l8Bs9PlTZ1UC1ntDm7Rqo5i8YyHR6xJz",
  access_token: "APP_USR-4093911268328479-031901-1568f861af1462cf4eb2fddb51aa7224-95918601",
  refresh_token: "TG-67da59d30e46fb0001c2a34d-95918601",
  user_id: "95918601"
};

export class MercadoLibreAPI {
  private baseUrl = "https://api.mercadolibre.com";
  private credentials: MercadoLibreCredentials;

  constructor(credentials: MercadoLibreCredentials = DEFAULT_CREDENTIALS) {
    this.credentials = credentials;
  }

  private async request<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: any
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers = {
      "Authorization": `Bearer ${this.credentials.access_token}`,
      "Content-Type": "application/json",
    };

    const options: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      return await response.json();
    } catch (error) {
      console.error("MercadoLibre API error:", error);
      throw error;
    }
  }

  async refreshToken(): Promise<void> {
    const url = `${this.baseUrl}/oauth/token`;
    const body = {
      grant_type: "refresh_token",
      client_id: this.credentials.client_id,
      client_secret: this.credentials.client_secret,
      refresh_token: this.credentials.refresh_token,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Refresh token error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    this.credentials.access_token = data.access_token;
    this.credentials.refresh_token = data.refresh_token;
    
    // In a real app, you would save these credentials to localStorage or a secure storage
    console.log("Tokens refreshed successfully");
  }

  async getUserItems(limit: number = 50, offset: number = 0): Promise<any> {
    return this.request(
      `/users/${this.credentials.user_id}/items/search?limit=${limit}&offset=${offset}`
    );
  }

  async getItemDetails(itemId: string, includeAttributes: boolean = true): Promise<any> {
    const attributesParam = includeAttributes ? "?include_attributes=all" : "";
    return this.request(`/items/${itemId}${attributesParam}`);
  }

  async updateItem(itemId: string, data: Partial<Product>): Promise<any> {
    return this.request(`/items/${itemId}`, "PUT", data);
  }

  async updateItemStock(itemId: string, stock: number): Promise<any> {
    return this.request(`/items/${itemId}`, "PUT", { available_quantity: stock });
  }

  async updateItemPrice(itemId: string, price: number): Promise<any> {
    return this.request(`/items/${itemId}`, "PUT", { price });
  }

  async updateItemStatus(itemId: string, status: "active" | "paused"): Promise<any> {
    return this.request(`/items/${itemId}`, "PUT", { status });
  }

  async updateItemGtin(itemId: string, gtin: string): Promise<any> {
    return this.request(`/items/${itemId}`, "PUT", { gtin });
  }

  async updateVariationGtin(itemId: string, variationId: string, gtin: string): Promise<any> {
    return this.request(
      `/items/${itemId}/variations/${variationId}`,
      "PUT",
      { gtin }
    );
  }

  async updateManufacturingTime(itemId: string, days: number): Promise<any> {
    // First check if manufacturing time is available for this item
    const itemDetails = await this.getItemDetails(itemId);
    
    // Create/update the manufacturing_time sale term
    const saleTerms = itemDetails.sale_terms || [];
    const manufacturingTimeIndex = saleTerms.findIndex(
      (term: any) => term.id === "MANUFACTURING_TIME"
    );
    
    if (manufacturingTimeIndex >= 0) {
      saleTerms[manufacturingTimeIndex].value_name = `${days} días`;
    } else {
      saleTerms.push({
        id: "MANUFACTURING_TIME",
        name: "Tiempo de fabricación",
        value_id: null,
        value_name: `${days} días`,
        value_struct: {
          number: days,
          unit: "días"
        }
      });
    }
    
    return this.request(`/items/${itemId}`, "PUT", { sale_terms: saleTerms });
  }

  async checkManufacturingTimeAvailability(categoryId: string): Promise<boolean> {
    try {
      const response = await this.request(`/categories/${categoryId}/sale_terms`);
      return response.some((term: any) => term.id === "MANUFACTURING_TIME");
    } catch (error) {
      console.error("Error checking manufacturing time availability:", error);
      return false;
    }
  }

  async getOrders(status?: string, offset: number = 0, limit: number = 50): Promise<any> {
    let endpoint = `/orders/search?seller=${this.credentials.user_id}&offset=${offset}&limit=${limit}`;
    
    if (status) {
      endpoint += `&order.status=${status}`;
    }
    
    return this.request(endpoint);
  }

  async getOrderDetails(orderId: string): Promise<any> {
    return this.request(`/orders/${orderId}`);
  }
}

export const mercadolibreApi = new MercadoLibreAPI();
