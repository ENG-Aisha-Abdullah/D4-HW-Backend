import { Router } from 'express';
import {
  createCar, // no params
  getAllCars,  // no params
  getCarsByCarDealerId,
  getCarsByCarMakerId,
  getCarById,
  updateCar,
  deleteItem,
} from '../controllers/carController';

const router = Router();

router.route('/')
  .post(createCar)
  .get(getAllCars)
router.route('/:id')
  .get(getCarsByCarDealerId)
  .get(getCarsByCarMakerId)
  .get(getCarById)
  .put(updateCar)
  .delete(deleteItem);

export default router; 