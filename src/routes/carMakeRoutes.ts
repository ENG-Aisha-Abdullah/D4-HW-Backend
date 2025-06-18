import { Router } from 'express';
import {
  createCarMakeStore,
  findAllCarDealer,
  indByIdCarMake,
  updateCarMake,
  deleteCarDealer,
} from '../controllers/carMakeController';

const router = Router();

router.route('/')
  .post(createCarMakeStore)
  .get(findAllCarDealer);
router.route('/:id')
  .get(indByIdCarMake)
  .put(updateCarMake)
  .delete(deleteCarDealer);

export default router; 