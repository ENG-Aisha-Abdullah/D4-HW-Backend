import { Router } from 'express';
import {
  createCarByCarDealer,
  findAllCars,
  findCarBycarDealerId,
  findBycarMakerId,
  findCarById,
  updateCar,
  deleteItem,
} from '../controllers/carController';

const router = Router();

router.route('/')
  .get(findAllCars)
router.route('/:id')
.post(createCarByCarDealer)
  .get(findCarBycarDealerId)
  .get(findBycarMakerId)
  .get(findCarById)
  .put(updateCar)
  .delete(deleteItem);

export default router; 