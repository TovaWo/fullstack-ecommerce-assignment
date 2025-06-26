export interface Product {
  name: string;
  quantity: number;
  categoryId: string;
}

export interface CategoryItems {
  category: string;
  products: Product[];
}

export interface OrderPayload {
  user: {
    name: string;
    email: string;
    address: string;
  };
  items: CategoryItems[];
}

export interface OrderDocument extends OrderPayload {
  createdAt: Date;
}

