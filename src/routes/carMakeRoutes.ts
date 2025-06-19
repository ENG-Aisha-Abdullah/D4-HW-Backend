import { Router } from 'express';
import {
  createCarMaker,  // >> NO PARAMS
  getAllCarDealer,   // >> NO PARAMS
  getCarMakeById,
  updateCarMake,
  deleteCarDealer,
} from '../controllers/carMakeController';

const router = Router();

router.route('/')
  .post(createCarMaker)
  .get(getAllCarDealer);
router.route('/:id')
  .get(getCarMakeById)
  .put(updateCarMake)
  .delete(deleteCarDealer);

export default router; 