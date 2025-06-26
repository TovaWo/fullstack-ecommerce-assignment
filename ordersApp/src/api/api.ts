import axios from 'axios';
import { Category, Order, OrderResponse } from '../types';

const DOTNET_API_URL = import.meta.env.VITE_DOTNET_API_URL || 'http://localhost:5000';
const NODE_API_URL = import.meta.env.VITE_NODE_API_URL || 'http://localhost:3001';

export const getCategories = async (): Promise<Category[]> => {
  const fullUrl = `${DOTNET_API_URL}/api/categories`
  console.log('get categories fullUrl', fullUrl)
  try {
    const response = await axios.get<Category[]>(fullUrl);
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
    const fullUrl = `${NODE_API_URL}/api/order`
    console.log('submit order fullUrl', fullUrl)
    const response = await axios.post<OrderResponse>(fullUrl , {
      user: order.customer,
      items: order.items.map(item => ({
        categoryId: item.categoryId,
        name: item.name,
        quantity: item.quantity
      })),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to submit order:', error);
    throw error;
  }
};