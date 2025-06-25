import axios from 'axios';
import { Category, Order, OrderResponse } from '../types';

const DOTNET_API_URL = import.meta.env.VITE_DOTNET_API_URL || 'http://localhost:5000';
const NODE_API_URL = import.meta.env.VITE_NODE_API_URL || 'http://localhost:3001';

console.log(DOTNET_API_URL)

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<Category[]>(`${DOTNET_API_URL}/api/categories`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }
};

export const submitOrder = async (
  order: Order
): Promise<OrderResponse> => {
  try {
    const response = await axios.post<OrderResponse>(`${NODE_API_URL}/api/orders`, {
      user: order.customer,
      items: order.items,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to submit order:', error);
    throw error;
  }
};