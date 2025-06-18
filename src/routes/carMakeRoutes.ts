//  routing all files from list controllers 
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
  .get(createCarMakeStore)
  .post(findAllCarDealer);
router.route('/:id')
  .get(indByIdCarMake)
  .put(updateCarMake)
  .delete(deleteCarDealer);

export default router; 