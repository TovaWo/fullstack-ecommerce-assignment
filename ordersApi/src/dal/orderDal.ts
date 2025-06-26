import { getDb } from '../db/mongodbClient';
import { OrderDocument } from '../types/order';

export const saveOrder = async(order: OrderDocument): Promise<string> => {
  console.log('saveOrder2')
  const db = getDb();
  const result = await db.collection('orders').insertOne(order);
  return result.insertedId.toString();
}
