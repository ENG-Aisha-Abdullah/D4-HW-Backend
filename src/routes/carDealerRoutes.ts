import { Router } from 'express';
import {
  createCarDealer, //>> no params
  getAllCarDealer,  //>> no params
  getCarDealerById,
  updateCarDealer,
  deleteCarDealer,
} from '../controllers/carDealerController';

const router = Router();

router.route('/')
  .post(createCarDealer)
  .get(getAllCarDealer);
router.route('/:id')
  .get(getCarDealerById)
  .put(updateCarDealer)
  .delete(deleteCarDealer);

export default router; 