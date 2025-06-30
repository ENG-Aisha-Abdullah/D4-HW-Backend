import { Router } from 'express';
import {
  createCarMaker,  // >> NO PARAMS
  getAllCarMakers,   // >> NO PARAMS
  getCarMakeById,
  updateCarMake,
  deleteCarMake,
} from '../controllers/carMakeController';
import { getAllCarDealer } from '@/controllers/carDealerController';

const router = Router();

router.route('/')
  .post(createCarMaker)
  .get(getAllCarMakers);
router.route('/:id')
  .get(getCarMakeById)
  .put(updateCarMake)
  .delete(deleteCarMake)
  // router.get('/dealer/:carDealerId', getAllCarDealer);
  
  // Get cars by carMakerId

export default router; 