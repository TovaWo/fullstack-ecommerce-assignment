export interface Category {
  id: string;
  name: string;
}

export interface CartItem {
  name: string;
  categoryId: string;
  categoryName: string;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  address: string;
  email: string;
}

export interface Order {
  customer: CustomerDetails;
  items: CartItem[];
}

export interface OrderResponse {
  success: boolean;
  message: string;
}