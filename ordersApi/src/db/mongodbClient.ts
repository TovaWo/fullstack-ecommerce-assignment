import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI as string;
const client = new MongoClient(uri);

let db: Db;

export const connectToMongo = async (): Promise<void> => {
  await client.connect();
  db = client.db('ordersDb');
}

export const getDb = (): Db => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}
