import { saveOrder } from '../dal/orderDal';
import { OrderPayload, OrderDocument } from '../types/order';

export const createOrder = async (data: OrderPayload): Promise<{ orderId: string }> => {
  console.log('order payload', data)
  const order: OrderDocument = {
    user: data.user,
    items: data.items,
    createdAt: new Date(),
  };

  const orderId = await saveOrder(order);
  return { orderId };
}