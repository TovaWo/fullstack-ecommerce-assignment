import {Router, Request, Response, NextFunction} from 'express';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { orderSchema } from '../validation/orderSchema';
import { createOrder} from '../services/orderService';

const router = Router();
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(orderSchema);


router.post('/', (async (req: Request, res: Response, next: NextFunction) => {
  const isValid = validate(req.body);
  if (!isValid) {
    return res.status(400).json({ errors: validate.errors });
  }

  try {
    const { orderId } = await createOrder(req.body); 
    res.status(201).json({ success: true, message: 'Order saved', orderId });
  } catch (err: any) {
    console.error(err.message)
    // only for demo , to work without real DB
    if(err.message === 'Database not initialized') {
        res.status(201).json({ success: true, message: 'Route succeeded, but database not initialized, no data saved'});
    }
    next(err)
  }
}) as any);


export default router;
