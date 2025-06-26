import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectToMongo } from './db/mongodbClient';
import orderRoutes from './routes/order';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*', 
}));

app.use('/api/order', orderRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

connectToMongo()
  .then(() => {
   console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    // process.exit(1);  for demo, continue without real DB
  });
