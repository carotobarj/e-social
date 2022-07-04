import express from 'express';
import {
  nuevaOrder,
  obtenerOrders,
  eliminarOrder,
  detailOrder
} from '../controllers/orderControllers.js';
import checkAuth from '../middleware/checkAuth.js';


const router = express.Router();

router
  .route('/')
  .post(checkAuth, nuevaOrder)

router
  .route('/:id')
  .get(checkAuth, obtenerOrders)
  .delete(eliminarOrder);

router
.route('/detail/:id')
  .get(detailOrder)


export default router;