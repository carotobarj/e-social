import express from 'express';
import { obtenerLibrosUsuarios, obtenerUsuarioPorId } from '../controllers/usuarioCreadorControllers.js';
import checkAuth from '../middleware/checkAuth.js';




const router = express.Router();

router
  .route('/:id')
  .get(checkAuth, obtenerLibrosUsuarios)

router
  .route('/user/:id')
  .get(obtenerUsuarioPorId)


export default router;