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

// Create & get all cars
router.route('/')
  .post(createCar)
  .get(getAllCars);

// Get cars by carDealerId
router.get('/dealer/:carDealerId', getCarsByCarDealerId);

// Get cars by carMakerId
router.get('/maker/:carMakerId', getCarsByCarMakerId);

// Get, update, delete by car _id
router.route('/:id')
  .get(getCarById)
  .put(updateCar)
  .delete(deleteItem);

export default router;
